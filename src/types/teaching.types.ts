export interface TaskCondition {
  type: 'ANGLE_REACHED' | 'POSITION_REACHED' | 'PRESSURE_LIMIT' | 'CYCLE_COMPLETED';
  params: Record<string, any>;
}

export interface TeachingTask {
  id: string;
  title: string;
  description: string;
  conditions: TaskCondition[];
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  initialAngles: { boom: number; arm: number; bucket: number };
  initialPayload: number;
  initialThrottle: number;
  tasks: TeachingTask[];
}
