import type { HydraulicParams } from '../types/hydraulics.types';

export const hydraulicParams: HydraulicParams = {
  p_base: 15 * 100000,          // 15 bar in Pascal
  p_relief: 250 * 100000,       // 250 bar in Pascal (relief pressure)
  k_p_empty: 10000,             // Pa/(kg*m) proxy constant
  k_p_payload: 15000,           // Pa/(kg*m) proxy constant for payload pressure
  mass_empty: 1200,             // 1200 kg empty linkage attachment weight
  
  area_boom: 0.015,             // m2 piston area
  area_arm: 0.012,              // m2 piston area
  area_bucket: 0.010,           // m2 piston area
  
  k_flow: 1.2,                  // scale factor
  q_pump_nominal: 0.002,        // m3/s (~120 L/min) pump capacity
  efficiency: 0.85,             // 85% hydraulic efficiency
};
