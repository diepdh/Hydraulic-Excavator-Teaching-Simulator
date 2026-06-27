# CONTRACT.md
# Phạm Vi & Điều Kiện Hoàn Thành — Hydraulic Excavator Teaching Simulator
# Version: 1.0 — 2026-06-27
# Phụ thuộc: BLUEPRINT.md v1.0 (phải được APPROVED trước khi CONTRACT này có hiệu lực)

---

> ⚠️ **GATE 0**: CONTRACT.md phải được Chủ dự án `APPROVED` trước khi The Brain viết bất kỳ JOB BRIEF nào.

---

## Scope — Phạm Vi Thực Hiện

Dưới đây là danh sách **deliverable có thể kiểm chứng** của dự án MVP (Phase 0 → Phase 8).

### Nhóm A — Hạ tầng dự án

| ID | Deliverable | Kiểm chứng |
|---|---|---|
| A1 | Git repository đã khởi tạo với cấu trúc thư mục theo BLUEPRINT | `git clone` → chạy được |
| A2 | `README.md` có hướng dẫn cài đặt, chạy, build, test | Người chưa biết dự án đọc được và làm theo |
| A3 | `docs/glossary.md` với ≥17 thuật ngữ đã định nghĩa | File tồn tại, đủ mục |
| A4 | 5 ADR ban đầu trong `docs/decisions/` | File tồn tại, đủ quyết định |
| A5 | `npm install` + `npm run dev` chạy được | Dev server khởi động không lỗi |
| A6 | `npm run build` thành công | Build output không lỗi |
| A7 | `npm run test` pass | Không có test fail |
| A8 | TypeScript strict type check pass | `tsc --noEmit` không báo lỗi |

### Nhóm B — Lõi mô phỏng

| ID | Deliverable | Kiểm chứng |
|---|---|---|
| B1 | `KinematicsEngine` — pure function forward kinematics | Unit test pass với bộ góc kiểm chứng tính tay |
| B2 | `ConstraintsEngine` — clamp góc + phát warning event | Unit test: giá trị ngoài biên bị clamp, trong biên giữ nguyên |
| B3 | `AngleUtils` — deg↔rad, normalize | Unit test pass |
| B4 | `HydraulicsModel` — áp suất, lưu lượng, công suất quasi-static | Payload tăng → pressure tăng; test monotonicity pass |
| B5 | `InterpolationEngine` — linear + smoothstep | Deterministic final state test pass |
| B6 | `AnimationController` — RAF, clock, pause/resume/cancel/reset | Không tích lũy RAF loop; pause preserves state |
| B7 | `CycleStateMachine` — 8 bước, events, interrupt | Happy path + pause/resume/reset mọi bước pass |
| B8 | `UnitSystem` — chuyển đổi Pa↔bar, m³/s↔L/min, W↔kW, rad↔deg | Unit test conversion pass |
| B9 | Config schema: geometry, hydraulicParams, cycleDefinition, presets, warningRules | Config validate tại load-time; không crash khi config hợp lệ |

### Nhóm C — UI

| ID | Deliverable | Kiểm chứng |
|---|---|---|
| C1 | App shell (Header, Main area, ControlPanel sidebar, Footer) | Hiển thị đúng layout ở 1280×720 trở lên |
| C2 | `SimulationScene` SVG — máy xúc 2D với Boom, Arm, Bucket, Track, Cabin | Mô hình chuyển động, không tách khớp trong toàn miền góc |
| C3 | 3 slider điều khiển Boom / Arm / Bucket | Kéo slider → mô hình cập nhật ngay, không giật |
| C4 | Slider Throttle (ga động cơ) | Throttle ảnh hưởng lưu lượng |
| C5 | Slider Payload (tải trọng gầu) | Payload ảnh hưởng áp suất |
| C6 | Mode selector (Manual / Automatic) | Switch mode hoạt động; joint slider bị disable khi Automatic |
| C7 | ≥4 Preset buttons (Ready, Lower, Lift, Dump) | Click preset → animation mượt đến vị trí mục tiêu |
| C8 | Cycle controls: Start, Pause, Resume, Reset | Hoạt động đúng; nút disabled khi không hợp lệ |
| C9 | `TelemetryPanel`: Reach, Height, Pressure, Flow, Power với đơn vị | Giá trị cập nhật đồng bộ, có nhãn đơn vị |
| C10 | `WarningPanel`: hiển thị cảnh báo active | Cảnh báo xuất hiện/biến mất đúng điều kiện |
| C11 | Simulation status indicator (IDLE / RUNNING / PAUSED / COMPLETE) | Status cập nhật đúng theo trạng thái |
| C12 | Cycle progress bar + step name | Hiển thị đúng bước hiện tại và % tiến trình |
| C13 | Debug overlay (dev mode) — pivot markers, skeleton lines | Có thể bật/tắt qua env variable hoặc query param |

### Nhóm D — Chất lượng & tài liệu

| ID | Deliverable | Kiểm chứng |
|---|---|---|
| D1 | Unit test cho toàn bộ hàm tính toán trọng yếu (B1-B8) | Test coverage ≥ 80% cho simulation/ folder |
| D2 | E2E test: 12 scenario trong Phase 8 | Playwright pass |
| D3 | Không lỗi runtime trong demo flow chuẩn | Không có console.error trong Playwright run |
| D4 | Nhãn "Mô hình đơn giản hóa" trong UI hoặc About page | Hiển thị rõ |
| D5 | Tài liệu cấu hình: cách chỉnh geometry, cycle, presets | Có trong README hoặc docs/ |
| D6 | Teaching layer placeholder (store + type) | Có thể bật Phase 9 mà không phải viết lại simulation core |

---

## Out-of-Scope

Những hạng mục sau **sẽ KHÔNG được thực hiện** trong phiên MVP (Phase 0–8):

| Hạng mục | Lý do |
|---|---|
| Authentication / đăng nhập | Out-of-scope MVP theo goal.md §9.2 |
| Backend server / database | Out-of-scope MVP |
| Cloud sync / deployment production | Out-of-scope MVP |
| Mô phỏng CFD / chất lỏng phân bố | Out-of-scope MVP |
| Mô hình van, bơm chi tiết | Out-of-scope MVP |
| Mô hình động cơ diesel chi tiết | Out-of-scope MVP |
| Mô hình đàn hồi kết cấu | Out-of-scope MVP |
| Rendering 3D | Out-of-scope MVP |
| VR / AR | Out-of-scope MVP |
| AI chatbot / tutor | Out-of-scope MVP |
| Chấm điểm tự động hoàn chỉnh | Out-of-scope MVP |
| LMS integration | Out-of-scope MVP |
| Digital twin thời gian thực | Out-of-scope MVP |
| Kết nối PLC / phần cứng thật | Out-of-scope MVP |
| Teaching Layer (lesson engine, task engine) | Phase 9 — sau MVP |
| CSV export / local result storage | Phase 9 — sau MVP |
| Tài khoản sinh viên / dashboard giảng viên | Level 3 — sau MVP |
| Visual regression test | P2 — sau MVP nếu cần |

---

## Definition of Done — Toàn dự án MVP

Dự án MVP hoàn thành khi **tất cả** các điều kiện sau đều đạt:

### Kỹ thuật

- [x] Tất cả deliverable nhóm A, B, C, D trong Scope đã tồn tại và kiểm chứng được.
- [x] `npm install && npm run dev` chạy không lỗi (môi trường sạch).
- [x] `npm run build` thành công không warning.
- [x] `tsc --noEmit` không báo lỗi (strict mode).
- [x] `npm run test` pass (Vitest).
- [x] `npm run test:e2e` pass (Playwright, 12 scenario).
- [x] Không có console.error trong luồng demo chuẩn.

### Hành vi

- [x] Mô hình máy xúc 2D hiển thị và chuyển động không tách khớp trong toàn miền góc.
- [x] Ba slider điều khiển đúng ba khớp tương ứng.
- [x] Tọa độ đầu gầu (Reach, Height) thay đổi đúng theo forward kinematics.
- [x] Preset hoạt động — animation mượt đến đích.
- [x] Chu trình tự động chạy đủ 8 bước (IDLE→APPROACH→LOWER→SCOOP→LIFT→DUMP→RETURN→COMPLETE).
- [x] Pause/Resume/Reset hoạt động ổn định tại mọi bước.
- [x] Áp suất, lưu lượng, công suất thay đổi theo quy tắc xác định (payload tăng → pressure tăng).
- [x] Ít nhất 1 cảnh báo vận hành kích hoạt đúng điều kiện.
- [x] Chu trình tự động chạy lặp 20 lần không treo.
- [x] Cùng config + cùng thao tác → cùng kết quả (deterministic).

### Chất lượng

- [x] Lighthouse Accessibility score ≥ 80.
- [x] Giao diện sử dụng được ở 1280×720px desktop.
- [x] Không có lỗi TypeScript.
- [x] Mọi công thức vật lý có comment giải thích và nhãn đơn vị.
- [x] Không hard-code thông số hình học/chu trình/giới hạn trong component.

### Tài liệu

- [x] `README.md` có: Installation, Run, Build, Test, Architecture overview, Config guide, Known limitations, Demo script.
- [x] `docs/glossary.md` đầy đủ.
- [x] Ít nhất 5 ADR tồn tại.
- [x] Nhãn mô hình đơn giản hóa hiển thị trong app.
- [x] Teaching layer placeholder có thể mở rộng sang Phase 9 mà không viết lại lõi mô phỏng.

### Gate

- [x] Tất cả GATE (GATE-001 đến GATE-008) ở trạng thái PASS.
- [x] Không có JOB nào ở trạng thái FAIL hoặc PENDING.
- [x] Reviewer đã phê duyệt từng GATE.

---

## Môi Trường Kỹ Thuật

| Hạng mục | Giá trị |
|---|---|
| OS phát triển | Windows 10/11 (ưu tiên), tương thích macOS/Linux |
| Node.js | ≥ 20 LTS |
| Package manager | npm (mặc định), pnpm là fallback |
| React | 18.x |
| TypeScript | 5.x, strict mode bật |
| Vite | 5.x |
| Zustand | 4.x |
| Vitest | 1.x+ |
| React Testing Library | 14.x+ |
| Playwright | 1.x (latest stable) |
| CSS approach | CSS Modules + CSS custom properties |
| Target browsers | Chrome ≥ 120, Edge ≥ 120 (primary); Firefox (optional) |
| Runtime | Client-side only; không cần Node.js runtime khi chạy app |
| Deploy | `npm run dev` → localhost; `npm run build` → static files |

---

## Ràng Buộc The Coder KHÔNG Được Tự Ý Thay Đổi

1. **Dependency direction**: UI → Store → Domain Simulation; domain không import React/UI.
2. **Config-driven**: Hình học, chu trình, giới hạn, preset — tất cả trong `src/config/`.
3. **Pure functions**: `forwardKinematics`, `pressureModel`, `flowModel`, `powerModel`, `interpolation` — không side effect, không import React.
4. **Tên module và đường dẫn** theo BLUEPRINT §Project Layout.
5. **Công thức** F = p×A, Q = A×v, P = p×Q — không tự ý đổi sang công thức khác.
6. **Clock architecture**: phân biệt wall clock / animation time / simulation time theo BLUEPRINT §TD-007.
7. **Nhãn mô hình đơn giản hóa**: bắt buộc hiển thị trong app.
8. **Góc zero và chiều dương** theo BLUEPRINT §Hệ Tọa Độ.

---

## [Xác nhận của Chủ dự án: APPROVED ]

> Brain yêu cầu Chủ dự án review và ghi `APPROVED` hoặc `CẦN CHỈNH SỬA: [nội dung]` vào đây.
>
> ⚠️ BUILD_PLAN.md và JOB BRIEF sẽ không được viết cho đến khi CONTRACT này được APPROVED.
