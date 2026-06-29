import React from 'react';
import { useTelemetry } from '../../features/telemetry/useTelemetry';
import { pascalToBar, pascalToPsi, m3sToLmin, wattToKw, wattToHp } from '../../simulation/units/unitSystem';
import styles from './TelemetryPanel.module.css';

export const TelemetryPanel: React.FC = () => {
  const { reach, height, pressure, flowRate, power } = useTelemetry();
  
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
            {pascalToBar(pressure).toFixed(1)} <span className={styles.unit}>bar</span>
          </span>
          <span className={styles.metricSubValue}>
            {pascalToPsi(pressure).toFixed(0)} psi
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
            {wattToKw(power).toFixed(2)} <span className={styles.unit}>kW</span>
          </span>
          <span className={styles.metricSubValue}>
            {wattToHp(power).toFixed(1)} HP
          </span>
        </div>
      </div>
      
      {/* Model Disclosure phục vụ mục đích giáo dục giảng dạy */}
      <div className={styles.disclaimer} id="model-disclosure">
        ⚠️ <strong>Thông tin mô phỏng:</strong> Mô phỏng đơn giản hóa phục vụ mục đích giảng dạy. Không dùng cho thiết kế kỹ thuật thực tế.
      </div>
    </div>
  );
};
