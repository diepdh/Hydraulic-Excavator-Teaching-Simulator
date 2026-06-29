export interface HydraulicTelemetry {
  pressure: number;  // Pa
  flowRate: number;  // m3/s
  power: number;     // W
}

export interface HydraulicParams {
  p_base: number;               // Pa, standby pressure
  p_relief: number;             // Pa, relief valve setting
  k_p_empty: number;            // Pa/(kg*m) proxy constant for empty boom arm
  k_p_payload: number;          // Pa/(kg*m) proxy constant for payload
  mass_empty: number;           // kg, empty bucket and attachment mass
  
  // Effective cylinder piston areas (m2)
  area_boom: number;
  area_arm: number;
  area_bucket: number;
  
  k_flow: number;               // Flow scaling factor
  q_pump_nominal: number;       // m3/s, nominal pump flow rate
  efficiency: number;           // efficiency factor (0..1)
}
