import type { JointAngles, JointPositions, GeometryConfig } from '../../types/kinematics.types';
import { degToRad } from './angleUtils';

export interface KinematicResult {
  positions: JointPositions;
  reach: number;  // m
  height: number; // m
}

/**
 * Tính toán động học thuận cho máy xúc 2D
 * @param angles Bộ góc khớp hiện tại (độ)
 * @param config Tham số cấu hình hình học của máy xúc
 * @returns Tọa độ màn hình (SVG pixel) của các khớp và telemetry vật lý (Reach, Height)
 */
export function forwardKinematics(
  angles: JointAngles,
  config: GeometryConfig
): KinematicResult {
  const { L_boom, L_arm, L_bucket, scale, baseX, baseY } = config;
  
  // Chuyển đổi góc từ độ sang radian
  const radBoom = degToRad(angles.boom);
  const radArm = degToRad(angles.arm);
  const radBucket = degToRad(angles.bucket);
  
  // Góc tuyệt đối so với trục X vật lý
  const phiBoom = radBoom;
  const phiArm = radBoom - radArm;
  const phiBucket = radBoom - radArm - radBucket;
  
  // 1. Boom Base (Gốc quay đặt trên cabin máy xúc)
  const boomBase = { x: baseX, y: baseY };
  
  // 2. Boom End (Khớp xoay giữa Cần nâng và Tay gầu)
  const boomEnd = {
    x: baseX + L_boom * scale * Math.cos(phiBoom),
    y: baseY - L_boom * scale * Math.sin(phiBoom),
  };
  
  // 3. Arm End (Khớp xoay giữa Tay gầu và Gầu xúc)
  const armEnd = {
    x: boomEnd.x + L_arm * scale * Math.cos(phiArm),
    y: boomEnd.y - L_arm * scale * Math.sin(phiArm),
  };
  
  // 4. Bucket Pivot (Tâm xoay của gầu, trùng với điểm đầu của khâu Arm)
  const bucketPivot = { x: armEnd.x, y: armEnd.y };
  
  // 5. Bucket Tip (Đầu răng gầu xúc)
  const bucketTip = {
    x: bucketPivot.x + L_bucket * scale * Math.cos(phiBucket),
    y: bucketPivot.y - L_bucket * scale * Math.sin(phiBucket),
  };
  
  // Tính toán Reach (Tầm với nằm ngang) và Height (Cao độ thẳng đứng) vật lý
  const reach = (bucketTip.x - baseX) / scale;
  const height = -(bucketTip.y - baseY) / scale;
  
  return {
    positions: {
      boomBase,
      boomEnd,
      armEnd,
      bucketPivot,
      bucketTip,
    },
    reach,
    height,
  };
}
