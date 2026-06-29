import type { AppState } from './simulationStore';
import { forwardKinematics } from '../simulation/kinematics/forwardKinematics';
import { geometryConfig } from '../config/geometry';
import { hydraulicParams } from '../config/hydraulicParams';

/**
 * Selector tính toán động học thuận (Forward Kinematics) dựa trên góc khớp từ Store
 */
export const selectKinematics = (state: AppState) => {
  return forwardKinematics(state.angles, geometryConfig);
};

/**
 * Selector ước lượng thủy lực tĩnh giả định (Quasi-static Hydraulics proxy)
 * Ngăn chặn việc nhúng trực tiếp công thức vật lý thủy lực vào trong JSX layer
 */
export const selectHydraulics = (state: AppState) => {
  const { reach } = selectKinematics(state);
  const { payload, throttle } = state;
  const { p_base, p_relief, k_p_payload, mass_empty, efficiency } = hydraulicParams;
  
  // Áp suất yêu cầu tỷ lệ với tải trọng gầu, khối lượng cơ cấu rỗng, và cánh tay đòn (Reach)
  // Chia 100 làm hệ số proxy chuẩn hóa
  const pressureDemand = p_base + (mass_empty + payload) * k_p_payload * reach * 0.01;
  
  // Cắt biên bởi van an toàn (Relief Valve)
  const pressure = Math.min(pressureDemand, p_relief);
  
  // Lưu lượng dầu tỷ lệ với độ mở tay ga (m3/s)
  const flowRate = hydraulicParams.q_pump_nominal * throttle;
  
  // Công suất thủy lực (Watt) = p * Q / hiệu suất
  const power = (pressure * flowRate) / efficiency;
  
  return {
    pressure,
    flowRate,
    power,
  };
};
