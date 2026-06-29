/**
 * Nội suy tuyến tính (Linear Interpolation)
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Nội suy làm mượt (Cubic Ease-In-Out / Smoothstep)
 */
export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}
