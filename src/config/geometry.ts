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
  
  scale: 80,         // 80 pixels = 1 meter
  baseX: 250,        // pivot x on SVG
  baseY: 350,        // pivot y on SVG
};
