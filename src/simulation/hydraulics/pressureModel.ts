import { hydraulicParams } from '../../config/hydraulicParams';
import { geometryConfig } from '../../config/geometry';

/**
 * Tính toán áp suất yêu cầu của hệ thống thủy lực (đơn vị Pascal)
 * Áp suất được ước tính dựa trên tải trọng tĩnh của gầu và vị trí hình học của cần nâng (Lever arm effect)
 * 
 * @param payload Khối lượng vật liệu trong gầu (kg)
 * @param boomAngle Góc xoay cần nâng Boom (độ)
 * @returns Áp suất hệ thống (Pa)
 */
export function calculatePressure(payload: number, boomAngle: number): number {
  const pBase = hydraulicParams.p_base; // Đọc 15 bar (1.5 MPa) từ config
  
  // Lực trọng trường tác dụng: F = m * g
  const F_gravity = payload * 9.80665;
  
  // Hiệu ứng cánh tay đòn động học (Lever Arm effect):
  // Khi cần nâng hạ xuống thấp (góc boom nhỏ), tầm với xa -> momen cản lớn -> áp suất nâng cần cao hơn.
  // Khi cần nâng dựng đứng (góc boom lớn), tầm với gần -> momen cản nhỏ -> áp suất nâng thấp hơn.
  const angleRange = geometryConfig.boomAngleMax - geometryConfig.boomAngleMin;
  const normalizedAngle = angleRange > 0 
    ? (boomAngle - geometryConfig.boomAngleMin) / angleRange 
    : 0.5;
    
  // Hệ số lever arm chạy từ 4.5 (boom thấp nhất) về 2.0 (boom cao nhất)
  const leverRatio = 4.5 - normalizedAngle * 2.5;
  
  // Diện tích chịu lực danh định của piston xy lanh nâng cần (ví dụ: đường kính D = 80mm -> A ≈ 50 cm² = 0.005 m²)
  const A_cylinder = 0.005; 
  
  const pLoad = (F_gravity * leverRatio) / A_cylinder;
  const pTotal = pBase + pLoad;
  
  // Giới hạn áp suất tối đa bởi van an toàn (Pressure Relief Valve)
  const pMax = hydraulicParams.p_relief; // Đọc 250 bar từ config
  
  return Math.min(pTotal, pMax);
}
