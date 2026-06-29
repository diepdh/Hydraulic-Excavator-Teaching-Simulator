import type { CycleConfig } from '../types/cycle.types';

export const cycleConfig: CycleConfig = {
  steps: [
    {
      name: 'IDLE',
      targetAngles: { boom: 30, arm: 30, bucket: 0 },
      duration: 0,
      description: 'Chờ ở tư thế chuẩn bị',
    },
    {
      name: 'APPROACH',
      targetAngles: { boom: 45, arm: 45, bucket: -15 },
      duration: 3.0,
      description: 'Di chuyển cần nâng và tay gầu tiếp cận vị trí đào',
    },
    {
      name: 'LOWER',
      targetAngles: { boom: 10, arm: 60, bucket: -25 },
      duration: 2.0,
      description: 'Hạ gầu tiếp xúc mặt đất',
    },
    {
      name: 'SCOOP',
      targetAngles: { boom: 15, arm: 80, bucket: 60 },
      duration: 3.5,
      description: 'Cúp gầu để xúc đầy vật liệu',
    },
    {
      name: 'LIFT',
      targetAngles: { boom: 50, arm: 40, bucket: 45 },
      duration: 3.0,
      description: 'Nâng cần lên vị trí vận chuyển',
    },
    {
      name: 'DUMP',
      targetAngles: { boom: 40, arm: 20, bucket: -15 },
      duration: 2.5,
      description: 'Mở gầu đổ vật liệu vào phễu',
    },
    {
      name: 'RETURN',
      targetAngles: { boom: 30, arm: 30, bucket: 0 },
      duration: 3.0,
      description: 'Quay về vị trí ban đầu',
    },
    {
      name: 'COMPLETE',
      targetAngles: { boom: 30, arm: 30, bucket: 0 },
      duration: 0,
      description: 'Hoàn thành chu trình xúc đổ',
    },
  ],
};
