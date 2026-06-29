import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { selectKinematics } from '../../store/store.selectors';
import { geometryConfig } from '../../config/geometry';
import styles from './SimulationScene.module.css';

export const SimulationScene: React.FC = () => {
  const state = useSimulationStore();
  const { positions, reach, height } = selectKinematics(state);
  
  const { boomBase, boomEnd, armEnd, bucketTip } = positions;
  
  return (
    <div className={styles.sceneContainer}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Không gian mô phỏng 2D Excavator</h3>
        <span className={styles.modeBadge} data-mode={state.mode}>
          {state.mode === 'MANUAL' ? 'Manual (Tay)' : 'Auto (Chu trình)'}
        </span>
      </div>
      <div className={styles.canvasWrapper}>
        <svg className={styles.svgCanvas} viewBox="0 0 800 500">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
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
          
          {/* Excavator Mechanical Linkages */}
          {/* Boom link (Cần nâng) */}
          <line x1={boomBase.x} y1={boomBase.y} x2={boomEnd.x} y2={boomEnd.y} className={styles.boomLink} />
          
          {/* Arm link (Tay gầu) */}
          <line x1={boomEnd.x} y1={boomEnd.y} x2={armEnd.x} y2={armEnd.y} className={styles.armLink} />
          
          {/* Bucket link (Gầu xúc) */}
          <line x1={armEnd.x} y1={armEnd.y} x2={bucketTip.x} y2={bucketTip.y} className={styles.bucketLink} />
          
          {/* Joint Pivot Points */}
          <circle cx={boomBase.x} cy={boomBase.y} r="10" className={styles.pivotPoint} />
          <circle cx={boomEnd.x} cy={boomEnd.y} r="8" className={styles.pivotPoint} />
          <circle cx={armEnd.x} cy={armEnd.y} r="8" className={styles.pivotPoint} />
          
          {/* End Effector Tip */}
          <circle cx={bucketTip.x} cy={bucketTip.y} r="10" className={styles.tipPoint} />
          
          {/* SVG Overlay HUD (Tọa độ hiện thời trên màn hình) */}
          <g transform={`translate(${bucketTip.x + 15}, ${bucketTip.y - 15})`} className={styles.tipHud}>
            <rect width="90" height="35" rx="4" fill="rgba(20, 20, 25, 0.85)" stroke="#6366f1" strokeWidth="1" />
            <text x="8" y="15" fill="#a5b4fc" fontSize="10" fontWeight="bold">X: {reach.toFixed(2)}m</text>
            <text x="8" y="27" fill="#a5b4fc" fontSize="10" fontWeight="bold">Y: {height.toFixed(2)}m</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
