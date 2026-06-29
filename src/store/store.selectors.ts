import type { AppState } from './simulationStore';
import { forwardKinematics } from '../simulation/kinematics/forwardKinematics';
import { geometryConfig } from '../config/geometry';
import { calculatePressure } from '../simulation/hydraulics/pressureModel';
import { calculateFlowRate } from '../simulation/hydraulics/flowModel';
import { calculatePower } from '../simulation/hydraulics/powerModel';

/**
 * Selector tính toán động học thuận (Forward Kinematics) dựa trên góc khớp từ Store
 */
export const selectKinematics = (state: AppState) => {
  return forwardKinematics(state.angles, geometryConfig);
};

/**
 * Selector tính toán các thông số thủy lực động lực học thật
 * Ngăn chặn hoàn toàn việc nhúng trực tiếp công thức vật lý thủy lực vào trong JSX layer
 */
export const selectHydraulics = (state: AppState) => {
  const { payload, throttle, angles } = state;
  
  // Áp suất thực tế (Pa) dựa trên tải trọng tĩnh và góc Boom (động học cần nâng)
  const pressure = calculatePressure(payload, angles.boom);
  
  // Lưu lượng dầu cấp bơm (m³/s) dựa trên tay ga động cơ
  const flowRate = calculateFlowRate(throttle);
  
  // Công suất hữu dụng (W) nhất quán theo quan hệ: P = p * Q
  const power = calculatePower(pressure, flowRate);
  
  return {
    pressure,   // Đơn vị Pascal
    flowRate,   // Đơn vị m³/s
    power,      // Đơn vị Watt
  };
};
