import type { JointAngles } from '../types/kinematics.types';

export interface Preset {
  name: string;
  label: string;
  angles: JointAngles;
}

export const presetsConfig: Preset[] = [
  {
    name: 'ready',
    label: 'Tư thế sẵn sàng',
    angles: { boom: 30, arm: 30, bucket: 0 },
  },
  {
    name: 'dig',
    label: 'Tư thế đào (Hạ gầu)',
    angles: { boom: 10, arm: 60, bucket: -20 },
  },
  {
    name: 'lift',
    label: 'Tư thế nâng cần',
    angles: { boom: 50, arm: 45, bucket: 45 },
  },
  {
    name: 'dump',
    label: 'Tư thế đổ gầu',
    angles: { boom: 40, arm: 20, bucket: -15 },
  },
];
