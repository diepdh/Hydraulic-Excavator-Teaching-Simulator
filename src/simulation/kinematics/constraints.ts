import type { JointAngles, GeometryConfig } from '../../types/kinematics.types';

export interface ConstraintResult {
  clampedAngles: JointAngles;
  warnings: Set<string>;
}

/**
 * Tiện ích cắt biên giới hạn giá trị trong khoảng [min, max]
 */
export function clamp(value: number, min: number, max: number): { value: number; clamped: boolean } {
  if (value <= min) return { value: min, clamped: true };
  if (value >= max) return { value: max, clamped: true };
  return { value, clamped: false };
}

/**
 * Đảm bảo các góc khớp nằm trong giới hạn hành trình cơ học và phát cảnh báo nếu chạm biên
 * @param angles Bộ góc khớp thô do người dùng nhập (độ)
 * @param config Tham số cấu hình hình học (chứa giới hạn góc min/max)
 * @returns Bộ góc đã cắt biên (clampedAngles) và danh sách cảnh báo chạm biên hoạt động (warnings)
 */
export function clampJointAngles(
  angles: JointAngles,
  config: GeometryConfig
): ConstraintResult {
  const warnings = new Set<string>();
  
  const boomRes = clamp(angles.boom, config.boomAngleMin, config.boomAngleMax);
  const armRes = clamp(angles.arm, config.armAngleMin, config.armAngleMax);
  const bucketRes = clamp(angles.bucket, config.bucketAngleMin, config.bucketAngleMax);
  
  if (boomRes.clamped) {
    warnings.add('BOOM_LIMIT');
  }
  if (armRes.clamped) {
    warnings.add('ARM_LIMIT');
  }
  if (bucketRes.clamped) {
    warnings.add('BUCKET_LIMIT');
  }
  
  return {
    clampedAngles: {
      boom: boomRes.value,
      arm: armRes.value,
      bucket: bucketRes.value,
    },
    warnings,
  };
}
