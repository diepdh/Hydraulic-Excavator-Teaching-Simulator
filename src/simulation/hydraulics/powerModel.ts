/**
 * Tính toán công suất thủy lực hữu ích tiêu thụ của hệ thống (đơn vị Watt)
 * Công thức cơ bản nhất quán tuyệt đối: Power = Pressure × Flow Rate (P = p × Q)
 * 
 * @param pressure Áp suất hệ thống (Pascal)
 * @param flowRate Lưu lượng dầu cấp (m³/s)
 * @returns Công suất thủy lực tiêu thụ (W)
 */
export function calculatePower(pressure: number, flowRate: number): number {
  // Đảm bảo không nhân các giá trị âm không hợp lệ vật lý
  const pClamped = Math.max(pressure, 0.0);
  const qClamped = Math.max(flowRate, 0.0);
  
  return pClamped * qClamped;
}
