import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { selectKinematics, selectHydraulics } from '../../store/store.selectors';
import { unitConversionsConfig } from '../../config/unitConversions';
import styles from './TelemetryPanel.module.css';

export const TelemetryPanel: React.FC = () => {
  const state = useSimulationStore();
  const { reach, height } = selectKinematics(state);
  const { pressure, flowRate, power } = selectHydraulics(state);
  
  const { paToBar, m3sToLmin, wToKw } = unitConversionsConfig;
  
  return (
    <div className={styles.telemetryPanel}>
      <h3 className={styles.panelTitle}>Thông số Telemetry</h3>
      
      <div className={styles.metricsGrid}>
        {/* Metric 1: Reach */}
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Tầm với (Reach)</span>
          <span className={styles.metricValue}>
            {reach.toFixed(2)} <span className={styles.unit}>m</span>
          </span>
        </div>
        
        {/* Metric 2: Height */}
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Cao độ (Height)</span>
          <span className={styles.metricValue}>
            {height.toFixed(2)} <span className={styles.unit}>m</span>
          </span>
        </div>
        
        {/* Metric 3: Pressure */}
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Áp suất thủy lực</span>
          <span className={styles.metricValue}>
            {paToBar(pressure).toFixed(1)} <span className={styles.unit}>bar</span>
          </span>
        </div>
        
        {/* Metric 4: Flow Rate */}
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Lưu lượng dầu</span>
          <span className={styles.metricValue}>
            {m3sToLmin(flowRate).toFixed(1)} <span className={styles.unit}>L/min</span>
          </span>
        </div>
        
        {/* Metric 5: Hydraulic Power */}
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Công suất thủy lực</span>
          <span className={styles.metricValue}>
            {wToKw(power).toFixed(2)} <span className={styles.unit}>kW</span>
          </span>
        </div>
      </div>
      
      <div className={styles.disclaimer}>
        * Lưu ý: Mô hình thủy lực đã được đơn giản hóa quasi-static để phục vụ giảng dạy lý thuyết.
      </div>
    </div>
  );
};
