import { describe, it, expect, beforeEach } from 'vitest';
import { useSimulationStore } from '../../../src/store/simulationStore';

describe('Automatic Cycle State Machine & Progress', () => {
  beforeEach(() => {
    // Trả store về cấu hình mặc định trước mỗi ca kiểm thử
    useSimulationStore.getState().resetCycle();
  });

  it('should transition mode to AUTOMATIC and start at APPROACH step upon startCycle', () => {
    const store = useSimulationStore.getState();
    store.startCycle();
    
    const state = useSimulationStore.getState();
    expect(state.mode).toBe('AUTOMATIC');
    expect(state.cycleStatus).toBe('APPROACH');
    expect(state.cycleStepIndex).toBe(1);
    expect(state.simStatus).toBe('RUNNING');
  });

  it('should set status to PAUSED and pause internal clock upon calling pauseCycle', () => {
    const store = useSimulationStore.getState();
    store.startCycle();
    store.pauseCycle();
    
    let state = useSimulationStore.getState();
    expect(state.simStatus).toBe('PAUSED');
    
    // Tiếp tục chạy
    store.resumeCycle();
    state = useSimulationStore.getState();
    expect(state.simStatus).toBe('RUNNING');
  });

  it('should cleanup animations, reset angles to baseline and set mode back to MANUAL on resetCycle', () => {
    const store = useSimulationStore.getState();
    store.startCycle();
    store.resetCycle();
    
    const state = useSimulationStore.getState();
    expect(state.mode).toBe('MANUAL');
    expect(state.cycleStatus).toBe('IDLE');
    expect(state.cycleStepIndex).toBe(0);
    expect(state.cycleOverallProgress).toBe(0);
    expect(state.stepProgress).toBe(0);
    expect(state.simStatus).toBe('IDLE');
    expect(state.angles).toEqual({ boom: 30, arm: 30, bucket: 0 });
  });
});
