import { describe, it, expect } from 'vitest';
import { geometryConfig } from '@/config/geometry';
import { degToRad, radToDeg, normalizeAngle, areAnglesClose } from '@/simulation/kinematics/angleUtils';
import { forwardKinematics } from '@/simulation/kinematics/forwardKinematics';
import { clampJointAngles, clamp } from '@/simulation/kinematics/constraints';

describe('Angle Utilities Test', () => {
  it('should convert degrees to radians and vice-versa', () => {
    expect(degToRad(180)).toBeCloseTo(Math.PI);
    expect(radToDeg(Math.PI)).toBeCloseTo(180);
    expect(degToRad(90)).toBeCloseTo(Math.PI / 2);
    expect(radToDeg(Math.PI / 2)).toBeCloseTo(90);
  });

  it('should normalize angles to [-PI, PI]', () => {
    expect(normalizeAngle(Math.PI * 1.5)).toBeCloseTo(-Math.PI / 2);
    expect(normalizeAngle(-Math.PI * 1.5)).toBeCloseTo(Math.PI / 2);
    expect(normalizeAngle(Math.PI * 2)).toBeCloseTo(0);
    expect(normalizeAngle(-Math.PI * 3)).toBeCloseTo(-Math.PI);
  });

  it('should check if two angles are close within epsilon', () => {
    expect(areAnglesClose(0, 1e-6)).toBe(true);
    expect(areAnglesClose(0, 1e-4)).toBe(false);
    expect(areAnglesClose(Math.PI, -Math.PI)).toBe(true); // normalize makes them equal
  });
});

describe('Forward Kinematics Test', () => {
  it('should compute correct coordinates for zero pose (all links horizontal)', () => {
    const zeroAngles = { boom: 0, arm: 0, bucket: 0 };
    const result = forwardKinematics(zeroAngles, geometryConfig);

    // Boom Base is fixed at (baseX, baseY)
    expect(result.positions.boomBase.x).toBe(geometryConfig.baseX);
    expect(result.positions.boomBase.y).toBe(geometryConfig.baseY);

    // Boom End: x = baseX + L_boom * scale = 250 + 4.0 * 80 = 570
    expect(result.positions.boomEnd.x).toBeCloseTo(570);
    expect(result.positions.boomEnd.y).toBeCloseTo(350);

    // Arm End: x = 570 + L_arm * scale = 570 + 2.8 * 80 = 794
    expect(result.positions.armEnd.x).toBeCloseTo(794);
    expect(result.positions.armEnd.y).toBeCloseTo(350);

    // Bucket Tip: x = 794 + L_bucket * scale = 794 + 1.5 * 80 = 914
    expect(result.positions.bucketTip.x).toBeCloseTo(914);
    expect(result.positions.bucketTip.y).toBeCloseTo(350);

    // Telemetry Reach = 4.0 + 2.8 + 1.5 = 8.3m
    expect(result.reach).toBeCloseTo(8.3);
    expect(result.height).toBeCloseTo(0);
  });

  it('should compute correct coordinates for a specific known pose', () => {
    // Pose: boom = 30 deg, arm = 0, bucket = 0
    const poseAngles = { boom: 30, arm: 0, bucket: 0 };
    const result = forwardKinematics(poseAngles, geometryConfig);

    const rad = (30 * Math.PI) / 180;
    const expectedBoomEndX = 250 + 4.0 * 80 * Math.cos(rad);
    const expectedBoomEndY = 350 - 4.0 * 80 * Math.sin(rad);

    expect(result.positions.boomEnd.x).toBeCloseTo(expectedBoomEndX);
    expect(result.positions.boomEnd.y).toBeCloseTo(expectedBoomEndY);

    // Total Reach = (4.0 + 2.8 + 1.5) * cos(30) = 8.3 * 0.866025 = 7.188m
    // Total Height = (4.0 + 2.8 + 1.5) * sin(30) = 8.3 * 0.5 = 4.15m
    expect(result.reach).toBeCloseTo(8.3 * Math.cos(rad));
    expect(result.height).toBeCloseTo(8.3 * Math.sin(rad));
  });
});

describe('Constraints and Clamping Test', () => {
  it('should clamp values within bounds', () => {
    expect(clamp(5, 0, 10)).toEqual({ value: 5, clamped: false });
    expect(clamp(-5, 0, 10)).toEqual({ value: 0, clamped: true });
    expect(clamp(15, 0, 10)).toEqual({ value: 10, clamped: true });
  });

  it('should pass angles within limits without warnings', () => {
    const safeAngles = { boom: 20, arm: 45, bucket: 10 };
    const result = clampJointAngles(safeAngles, geometryConfig);

    expect(result.clampedAngles).toEqual(safeAngles);
    expect(result.warnings.size).toBe(0);
  });

  it('should clamp joint angles and generate warnings when exceeding limits', () => {
    const exceedAngles = {
      boom: -20, // min is -10
      arm: 150,  // max is 120
      bucket: 20 // within limit [-30, 90]
    };
    
    const result = clampJointAngles(exceedAngles, geometryConfig);

    expect(result.clampedAngles.boom).toBe(geometryConfig.boomAngleMin);
    expect(result.clampedAngles.arm).toBe(geometryConfig.armAngleMax);
    expect(result.clampedAngles.bucket).toBe(20);

    expect(result.warnings.has('BOOM_LIMIT')).toBe(true);
    expect(result.warnings.has('ARM_LIMIT')).toBe(true);
    expect(result.warnings.has('BUCKET_LIMIT')).toBe(false);
  });
});
