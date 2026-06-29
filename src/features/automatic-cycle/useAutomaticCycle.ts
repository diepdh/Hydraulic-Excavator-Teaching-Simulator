import { useSimulationStore } from '../../store/simulationStore';

/**
 * Custom Hook đóng gói toàn bộ trạng thái và phương thức điều khiển chu trình tự động (Automatic Cycle)
 * Cách ly tầng React UI Panel khỏi các hành động thô của Zustand Store
 */
export function useAutomaticCycle() {
  const store = useSimulationStore();
  
  return {
    mode: store.mode,
    cycleStatus: store.cycleStatus,
    cycleStepIndex: store.cycleStepIndex,
    cycleOverallProgress: store.cycleOverallProgress,
    stepProgress: store.stepProgress,
    simStatus: store.simStatus,
    startCycle: store.startCycle,
    pauseCycle: store.pauseCycle,
    resumeCycle: store.resumeCycle,
    resetCycle: store.resetCycle,
  };
}
