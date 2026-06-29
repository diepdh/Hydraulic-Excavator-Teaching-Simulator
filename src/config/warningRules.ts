export interface WarningRule {
  code: string;
  message: string;
  severity: 'warning' | 'critical';
}

export const warningRulesConfig: WarningRule[] = [
  {
    code: 'BOOM_LIMIT',
    message: 'Cần nâng chạm giới hạn hành trình cơ học',
    severity: 'warning',
  },
  {
    code: 'ARM_LIMIT',
    message: 'Tay gầu chạm giới hạn hành trình cơ học',
    severity: 'warning',
  },
  {
    code: 'BUCKET_LIMIT',
    message: 'Gầu xúc chạm giới hạn hành trình cơ học',
    severity: 'warning',
  },
  {
    code: 'RELIEF_ACTIVE',
    message: 'Áp suất hệ thống chạm giới hạn van an toàn (Bơm bị xả tràn)',
    severity: 'warning',
  },
  {
    code: 'OVERLOAD',
    message: 'Quá tải thủy lực nghiêm trọng (Payload quá lớn so với góc duỗi cần)',
    severity: 'critical',
  },
];
