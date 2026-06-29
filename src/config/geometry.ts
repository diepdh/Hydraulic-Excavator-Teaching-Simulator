import type { GeometryConfig } from '../types/kinematics.types';

export const geometryConfig: GeometryConfig = {
  L_boom: 4.0,       // m
  L_arm: 2.8,        // m
  L_bucket: 1.5,     // m
  
  boomAngleMin: -10,   // degrees
  boomAngleMax: 70,    // degrees
  armAngleMin: -10,    // degrees
  armAngleMax: 120,    // degrees
  bucketAngleMin: -30, // degrees
  bucketAngleMax: 90,  // degrees
  
  scale: 70,         // 70 pixels = 1 meter
  baseX: 200,        // pivot x on SVG (shifted left to fit reach)
  baseY: 320,        // pivot y on SVG (shifted up to fit underground scoop visibility)
};
