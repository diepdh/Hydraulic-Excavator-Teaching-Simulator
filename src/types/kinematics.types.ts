import type { Point2D } from './simulation.types';

export interface JointAngles {
  boom: number;   // degrees
  arm: number;    // degrees
  bucket: number; // degrees
}

export interface JointPositions {
  boomBase: Point2D;
  boomEnd: Point2D;
  armEnd: Point2D;
  bucketPivot: Point2D;
  bucketTip: Point2D;
}

export interface KinematicTelemetry {
  reach: number;  // m
  height: number; // m
}

export interface GeometryConfig {
  L_boom: number;     // m
  L_arm: number;      // m
  L_bucket: number;   // m (armEnd to bucketTip)
  
  boomAngleMin: number;   // degrees
  boomAngleMax: number;   // degrees
  armAngleMin: number;    // degrees
  armAngleMax: number;    // degrees
  bucketAngleMin: number; // degrees
  bucketAngleMax: number; // degrees
  
  scale: number;          // pixels per meter
  baseX: number;          // SVG x of boom base pivot
  baseY: number;          // SVG y of boom base pivot
}
