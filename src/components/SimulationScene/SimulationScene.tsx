import React, { useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { selectKinematics } from '../../store/store.selectors';
import { geometryConfig } from '../../config/geometry';
import { ExcavatorModel } from './ExcavatorModel';
import { DebugOverlay } from './DebugOverlay';
import styles from './SimulationScene.module.css';

export const SimulationScene: React.FC = () => {
  const [showDebug, setShowDebug] = useState(false);
  const state = useSimulationStore();
  const { positions, reach, height } = selectKinematics(state);
  
  const isDumping = state.cycleStatus === 'DUMP';
  
  // Tính toán khoảng dịch chuyển Y tương đối dựa trên sự thay đổi của baseY trong config
  const offsetDynamicY = geometryConfig.baseY - 380;
  
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
        <svg className={styles.svgCanvas} viewBox="0 0 950 650">
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
            
            {/* Gradient cho Cần Boom (Vàng công nghiệp) */}
            <linearGradient id="boomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            
            {/* Gradient cho Tay gầu Arm */}
            <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            
            {/* Gradient cho Gầu xúc */}
            <linearGradient id="bucketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#71717a" />
              <stop offset="50%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>

            {/* Gradient cho Vỏ Xy lanh Thủy lực (Thép đậm) */}
            <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="40%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Gradient cho Piston Chrome bóng */}
            <linearGradient id="pistonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#e4e4e7" />
              <stop offset="70%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#52525b" />
            </linearGradient>

            {/* Gradient cho Phễu đựng cát */}
            <linearGradient id="hopperGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            
            {/* Gradient cho Đống đất */}
            <radialGradient id="soilGradient" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="70%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>
          </defs>
          
          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Đường chân đất (Ground Line) */}
          <line x1="0" y1={geometryConfig.baseY} x2="950" y2={geometryConfig.baseY} className={styles.groundLine} />
          {/* Lòng đất sâu phía dưới - Đảm bảo đủ sâu 330px để nhìn thấy gầu đào */}
          <rect x="0" y={geometryConfig.baseY} width="950" height="330" fill="#1c1917" opacity="0.85" />

          {/* --- NHÓM CÁC HÌNH VẼ ĐƯỢC DỊCH CHUYỂN THEO MẶT ĐẤT ĐỘNG --- */}
          <g transform={`translate(0, ${offsetDynamicY})`}>
            {/* Đống đất (Soil pile) nhô lên và ăn sâu dưới mặt đất */}
            <g>
              <path d="M 370 380 Q 470 200 580 380 L 580 500 L 370 500 Z" fill="url(#soilGradient)" stroke="#291305" strokeWidth="2" />
              <path d="M 400 380 Q 470 240 540 380 Z" fill="rgba(251, 146, 60, 0.1)" />
              <text x="445" y="325" fill="#a1a1aa" fontSize="11" fontWeight="bold" opacity="0.6">ĐỐNG ĐẤT</text>
            </g>

            {/* Phễu chứa đất (Dump Hopper) bên phải */}
            <g>
              {/* 2 Chân phễu bằng dầm thép đặt trên mặt đất */}
              <line x1="770" y1="350" x2="770" y2="380" stroke="#3f3f46" strokeWidth="6" strokeLinecap="round" />
              <line x1="830" y1="350" x2="830" y2="380" stroke="#3f3f46" strokeWidth="6" strokeLinecap="round" />
              
              {/* Thân phễu */}
              <path d="M 720 230 L 765 350 L 835 350 L 880 230 Z" fill="url(#hopperGradient)" stroke="#1c1917" strokeWidth="2.5" />
              <path d="M 730 230 L 767 330 L 833 330 L 870 230 Z" fill="rgba(0, 0, 0, 0.2)" />
              <text x="762" y="295" fill="#e4e4e7" fontSize="11" fontWeight="bold" letterSpacing="1">DUMP HOPPER</text>
            </g>

            {/* Cát rơi từ gầu xuống phễu khi đang DUMP */}
            {isDumping && (
              <g opacity="0.85">
                <path d="M 770 200 L 765 240 L 780 240 L 775 200 Z" fill="#78350f" />
                <path d="M 785 205 L 780 250 L 795 250 L 790 205 Z" fill="#b45309" />
                <circle cx="762" cy="220" r="3.5" fill="#78350f" />
                <circle cx="778" cy="235" r="2.5" fill="#b45309" />
                <circle cx="792" cy="225" r="3.0" fill="#78350f" />
                <circle cx="770" cy="255" r="2.0" fill="#fb923c" />
                <circle cx="786" cy="260" r="2.5" fill="#b45309" />
              </g>
            )}

            {/* Cụm Bánh Xích (Crawler Tracks) */}
            <g>
              <rect x="90" y={380 - 10} width="200" height="42" rx="21" fill="#18181b" stroke="#3f3f46" strokeWidth="4" />
              <circle cx="115" cy={380 + 11} r="14" fill="#27272a" stroke="#52525b" strokeWidth="2" />
              <circle cx="150" cy={380 + 11} r="11" fill="#3f3f46" />
              <circle cx="190" cy={380 + 11} r="11" fill="#3f3f46" />
              <circle cx="230" cy={380 + 11} r="11" fill="#3f3f46" />
              <circle cx="265" cy={380 + 11} r="14" fill="#27272a" stroke="#52525b" strokeWidth="2" />
              <rect x="160" y={380 - 32} width="60" height="24" fill="#27272a" stroke="#18181b" strokeWidth="2" />
            </g>

            {/* Thân Cabin xoay máy xúc (Upper Structure) */}
            <g>
              <path d="M 75 352 L 155 352 L 160 320 L 85 315 Z" fill="#27272a" stroke="#18181b" strokeWidth="1.5" />
              <line x1="90" y1="315" x2="90" y2="270" stroke="#71717a" strokeWidth="5" strokeLinecap="round" />
              <circle cx="90" cy="255" r="6" fill="#71717a" opacity="0.3" />
              <circle cx="95" cy="245" r="9" fill="#a1a1aa" opacity="0.15" />
              <path d="M 120 355 L 245 355 L 235 305 L 140 305 Z" fill="url(#boomGradient)" stroke="#78350f" strokeWidth="2" />
              <path d="M 180 348 L 240 348 L 232 295 L 190 295 Z" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="210" y1="295" x2="210" y2="348" stroke="#38bdf8" strokeWidth="1" />
              <path d="M 195 335 L 205 335 L 205 320 Q 200 315, 195 320 Z" fill="#18181b" />
            </g>
          </g>
          
          {/* Mô hình máy xúc vẽ đè lên bệ cabin */}
          <ExcavatorModel
            angles={state.angles}
            positions={positions}
            config={geometryConfig}
            payload={state.payload}
            cycleStatus={state.cycleStatus}
          />
          
          {/* Debug Overlay */}
          {showDebug && (
            <DebugOverlay
              angles={state.angles}
              positions={positions}
            />
          )}
          
          {/* Nhãn hiển thị tọa độ đầu gầu HUD */}
          <g transform={`translate(${positions.bucketTip.x + 18}, ${positions.bucketTip.y - 18})`} className={styles.tipHud}>
            <rect width="90" height="36" rx="4" fill="rgba(20, 20, 25, 0.85)" stroke="#fb923c" strokeWidth="1.5" />
            <text x="8" y="15" fill="#fca5a5" fontSize="10" fontWeight="bold">X: {reach.toFixed(2)}m</text>
            <text x="8" y="27" fill="#fca5a5" fontSize="10" fontWeight="bold">Y: {height.toFixed(2)}m</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
