import { describe, it, expect } from 'vitest';
import { geometryConfig } from '@/config/geometry';
import { hydraulicParams } from '@/config/hydraulicParams';
import { cycleConfig } from '@/config/cycleDefinition';
import {
  validateGeometryConfig,
  validateHydraulicParams,
  validateCycleConfig,
} from '@/config/configValidator';

describe('Config Validation Test', () => {
  it('should validate baseline geometry config successfully', () => {
    expect(validateGeometryConfig(geometryConfig)).toBe(true);
  });

  it('should throw error for invalid linkage lengths', () => {
    const invalidConfig = { ...geometryConfig, L_boom: -1 };
    expect(() => validateGeometryConfig(invalidConfig)).toThrow('Độ dài các khâu hình học phải lớn hơn 0');
  });

  it('should validate baseline hydraulic params successfully', () => {
    expect(validateHydraulicParams(hydraulicParams)).toBe(true);
  });

  it('should throw error for invalid hydraulic efficiency', () => {
    const invalidParams = { ...hydraulicParams, efficiency: 1.5 };
    expect(() => validateHydraulicParams(invalidParams)).toThrow('Hiệu suất thủy lực efficiency phải nằm trong khoảng (0, 1]');
  });

  it('should validate baseline cycle config successfully', () => {
    expect(validateCycleConfig(cycleConfig)).toBe(true);
  });
});
