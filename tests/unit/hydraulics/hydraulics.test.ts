import { describe, it, expect } from 'vitest';
import { calculatePressure } from '../../../src/simulation/hydraulics/pressureModel';
import { calculateFlowRate } from '../../../src/simulation/hydraulics/flowModel';
import { calculatePower } from '../../../src/simulation/hydraulics/powerModel';
import { pascalToBar, pascalToPsi, m3sToLmin, wattToKw, wattToHp } from '../../../src/simulation/units/unitSystem';
import { useSimulationStore } from '../../../src/store/simulationStore';

describe('Hydraulic Unit Conversions', () => {
  it('should convert Pascal to Bar correctly (1 bar = 10^5 Pa)', () => {
    expect(pascalToBar(100000)).toBe(1.0);
    expect(pascalToBar(25000000)).toBe(250.0);
  });

  it('should convert Pascal to PSI correctly (1 PSI ≈ 6894.76 Pa)', () => {
    expect(pascalToPsi(100000)).toBeCloseTo(14.50377, 4);
  });

  it('should convert Flow Rate from m3/s to L/min correctly', () => {
    expect(m3sToLmin(0.00166667)).toBeCloseTo(100.0, 3);
  });

  it('should convert Power from Watt to kW and HP correctly', () => {
    expect(wattToKw(50000)).toBe(50.0);
    expect(wattToHp(745.7)).toBeCloseTo(1.0, 2);
  });
});

describe('Hydraulic Physical Monotonicity', () => {
  it('should guarantee pressure increases as payload increases', () => {
    const pLow = calculatePressure(100, 30);
    const pHigh = calculatePressure(1000, 30);
    expect(pHigh).toBeGreaterThan(pLow);
  });

  it('should guarantee pressure increases as boom angle decreases (Lever arm effect)', () => {
    const pHighReach = calculatePressure(500, 15); // Hạ thấp cần nâng
    const pLowReach = calculatePressure(500, 60);  // Nâng cao cần nâng
    expect(pHighReach).toBeGreaterThan(pLowReach);
  });

  it('should guarantee flow rate increases as throttle increases', () => {
    const qLow = calculateFlowRate(0.2);
    const qHigh = calculateFlowRate(0.8);
    expect(qHigh).toBeGreaterThan(qLow);
  });

  it('should calculate power consistently (P = p * Q)', () => {
    const p = 15000000; // 150 bar
    const q = 0.0015;    // 90 L/min
    const power = calculatePower(p, q);
    expect(power).toBe(22500); // 22.5 kW
  });
});

describe('Hydraulic Warning Logic', () => {
  it('should trigger OVERLOAD warning when payload is exceeded', () => {
    const store = useSimulationStore.getState();
    store.resetCycle();
    
    // Đặt tải trọng an toàn
    store.setPayload(500);
    expect(useSimulationStore.getState().warnings.has('OVERLOAD')).toBe(false);
    
    // Đặt tải quá mức định mức (1600kg)
    store.setPayload(1800);
    expect(useSimulationStore.getState().warnings.has('OVERLOAD')).toBe(true);
  });

  it('should trigger RELIEF_ACTIVE warning when system pressure hits relief valve pressure', () => {
    const store = useSimulationStore.getState();
    store.resetCycle();
    
    // Ở tư thế boom xoài ra xa (góc boom thấp nhất -10) mang tải nặng cực lớn -> Áp suất thô vượt quá 250 bar
    store.setJointAngle('boom', -10);
    store.setPayload(3000);
    
    const state = useSimulationStore.getState();
    expect(state.warnings.has('RELIEF_ACTIVE')).toBe(true);
  });
});
