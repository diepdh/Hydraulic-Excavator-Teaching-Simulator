import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '@/App';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useSimulationStore } from '@/store/simulationStore';

describe('Excavator Simulator Integration Flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useSimulationStore.getState().resetCycle();
    
    // Polyfill requestAnimationFrame bằng setTimeout bất đồng bộ để tránh tràn call stack
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      return setTimeout(() => {
        act(() => {
          cb(performance.now() + 2000);
        });
      }, 0);
    });
    vi.stubGlobal('cancelAnimationFrame', (id: any) => {
      clearTimeout(id);
    });
  });

  afterEach(async () => {
    vi.unstubAllGlobals();
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  });

  it('should support manual joints control and display telemetry', async () => {
    render(<App />);
    
    const sliders = screen.getAllByRole('slider');
    const boomSlider = sliders[0];
    
    await act(async () => {
      fireEvent.change(boomSlider, { target: { value: 45 } });
    });
    
    expect(useSimulationStore.getState().angles.boom).toBe(45);
  });

  it('should apply preset and animate to target poses', async () => {
    render(<App />);
    
    const digPresetBtn = screen.getByText('Tư thế đào (Hạ gầu)');
    
    await act(async () => {
      fireEvent.click(digPresetBtn);
    });
    
    expect(useSimulationStore.getState().simStatus).toBe('RUNNING');
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });
    
    expect(useSimulationStore.getState().angles.boom).toBe(10);
    expect(useSimulationStore.getState().angles.arm).toBe(60);
    expect(useSimulationStore.getState().angles.bucket).toBe(-20);
  });

  it('should trigger OVERLOAD warning when payload is high', async () => {
    render(<App />);
    
    const sliders = screen.getAllByRole('slider');
    const payloadSlider = sliders[3];
    
    await act(async () => {
      fireEvent.change(payloadSlider, { target: { value: 1800 } });
    });
    
    expect(screen.getByText('OVERLOAD')).toBeInTheDocument();
  });

  it('should run, pause, and reset automatic cycle', async () => {
    render(<App />);
    
    const startBtn = screen.getByText('Chạy Chu Trình');
    
    await act(async () => {
      fireEvent.click(startBtn);
    });
    
    expect(useSimulationStore.getState().mode).toBe('AUTOMATIC');
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    
    expect(screen.getByText('APPROACH')).toBeInTheDocument();
    
    const pauseBtn = screen.getByText('Tạm Dừng');
    await act(async () => {
      fireEvent.click(pauseBtn);
    });
    expect(useSimulationStore.getState().simStatus).toBe('PAUSED');
    
    const resetBtn = screen.getByText('Đặt Lại');
    await act(async () => {
      fireEvent.click(resetBtn);
    });
    expect(useSimulationStore.getState().mode).toBe('MANUAL');
    expect(useSimulationStore.getState().cycleStatus).toBe('IDLE');
  });
});
