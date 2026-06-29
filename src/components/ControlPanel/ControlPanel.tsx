import React from 'react';
import { useManualControl } from '../../features/manual-control/useManualControl';
import { useSimulationStore } from '../../store/simulationStore';
import { presetsConfig } from '../../config/presets';
import { geometryConfig } from '../../config/geometry';
import styles from './ControlPanel.module.css';

export const ControlPanel: React.FC = () => {
  const {
    angles,
    payload,
    throttle,
    mode,
    simStatus,
    setJointAngle,
    setPayload,
    setThrottle,
    applyPreset,
  } = useManualControl();
  
  // Read other state from store
  const cycleStatus = useSimulationStore((state) => state.cycleStatus);
  const startCycle = useSimulationStore((state) => state.startCycle);
  const pauseCycle = useSimulationStore((state) => state.pauseCycle);
  const resumeCycle = useSimulationStore((state) => state.resumeCycle);
  const resetCycle = useSimulationStore((state) => state.resetCycle);
  
  return (
    <div className={styles.controlPanel}>
      <h3 className={styles.panelTitle}>Bảng điều khiển</h3>
      
      {/* Section 1: Joint Angles manual control */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Cơ cấu công tác (Góc khớp)</h4>
        
        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span>Cần nâng (Boom)</span>
            <span className={styles.valIndicator}>{angles.boom.toFixed(0)}°</span>
          </div>
          <input
            type="range"
            min={geometryConfig.boomAngleMin}
            max={geometryConfig.boomAngleMax}
            value={angles.boom}
            onChange={(e) => setJointAngle('boom', Number(e.target.value))}
            disabled={mode === 'AUTOMATIC'}
            className={styles.slider}
          />
        </div>
        
        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span>Tay gầu (Arm)</span>
            <span className={styles.valIndicator}>{angles.arm.toFixed(0)}°</span>
          </div>
          <input
            type="range"
            min={geometryConfig.armAngleMin}
            max={geometryConfig.armAngleMax}
            value={angles.arm}
            onChange={(e) => setJointAngle('arm', Number(e.target.value))}
            disabled={mode === 'AUTOMATIC'}
            className={styles.slider}
          />
        </div>
        
        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span>Gầu xúc (Bucket)</span>
            <span className={styles.valIndicator}>{angles.bucket.toFixed(0)}°</span>
          </div>
          <input
            type="range"
            min={geometryConfig.bucketAngleMin}
            max={geometryConfig.bucketAngleMax}
            value={angles.bucket}
            onChange={(e) => setJointAngle('bucket', Number(e.target.value))}
            disabled={mode === 'AUTOMATIC'}
            className={styles.slider}
          />
        </div>
      </div>
      
      {/* Section 2: Hydraulics & Payload */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Tham số vận hành</h4>
        
        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span>Tải trọng gầu (Payload)</span>
            <span className={styles.valIndicator}>{payload.toFixed(0)} kg</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={payload}
            onChange={(e) => setPayload(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
        
        <div className={styles.controlGroup}>
          <div className={styles.labelRow}>
            <span>Tay ga động cơ (Throttle)</span>
            <span className={styles.valIndicator}>{(throttle * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={throttle}
            onChange={(e) => setThrottle(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>
      
      {/* Section 3: Presets */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Tư thế đặt trước (Presets)</h4>
        <div className={styles.btnGrid}>
          {presetsConfig.map((p) => (
            <button
              key={p.name}
              className={styles.btnPreset}
              onClick={() => applyPreset(p.angles)}
              disabled={mode === 'AUTOMATIC'}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Section 4: Automatic Cycle controls */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Chu trình tự động</h4>
        
        <div className={styles.cycleStatusWrapper}>
          <span className={styles.statusLabel}>Bước hiện thời:</span>
          <span className={styles.statusValue} data-status={cycleStatus}>
            {cycleStatus}
          </span>
        </div>
        
        <div className={styles.btnGrid}>
          {simStatus === 'IDLE' && (
            <button className={styles.btnStart} onClick={startCycle}>
              Chạy Chu Trình
            </button>
          )}
          
          {simStatus === 'RUNNING' && (
            <button className={styles.btnPause} onClick={pauseCycle}>
              Tạm Dừng
            </button>
          )}
          
          {simStatus === 'PAUSED' && (
            <button className={styles.btnResume} onClick={resumeCycle}>
              Tiếp Tục
            </button>
          )}
          
          <button className={styles.btnReset} onClick={resetCycle}>
            Đặt Lại
          </button>
        </div>
      </div>
    </div>
  );
};
