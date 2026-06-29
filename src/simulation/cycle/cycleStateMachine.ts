import type { CycleStepName } from '../../types/cycle.types';
import { cycleConfig } from '../../config/cycleDefinition';

/**
 * Lấy index của bước chu trình theo tên
 */
export function getStepIndex(name: CycleStepName): number {
  return cycleConfig.steps.findIndex(s => s.name === name);
}

/**
 * Trả về tên của bước tiếp theo trong chu trình tự động
 * @param current Tên bước hiện tại
 * @returns Tên bước tiếp theo hoặc null nếu đã kết thúc chu trình
 */
export function getNextStepName(current: CycleStepName): CycleStepName | null {
  const currentIndex = getStepIndex(current);
  if (currentIndex === -1 || currentIndex >= cycleConfig.steps.length - 1) {
    return null;
  }
  return cycleConfig.steps[currentIndex + 1].name;
}

/**
 * Tính toán tiến trình tổng thể [0, 1] của chu trình xúc đổ
 * @param stepIndex Chỉ số bước hiện tại (1-based cho các bước di chuyển)
 * @param stepProgress Tiến trình của bước hiện tại [0, 1]
 * @returns Tiến trình tổng thể chuẩn hóa từ 0.0 đến 1.0
 */
export function calculateOverallProgress(stepIndex: number, stepProgress: number): number {
  const totalSteps = cycleConfig.steps.length;
  if (totalSteps <= 2) return 0;
  
  // Loại trừ bước IDLE (bước 0) và COMPLETE (bước cuối) khi tính tổng số bước di chuyển thực tế
  const activeStepsCount = totalSteps - 2;
  
  if (stepIndex <= 0) return 0.0;
  if (stepIndex >= totalSteps - 1) return 1.0;
  
  const progress = (stepIndex - 1 + stepProgress) / activeStepsCount;
  return Math.min(Math.max(progress, 0.0), 1.0);
}
