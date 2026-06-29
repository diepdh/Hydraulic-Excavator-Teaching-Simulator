import type { GeometryConfig } from '../types/kinematics.types';
import type { HydraulicParams } from '../types/hydraulics.types';
import type { CycleConfig } from '../types/cycle.types';

export function validateGeometryConfig(config: GeometryConfig): boolean {
  if (config.L_boom <= 0 || config.L_arm <= 0 || config.L_bucket <= 0) {
    throw new Error('Độ dài các khâu hình học phải lớn hơn 0');
  }
  if (config.boomAngleMin >= config.boomAngleMax) {
    throw new Error('Góc giới hạn nhỏ nhất của cần nâng phải nhỏ hơn giới hạn lớn nhất');
  }
  if (config.armAngleMin >= config.armAngleMax) {
    throw new Error('Góc giới hạn nhỏ nhất của tay gầu phải nhỏ hơn giới hạn lớn nhất');
  }
  if (config.bucketAngleMin >= config.bucketAngleMax) {
    throw new Error('Góc giới hạn nhỏ nhất của gầu xúc phải nhỏ hơn giới hạn lớn nhất');
  }
  if (config.scale <= 0) {
    throw new Error('Tỷ lệ xích scale phải lớn hơn 0');
  }
  return true;
}

export function validateHydraulicParams(config: HydraulicParams): boolean {
  if (config.p_base < 0 || config.p_relief <= config.p_base) {
    throw new Error('Tham số áp suất thủy lực không hợp lệ');
  }
  if (config.q_pump_nominal <= 0) {
    throw new Error('Năng lực bơm tối đa q_pump_nominal phải lớn hơn 0');
  }
  if (config.efficiency <= 0 || config.efficiency > 1) {
    throw new Error('Hiệu suất thủy lực efficiency phải nằm trong khoảng (0, 1]');
  }
  return true;
}

export function validateCycleConfig(config: CycleConfig): boolean {
  if (!config.steps || config.steps.length === 0) {
    throw new Error('Cấu hình chu trình không được rỗng');
  }
  const hasIdle = config.steps.some(step => step.name === 'IDLE');
  const hasComplete = config.steps.some(step => step.name === 'COMPLETE');
  if (!hasIdle || !hasComplete) {
    throw new Error('Chu trình tự động bắt buộc phải có trạng thái IDLE và COMPLETE');
  }
  return true;
}
