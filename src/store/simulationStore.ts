import { create } from 'zustand';
import type { SimStatus } from '../types/simulation.types';
import type { JointAngles } from '../types/kinematics.types';
import type { CycleStepName } from '../types/cycle.types';
import { geometryConfig } from '../config/geometry';
import { clampJointAngles } from '../simulation/kinematics/constraints';
import { SimClock } from '../simulation/animation/animationController';
import { smoothstep } from '../simulation/animation/interpolation';
import { calculateOverallProgress } from '../simulation/cycle/cycleStateMachine';
import { cycleConfig } from '../config/cycleDefinition';

export interface AppState {
  // --- Source State ---
  angles: JointAngles;
  payload: number;    // kg
  throttle: number;   // 0.0 .. 1.0
  mode: 'MANUAL' | 'AUTOMATIC';
  cycleStatus: CycleStepName;
  cycleStepIndex: number;
  cycleOverallProgress: number; // [0, 1]
  stepProgress: number;         // [0, 1]
  warnings: Set<string>;
  simStatus: SimStatus;
  
  // --- Actions ---
  setJointAngle: (joint: 'boom' | 'arm' | 'bucket', value: number) => void;
  setPayload: (value: number) => void;
  setThrottle: (value: number) => void;
  setMode: (value: 'MANUAL' | 'AUTOMATIC') => void;
  setSimStatus: (value: SimStatus) => void;
  
  addWarning: (code: string) => void;
  removeWarning: (code: string) => void;
  clearWarnings: () => void;
  
  // --- Animation Controls ---
  animateToAngles: (targetAngles: JointAngles, duration?: number) => void;
  stopAnimation: () => void;
  
  // --- Cycle Controls ---
  startCycle: () => void;
  pauseCycle: () => void;
  resumeCycle: () => void;
  resetCycle: () => void;
}

// Biến cục bộ để quản lý vòng lặp RAF và đồng hồ mô phỏng
let activeAnimationId: number | null = null;
let activeCycleId: number | null = null;
const cycleClock = new SimClock();
let cycleStartAngles: JointAngles = { boom: 0, arm: 0, bucket: 0 };

export const useSimulationStore = create<AppState>((set, get) => ({
  // Baseline initial state
  angles: {
    boom: 30,
    arm: 30,
    bucket: 0,
  },
  payload: 0,
  throttle: 0.5,
  mode: 'MANUAL',
  cycleStatus: 'IDLE',
  cycleStepIndex: 0,
  cycleOverallProgress: 0,
  stepProgress: 0,
  warnings: new Set<string>(),
  simStatus: 'IDLE',
  
  // Implement actions
  setJointAngle: (joint, value) => set((state) => {
    const nextAngles = { ...state.angles, [joint]: value };
    const { clampedAngles, warnings } = clampJointAngles(nextAngles, geometryConfig);
    
    const nextWarnings = new Set<string>(state.warnings);
    nextWarnings.delete('BOOM_LIMIT');
    nextWarnings.delete('ARM_LIMIT');
    nextWarnings.delete('BUCKET_LIMIT');
    warnings.forEach((w) => nextWarnings.add(w));
    
    return {
      angles: clampedAngles,
      warnings: nextWarnings,
    };
  }),
  
  setPayload: (value) => set({ payload: value }),
  setThrottle: (value) => set({ throttle: value }),
  setMode: (value) => set({ mode: value }),
  setSimStatus: (value) => set({ simStatus: value }),
  
  addWarning: (code) => set((state) => {
    const nextWarnings = new Set(state.warnings);
    nextWarnings.add(code);
    return { warnings: nextWarnings };
  }),
  
  removeWarning: (code) => set((state) => {
    const nextWarnings = new Set(state.warnings);
    nextWarnings.delete(code);
    return { warnings: nextWarnings };
  }),
  
  clearWarnings: () => set({ warnings: new Set() }),
  
  // Hủy animation hoặc cycle đang chạy
  stopAnimation: () => {
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    if (activeCycleId !== null) {
      cancelAnimationFrame(activeCycleId);
      activeCycleId = null;
    }
  },
  
  // Nội suy chuyển động mượt tới góc mục tiêu (đăng ký cho manual preset)
  animateToAngles: (targetAngles, duration = 1000) => {
    get().stopAnimation();
    set({ mode: 'MANUAL' }); // Chuyển về manual khi chạy presets
    
    const startAngles = { ...get().angles };
    const startTime = performance.now();
    
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1.0);
      const tSmooth = smoothstep(t);
      
      const nextAngles = {
        boom: startAngles.boom + (targetAngles.boom - startAngles.boom) * tSmooth,
        arm: startAngles.arm + (targetAngles.arm - startAngles.arm) * tSmooth,
        bucket: startAngles.bucket + (targetAngles.bucket - startAngles.bucket) * tSmooth,
      };
      
      get().setJointAngle('boom', nextAngles.boom);
      get().setJointAngle('arm', nextAngles.arm);
      get().setJointAngle('bucket', nextAngles.bucket);
      
      if (t < 1.0) {
        activeAnimationId = requestAnimationFrame(tick);
      } else {
        activeAnimationId = null;
        set({ simStatus: 'IDLE' });
      }
    };
    
    set({ simStatus: 'RUNNING' });
    activeAnimationId = requestAnimationFrame(tick);
  },
  
  startCycle: () => {
    // 1. Dừng các hoạt động chuyển động cũ
    get().stopAnimation();
    
    const steps = cycleConfig.steps;
    // Bắt đầu từ bước 1: APPROACH (bước 0 là IDLE)
    const stepIndex = 1;
    const firstStep = steps[stepIndex];
    cycleStartAngles = { ...get().angles };
    
    set({
      mode: 'AUTOMATIC',
      cycleStatus: firstStep.name,
      cycleStepIndex: stepIndex,
      simStatus: 'RUNNING',
      cycleOverallProgress: 0,
      stepProgress: 0,
    });
    
    cycleClock.start();
    
    const tick = () => {
      const state = get();
      if (state.simStatus !== 'RUNNING') {
        activeCycleId = null;
        return;
      }
      
      const currentStepIndex = get().cycleStepIndex;
      const currentStep = steps[currentStepIndex];
      const elapsedMs = cycleClock.getElapsed();
      const durationMs = currentStep.duration * 1000;
      
      let t = durationMs > 0 ? elapsedMs / durationMs : 1.0;
      
      if (t >= 1.0) {
        t = 1.0;
        // Khóa vị trí khớp chính xác tại mục tiêu
        get().setJointAngle('boom', currentStep.targetAngles.boom);
        get().setJointAngle('arm', currentStep.targetAngles.arm);
        get().setJointAngle('bucket', currentStep.targetAngles.bucket);
        
        // Chuyển bước
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
          const nextStep = steps[nextIndex];
          cycleStartAngles = { ...get().angles };
          set({
            cycleStatus: nextStep.name,
            cycleStepIndex: nextIndex,
            stepProgress: 0,
          });
          cycleClock.start();
          activeCycleId = requestAnimationFrame(tick);
        } else {
          // Kết thúc chu trình tự động hoàn toàn
          set({
            cycleStatus: 'COMPLETE',
            simStatus: 'IDLE',
            cycleOverallProgress: 1.0,
            stepProgress: 1.0,
          });
          activeCycleId = null;
        }
      } else {
        const tSmooth = smoothstep(t);
        const nextAngles = {
          boom: cycleStartAngles.boom + (currentStep.targetAngles.boom - cycleStartAngles.boom) * tSmooth,
          arm: cycleStartAngles.arm + (currentStep.targetAngles.arm - cycleStartAngles.arm) * tSmooth,
          bucket: cycleStartAngles.bucket + (currentStep.targetAngles.bucket - cycleStartAngles.bucket) * tSmooth,
        };
        
        get().setJointAngle('boom', nextAngles.boom);
        get().setJointAngle('arm', nextAngles.arm);
        get().setJointAngle('bucket', nextAngles.bucket);
        
        const overall = calculateOverallProgress(currentStepIndex, t);
        set({
          stepProgress: t,
          cycleOverallProgress: overall,
        });
        
        activeCycleId = requestAnimationFrame(tick);
      }
    };
    
    activeCycleId = requestAnimationFrame(tick);
  },
  
  pauseCycle: () => {
    cycleClock.pause();
    set({ simStatus: 'PAUSED' });
  },
  
  resumeCycle: () => {
    cycleClock.resume();
    set({ simStatus: 'RUNNING' });
    
    if (activeCycleId === null) {
      const steps = cycleConfig.steps;
      const tick = () => {
        const state = get();
        if (state.simStatus !== 'RUNNING') {
          activeCycleId = null;
          return;
        }
        
        const currentStepIndex = get().cycleStepIndex;
        const currentStep = steps[currentStepIndex];
        const elapsedMs = cycleClock.getElapsed();
        const durationMs = currentStep.duration * 1000;
        
        let t = durationMs > 0 ? elapsedMs / durationMs : 1.0;
        
        if (t >= 1.0) {
          t = 1.0;
          get().setJointAngle('boom', currentStep.targetAngles.boom);
          get().setJointAngle('arm', currentStep.targetAngles.arm);
          get().setJointAngle('bucket', currentStep.targetAngles.bucket);
          
          const nextIndex = currentStepIndex + 1;
          if (nextIndex < steps.length) {
            const nextStep = steps[nextIndex];
            cycleStartAngles = { ...get().angles };
            set({
              cycleStatus: nextStep.name,
              cycleStepIndex: nextIndex,
              stepProgress: 0,
            });
            cycleClock.start();
            activeCycleId = requestAnimationFrame(tick);
          } else {
            set({
              cycleStatus: 'COMPLETE',
              simStatus: 'IDLE',
              cycleOverallProgress: 1.0,
              stepProgress: 1.0,
            });
            activeCycleId = null;
          }
        } else {
          const tSmooth = smoothstep(t);
          const nextAngles = {
            boom: cycleStartAngles.boom + (currentStep.targetAngles.boom - cycleStartAngles.boom) * tSmooth,
            arm: cycleStartAngles.arm + (currentStep.targetAngles.arm - cycleStartAngles.arm) * tSmooth,
            bucket: cycleStartAngles.bucket + (currentStep.targetAngles.bucket - cycleStartAngles.bucket) * tSmooth,
          };
          
          get().setJointAngle('boom', nextAngles.boom);
          get().setJointAngle('arm', nextAngles.arm);
          get().setJointAngle('bucket', nextAngles.bucket);
          
          const overall = calculateOverallProgress(currentStepIndex, t);
          set({
            stepProgress: t,
            cycleOverallProgress: overall,
          });
          
          activeCycleId = requestAnimationFrame(tick);
        }
      };
      
      activeCycleId = requestAnimationFrame(tick);
    }
  },
  
  resetCycle: () => {
    get().stopAnimation();
    set({
      mode: 'MANUAL',
      cycleStatus: 'IDLE',
      cycleStepIndex: 0,
      cycleOverallProgress: 0,
      stepProgress: 0,
      simStatus: 'IDLE',
      angles: { boom: 30, arm: 30, bucket: 0 },
      warnings: new Set(),
    });
  },
}));
export type { JointAngles, SimStatus, CycleStepName };
