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
  throttle: number;   // 0.0 .. 1.0 (độ mở ga động cơ)
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
  
  // --- Cycle Controls (Skeleton for automatic simulation) ---
  startCycle: () => void;
  pauseCycle: () => void;
  resumeCycle: () => void;
  resetCycle: () => void;
}

export const useSimulationStore = create<AppState>((set) => ({
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
    // Chạy qua constraint engine để tự động cắt biên
    const { clampedAngles, warnings } = clampJointAngles(nextAngles, geometryConfig);
    
    // Gộp cảnh báo cơ học mới và giữ các cảnh báo phi cơ học khác
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
  
  resetCycle: () => set({
    mode: 'MANUAL',
    cycleStatus: 'IDLE',
    cycleStepIndex: 0,
    cycleOverallProgress: 0,
    stepProgress: 0,
    simStatus: 'IDLE',
    angles: { boom: 30, arm: 30, bucket: 0 },
    warnings: new Set(),
  }),
}));
