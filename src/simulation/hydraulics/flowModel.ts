import { hydraulicParams } from '../../config/hydraulicParams';

/**
 * Tính toán lưu lượng dầu thực tế do bơm thủy lực cấp vào hệ thống (đơn vị m³/s)
 * Lưu lượng tỷ lệ thuận với độ mở tay ga (Throttle) quyết định tốc độ vòng quay động cơ diesel
 * 
 * @param throttle Độ mở tay ga (0.0 đến 1.0)
 * @returns Lưu lượng dầu cấp (m³/s)
 */
export function calculateFlowRate(throttle: number): number {
  const qMaxM3s = hydraulicParams.q_pump_nominal; // Đọc lưu lượng danh định m3/s từ config (0.002 m3/s)
  
  // Hiệu suất thể tích danh định của bơm bánh răng/piston (ví dụ: 95%)
  const volEfficiency = 0.95;
  
  // Clamp throttle trong khoảng [0, 1] để đảm bảo an toàn toán học
  const clampedThrottle = Math.min(Math.max(throttle, 0.0), 1.0);
  
  return qMaxM3s * clampedThrottle * volEfficiency;
}
