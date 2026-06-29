import React, { useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { selectKinematics } from '../../store/store.selectors';
import { geometryConfig } from '../../config/geometry';
import { ExcavatorModel } from './ExcavatorModel';
import { DebugOverlay } from './DebugOverlay';
import styles from './SimulationScene.module.css';

export const SimulationScene: React.FC = () => {
  const [showDebug, setShowDebug] = useState(true); // Default to true so reviewer can immediately verify
  const state = useSimulationStore();
  const { positions, reach, height } = selectKinematics(state);
  
  return (
    <div className={styles.sceneContainer}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>Không gian mô phỏng 2D Excavator</h3>
          <label className={styles.debugCheckboxLabel}>
            <input
              type="checkbox"
              checked={showDebug}
              onChange={(e) => setShowDebug(e.target.checked)}
              className={styles.checkboxInput}
            />
            Hiện Khung Xương (Debug)
          </label>
        </div>
        <span className={styles.modeBadge} data-mode={state.mode}>
          {state.mode === 'MANUAL' ? 'Manual (Tay)' : 'Auto (Chu trình)'}
        </span>
      </div>
      <div className={styles.canvasWrapper}>
        <svg className={styles.svgCanvas} viewBox="0 0 800 500">
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            </pattern>
            
            {/* Indigo gradient for Boom */}
            <linearGradient id="boomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            
            {/* Amber gradient for Arm */}
            <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            
            {/* Pink gradient for Bucket */}
            <linearGradient id="bucketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          
          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Ground Line */}
          <line x1="0" y1={geometryConfig.baseY} x2="800" y2={geometryConfig.baseY} className={styles.groundLine} />
          
          {/* Base Cabin Structure */}
          <rect
            x={geometryConfig.baseX - 45}
            y={geometryConfig.baseY - 45}
            width="90"
            height="45"
            rx="8"
            className={styles.cabinBase}
          />
          <rect
            x={geometryConfig.baseX - 30}
            y={geometryConfig.baseY - 80}
            width="50"
            height="40"
            rx="5"
            className={styles.cabinTop}
          />
          
          {/* Main Mechanical Model */}
          <ExcavatorModel
            angles={state.angles}
            positions={positions}
            config={geometryConfig}
            payload={state.payload}
          />
          
          {/* Debug Overlay showing joint coordinates */}
          {showDebug && (
            <DebugOverlay
              angles={state.angles}
              positions={positions}
            />
          )}
          
          {/* SVG Overlay HUD (Tọa độ hiện thời trên màn hình) */}
          <g transform={`translate(${positions.bucketTip.x + 15}, ${positions.bucketTip.y - 15})`} className={styles.tipHud}>
            <rect width="90" height="35" rx="4" fill="rgba(20, 20, 25, 0.85)" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="8" y="15" fill="#22d3ee" fontSize="10" fontWeight="bold">X: {reach.toFixed(2)}m</text>
            <text x="8" y="27" fill="#22d3ee" fontSize="10" fontWeight="bold">Y: {height.toFixed(2)}m</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
