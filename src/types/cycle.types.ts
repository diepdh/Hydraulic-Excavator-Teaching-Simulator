import type { JointAngles } from './kinematics.types';

export type CycleStepName =
  | 'IDLE'
  | 'APPROACH'
  | 'LOWER'
  | 'SCOOP'
  | 'LIFT'
  | 'DUMP'
  | 'RETURN'
  | 'COMPLETE';

export interface CycleStepDefinition {
  name: CycleStepName;
  targetAngles: JointAngles;
  duration: number; // seconds
  description: string;
}

export interface CycleConfig {
  steps: CycleStepDefinition[];
}
