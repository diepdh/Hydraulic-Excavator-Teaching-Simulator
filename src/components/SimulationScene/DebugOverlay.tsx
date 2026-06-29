import React from 'react';
import type { JointPositions } from '../../types/kinematics.types';
import type { JointAngles } from '../../store/simulationStore';

interface DebugOverlayProps {
  angles: JointAngles;
  positions: JointPositions;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  angles,
  positions,
}) => {
  const { boomBase, boomEnd, armEnd, bucketTip } = positions;
  
  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* 1. Skeleton lines (Cyan dashed lines tracing mechanical centerlines) */}
      <line
        x1={boomBase.x}
        y1={boomBase.y}
        x2={boomEnd.x}
        y2={boomEnd.y}
        stroke="#22d3ee"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <line
        x1={boomEnd.x}
        y1={boomEnd.y}
        x2={armEnd.x}
        y2={armEnd.y}
        stroke="#22d3ee"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <line
        x1={armEnd.x}
        y1={armEnd.y}
        x2={bucketTip.x}
        y2={bucketTip.y}
        stroke="#22d3ee"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      
      {/* 2. Pivot overlays and text labels */}
      {/* Boom Base */}
      <circle cx={boomBase.x} cy={boomBase.y} r="3" fill="#22d3ee" />
      <text x={boomBase.x - 15} y={boomBase.y + 15} fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
        Base({boomBase.x.toFixed(0)},{boomBase.y.toFixed(0)})
      </text>

      {/* Boom End */}
      <circle cx={boomEnd.x} cy={boomEnd.y} r="3" fill="#22d3ee" />
      <text x={boomEnd.x + 8} y={boomEnd.y - 8} fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
        J1({angles.boom.toFixed(0)}°)
      </text>

      {/* Arm End */}
      <circle cx={armEnd.x} cy={armEnd.y} r="3" fill="#22d3ee" />
      <text x={armEnd.x + 8} y={armEnd.y - 8} fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
        J2({angles.arm.toFixed(0)}°)
      </text>

      {/* Bucket Tip */}
      <circle cx={bucketTip.x} cy={bucketTip.y} r="3" fill="#22d3ee" />
      <text x={bucketTip.x + 8} y={bucketTip.y + 15} fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
        Tip({angles.bucket.toFixed(0)}°)
      </text>
    </g>
  );
};
