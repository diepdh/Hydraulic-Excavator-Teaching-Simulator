# BLUEPRINT.md
# Kiến Trúc Tổng Thể — Hydraulic Excavator Teaching Simulator
# Version: 1.0 — 2026-06-27

---

## Phân loại bài toán & rủi ro kỹ thuật

### Loại dự án

**Hybrid** (Simulation + Web Application + Teaching Platform)

- **Domain chính**: Numerical Simulation (Kinematic + Hydraulic Approximation)
- **Domain phụ**: Web Application (React SPA), Teaching Platform

### Độ phức tạp

**Complex — 6+ modules, multi-concern:**

```
Simulation Core (Kinematics + Hydraulics)
→ State Machine (Automatic Cycle)
→ Animation Engine
→ React UI Layer
→ Teaching Layer (Phase 9)
```

### Điểm rủi ro kỹ thuật

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| R1 — Nhầm quy ước góc gây mô hình quay sai | CAO | Chốt rõ hệ tọa độ, chiều dương, góc zero trong blueprint; test tính tay |
| R2 — Animation không xác định (phụ thuộc frame rate) | CAO | Dùng elapsed-time-based interpolation, không frame-count-based |
| R3 — Pause/resume gây nhảy trạng thái | CAO | Clock tách biệt wall/anim/sim time; pause ghi timestamp, resume offset |
| R4 — Coupling chặt giữa UI và simulation core | TRUNG BÌNH | Quy tắc dependency direction cứng: UI → Store → Domain |
| R5 — Telemetry là số trang trí, không có quan hệ vật lý | TRUNG BÌNH | Mọi công thức phải ghi rõ, gắn nhãn "mô hình đơn giản hóa" |
| R6 — Config không validate gây crash im lặng | TRUNG BÌNH | Schema validation tại load-time, error boundary rõ |
| R7 — SVG transform origin sai khiến khớp bị tách | TRUNG BÌNH | Mỗi khâu có transform origin tường minh; debug overlay bắt buộc |
| R8 — Race condition khi manual + auto đồng thời | TRUNG BÌNH | Mutex/ownership rõ: 1 controller sở hữu animation tại 1 thời điểm |

---

## Module Map

### Sơ đồ tổng thể

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        REACT UI LAYER                                        │
│  ┌──────────────────┐  ┌─────────────────┐  ┌──────────────────────────────┐│
│  │  SimulationScene │  │  ControlPanel   │  │  TelemetryPanel / Warnings  ││
│  │  (SVG canvas)    │  │  (Sliders, Mode,│  │  (Reach, Height, P, Q, Pow) ││
│  │                  │  │   Preset, Cycle)│  │                              ││
│  └────────┬─────────┘  └───────┬─────────┘  └──────────────┬───────────────┘│
└───────────┼─────────────────────┼─────────────────────────────┼──────────────┘
            │   Read store        │   Dispatch actions          │ Read store
            ▼                     ▼                             ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       ZUSTAND STORE (Application State)                      │
│   SimulationState | ControlState | CycleState | TelemetryState | UIState     │
│   WarningState | TeachingState (placeholder)                                 │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │ Derived / dispatched
          ┌─────────────────────┼──────────────────────┐
          ▼                     ▼                      ▼
┌─────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ KinematicsEngine│  │ AnimationController  │  │ HydraulicsModel      │
│ (pure functions)│  │ (RAF, clock, lerp)   │  │ (quasi-static, pure) │
└────────┬────────┘  └──────────┬───────────┘  └──────────┬───────────┘
         │                      │                          │
         ▼                      ▼                          │
┌─────────────────┐  ┌──────────────────────┐             │
│ CycleStateMachine│ │  InterpolationEngine │             │
│ (finite automaton│ │  (linear/ease)       │             │
│  config-driven) │  └──────────────────────┘             │
└─────────────────┘                                        │
         │                                                 │
         ▼                                                 ▼
┌────────────────────────────────────────────────────────────────┐
│                    CONFIG LAYER (read-only)                     │
│  geometry.ts | cycleDefinition.ts | hydraulicParams.ts         │
│  presets.ts  | unitConversions.ts | warningRules.ts            │
└────────────────────────────────────────────────────────────────┘
```

### Danh sách module và trách nhiệm

| Module | Trách nhiệm | Input | Output | Phụ thuộc |
|---|---|---|---|---|
| `KinematicsEngine` | Tính vị trí tất cả khớp & đầu gầu từ góc | geometry config, 3 góc khớp | jointPositions, bucketTip, reach, height | Config only |
| `HydraulicsModel` | Tính áp suất, lưu lượng, công suất (quasi-static) | jointAngles, angularSpeeds, payload, throttle | pressure, flowRate, power, overloadFlag | Config, UnitSystem |
| `AnimationController` | Quản lý vòng lặp RAF, clock, lerp, pause/resume | target angles, duration | currentAngles (callback), onComplete | InterpolationEngine |
| `InterpolationEngine` | Nội suy tuyến tính / ease-in-out giữa hai tập góc | startAngles, endAngles, t∈[0,1] | currentAngles | Không có |
| `CycleStateMachine` | Finite automaton điều khiển automatic cycle | events (START/PAUSE/RESUME/RESET/STEP_COMPLETE) | currentStep, status, targetAngles | CycleDefinition config |
| `ConstraintsEngine` | Clamp góc, kiểm tra joint limit, phát warning event | rawAngles | clampedAngles, warningSet | GeometryConfig |
| `UnitSystem` | Chuyển đổi đơn vị nội bộ ↔ hiển thị | SI value, unit | display string | Không có |
| `ZustandStore` | Application state, actions, selectors | User events, engine callbacks | Reactive state for UI | Engine modules |
| `SimulationScene` | Render SVG máy xúc, đọc jointPositions từ store | Store state | SVG output | KinematicsEngine (qua store) |
| `ControlPanel` | Render slider, button, mode switch | User interaction | Dispatch to store | Store |
| `TelemetryPanel` | Hiển thị reach, height, P, Q, Power | Store telemetry state | Display | Store |
| `ConfigLoader` | Parse và validate file config khi khởi động | JSON/TS config files | Typed config objects; hoặc ConfigError | Không có |
| `TeachingLayer` | Placeholder Phase 9: task engine, lesson schema | lessonConfig, store state | taskStatus, guidanceText | Store |

---

## Data Flow & Schema

### Luồng dữ liệu chính — Manual Control

```
User drags slider
    → ControlPanel dispatches { type: 'SET_BOOM_ANGLE', value: θ }
    → ZustandStore: rawAngles updated
    → ConstraintsEngine: clamp(rawAngles) → clampedAngles, warnings
    → Store: simulationState.angles = clampedAngles
    → Store: warningState updated
    → KinematicsEngine: fk(geometry, clampedAngles) → jointPositions, reach, height
    → Store: telemetryState.kinematic updated
    → HydraulicsModel: h(angles, speeds=0, payload, throttle) → P, Q, Power
    → Store: telemetryState.hydraulic updated
    → React re-render: SimulationScene (SVG), TelemetryPanel, WarningPanel
```

### Luồng dữ liệu chính — Automatic Cycle

```
User clicks START
    → Store dispatches CYCLE_START
    → CycleStateMachine: IDLE → APPROACH (fetches step target angles from config)
    → AnimationController.start(currentAngles, targetAngles, duration)
    → RAF loop ticks every frame:
        elapsed = now - startTime
        t = clamp(elapsed / duration, 0, 1)
        currentAngles = interpolate(startAngles, targetAngles, ease(t))
        Store updates angles → FK re-computes → UI updates
    → On complete: AnimationController fires STEP_COMPLETE event
    → CycleStateMachine transitions to next step
    → Repeat until COMPLETE state
```

### State Schema (Zustand store)

```typescript
// Tham chiếu thiết kế — không phải code thực thi
interface AppState {
  // --- Simulation ---
  angles: {
    boom: number;   // degrees, trong [boomMin, boomMax]
    arm: number;    // degrees, trong [armMin, armMax]
    bucket: number; // degrees, trong [bucketMin, bucketMax]
  };

  // --- Derived kinematics (tính mỗi frame, không lưu persistent) ---
  jointPositions: {
    boomBase: Point2D;
    boomEnd: Point2D;
    armEnd: Point2D;
    bucketPivot: Point2D;
    bucketTip: Point2D;
  };
  reach: number;    // m
  height: number;   // m

  // --- Hydraulics ---
  pressure: number;   // Pa internally, bar in UI
  flowRate: number;   // m³/s internally, L/min in UI
  power: number;      // W internally, kW in UI

  // --- Control inputs ---
  payload: number;    // kg
  throttle: number;   // 0..1 (normalized)
  mode: 'MANUAL' | 'AUTOMATIC';

  // --- Cycle ---
  cycleStatus: 'IDLE' | 'APPROACH' | 'LOWER' | 'SCOOP' | 'LIFT' | 'DUMP' | 'RETURN' | 'COMPLETE' | 'ERROR';
  cycleStep: number;   // 0-based index
  cycleProgress: number; // 0..1 (overall)
  stepProgress: number;  // 0..1 (current step)

  // --- Warnings ---
  warnings: Set<WarningCode>;
  // WarningCode: 'BOOM_LIMIT' | 'ARM_LIMIT' | 'BUCKET_LIMIT' | 'OVERLOAD' | 'RELIEF_ACTIVE' | 'PRESSURE_HIGH'

  // --- UI ---
  simStatus: 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETE';

  // --- Teaching (placeholder Phase 9) ---
  activeLesson: string | null;
  taskResults: TaskResult[];
}

interface Point2D { x: number; y: number; }
```

---

## Tech Stack Decisions

### TD-001 — React + TypeScript + Vite

**Lựa chọn:** React 18, TypeScript 5 strict, Vite 5.

**Lý do:**
- React: component model phù hợp với state-reactive rendering.
- TypeScript strict: bắt lỗi type tại compile time, đặc biệt quan trọng cho simulation interfaces.
- Vite: dev server nhanh, build nhẹ, không cần backend.

---

### TD-002 — SVG cho Rendering

**Lựa chọn:** SVG inline trong React (không dùng Canvas, không dùng Three.js).

**Lý do:**
- 2D planar model — SVG đủ mạnh, không cần canvas API.
- SVG transform (`rotate`, `translate`) ánh xạ trực tiếp lên kinematic model.
- Dễ debug (inspect DOM), dễ test visual.
- Canvas sẽ cần thêm abstraction layer không cần thiết cho MVP.

---

### TD-003 — Zustand cho State Management

**Lựa chọn:** Zustand (không dùng Redux, không dùng Context + useReducer thuần).

**Lý do:**
- Zustand không yêu cầu Provider wrapper khắp app.
- Selector đơn giản, tránh re-render không cần thiết.
- Nhẹ, không boilerplate.
- Phù hợp với pattern: simulation engines cập nhật store qua callback, UI subscribe từng slice.

---

### TD-004 — CSS Modules (không dùng Tailwind cho MVP)

**Lựa chọn:** CSS Modules với design tokens trong `:root` CSS variables.

**Lý do:**
- Scoped styles, không clash.
- Design tokens (màu, spacing, font) ở một chỗ → dễ chỉnh theme.
- Không cần Tailwind build pipeline; giữ dependency tối thiểu.
- Có thể migrate sang Tailwind sau mà không ảnh hưởng logic.

*Lưu ý: nếu Chủ dự án muốn đổi sang Tailwind sau khi xem layout → cần Architecture Review.*

---

### TD-005 — Mô hình thủy lực quasi-static đơn giản hóa

**Lựa chọn:** Quasi-static, pure function, không ODE, không CFD.

**Công thức nền tảng:**
```
F_cylinder = p × A_piston
Q_cylinder = A_piston × v_piston
P_hydraulic = p × Q (tổng các xy lanh đang chuyển động)
```

**Ánh xạ input:**
- `payload` → lực tải → F_demand → p = F / A
- `angularSpeed` → vận tốc tịnh tiến xy lanh (qua jacobian đơn giản) → Q
- `throttle` → nhân tỷ lệ Q khả dụng
- `relief_pressure` → clamp p (phát cảnh báo RELIEF_ACTIVE khi chạm)

**Nhãn minh bạch bắt buộc:** "Mô hình đơn giản hóa giáo dục — Không dùng cho thiết kế hoặc vận hành máy thật."

---

### TD-006 — Interpolation Engine (ease-in-out)

**Lựa chọn:** Cubic ease-in-out (smoothstep) cho mọi preset và cycle animation.

**Lý do:**
- Chuyển động tự nhiên hơn linear, phù hợp với thiết bị cơ khí.
- Đơn giản hơn spring physics, đủ cho MVP.
- Deterministic (không phụ thuộc frame rate khi dùng elapsed time).

**Công thức:** `t_smooth = t² × (3 - 2t)` với `t = elapsed / duration`.

---

### TD-007 — Clock Architecture

**Phân biệt 3 loại thời gian:**

| Loại | Mô tả | Xử lý khi Pause |
|---|---|---|
| **Wall clock** | `performance.now()` thực tế | Tiếp tục chạy |
| **Animation time** | Thời gian hiệu chỉnh trong animation | Dừng; lưu `pauseTimestamp` |
| **Simulation time** | Thời gian logic mô phỏng | Dừng; offset khi resume |

**Công thức resume:**
```
animationTime = wallClock - sum(allPausedDurations)
```

---

## Hệ Tọa Độ & Quy Ước Hình Học

### Hệ tọa độ vật lý

```
Y↑
│
│
└──────► X
```

- **Gốc (0, 0)**: Tâm xoay Boom trên thân máy (tính toán, không nhất thiết là góc SVG).
- **X**: Dương về phía trước máy (hướng cần nâng duỗi ra).
- **Y**: Dương lên trên.
- **Góc**: Đo từ trục X dương, chiều dương **ngược chiều kim đồng hồ** (convention toán học chuẩn).
- **Đơn vị góc**: Lưu và tính bằng **radian** trong engine; hiển thị UI bằng **degree**.

### Góc zero từng khâu

| Khâu | Góc zero (reference) |
|---|---|
| Boom | 0° = boom nằm ngang (song song X), dương là nâng lên |
| Arm | 0° = arm duỗi thẳng dọc theo boom, dương là gập vào |
| Bucket | 0° = bucket duỗi thẳng dọc arm, dương là cúp xuống |

*Chú thích: Quy ước này phải được test bằng bộ góc kiểm chứng tính tay trước khi implement.*

### Thông số hình học (giá trị ví dụ — cần calibrate theo asset SVG)

```typescript
// Config mẫu — BẮT BUỘC được overide bởi geometry.ts
const GEOMETRY_DEFAULTS = {
  L_boom: 4.0,     // m — chiều dài khâu Boom
  L_arm: 2.8,      // m — chiều dài khâu Arm
  L_bucket: 1.5,   // m — chiều dài khâu Bucket (tới tip)

  boomAngleMin: -10,   // degrees
  boomAngleMax: 70,    // degrees
  armAngleMin: -10,    // degrees
  armAngleMax: 120,    // degrees
  bucketAngleMin: -30, // degrees
  bucketAngleMax: 90,  // degrees

  scale: 80,           // pixels per meter (SVG scale factor)
  baseX: 250,          // px — SVG x của boom pivot (để transform về screen coords)
  baseY: 300,          // px — SVG y của boom pivot
};
```

### Forward Kinematics (công thức tham chiếu)

```
boomEnd.x = baseX + L_boom × cos(θ_boom)
boomEnd.y = baseY - L_boom × sin(θ_boom)   // Y inverted vì SVG y-down

armEnd.x = boomEnd.x + L_arm × cos(θ_boom + θ_arm)
armEnd.y = boomEnd.y - L_arm × sin(θ_boom + θ_arm)

bucketTip.x = armEnd.x + L_bucket × cos(θ_boom + θ_arm + θ_bucket)
bucketTip.y = armEnd.y - L_bucket × sin(θ_boom + θ_arm + θ_bucket)

reach  = bucketTip.x - baseX                 // m (physical units sau khi /scale)
height = -(bucketTip.y - baseY) / scale      // m (ngược Y)
```

*Chú ý: Hệ SVG có Y tăng xuống dưới. Công thức trên đã tính offset.*

---

## Cấu trúc Thư mục Dự án

```text
excavator-simulator/
├── goal.md
├── plan.md
├── BLUEPRINT.md
├── CONTRACT.md
├── BUILD_PLAN.md
├── GATE_*.md
├── BUILD_LOG.md
├── REVIEW_REPORT.md
├── README.md
│
├── docs/
│   ├── blueprint/
│   │   ├── coordinate-system.md
│   │   ├── geometry-model.md
│   │   ├── state-schema.md
│   │   ├── cycle-state-machine.md
│   │   ├── hydraulic-model.md
│   │   └── architecture.md
│   ├── decisions/
│   │   ├── ADR-001-react-typescript.md
│   │   ├── ADR-002-svg-rendering.md
│   │   ├── ADR-003-local-first-mvp.md
│   │   ├── ADR-004-config-driven-simulation.md
│   │   └── ADR-005-simplified-hydraulic-model.md
│   └── glossary.md
│
├── references/
│   ├── video/
│   │   ├── source.mp4         (hoặc link)
│   │   ├── frames/
│   │   ├── video-analysis.md
│   │   └── timeline.csv
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── config/                          ← Tất cả cấu hình tập trung đây
│   │   ├── geometry.ts                  ← L_boom, L_arm, limits, pivots
│   │   ├── hydraulicParams.ts           ← A_piston, relief_pressure, efficiency
│   │   ├── cycleDefinition.ts           ← 8 bước chu trình, target angles, duration
│   │   ├── presets.ts                   ← Tư thế đặt trước
│   │   ├── warningRules.ts              ← Ngưỡng cảnh báo
│   │   └── unitConversions.ts           ← Hệ số đổi đơn vị
│   │
│   ├── types/                           ← Tất cả interface/type ở đây
│   │   ├── simulation.types.ts
│   │   ├── kinematics.types.ts
│   │   ├── hydraulics.types.ts
│   │   ├── cycle.types.ts
│   │   └── teaching.types.ts
│   │
│   ├── simulation/                      ← Lõi tính toán — KHÔNG import React
│   │   ├── kinematics/
│   │   │   ├── forwardKinematics.ts     ← Pure function
│   │   │   ├── constraints.ts           ← Clamp, limit check
│   │   │   └── angleUtils.ts            ← deg↔rad, normalize
│   │   ├── hydraulics/
│   │   │   ├── pressureModel.ts
│   │   │   ├── flowModel.ts
│   │   │   └── powerModel.ts
│   │   ├── animation/
│   │   │   ├── animationController.ts   ← RAF loop, clock, cancel
│   │   │   └── interpolation.ts         ← lerp, smoothstep
│   │   ├── cycle/
│   │   │   └── cycleStateMachine.ts     ← Finite automaton
│   │   └── units/
│   │       └── unitSystem.ts
│   │
│   ├── store/                           ← Zustand store
│   │   ├── simulationStore.ts
│   │   └── store.selectors.ts
│   │
│   ├── features/
│   │   ├── manual-control/
│   │   │   └── useManualControl.ts
│   │   ├── automatic-cycle/
│   │   │   └── useAutomaticCycle.ts
│   │   ├── telemetry/
│   │   │   └── useTelemetry.ts
│   │   └── teaching/                    ← Placeholder Phase 9
│   │       └── useTeaching.ts
│   │
│   ├── components/
│   │   ├── SimulationScene/
│   │   │   ├── SimulationScene.tsx      ← SVG canvas chính
│   │   │   ├── ExcavatorModel.tsx       ← Khung xương khớp
│   │   │   ├── DebugOverlay.tsx         ← Pivot markers (dev mode)
│   │   │   └── Background.tsx           ← Ground, pit, grid
│   │   ├── ControlPanel/
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── JointSliders.tsx
│   │   │   ├── ModeSelector.tsx
│   │   │   ├── PresetButtons.tsx
│   │   │   └── CycleControls.tsx
│   │   ├── TelemetryPanel/
│   │   │   ├── TelemetryPanel.tsx
│   │   │   └── TelemetryCard.tsx
│   │   └── WarningPanel/
│   │       └── WarningPanel.tsx
│   │
│   └── styles/
│       ├── tokens.css                   ← CSS custom properties (design tokens)
│       ├── global.css
│       └── *.module.css
│
└── tests/
    ├── unit/
    │   ├── kinematics/
    │   ├── hydraulics/
    │   ├── cycle/
    │   └── units/
    ├── integration/
    └── e2e/
        └── *.spec.ts                    ← Playwright
```

---

## Chiến Lược Test

### Phân tầng

| Tầng | Tool | Mục tiêu |
|---|---|---|
| Unit | Vitest | Kinematics, Hydraulics, Interpolation, Constraints, CycleStateMachine, UnitSystem |
| Integration | Vitest + RTL | Store actions → đầu ra đúng; Cycle events flow |
| Component | RTL | Slider, ControlPanel, TelemetryCard render & interaction |
| E2E | Playwright | Luồng demo chuẩn (12 scenario trong Phase 8) |

### Bắt buộc có unit test cho (không có test = không PASS GATE):

- `forwardKinematics` với bộ góc kiểm chứng tính tay.
- `clampAngle` tại và ngoài biên.
- `cycleStateMachine` transition: happy path + pause/resume/reset tại từng step.
- `pressureModel` với payload monotonicity.
- `interpolation` deterministic final state.
- Tất cả `unitConversions`.

---

## Acceptance Criteria Cấp Blueprint

Dự án MVP đạt khi đáp ứng **đồng thời** 15 tiêu chí trong `goal.md §18`, cộng với:

- Sai lệch tọa độ bucketTip giữa hàm tính và điểm SVG < 1 pixel ở scale 80px/m.
- Chu trình tự động chạy lặp 20 lần không treo.
- Animation không giật ở 60 FPS trên Chrome/Edge máy phổ thông.
- Lighthouse Accessibility ≥ 80.
- Desktop viewport tối thiểu: 1280 × 720px.

---

## [Xác nhận của Chủ dự án: APPROVED ]

> Brain yêu cầu Chủ dự án review và ghi `APPROVED` hoặc `CẦN CHỈNH SỬA: [nội dung]` vào đây trước khi tiến sang PHA 3 — CONTRACT.
