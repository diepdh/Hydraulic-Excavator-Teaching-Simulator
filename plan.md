# PLAN.md

# Project Plan — Hydraulic Excavator Teaching Simulator

## 1. Mục đích của tài liệu

`plan.md` là tài liệu quản lý lộ trình triển khai xuyên suốt dự án.

Tài liệu này chuyển các mục tiêu trong `goal.md` thành:

- Phase triển khai.
- Workstream.
- Task cụ thể.
- Dependency.
- Deliverable.
- Acceptance criteria.
- Gate review.
- Rủi ro.
- Thứ tự ưu tiên.

`plan.md` không thay thế blueprint.

Blueprint sẽ mô tả chính xác hệ thống phải được xây dựng như thế nào. `plan.md` mô tả dự án phải đi qua những bước nào để tạo ra hệ thống đó.

---

## 2. Quan hệ giữa các tài liệu

```text
goal.md
   ↓
blueprint.md
   ↓
plan.md
   ↓
task breakdown / issue tracker
   ↓
implementation
   ↓
review / test / acceptance
```

Trong thực tế, `plan.md` được tạo trước blueprint để định hình lộ trình. Sau khi blueprint được chốt, `plan.md` phải được cập nhật để phản ánh:

- Module thật.
- Dependency thật.
- Milestone thật.
- Test gate thật.
- Task ID thật.

---

## 3. Trạng thái dự án hiện tại

### Đã có

- Video tham chiếu.
- Phân tích sơ bộ giao diện.
- Xác định các tính năng chính.
- Xác định hướng React + TypeScript + SVG.
- Xác định MVP không cần backend.
- Xác định mục tiêu phát triển thành công cụ giảng dạy.

### Chưa có

- Blueprint.
- Asset máy xúc chuẩn.
- Quy ước tọa độ.
- Thông số hình học.
- Công thức telemetry chính thức.
- State machine chính thức.
- Thiết kế UI chi tiết.
- Test specification.
- Source code.
- Bộ dữ liệu bài thực hành.

---

## 4. Chiến lược triển khai tổng thể

Dự án được triển khai theo nguyên tắc:

1. Chốt yêu cầu trước.
2. Chốt kiến trúc trước khi code lớn.
3. Dựng vertical slice sớm.
4. Kiểm chứng động học trước thủy lực.
5. Kiểm chứng manual mode trước automatic mode.
6. Kiểm chứng automatic cycle trước teaching layer.
7. Mỗi phase phải có demo chạy được.
8. Mỗi phase phải có gate nghiệm thu.
9. Không chuyển phase nếu lỗi nền tảng chưa được xử lý.
10. Mọi mô hình gần đúng phải được tài liệu hóa.

---

## 5. Milestone tổng quát

| Milestone | Kết quả chính |
|---|---|
| M0 | Project foundation và bộ tài liệu gốc |
| M1 | Blueprint được phê duyệt |
| M2 | UI replica tĩnh |
| M3 | Mô hình máy xúc điều khiển thủ công |
| M4 | Telemetry động học hoàn chỉnh |
| M5 | Automatic cycle hoàn chỉnh |
| M6 | Hydraulic approximation model |
| M7 | MVP tích hợp và ổn định |
| M8 | Teaching layer đầu tiên |
| M9 | Pilot với sinh viên và cải tiến |

Mục tiêu trước mắt của dự án là hoàn thành đến **M7**.

---

# PHASE 0 — PROJECT FOUNDATION

## 0.1. Mục tiêu

Thiết lập nguồn sự thật chung của dự án và chuẩn bị đầu vào để dựng blueprint.

## 0.2. Task

### P0-T01 — Chuẩn hóa video tham chiếu

Công việc:

- Lưu video gốc trong thư mục tài liệu dự án.
- Ghi nguồn và ngày thu thập.
- Tách frame đại diện.
- Đánh dấu các thời điểm có tương tác quan trọng.
- Liệt kê các màn hình và trạng thái xuất hiện.
- Ghi lại text, nhãn, đơn vị và giá trị nhìn thấy.
- Ghi lại các chuyển động và thứ tự chu trình.

Đầu ra:

- `references/video/source.mp4`
- `references/video/frames/`
- `references/video/video-analysis.md`
- `references/video/timeline.csv`

Tiêu chí hoàn thành:

- Có frame cho tất cả trạng thái chính.
- Có timeline các thao tác.
- Có danh sách thành phần UI.
- Có danh sách hành vi chưa xác định chắc chắn.

### P0-T02 — Tạo repository

Công việc:

- Khởi tạo Git repository.
- Tạo branch strategy.
- Tạo `.gitignore`.
- Tạo `README.md`.
- Tạo license nội bộ hoặc license phù hợp.
- Thiết lập convention cho commit.
- Thiết lập issue template.

Cấu trúc tài liệu ban đầu:

```text
project-root/
├── goal.md
├── plan.md
├── blueprint.md
├── README.md
├── docs/
├── references/
├── src/
└── tests/
```

Tiêu chí hoàn thành:

- Clone repository và đọc được định hướng dự án.
- Có quy tắc branch và review.
- Không commit file build hoặc secret.

### P0-T03 — Chốt glossary

Tạo `docs/glossary.md`.

Tối thiểu gồm:

- Boom.
- Arm/Stick.
- Bucket.
- Joint.
- End effector.
- Reach.
- Height.
- Payload.
- Pressure.
- Flow rate.
- Hydraulic power.
- Preset.
- Cycle step.
- Simulation time.
- Real time.
- Clamp.
- Warning.
- Fault.

Tiêu chí hoàn thành:

- Mỗi thuật ngữ có tên tiếng Anh, tiếng Việt và định nghĩa.
- Tên trong UI, code và tài liệu không mâu thuẫn.

### P0-T04 — Chốt decision log

Tạo `docs/decisions/`.

Mỗi quyết định kiến trúc dùng format ADR:

```text
ADR-xxx-title.md
```

ADR đầu tiên:

- ADR-001: React + TypeScript.
- ADR-002: SVG rendering.
- ADR-003: Local-first MVP.
- ADR-004: Config-driven simulation.
- ADR-005: Simplified hydraulic model.

## 0.3. Gate Phase 0

Phase 0 đạt khi:

- `goal.md` và `plan.md` được phê duyệt.
- Video reference có phân tích có cấu trúc.
- Repository được tạo.
- Glossary được chốt.
- Có ADR ban đầu.
- Đủ dữ liệu để dựng blueprint.

---

# PHASE 1 — BLUEPRINT

## 1.1. Mục tiêu

Tạo bản thiết kế đủ chi tiết để coder có thể triển khai mà không phải tự quyết định các vấn đề nền tảng.

## 1.2. Thành phần blueprint bắt buộc

Blueprint phải có các chương:

1. Product scope.
2. User flows.
3. Screen layout.
4. Component hierarchy.
5. Domain model.
6. State model.
7. Coordinate system.
8. Kinematic model.
9. Hydraulic approximation model.
10. Automatic cycle state machine.
11. Animation engine.
12. Configuration schema.
13. Module architecture.
14. Data flow.
15. Error and warning handling.
16. Test strategy.
17. Acceptance criteria.
18. Implementation order.
19. Risks and fallback options.
20. Definition of Done.

## 1.3. Task

### P1-T01 — Dựng UI inventory

Liệt kê toàn bộ:

- Panel.
- Slider.
- Button.
- Card.
- Label.
- Status.
- Progress indicator.
- Scene element.
- Warning element.

Đầu ra:

- `docs/blueprint/ui-inventory.md`

### P1-T02 — Dựng user flow

Các flow bắt buộc:

- Mở ứng dụng.
- Manual control.
- Chọn preset.
- Chuyển sang automatic.
- Start cycle.
- Pause.
- Resume.
- Reset.
- Thay đổi payload.
- Thay đổi throttle.
- Chạm giới hạn.
- Xử lý warning.

Đầu ra:

- `docs/blueprint/user-flows.md`

### P1-T03 — Chốt hệ tọa độ

Phải xác định:

- Gốc tọa độ vật lý.
- Gốc tọa độ SVG.
- Trục X.
- Trục Y.
- Chiều dương góc.
- Góc zero của từng khâu.
- Quy tắc chuyển đổi physical-to-screen.
- Scale.
- Unit.

Đầu ra:

- `docs/blueprint/coordinate-system.md`

Gate riêng:

- Một bộ góc đầu vào phải tạo ra tọa độ kiểm chứng được bằng tính tay.

### P1-T04 — Chốt geometry model

Phải định nghĩa:

- Base pivot.
- Boom pivot.
- Arm pivot.
- Bucket pivot.
- Bucket tip.
- Link lengths.
- Joint limits.
- Visual offset.
- Physical line và decorative shape.

Đầu ra:

- `docs/blueprint/geometry-model.md`
- `src/config/geometry.example.ts`

### P1-T05 — Chốt state schema

Nhóm state:

- App state.
- Simulation state.
- Control state.
- Cycle state.
- Telemetry state.
- UI state.
- Warning state.
- Teaching state placeholder.

Đầu ra:

- `docs/blueprint/state-schema.md`

Yêu cầu:

- Phân biệt source state và derived state.
- Không lưu trùng derived values nếu không cần.
- Quy định action/event rõ ràng.

### P1-T06 — Chốt cycle state machine

Mỗi state có:

- Entry action.
- Target state.
- Duration/speed.
- Completion rule.
- Exit action.
- Interrupt behavior.
- Pause behavior.
- Reset behavior.

Đầu ra:

- `docs/blueprint/cycle-state-machine.md`
- State diagram.

### P1-T07 — Chốt hydraulic MVP model

Cần đưa ra:

- Input.
- Output.
- Formula.
- Unit.
- Assumption.
- Limit.
- Efficiency.
- Clamp.
- Warning condition.
- Known limitations.

Đầu ra:

- `docs/blueprint/hydraulic-model.md`

### P1-T08 — Chốt module architecture

Đề xuất dependency direction:

```text
UI
↓
Application/Controller
↓
Domain Simulation
↓
Pure Math / Config
```

Các module dự kiến:

```text
src/
├── app/
├── components/
├── features/
│   ├── manual-control/
│   ├── automatic-cycle/
│   ├── telemetry/
│   └── teaching/
├── simulation/
│   ├── kinematics/
│   ├── hydraulics/
│   ├── animation/
│   ├── constraints/
│   └── cycle/
├── store/
├── config/
├── types/
└── utils/
```

Đầu ra:

- `docs/blueprint/architecture.md`

### P1-T09 — Chốt test specification

Phân tầng:

- Unit test.
- Integration test.
- Component test.
- E2E test.
- Visual regression tùy chọn.

Đầu ra:

- `docs/blueprint/test-specification.md`

### P1-T10 — Blueprint review

Reviewer phải kiểm tra:

- Có điểm mơ hồ khiến coder phải tự đoán không.
- Có công thức thiếu đơn vị không.
- Có state trùng lặp không.
- Có dependency vòng không.
- Có task vượt scope không.
- Có acceptance criteria đo được không.
- Có handling cho pause/resume/reset không.
- Có test cho failure mode không.

## 1.4. Gate Phase 1

Phase 1 chỉ đạt khi:

- Blueprint không còn blocker.
- Tất cả câu hỏi trong mục 24 của `goal.md` đã được trả lời.
- Coder có thể ước lượng task.
- Reviewer chấp nhận kiến trúc.
- Có implementation order rõ ràng.
- Có acceptance test cho từng milestone.

---

# PHASE 2 — TECHNICAL SCAFFOLDING

## 2.1. Mục tiêu

Tạo project chạy được, có quy chuẩn code, test và CI cơ bản.

## 2.2. Task

### P2-T01 — Khởi tạo frontend

- React.
- TypeScript.
- Vite.
- Package manager được chốt trong blueprint.
- Strict TypeScript.
- Path alias.
- Environment config.

### P2-T02 — Thiết lập quality tools

- ESLint.
- Prettier.
- Type check.
- Vitest.
- React Testing Library.
- Playwright.
- Optional commit hooks.

### P2-T03 — Thiết lập design tokens

- Spacing.
- Font size.
- Border radius.
- Panel style.
- Status style.
- Dark theme.
- Breakpoints.

Không yêu cầu pixel-perfect ở phase này.

### P2-T04 — Tạo app shell

- Header.
- Main simulation area.
- Right control panel.
- Footer/status area.
- Responsive behavior cơ bản.

### P2-T05 — Tạo store skeleton

- Initial state.
- Actions.
- Selectors.
- Reset action.
- Dev debug panel tùy môi trường.

## 2.3. Gate Phase 2

- `npm install` và `npm run dev` hoạt động.
- `npm run build` thành công.
- Type check pass.
- Test mẫu pass.
- E2E smoke test pass.
- App shell hiển thị đúng bố cục.

---

# PHASE 3 — STATIC UI REPLICA

## 3.1. Mục tiêu

Tái tạo giao diện của video trước khi nối logic mô phỏng đầy đủ.

## 3.2. Task

### P3-T01 — Dựng scene background

- Ground.
- Pit.
- Grid hoặc reference line.
- Base area.
- Labels.

### P3-T02 — Dựng excavator visual

Phân tách:

- Track/base.
- Cabin/body.
- Boom.
- Arm.
- Bucket.
- Hydraulic cylinders.
- Pivot markers.

Yêu cầu:

- Mỗi khâu có transform origin đúng.
- Decorative shape không quyết định logic hình học.
- Có debug mode hiển thị skeleton.

### P3-T03 — Dựng control panel

- Joint sliders.
- Throttle.
- Payload.
- Mode selector.
- Preset buttons.
- Cycle controls.
- Progress.
- Status.

### P3-T04 — Dựng telemetry cards

- Reach.
- Height.
- Pressure.
- Flow.
- Power.

### P3-T05 — Dựng warning/status system

- Normal.
- Running.
- Paused.
- Complete.
- Limit warning.
- Overload warning.

### P3-T06 — So sánh với video

Tạo checklist:

- Layout.
- Density.
- Grouping.
- Typography.
- Contrast.
- Major colors.
- Relative proportions.
- Visible controls.

## 3.3. Gate Phase 3

- UI có thể demo mà chưa cần logic đầy đủ.
- Tất cả control chính đã xuất hiện.
- Scene không vỡ khi resize trong phạm vi mục tiêu.
- Visual hierarchy gần video tham chiếu.
- Reviewer xác nhận không thiếu thành phần chức năng quan trọng.

---

# PHASE 4 — KINEMATICS AND MANUAL CONTROL

## 4.1. Mục tiêu

Tạo lõi chuyển động đúng và cho phép điều khiển thủ công.

## 4.2. Task

### P4-T01 — Implement angle utilities

- Degree/radian conversion.
- Normalize angle nếu cần.
- Clamp.
- Epsilon comparison.

### P4-T02 — Implement forward kinematics

Input:

- Geometry.
- Joint angles.

Output:

- Boom end.
- Arm end.
- Bucket pivot.
- Bucket tip.
- Reach.
- Height.

Yêu cầu:

- Pure function.
- Không phụ thuộc React.
- Có unit test.

### P4-T03 — Mapping kinematics to SVG

- Physical coordinate to screen coordinate.
- Rotation transform.
- Translation transform.
- Debug joint marker.
- Debug link line.

### P4-T04 — Joint constraints

- Min/max boom.
- Min/max arm.
- Min/max bucket.
- UI clamp.
- Domain clamp.
- Warning event.

### P4-T05 — Manual slider control

- Drag slider.
- Keyboard adjust.
- Update angle.
- Update scene.
- Update telemetry.
- Hiển thị current value.

### P4-T06 — Preset control

Preset tối thiểu:

- Ready.
- Dig/Lower.
- Lift.
- Dump.

Quy định:

- Preset có thể chuyển tức thời ở debug mode.
- Preset bình thường dùng animation.
- Có thể hủy animation bằng manual input theo quy tắc blueprint.

### P4-T07 — Kinematic test suite

Test:

- Zero/reference pose.
- Min pose.
- Max pose.
- Known pose.
- Continuity near boundaries.
- Clamp behavior.
- SVG mapping consistency.

## 4.3. Gate Phase 4

- Ba slider điều khiển đúng khớp.
- Không có khớp bị tách.
- Bucket tip cập nhật chính xác theo model.
- Preset hoạt động.
- Không vượt joint limit.
- Unit tests pass.
- Có debug overlay để reviewer xác minh geometry.

---

# PHASE 5 — ANIMATION ENGINE

## 5.1. Mục tiêu

Tạo chuyển động mượt, xác định và có thể pause/resume.

## 5.2. Task

### P5-T01 — Chốt simulation clock

Phân biệt:

- Wall clock.
- Animation time.
- Simulation time.
- Paused time.

### P5-T02 — Implement interpolation

Tối thiểu hỗ trợ:

- Linear interpolation.
- Ease-in-out tùy blueprint.
- Multi-joint interpolation.
- Duration hoặc speed-based motion.

### P5-T03 — Implement animation controller

Chức năng:

- Start.
- Cancel.
- Pause.
- Resume.
- Reset.
- On update.
- On complete.

### P5-T04 — Resolve concurrent commands

Blueprint phải được hiện thực hóa cho các trường hợp:

- Kéo slider khi preset đang chạy.
- Chọn preset mới khi preset cũ đang chạy.
- Reset khi animation đang chạy.
- Chuyển mode khi cycle đang chạy.
- Browser tab mất focus.

### P5-T05 — Animation tests

- Deterministic final state.
- Pause preserves state.
- Resume continues.
- Cancel stops callbacks.
- Reset clears controller.
- No duplicate RAF loop.

## 5.3. Gate Phase 5

- Preset animation mượt.
- Không nhảy góc khi pause/resume.
- Không còn animation ngầm sau reset.
- Kết quả cuối không phụ thuộc frame rate trong sai số cho phép.
- Test pass.

---

# PHASE 6 — AUTOMATIC CYCLE

## 6.1. Mục tiêu

Tạo chu trình tự động theo state machine đã chốt.

## 6.2. Task

### P6-T01 — Implement cycle definition

Chu trình được load từ config:

```text
IDLE
APPROACH
LOWER
SCOOP
LIFT
DUMP
RETURN
COMPLETE
```

### P6-T02 — Implement cycle reducer/machine

Event tối thiểu:

- START.
- STEP_COMPLETE.
- PAUSE.
- RESUME.
- RESET.
- CANCEL.
- ERROR.

### P6-T03 — Connect state machine to animation

- Entry tạo target.
- Animation complete phát event.
- Pause đồng bộ controller.
- Reset đưa về initial pose.
- State transition cập nhật UI.

### P6-T04 — Progress indicator

Hiển thị:

- Current step.
- Step index.
- Total steps.
- Step progress.
- Overall progress.
- Status message.

### P6-T05 — Cycle safety

Kiểm tra:

- Target trong joint limits.
- Không start khi config invalid.
- Không double start.
- Không complete hai lần.
- Error state có thể reset.

### P6-T06 — Cycle tests

- Happy path.
- Pause ở từng step.
- Resume ở từng step.
- Reset ở từng step.
- Invalid config.
- Manual interruption.
- Repeat cycle.

## 6.3. Gate Phase 6

- Chu trình chạy đủ bước.
- Progress đúng.
- Pause/resume tại mọi step.
- Reset tại mọi step.
- Có thể chạy lặp lại.
- Không race condition quan sát được.
- State machine tests pass.

---

# PHASE 7 — TELEMETRY AND HYDRAULIC APPROXIMATION

## 7.1. Mục tiêu

Bổ sung thông số vận hành có quan hệ vật lý hợp lý và minh bạch.

## 7.2. Task

### P7-T01 — Unit system

Chốt hệ đơn vị nội bộ và hiển thị.

Đề xuất:

- Length: m.
- Angle: deg ở UI, rad trong math.
- Force: N hoặc kN.
- Pressure: Pa nội bộ, bar/MPa ở UI.
- Flow: m³/s nội bộ, L/min ở UI.
- Power: W nội bộ, kW ở UI.
- Payload: kg.

Tạo:

- `src/simulation/units/`
- Unit conversion tests.

### P7-T02 — Payload model

Xác định:

- Payload input.
- Bucket empty mass nếu có.
- Gravity.
- Simplified moment arm.
- Effective force demand.

### P7-T03 — Pressure model

Tối thiểu:

- Pressure from force and piston area.
- Base pressure.
- Relief pressure.
- Efficiency.
- Clamp.
- Overload flag.

### P7-T04 — Flow model

Tối thiểu:

- Joint angular speed hoặc cylinder speed proxy.
- Piston area.
- Throttle limit.
- Zero flow khi đứng yên, trừ standby flow nếu blueprint chọn.

### P7-T05 — Power model

- Hydraulic power.
- Efficiency.
- Display conversion.
- Limit.

### P7-T06 — Telemetry smoothing

Chỉ dùng nếu cần cho hiển thị.

Không được làm sai final steady value.

### P7-T07 — Warning rules

Tối thiểu:

- Joint limit.
- Near pressure limit.
- Relief active.
- Overload.
- Invalid telemetry.
- Clamped value.

### P7-T08 — Model disclosure

Trong app hoặc tài liệu phải ghi:

- Đây là mô hình giáo dục đơn giản hóa.
- Các giả định.
- Không dùng cho thiết kế hoặc vận hành máy thật.

### P7-T09 — Hydraulic tests

- Payload monotonicity.
- Pressure limit.
- Flow vs speed.
- Power identity.
- Unit conversion.
- Zero motion behavior.
- Clamp flags.

## 7.3. Gate Phase 7

- Telemetry không còn là số trang trí ngẫu nhiên.
- Input giống nhau tạo output giống nhau.
- Payload tăng tạo phản ứng hợp lý.
- Pressure không vượt relief limit sau clamp.
- Power nhất quán với pressure và flow.
- Warning đúng điều kiện.
- Tests pass.

---

# PHASE 8 — MVP INTEGRATION AND HARDENING

## 8.1. Mục tiêu

Tích hợp toàn bộ chức năng thành bản functional replica ổn định.

## 8.2. Task

### P8-T01 — Full integration

Tích hợp:

- UI.
- Manual control.
- Preset.
- Animation.
- Automatic cycle.
- Kinematics.
- Hydraulics.
- Warning.
- Status.

### P8-T02 — End-to-end scenarios

Scenario bắt buộc:

1. Open app → manual control.
2. Move all joints.
3. Select each preset.
4. Change payload.
5. Change throttle.
6. Start automatic cycle.
7. Pause.
8. Resume.
9. Reset.
10. Complete cycle.
11. Trigger warning.
12. Recover from warning.

### P8-T03 — Error boundary and fallback

- Invalid config.
- Missing asset.
- NaN telemetry.
- Unsupported browser condition cơ bản.
- Runtime component error.

### P8-T04 — Performance review

- React render profiling.
- RAF loop review.
- Event listener cleanup.
- Memory leak check.
- Animation under CPU slowdown.

### P8-T05 — Accessibility review

- Labels.
- Keyboard.
- Focus.
- Contrast.
- Status announcement ở mức phù hợp.

### P8-T06 — Browser test

- Chrome.
- Edge.
- Optional Firefox.

### P8-T07 — Documentation

Tạo:

- `README.md`.
- Installation.
- Run.
- Build.
- Test.
- Architecture overview.
- Config guide.
- Known limitations.
- Demo script.

### P8-T08 — Reference comparison

So sánh với video theo ma trận:

| Nhóm | Tiêu chí |
|---|---|
| Layout | Cấu trúc trái/phải |
| Scene | Máy xúc, nền, tọa độ |
| Controls | Slider, mode, preset |
| Telemetry | Reach, height, pressure, flow, power |
| Behavior | Manual, auto, pause, reset |
| Feedback | Status, progress, warning |
| Motion | Smoothness, order, continuity |

## 8.3. Gate Phase 8 — MVP RELEASE GATE

MVP được release khi:

- Đạt Definition of Success trong `goal.md`.
- Không còn blocker.
- Không còn lỗi nghiêm trọng trong demo flow.
- E2E pass.
- Unit/integration tests pass.
- Build production pass.
- Tài liệu đầy đủ.
- Reviewer phê duyệt.
- Có tag release.

---

# PHASE 9 — TEACHING LAYER MVP

## 9.1. Mục tiêu

Biến functional replica thành công cụ thực hành có hướng dẫn.

Phase này bắt đầu sau khi MVP mô phỏng ổn định.

## 9.2. Task

### P9-T01 — Lesson schema

Một lesson gồm:

- Metadata.
- Learning objectives.
- Initial state.
- Instructions.
- Tasks.
- Conditions.
- Hints.
- Completion rule.
- Reflection questions.

### P9-T02 — Task engine

Condition ví dụ:

- Payload >= value.
- Height >= value.
- Reach in range.
- Pressure <= limit.
- Cycle completed.
- Joint angle in range.
- Preset selected.
- Time within range.

### P9-T03 — Student guidance panel

- Current task.
- Hint.
- Progress.
- Completion feedback.
- Retry.

### P9-T04 — Local result storage

- Session ID.
- Task result.
- Time.
- Attempts.
- Final telemetry.
- LocalStorage hoặc file export.

### P9-T05 — CSV export

Dữ liệu:

- Timestamp.
- Joint angles.
- Reach.
- Height.
- Payload.
- Pressure.
- Flow.
- Power.
- Cycle state.

### P9-T06 — First teaching scenario

Bài thực hành đề xuất:

**Khảo sát ảnh hưởng của tải trọng đến áp suất và công suất thủy lực**

### P9-T07 — Teaching validation

Giảng viên kiểm tra:

- Mục tiêu có đo được không.
- Hướng dẫn có rõ không.
- Sinh viên có thể hoàn thành không.
- Dữ liệu có đủ để thảo luận không.

## 9.3. Gate Phase 9

- Có ít nhất một bài thực hành hoàn chỉnh.
- Không cần sửa code để thay giá trị bài học cơ bản.
- Có kết quả học tập lưu local hoặc export.
- Có pilot nhỏ với người học.

---

# PHASE 10 — PILOT AND ITERATION

## 10.1. Mục tiêu

Đánh giá ứng dụng trong bối cảnh giảng dạy thật.

## 10.2. Task

### P10-T01 — Chuẩn bị pilot

- Chọn lớp hoặc nhóm sinh viên.
- Chuẩn bị phiếu hướng dẫn.
- Chuẩn bị tiêu chí quan sát.
- Chuẩn bị pre/post questions nếu cần.

### P10-T02 — Thu thập dữ liệu

- Thời gian hoàn thành.
- Số lần retry.
- Lỗi thao tác.
- Phần khó hiểu.
- Feedback sinh viên.
- Feedback giảng viên.

### P10-T03 — Phân loại vấn đề

- Bug.
- UX issue.
- Physics issue.
- Teaching issue.
- Documentation issue.
- Feature request.

### P10-T04 — Iteration backlog

Xếp hạng:

- Critical.
- High.
- Medium.
- Low.
- Future research.

---

# 6. WORKSTREAM XUYÊN SUỐT

## WS-A — Product and Teaching

Phụ trách:

- Mục tiêu học tập.
- User story.
- Lesson design.
- Pilot.
- Acceptance theo góc nhìn giảng viên.

## WS-B — UI/UX

Phụ trách:

- Layout.
- Visual replica.
- Interaction.
- Accessibility.
- Responsive behavior.

## WS-C — Simulation Core

Phụ trách:

- Coordinate.
- Geometry.
- Kinematics.
- Constraints.
- Units.
- Hydraulics.

## WS-D — Control and Animation

Phụ trách:

- Interpolation.
- Clock.
- State machine.
- Manual/auto conflict.
- Pause/resume/reset.

## WS-E — Quality

Phụ trách:

- Unit test.
- Integration.
- E2E.
- Performance.
- Browser compatibility.
- Regression.

## WS-F — Documentation

Phụ trách:

- Goal.
- Plan.
- Blueprint.
- ADR.
- API/config docs.
- User guide.
- Teaching guide.

---

# 7. ƯU TIÊN BACKLOG

## P0 — Blocker

- Coordinate convention.
- Geometry convention.
- State schema.
- Animation ownership.
- Cycle state machine.
- Unit system.
- Formula transparency.
- Pause/resume/reset semantics.

## P1 — Must-have MVP

- Static UI.
- Excavator SVG.
- Manual sliders.
- Kinematics.
- Presets.
- Automatic cycle.
- Telemetry.
- Warning.
- Tests.
- Documentation.

## P2 — Should-have

- Debug overlay.
- Keyboard control.
- Better responsive behavior.
- Visual regression.
- CSV export.
- Lesson schema.

## P3 — Future

- Backend.
- Account.
- Dashboard.
- AI tutor.
- 3D.
- Advanced hydraulics.
- Hardware-in-the-loop.

---

# 8. RỦI RO VÀ GIẢM THIỂU

## R1 — Không có asset hình học chính xác

Ảnh hưởng:

- Khớp xoay không tự nhiên.
- Khó giống video.

Giảm thiểu:

- Dùng skeleton hình học độc lập với decorative SVG.
- Tạo asset theo pivot chuẩn.
- Có debug overlay.

## R2 — Nhầm quy ước góc

Ảnh hưởng:

- Công thức đúng nhưng mô hình quay sai.

Giảm thiểu:

- Chốt coordinate document trước code.
- Tạo known-pose test.
- Hiển thị trục và góc ở debug mode.

## R3 — Animation và state xung đột

Ảnh hưởng:

- Jump.
- Race condition.
- Pause sai.
- Double transition.

Giảm thiểu:

- Một animation controller duy nhất.
- State machine phát event rõ ràng.
- Không để component tự sở hữu timer riêng.

## R4 — Telemetry trông có vẻ vật lý nhưng sai

Ảnh hưởng:

- Gây hiểu sai cho sinh viên.

Giảm thiểu:

- Ghi rõ assumption.
- Dùng công thức có đơn vị.
- Có test tính nhất quán.
- Dán nhãn simplified model.

## R5 — Scope creep sang LMS hoặc AI quá sớm

Ảnh hưởng:

- MVP kéo dài.
- Lõi mô phỏng không ổn định.

Giảm thiểu:

- Tuân thủ out-of-scope.
- Mọi feature mới phải qua change request.
- Hoàn thành M7 trước mở rộng lớn.

## R6 — UI giống video nhưng khó bảo trì

Ảnh hưởng:

- Hard-code.
- Khó thêm bài học.

Giảm thiểu:

- Config-driven.
- Tách domain khỏi component.
- Tách geometry skeleton khỏi visual asset.

## R7 — Không có tiêu chí “giống video”

Ảnh hưởng:

- Reviewer đánh giá cảm tính.

Giảm thiểu:

- Dùng reference comparison matrix.
- Chốt frame chuẩn.
- Có checklist chức năng và bố cục.

## R8 — Thay đổi tải làm thông số nhảy bất thường

Giảm thiểu:

- Công thức deterministic.
- Clamp.
- Optional smoothing chỉ ở display layer.
- Test monotonicity.

---

# 9. DEFINITION OF READY

Một task chỉ được đưa cho coder khi có:

- Mục tiêu rõ.
- Input rõ.
- Output rõ.
- Dependency rõ.
- Acceptance criteria rõ.
- File/module dự kiến.
- Test requirement.
- Không còn blocker kiến trúc.
- Không yêu cầu coder tự phát minh công thức.

---

# 10. DEFINITION OF DONE

Một task được coi là hoàn thành khi:

- Code đã thực hiện đúng scope.
- Type check pass.
- Lint pass.
- Test liên quan pass.
- Có test mới nếu task thêm logic.
- Không tạo regression rõ ràng.
- Tài liệu được cập nhật.
- Không còn TODO blocker.
- Reviewer chấp nhận.
- Acceptance criteria được chứng minh.

---

# 11. QUY TRÌNH BRAIN → REVIEWER → CODER

## Bước 1 — Brain

- Đọc `goal.md`.
- Đọc `plan.md`.
- Phân tích video và tài liệu.
- Tạo blueprint.
- Ghi assumption.
- Không tự mở rộng scope.

## Bước 2 — Reviewer kỹ thuật

Kiểm tra:

- Kiến trúc.
- State.
- Math.
- Units.
- Testability.
- Edge cases.

## Bước 3 — Reviewer giảng dạy

Kiểm tra:

- Mục tiêu học tập.
- Khả năng giải thích.
- Nguy cơ gây hiểu sai.
- Khả năng sử dụng trong lớp.

## Bước 4 — Brain tổng hợp

- Giải quyết feedback.
- Ghi decision.
- Phát hành blueprint version.

## Bước 5 — Coder

- Chỉ triển khai theo blueprint.
- Báo blocker thay vì tự đổi goal.
- Viết test cùng task.
- Cập nhật progress.

## Bước 6 — Reviewer nghiệm thu

- So acceptance criteria.
- Chạy test.
- Demo flow.
- Ghi issue.
- Pass hoặc yêu cầu sửa.

---

# 12. QUẢN LÝ PHIÊN BẢN TÀI LIỆU

Mỗi tài liệu đầu trang nên có:

```text
Version:
Status:
Last updated:
Owner:
Approved by:
Related ADR:
```

Trạng thái:

- Draft.
- In Review.
- Approved.
- Superseded.

Thay đổi lớn phải ghi trong changelog.

---

# 13. CẤU TRÚC TÀI LIỆU ĐỀ XUẤT

```text
docs/
├── glossary.md
├── changelog.md
├── decisions/
│   ├── ADR-001-react-typescript.md
│   ├── ADR-002-svg-rendering.md
│   ├── ADR-003-local-first.md
│   └── ADR-004-config-driven.md
├── analysis/
│   ├── video-analysis.md
│   ├── ui-inventory.md
│   └── reference-comparison.md
├── blueprint/
│   ├── product-scope.md
│   ├── user-flows.md
│   ├── coordinate-system.md
│   ├── geometry-model.md
│   ├── state-schema.md
│   ├── cycle-state-machine.md
│   ├── hydraulic-model.md
│   ├── architecture.md
│   ├── test-specification.md
│   └── acceptance-tests.md
├── development/
│   ├── setup.md
│   ├── coding-conventions.md
│   ├── config-guide.md
│   └── release-process.md
└── teaching/
    ├── lesson-schema.md
    ├── instructor-guide.md
    └── pilot-plan.md
```

---

# 14. CHECKLIST TRƯỚC KHI DỰNG BLUEPRINT

- [ ] `goal.md` được phê duyệt.
- [ ] Video đã được tách frame.
- [ ] Có timeline thao tác.
- [ ] Có UI inventory.
- [ ] Có glossary.
- [ ] Có danh sách assumption.
- [ ] Có danh sách unknown.
- [ ] Có scope MVP.
- [ ] Có out-of-scope.
- [ ] Có tiêu chí giống video.
- [ ] Có quyết định stack sơ bộ.
- [ ] Có reviewer kỹ thuật.
- [ ] Có reviewer giảng dạy.

---

# 15. CÂU HỎI BẮT BUỘC CHO BLUEPRINT

Blueprint không được phê duyệt khi chưa trả lời:

1. Máy xúc được vẽ bằng một SVG hay nhiều SVG?
2. Transform origin của từng khâu nằm ở đâu?
3. Geometry vật lý và geometry hiển thị liên hệ thế nào?
4. Góc absolute hay relative?
5. Derived telemetry được tính ở đâu?
6. Store giữ gì và không giữ gì?
7. Ai sở hữu animation loop?
8. Manual input có hủy automatic cycle không?
9. Chọn preset khi đang chạy cycle xử lý thế nào?
10. Pause giữ progress bằng cách nào?
11. Reset về ready pose hay initial config?
12. Flow được suy ra từ đại lượng nào?
13. Pressure được suy ra từ tải thế nào?
14. Relief valve được mô hình hóa ra sao?
15. Warning là state hay derived selector?
16. NaN hoặc invalid config xử lý thế nào?
17. Test known pose dùng số liệu nào?
18. Sai số hình học cho phép là bao nhiêu?
19. Tiêu chí frame-rate independence là gì?
20. Dữ liệu lesson sau này gắn vào core bằng interface nào?

---

# 16. NEXT ACTION

Hành động tiếp theo sau khi phê duyệt hai file này:

1. Phân tích video có cấu trúc và tạo `video-analysis.md`.
2. Tạo `ui-inventory.md`.
3. Tạo danh sách assumption và unknown.
4. Dựng `blueprint.md` phiên bản 0.1.
5. Cho reviewer kỹ thuật và reviewer giảng dạy phản biện.
6. Brain hợp nhất feedback thành blueprint 1.0.
7. Cập nhật lại task trong `plan.md` theo module chính thức.
8. Bắt đầu Phase 2.

---

# 17. TÓM TẮT ĐỊNH HƯỚNG

Dự án phải đi theo thứ tự:

```text
Reference analysis
→ Blueprint
→ Static UI
→ Kinematics
→ Manual control
→ Animation
→ Automatic cycle
→ Hydraulic telemetry
→ MVP integration
→ Teaching layer
→ Pilot
```

Không đảo thứ tự theo hướng triển khai thủy lực nâng cao, AI, backend hoặc 3D trước khi functional replica 2D được nghiệm thu.
