export const unitConversionsConfig = {
  // Pressure: Pascal to Bar
  paToBar: (pa: number) => pa / 100000,
  barToPa: (bar: number) => bar * 100000,
  
  // Flow rate: m3/s to L/min
  m3sToLmin: (m3s: number) => m3s * 60000,
  lminToM3s: (lmin: number) => lmin / 60000,
  
  // Power: W to kW
  wToKw: (w: number) => w / 1000,
  kwToW: (kw: number) => kw * 1000,
  
  // Angle: rad to deg
  radToDeg: (rad: number) => (rad * 180) / Math.PI,
  degToRad: (deg: number) => (deg * Math.PI) / 180,
};
