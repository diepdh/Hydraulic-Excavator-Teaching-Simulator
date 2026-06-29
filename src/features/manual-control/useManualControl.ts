import { useSimulationStore } from '../../store/simulationStore';
import type { JointAngles } from '../../store/simulationStore';

/**
 * Custom Hook đóng gói các phương thức tương tác điều khiển thủ công máy xúc
 * Tách biệt mối quan tâm giữa React UI Layer và Zustand Store Actions
 */
export function useManualControl() {
  const store = useSimulationStore();
  
  const updateAngle = (joint: 'boom' | 'arm' | 'bucket', val: number) => {
    // Nếu đang chạy animation, dừng lại để cho phép can thiệp bằng tay
    if (store.simStatus === 'RUNNING' && store.mode === 'MANUAL') {
      store.stopAnimation();
    }
    store.setJointAngle(joint, val);
  };

  const applyPreset = (targetAngles: JointAngles) => {
    // Kích hoạt nội suy chuyển động mượt mà trong 800ms
    store.animateToAngles(targetAngles, 800);
  };
  
  return {
    angles: store.angles,
    payload: store.payload,
    throttle: store.throttle,
    mode: store.mode,
    simStatus: store.simStatus,
    setJointAngle: updateAngle,
    setPayload: store.setPayload,
    setThrottle: store.setThrottle,
    applyPreset,
    stopAnimation: store.stopAnimation,
  };
}
export type { JointAngles };
