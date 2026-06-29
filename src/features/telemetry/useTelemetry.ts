import { useSimulationStore } from '../../store/simulationStore';
import { selectKinematics, selectHydraulics } from '../../store/store.selectors';

/**
 * Custom Hook tổng hợp thông tin giám sát thiết bị (Telemetry)
 * Đọc dữ liệu derived sạch sẽ thông qua các Zustand selectors
 */
export function useTelemetry() {
  const state = useSimulationStore();
  const kinematics = selectKinematics(state);
  const hydraulics = selectHydraulics(state);
  
  return {
    positions: kinematics.positions,
    reach: kinematics.reach,
    height: kinematics.height,
    pressure: hydraulics.pressure,
    flowRate: hydraulics.flowRate,
    power: hydraulics.power,
  };
}
