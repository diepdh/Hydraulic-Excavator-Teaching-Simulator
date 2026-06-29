import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { warningRulesConfig } from '../../config/warningRules';
import styles from './WarningPanel.module.css';

export const WarningPanel: React.FC = () => {
  const { warnings } = useSimulationStore();
  
  // Map warning codes to full warning rule definitions
  const activeWarnings = warningRulesConfig.filter((rule) => warnings.has(rule.code));
  
  return (
    <div className={styles.warningPanel}>
      <h3 className={styles.panelTitle}>Cảnh báo hệ thống</h3>
      
      {activeWarnings.length === 0 ? (
        <div className={styles.noWarning}>
          <span className={styles.successIcon}>✓</span>
          <span>Hệ thống vận hành an toàn</span>
        </div>
      ) : (
        <div className={styles.warningList}>
          {activeWarnings.map((w) => (
            <div key={w.code} className={styles.warningItem} data-severity={w.severity}>
              <span className={styles.warnIcon}>⚠</span>
              <div className={styles.warnText}>
                <span className={styles.warnCode}>{w.code}</span>
                <span className={styles.warnMsg}>{w.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
