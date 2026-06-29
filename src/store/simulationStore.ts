import { create } from 'zustand';
import type { SimStatus } from '../types/simulation.types';
import type { JointAngles } from '../types/kinematics.types';
import type { CycleStepName } from '../types/cycle.types';
import { geometryConfig } from '../config/geometry';
import { clampJointAngles } from '../simulation/kinematics/constraints';

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

// Biến cục bộ trong module để lưu trữ handle của requestAnimationFrame
let activeAnimationId: number | null = null;

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
  
  // Hủy animation đang chạy
  stopAnimation: () => {
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
  },
  
  // Nội suy chuyển động mượt tới góc mục tiêu
  animateToAngles: (targetAngles, duration = 1000) => {
    // 1. Hủy animation cũ nếu có
    get().stopAnimation();
    
    const startAngles = { ...get().angles };
    const startTime = performance.now();
    
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1.0);
      
      // Hàm smoothstep làm mượt gia tốc (Cubic Ease-In-Out)
      const tSmooth = t * t * (3.0 - 2.0 * t);
      
      const nextAngles = {
        boom: startAngles.boom + (targetAngles.boom - startAngles.boom) * tSmooth,
        arm: startAngles.arm + (targetAngles.arm - startAngles.arm) * tSmooth,
        bucket: startAngles.bucket + (targetAngles.bucket - startAngles.bucket) * tSmooth,
      };
      
      // Áp dụng góc nội suy
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
  
  startCycle: () => set({
    mode: 'AUTOMATIC',
    cycleStatus: 'APPROACH',
    simStatus: 'RUNNING',
    cycleStepIndex: 1,
    cycleOverallProgress: 0.1,
    stepProgress: 0.0,
  }),
  
  pauseCycle: () => set({ simStatus: 'PAUSED' }),
  resumeCycle: () => set({ simStatus: 'RUNNING' }),
  
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
