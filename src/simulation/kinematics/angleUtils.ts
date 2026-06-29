export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Chuẩn hóa góc về khoảng [-PI, PI]
 */
export function normalizeAngle(rad: number): number {
  let angle = rad % (2 * Math.PI);
  if (angle > Math.PI) {
    angle -= 2 * Math.PI;
  } else if (angle < -Math.PI) {
    angle += 2 * Math.PI;
  }
  return angle;
}

/**
 * So sánh hai góc có gần nhau trong khoảng sai số cho phép hay không
 */
export function areAnglesClose(a: number, b: number, epsilon: number = 1e-5): boolean {
  const diff = Math.abs(normalizeAngle(a - b));
  return diff < epsilon;
}
