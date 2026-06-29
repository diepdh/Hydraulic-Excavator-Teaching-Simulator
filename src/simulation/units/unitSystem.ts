/**
 * Hệ thống chuyển đổi đơn vị đo lường thủy lực (Unit Conversion System)
 * Phục vụ việc hiển thị trực quan các đại lượng vật lý theo các tiêu chuẩn kỹ thuật
 */

/**
 * Chuyển đổi Áp suất từ Pascal (Pa) sang Bar
 * 1 Bar = 10^5 Pa
 */
export function pascalToBar(pa: number): number {
  return pa / 100000;
}

/**
 * Chuyển đổi Áp suất từ Pascal (Pa) sang PSI (Pound per Square Inch)
 * 1 PSI ≈ 6894.76 Pa
 */
export function pascalToPsi(pa: number): number {
  return pa / 6894.75729;
}

/**
 * Chuyển đổi Lưu lượng từ m³/s sang Lít/phút (L/min)
 * 1 m³/s = 60000 L/min
 */
export function m3sToLmin(m3s: number): number {
  return m3s * 60000;
}

/**
 * Chuyển đổi Công suất từ Watt (W) sang Kilowatt (kW)
 * 1 kW = 1000 W
 */
export function wattToKw(w: number): number {
  return w / 1000;
}

/**
 * Chuyển đổi Công suất từ Watt (W) sang Mã lực (HP - Mechanical Horsepower)
 * 1 HP ≈ 745.7 W
 */
export function wattToHp(w: number): number {
  return w / 745.699872;
}
