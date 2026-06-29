import React from 'react';
import type { JointPositions, GeometryConfig } from '../../types/kinematics.types';
import type { JointAngles } from '../../store/simulationStore';

interface ExcavatorModelProps {
  angles: JointAngles;
  positions: JointPositions;
  config: GeometryConfig;
  payload: number;
  cycleStatus?: string;
}

// Component phụ vẽ Xy lanh Thủy lực động lực học
const CylinderActuator: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  
  if (len < 1) return null;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // Chiều dài vỏ xy lanh bằng 55% tổng khoảng cách
  const barrelLen = len * 0.55;
  
  return (
    <g transform={`translate(${x1}, ${y1}) rotate(${angle})`}>
      {/* Vỏ Xy lanh (Sơn màu vàng hoặc xám đậm tùy gradient) */}
      <rect x="0" y="-8" width={barrelLen} height="16" rx="4" fill="url(#cylinderGradient)" stroke="#27272a" strokeWidth="1.2" />
      {/* Nắp đầu xy lanh */}
      <rect x={barrelLen - 3} y="-9" width="5" height="18" rx="1" fill="#3f3f46" stroke="#18181b" strokeWidth="1" />
      {/* Piston trục thép (Màu chrome sáng) */}
      <rect x={barrelLen} y="-4" width={len - barrelLen} height="8" fill="url(#pistonGradient)" stroke="#52525b" strokeWidth="0.8" />
      
      {/* Khớp xoay chốt đai đầu vỏ */}
      <circle cx="0" cy="0" r="6.5" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
      
      {/* Khớp xoay chốt đai đầu piston */}
      <circle cx={len} cy="0" r="5.5" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
      <circle cx={len} cy="0" r="2.0" fill="#ffffff" />
    </g>
  );
};

export const ExcavatorModel: React.FC<ExcavatorModelProps> = ({
  angles,
  positions,
  config,
  payload,
  cycleStatus = 'IDLE',
}) => {
  const { L_boom, L_arm, L_bucket, scale } = config;
  
  const lBoomPx = L_boom * scale;
  const lArmPx = L_arm * scale;
  const lBucketPx = L_bucket * scale;
  
  // Tính các góc tuyệt đối bằng Radian để xác định điểm neo xy lanh
  const boomRad = (angles.boom * Math.PI) / 180;
  const armAbsRad = ((angles.boom + angles.arm) * Math.PI) / 180;
  const bucketAbsRad = ((angles.boom + angles.arm + angles.bucket) * Math.PI) / 180;
  
  // 1. Tọa độ điểm neo cho Boom Cylinder
  const cyl1Base = { x: positions.boomBase.x + 35, y: positions.boomBase.y - 12 };
  const cyl1Rod = {
    x: positions.boomBase.x + 1.5 * scale * Math.cos(boomRad),
    y: positions.boomBase.y - 1.5 * scale * Math.sin(boomRad),
  };
  
  // 2. Tọa độ điểm neo cho Arm Cylinder
  const cyl2Base = {
    x: positions.boomBase.x + 2.5 * scale * Math.cos(boomRad + 0.12),
    y: positions.boomBase.y - 2.5 * scale * Math.sin(boomRad + 0.12),
  };
  const cyl2Rod = {
    x: positions.boomEnd.x + 0.65 * scale * Math.cos(armAbsRad),
    y: positions.boomEnd.y - 0.65 * scale * Math.sin(armAbsRad),
  };
  
  // 3. Tọa độ điểm neo cho Bucket Cylinder
  const cyl3Base = {
    x: positions.boomEnd.x + 1.4 * scale * Math.cos(armAbsRad + 0.08),
    y: positions.boomEnd.y - 1.4 * scale * Math.sin(armAbsRad + 0.08),
  };
  const cyl3Rod = {
    x: positions.armEnd.x + 0.42 * scale * Math.cos(bucketAbsRad + 0.45),
    y: positions.armEnd.y - 0.42 * scale * Math.sin(bucketAbsRad + 0.45),
  };

  // Xác định xem gầu có đang chứa đất dựa trên bước của chu trình tự động
  // Đất xuất hiện sau SCOOP (múc xong), giữ trong LIFT và DUMP (cho đến khi đổ)
  const showSoilInBucket = payload > 0 && (
    cycleStatus === 'LIFT' || 
    cycleStatus === 'DUMP' || 
    cycleStatus === 'SCOOP' ||
    cycleStatus === 'IDLE' // Để Manual vẫn hiện khi gán payload
  );
  
  return (
    <g>
      {/* Vẽ 3 cụm Xy lanh Thủy lực lực đẩy (Vẽ ở tầng dưới để không đè lên thanh đòn chính) */}
      <g>
        {/* Boom Cylinder (Xy lanh nâng hạ cần nâng) */}
        <CylinderActuator x1={cyl1Base.x} y1={cyl1Base.y} x2={cyl1Rod.x} y2={cyl1Rod.y} />
        
        {/* Arm Cylinder (Xy lanh duỗi gập tay gầu) */}
        <CylinderActuator x1={cyl2Base.x} y1={cyl2Base.y} x2={cyl2Rod.x} y2={cyl2Rod.y} />
        
        {/* Bucket Cylinder (Xy lanh cúp mở gầu) */}
        <CylinderActuator x1={cyl3Base.x} y1={cyl3Base.y} x2={cyl3Rod.x} y2={cyl3Rod.y} />
      </g>

      {/* --- CẤU TRÚC KHÂU KHỚP CƠ HỌC CHÍNH --- */}
      
      {/* 1. Boom Group (Cần nâng): Xoay quanh khớp vai boomBase */}
      <g transform={`translate(${positions.boomBase.x}, ${positions.boomBase.y}) rotate(${-angles.boom})`}>
        {/* Cần Boom hình hộp chữ V cong nghệ thuật */}
        <path
          d={`M 0 15 
              Q ${lBoomPx * 0.35} 55, ${lBoomPx * 0.5} 12
              L ${lBoomPx} -5 
              L ${lBoomPx - 4} -25 
              Q ${lBoomPx * 0.48} 25, 0 -20 Z`}
          fill="url(#boomGradient)"
          stroke="#78350f"
          strokeWidth="2"
        />
        
        {/* Các lỗ đục kết cấu thép giảm tải trên cần nâng */}
        <circle cx={lBoomPx * 0.38} cy="10" r="8" fill="#09090b" stroke="#78350f" strokeWidth="1" />
        <circle cx={lBoomPx * 0.65} cy="1" r="6" fill="#09090b" stroke="#78350f" strokeWidth="1" />
        
        {/* 2. Arm Group (Tay gầu): Pivot tại khớp khuỷu Boom End (lBoomPx, 0) */}
        <g transform={`translate(${lBoomPx}, 0) rotate(${-angles.arm})`}>
          {/* Tay đòn Arm dạng hộp thép thẳng thuôn đầu */}
          <path
            d={`M -5 10 
                L ${lArmPx} 7 
                L ${lArmPx - 3} -15 
                L 0 -18 Z`}
            fill="url(#armGradient)"
            stroke="#78350f"
            strokeWidth="2"
          />
          
          {/* Lỗ giảm tải trên thân tay đòn Arm */}
          <circle cx={lArmPx * 0.42} cy="-4" r="7" fill="#09090b" stroke="#78350f" strokeWidth="1" />
          <circle cx={lArmPx * 0.75} cy="-4" r="5" fill="#09090b" stroke="#78350f" strokeWidth="1" />
          
          {/* 3. Bucket Group (Gầu xúc): Pivot tại khớp cổ gầu Arm End (lArmPx, 0) */}
          <g transform={`translate(${lArmPx}, 0) rotate(${-angles.bucket})`}>
            {/* Thân gầu sắt cong khum đựng cát */}
            <path
              d={`M 0 0 
                  L ${lBucketPx * 0.65} 0 
                  C ${lBucketPx * 0.85} 0, ${lBucketPx * 0.95} ${lBucketPx * 0.4}, ${lBucketPx * 0.68} ${lBucketPx * 0.72}
                  L ${lBucketPx * 0.35} ${lBucketPx * 0.62}
                  L 0 ${lBucketPx * 0.15} Z`}
              fill="url(#bucketGradient)"
              stroke="#27272a"
              strokeWidth="2"
            />
            
            {/* Răng gầu sắc cạnh làm bằng thép đúc màu sáng */}
            <polygon points={`${lBucketPx * 0.68},${lBucketPx * 0.72} ${lBucketPx * 0.78},${lBucketPx * 0.78} ${lBucketPx * 0.66},${lBucketPx * 0.74}`} fill="#e4e4e7" stroke="#27272a" strokeWidth="0.8" />
            <polygon points={`${lBucketPx * 0.64},${lBucketPx * 0.70} ${lBucketPx * 0.74},${lBucketPx * 0.76} ${lBucketPx * 0.62},${lBucketPx * 0.72}`} fill="#e4e4e7" stroke="#27272a" strokeWidth="0.8" />
            <polygon points={`${lBucketPx * 0.60},${lBucketPx * 0.68} ${lBucketPx * 0.70},${lBucketPx * 0.74} ${lBucketPx * 0.58},${lBucketPx * 0.70}`} fill="#e4e4e7" stroke="#27272a" strokeWidth="0.8" />
            
            {/* Đất đá màu nâu nằm trong gầu khi múc */}
            {showSoilInBucket && (
              <path
                d={`M 5 5 
                    Q ${lBucketPx * 0.4} ${lBucketPx * 0.08}, ${lBucketPx * 0.6} ${lBucketPx * 0.45}
                    L ${lBucketPx * 0.25} ${lBucketPx * 0.52} Z`}
                fill="#7c2d12"
                opacity="0.9"
              />
            )}
          </g>
        </g>
      </g>

      {/* --- CÁC NỐT CHỐT BẠC XOAY CƠ HỌC (PIN JOINTS) --- */}
      <g>
        {/* Chốt vai (Boom Base) */}
        <circle cx={positions.boomBase.x} cy={positions.boomBase.y} r="7.5" fill="#18181b" stroke="#71717a" strokeWidth="2.5" />
        <circle cx={positions.boomBase.x} cy={positions.boomBase.y} r="2.5" fill="#ffffff" />
        
        {/* Chốt khuỷu (Boom-Arm connection) */}
        <circle cx={positions.boomEnd.x} cy={positions.boomEnd.y} r="6.5" fill="#18181b" stroke="#71717a" strokeWidth="2" />
        <circle cx={positions.boomEnd.x} cy={positions.boomEnd.y} r="2.0" fill="#ffffff" />
        
        {/* Chốt cổ gầu (Arm-Bucket connection) */}
        <circle cx={positions.armEnd.x} cy={positions.armEnd.y} r="5.5" fill="#18181b" stroke="#71717a" strokeWidth="2" />
        <circle cx={positions.armEnd.x} cy={positions.armEnd.y} r="1.5" fill="#ffffff" />
      </g>
    </g>
  );
};
