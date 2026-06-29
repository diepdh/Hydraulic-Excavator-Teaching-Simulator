import React from 'react';
import type { JointPositions, GeometryConfig } from '../../types/kinematics.types';
import type { JointAngles } from '../../store/simulationStore';

interface ExcavatorModelProps {
  angles: JointAngles;
  positions: JointPositions;
  config: GeometryConfig;
  payload: number;
}

export const ExcavatorModel: React.FC<ExcavatorModelProps> = ({
  angles,
  positions,
  config,
  payload,
}) => {
  const { L_boom, L_arm, L_bucket, scale } = config;
  
  const lBoomPx = L_boom * scale;
  const lArmPx = L_arm * scale;
  const lBucketPx = L_bucket * scale;
  
  return (
    <g>
      {/* Gradients definition inside local g if needed, but it is better to define in main SVG defs */}
      
      {/* 1. Boom Group (Cần nâng): Pivot tại boomBase */}
      <g transform={`translate(${positions.boomBase.x}, ${positions.boomBase.y}) rotate(${-angles.boom})`}>
        {/* Boom structure drawing */}
        <path
          d={`M 0 5 
              L ${lBoomPx * 0.4} 20 
              L ${lBoomPx} 0 
              L ${lBoomPx - 10} -25 
              L ${lBoomPx * 0.3} -35 
              L 0 -15 Z`}
          fill="url(#boomGradient)"
          stroke="#4f46e5"
          strokeWidth="1.5"
        />
        
        {/* Decorative mechanical joints inside boom */}
        <circle cx={lBoomPx * 0.3} cy="-10" r="4" fill="rgba(255,255,255,0.2)" />
        <circle cx={lBoomPx * 0.7} cy="-5" r="4" fill="rgba(255,255,255,0.2)" />
        
        {/* 2. Arm Group (Tay gầu): Pivot tại Boom End (lBoomPx, 0) */}
        <g transform={`translate(${lBoomPx}, 0) rotate(${-angles.arm})`}>
          {/* Arm structure drawing */}
          <path
            d={`M -5 8 
                L ${lArmPx} 5 
                L ${lArmPx - 5} -12 
                L 0 -18 Z`}
            fill="url(#armGradient)"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          
          {/* Decorative holes inside arm */}
          <circle cx={lArmPx * 0.5} cy="-3" r="3" fill="#09090b" />
          
          {/* 3. Bucket Group (Gầu xúc): Pivot tại Arm End (lArmPx, 0) */}
          <g transform={`translate(${lArmPx}, 0) rotate(${-angles.bucket})`}>
            {/* Gầu xúc cơ khí */}
            <path
              d={`M 0 0 
                  L ${lBucketPx * 0.7} 0 
                  C ${lBucketPx * 0.9} 0, ${lBucketPx} ${lBucketPx * 0.4}, ${lBucketPx * 0.7} ${lBucketPx * 0.7}
                  L ${lBucketPx * 0.5} ${lBucketPx * 0.7}
                  L 0 ${lBucketPx * 0.2} Z`}
              fill="url(#bucketGradient)"
              stroke="#db2777"
              strokeWidth="1.5"
            />
            
            {/* Răng gầu xúc (Bucket Teeth) */}
            <line x1={lBucketPx * 0.7} y1={lBucketPx * 0.7} x2={lBucketPx * 0.78} y2={lBucketPx * 0.78} stroke="#f4f4f5" strokeWidth="3" strokeLinecap="round" />
            <line x1={lBucketPx * 0.65} y1={lBucketPx * 0.69} x2={lBucketPx * 0.73} y2={lBucketPx * 0.77} stroke="#f4f4f5" strokeWidth="3" strokeLinecap="round" />
            
            {/* Hiển thị tải trọng đất đá trong gầu */}
            {payload > 0 && (
              <path
                d={`M 5 5 
                    Q ${lBucketPx * 0.4} ${lBucketPx * 0.1}, ${lBucketPx * 0.55} ${lBucketPx * 0.4}
                    L ${lBucketPx * 0.2} ${lBucketPx * 0.4} Z`}
                fill="#78350f"
                fillOpacity="0.9"
              />
            )}
          </g>
        </g>
      </g>
    </g>
  );
};
