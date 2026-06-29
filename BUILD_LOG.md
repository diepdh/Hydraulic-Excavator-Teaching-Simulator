# BUILD_LOG.md
# Nhật ký thực thi của The Coder — Hydraulic Excavator Teaching Simulator
# Status: DONE
# Last updated: 2026-06-29

---

## Quy tắc ghi log

The Coder cập nhật file này sau mỗi phiên làm việc hoặc khi gặp blocker.

Mỗi JOB phải có một mục riêng, giữ nguyên lịch sử thay vì ghi đè toàn bộ nội dung cũ.

---

## Trạng thái hiện tại

- Đang thực thi các JOB trong BUILD_PLAN.md.
- JOB-001: DONE.
- JOB-002: DONE.
- JOB-003: DONE.
- JOB-004: DONE.
- JOB-005: DONE.
- JOB-006: DONE.
- JOB-007: DONE.
- JOB-008: DONE.
- JOB-009: DONE.

---

## Template cho The Coder

```markdown
## JOB-[NNN] Log

- Trạng thái: IN PROGRESS / DONE / BLOCKED
- Thời gian bắt đầu:
- Thời gian kết thúc:
- File đã tạo/sửa:
  - [path]
- Lệnh đã chạy:
  - [command]
- Kết quả kiểm tra:
  - [test/build/typecheck result]
- Vấn đề gặp phải:
  - [nếu có]
- Ghi chú cho Reviewer:
  - [nếu có]
```

---

## JOB Logs

## JOB-001 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-27T15:44:18+07:00
- Thời gian kết thúc: 2026-06-27T15:56:00+07:00
- Phiên bản code: commit `39c5b7c` (chứa các fix theo review)
- File đã tạo/sửa:
  - [package.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/package.json) (Sửa tên package, sửa typo)
  - [tsconfig.app.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tsconfig.app.json) (Bật `strict` mode)
  - [tsconfig.node.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tsconfig.node.json) (Bật `strict` mode)
  - [vite.config.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/vite.config.ts)
  - [vitest.config.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/vitest.config.ts)
  - [tests/setup.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/setup.ts)
  - [tests/unit/app.test.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/app.test.tsx)
  - [README.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/README.md)
  - [src/App.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/App.tsx) (Thay thế inline style bằng CSS Module)
  - [src/App.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/App.module.css) (Bổ sung class `telemetryPlaceholder`)
  - [src/main.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/main.tsx)
  - [src/styles/tokens.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/styles/tokens.css)
  - [src/styles/global.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/styles/global.css)
  - Cấu trúc các thư mục rỗng với file `.gitkeep` (`src/config/`, `src/types/`, `src/simulation/`, `src/store/`, `src/features/`, `src/components/`, `tests/`)
- Lệnh đã chạy:
  - `git init; git add .; git commit -m "feat: initial commit with project scaffolding (JOB-001)"`
  - `npm install`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass không lỗi (ở strict mode).
  - `npm run test` pass (2/2 test cases pass).
  - `npm run build` pass (build thành công folder `dist/`).
- Vấn đề gặp phải:
  - Không có.
- Ghi chú cho Reviewer:
  - Đã bật TypeScript `strict` mode trong cả [tsconfig.app.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tsconfig.app.json) và [tsconfig.node.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tsconfig.node.json).
  - Sửa typo package name thành `hydraulic-excavator-simulator` trong [package.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/package.json).
  - Di chuyển inline style của telemetry wrapper sang class `.telemetryPlaceholder` trong [App.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/App.module.css).
  - Khởi tạo và thiết lập thành công Git repository tại thư mục gốc của dự án. Commit hash đầu tiên là `daea68b`.

## JOB-002 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T07:59:15+07:00
- Thời gian kết thúc: 2026-06-29T08:02:00+07:00
- Phiên bản code: commit `214ff47`
- File đã tạo/sửa:
  - [docs/glossary.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/glossary.md) (Tạo mới, chứa 18 thuật ngữ)
  - [docs/decisions/ADR-001-react-typescript.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/decisions/ADR-001-react-typescript.md) (Tạo mới)
  - [docs/decisions/ADR-002-svg-rendering.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/decisions/ADR-002-svg-rendering.md) (Tạo mới)
  - [docs/decisions/ADR-003-local-first-mvp.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/decisions/ADR-003-local-first-mvp.md) (Tạo mới)
  - [docs/decisions/ADR-004-config-driven-simulation.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/decisions/ADR-004-config-driven-simulation.md) (Tạo mới)
  - [docs/decisions/ADR-005-simplified-hydraulic-model.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/decisions/ADR-005-simplified-hydraulic-model.md) (Tạo mới)
  - [docs/blueprint/coordinate-system.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/coordinate-system.md) (Tạo mới)
  - [docs/blueprint/geometry-model.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/geometry-model.md) (Tạo mới)
  - [docs/blueprint/state-schema.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/state-schema.md) (Tạo mới)
  - [docs/blueprint/cycle-state-machine.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/cycle-state-machine.md) (Tạo mới)
  - [docs/blueprint/hydraulic-model.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/hydraulic-model.md) (Tạo mới)
  - [docs/blueprint/architecture.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/architecture.md) (Tạo mới)
  - [docs/blueprint/test-specification.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/docs/blueprint/test-specification.md) (Tạo mới)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass.
  - `npm run build` pass.
- Vấn đề gặp phải:
  - Không có.
- Ghi chú cho Reviewer:
  - Toàn bộ tài liệu được viết bằng tiếng Việt có dấu đúng quy chuẩn của CONTRACT.md.
  - Cấu trúc thư mục được tổ chức ngăn nắp dưới thư mục `docs/` đúng theo đặc tả của BLUEPRINT.md.
  - Không triển khai mã nguồn mới nào trong JOB này.

## JOB-003 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T08:06:12+07:00
- Thời gian kết thúc: 2026-06-29T08:11:00+07:00
- Phiên bản code: commit `39317f0`
- File đã tạo/sửa:
  - [src/types/simulation.types.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/types/simulation.types.ts) (Tạo mới)
  - [src/types/kinematics.types.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/types/kinematics.types.ts) (Tạo mới)
  - [src/types/hydraulics.types.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/types/hydraulics.types.ts) (Tạo mới)
  - [src/types/cycle.types.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/types/cycle.types.ts) (Tạo mới)
  - [src/types/teaching.types.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/types/teaching.types.ts) (Tạo mới)
  - [src/config/geometry.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/geometry.ts) (Tạo mới)
  - [src/config/hydraulicParams.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/hydraulicParams.ts) (Tạo mới)
  - [src/config/presets.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/presets.ts) (Tạo mới)
  - [src/config/cycleDefinition.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/cycleDefinition.ts) (Tạo mới)
  - [src/config/warningRules.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/warningRules.ts) (Tạo mới)
  - [src/config/unitConversions.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/unitConversions.ts) (Tạo mới)
  - [src/config/configValidator.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/configValidator.ts) (Tạo mới)
  - [tests/unit/config.test.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/config.test.ts) (Tạo mới)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass không lỗi.
  - `npm run test` pass (7/7 test cases pass).
  - `npm run build` pass (build thành công).
- Vấn đề gặp phải:
  - Lỗi typecheck lúc đầu do yêu cầu import type của `verbatimModuleSyntax`. Đã sửa bằng cách sử dụng `import type` trên toàn bộ các file config/type liên quan.
- Ghi chú cho Reviewer:
  - Domain types hoàn toàn tách biệt, không import React/UI.
  - Bổ sung file validation cấu hình [configValidator.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/configValidator.ts) và unit test tương ứng trong [config.test.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/config.test.ts) đáp ứng tiêu chí recommended.

## JOB-004 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T08:26:40+07:00
- Thời gian kết thúc: 2026-06-29T08:30:00+07:00
- Phiên bản code: commit `c59df25`
- File đã tạo/sửa:
  - [src/simulation/kinematics/angleUtils.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/kinematics/angleUtils.ts) (Tạo mới)
  - [src/simulation/kinematics/forwardKinematics.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/kinematics/forwardKinematics.ts) (Tạo mới)
  - [src/simulation/kinematics/constraints.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/kinematics/constraints.ts) (Tạo mới)
  - [tests/unit/kinematics/kinematics.test.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/kinematics/kinematics.test.ts) (Tạo mới)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (15/15 test cases pass, bao gồm 8 test kinematics mới).
  - `npm run build` pass.
- Vấn đề gặp phải:
  - Không có.
- Ghi chú cho Reviewer:
  - Toàn bộ code mô phỏng nằm độc lập trong `src/simulation/kinematics/` và không import React/UI đúng theo dependency direction của BLUEPRINT.md.
  - Hàm `forwardKinematics` là pure function, tính toán vị trí khớp (X, Y SVG pixel) và Reach/Height (mét) vật lý chính xác theo hệ tọa độ đã thống nhất.
  - Cung cấp đầy đủ test known pose (All links horizontal) và clamp boundary warnings.

## JOB-005 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T08:38:39+07:00
- Thời gian kết thúc: 2026-06-29T08:44:00+07:00
- Phiên bản code: commit `6fe6aa5`
- File đã tạo/sửa:
  - [src/store/simulationStore.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/store/simulationStore.ts) (Tạo mới)
  - [src/store/store.selectors.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/store/store.selectors.ts) (Tạo mới)
  - [src/components/SimulationScene/SimulationScene.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/SimulationScene.tsx) (Tạo mới)
  - [src/components/SimulationScene/SimulationScene.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/SimulationScene.module.css) (Tạo mới)
  - [src/components/ControlPanel/ControlPanel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/ControlPanel/ControlPanel.tsx) (Tạo mới)
  - [src/components/ControlPanel/ControlPanel.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/ControlPanel/ControlPanel.module.css) (Tạo mới)
  - [src/components/TelemetryPanel/TelemetryPanel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/TelemetryPanel/TelemetryPanel.tsx) (Tạo mới)
  - [src/components/TelemetryPanel/TelemetryPanel.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/TelemetryPanel/TelemetryPanel.module.css) (Tạo mới)
  - [src/components/WarningPanel/WarningPanel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/WarningPanel/WarningPanel.tsx) (Tạo mới)
  - [src/components/WarningPanel/WarningPanel.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/WarningPanel/WarningPanel.module.css) (Tạo mới)
  - [src/App.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/App.tsx) (Sửa đổi, tích hợp components)
  - [src/App.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/App.module.css) (Sửa đổi, cập nhật style layout)
  - [tests/unit/app.test.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/app.test.tsx) (Sửa đổi, cập nhật test theo UI thật)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (15/15 test cases pass).
  - `npm run build` pass (build thành công `dist/`).
- Vấn đề gặp phải:
  - Test `app.test.tsx` bị lỗi do tìm kiếm text placeholder cũ. Đã sửa lại thành tìm các tiêu đề UI thực tế của các panel.
- Ghi chú cho Reviewer:
  - Toàn bộ layout đã ghép các components thật, đọc trực tiếp state từ Zustand store.
  - Giao diện có thiết kế tối (Dark Mode), hỗ trợ responsive cơ bản và có đầy đủ phân khu theo blueprint.
  - Phép tính vật lý thủy lực phục vụ hiển thị được gói gọn trong selectors (`store.selectors.ts`), không nhúng trong JSX.

## JOB-006 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T08:59:34+07:00
- Thời gian kết thúc: 2026-06-29T09:05:00+07:00
- Phiên bản code: commit `c8bdbbc`
- File đã tạo/sửa:
  - [src/components/SimulationScene/ExcavatorModel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/ExcavatorModel.tsx) (Tạo mới)
  - [src/components/SimulationScene/DebugOverlay.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/DebugOverlay.tsx) (Tạo mới)
  - [src/features/manual-control/useManualControl.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/features/manual-control/useManualControl.ts) (Tạo mới)
  - [src/features/telemetry/useTelemetry.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/features/telemetry/useTelemetry.ts) (Tạo mới)
  - [src/components/ControlPanel/ControlPanel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/ControlPanel/ControlPanel.tsx) (Sửa đổi)
  - [src/components/SimulationScene/SimulationScene.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/SimulationScene.tsx) (Sửa đổi)
  - [src/components/SimulationScene/SimulationScene.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/SimulationScene.module.css) (Sửa đổi)
  - [src/store/simulationStore.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/store/simulationStore.ts) (Sửa đổi)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (15/15 test cases pass).
  - `npm run build` pass.
- Vấn đề gặp phải:
  - Gặp lỗi build do unused import `GeometryConfig` và unused prop `config` trong `DebugOverlay.tsx`. Đã dọn dẹp sạch sẽ để build thành công.
- Ghi chú cho Reviewer:
  - Mô hình SVG máy xúc được dựng chuẩn bằng phân cấp nhóm khớp lồng nhau (rotate transform), loại bỏ hoàn toàn khả năng bị rã khớp cơ học.
  - Hỗ trợ nội suy chuyển động (Cubic Ease-In-Out RAF animation) khi kích hoạt presets.
  - Có Debug Overlay đè trực tiếp lên các khớp để reviewer xác minh tọa độ pixel.

## JOB-007 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T09:19:39+07:00
- Thời gian kết thúc: 2026-06-29T09:25:00+07:00
- Phiên bản code: commit `901a9a6`
- File đã tạo/sửa:
  - [src/simulation/animation/interpolation.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/animation/interpolation.ts) (Tạo mới)
  - [src/simulation/animation/animationController.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/animation/animationController.ts) (Tạo mới)
  - [src/simulation/cycle/cycleStateMachine.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/cycle/cycleStateMachine.ts) (Tạo mới)
  - [src/features/automatic-cycle/useAutomaticCycle.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/features/automatic-cycle/useAutomaticCycle.ts) (Tạo mới)
  - [tests/unit/cycle/cycle.test.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/cycle/cycle.test.ts) (Tạo mới)
  - [src/store/simulationStore.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/store/simulationStore.ts) (Sửa đổi)
  - [src/components/ControlPanel/ControlPanel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/ControlPanel/ControlPanel.tsx) (Sửa đổi)
  - [src/components/ControlPanel/ControlPanel.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/ControlPanel/ControlPanel.module.css) (Sửa đổi)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (18/18 test cases pass, bao gồm 3 test cycle mới).
  - `npm run build` pass.
- Vấn đề gặp phải:
  - Gặp lỗi build do gõ nhầm thuộc tính `currentStep.angles` thay vì `currentStep.targetAngles` được khai báo trong định nghĩa cấu hình chu trình. Đã sửa đổi chính xác.
- Ghi chú cho Reviewer:
  - Hiện thực hóa lớp clock `SimClock` trong `animationController.ts` để lưu trữ chính xác lượng thời gian trôi qua, giải quyết hoàn toàn bài toán pause/resume/reset chu trình mà không bị nhảy vọt chuyển động.
  - Các thanh progress bar được thiết kế tối giản, trực quan hóa tiến độ chu trình tổng thể và tiến độ bước hiện thời trên Control Panel.
  - Độc lập hóa các actions điều khiển chu trình thông qua custom hook `useAutomaticCycle.ts`.

## JOB-008 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T09:27:24+07:00
- Thời gian kết thúc: 2026-06-29T09:33:00+07:00
- Phiên bản code: commit `2b270da`
- File đã tạo/sửa:
  - [src/simulation/hydraulics/pressureModel.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/hydraulics/pressureModel.ts) (Tạo mới)
  - [src/simulation/hydraulics/flowModel.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/hydraulics/flowModel.ts) (Tạo mới)
  - [src/simulation/hydraulics/powerModel.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/hydraulics/powerModel.ts) (Tạo mới)
  - [src/simulation/units/unitSystem.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/units/unitSystem.ts) (Tạo mới)
  - [tests/unit/hydraulics/hydraulics.test.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/hydraulics/hydraulics.test.ts) (Tạo mới)
  - [src/store/store.selectors.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/store/store.selectors.ts) (Sửa đổi)
  - [src/store/simulationStore.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/store/simulationStore.ts) (Sửa đổi)
  - [src/components/TelemetryPanel/TelemetryPanel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/TelemetryPanel/TelemetryPanel.tsx) (Sửa đổi)
  - [src/components/TelemetryPanel/TelemetryPanel.module.css](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/TelemetryPanel/TelemetryPanel.module.css) (Sửa đổi)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (28/28 test cases pass, bao gồm 10 test hydraulics mới).
  - `npm run build` pass.
- Vấn đề gặp phải:
  - Lỗi typecheck lúc đầu do gọi sai tên thuộc tính trong `hydraulicParams` cấu hình. Đã sửa sang đúng tên biến config.
  - Test case `RELIEF_ACTIVE` lúc đầu bị failed do đặt góc Boom chưa đủ thấp (-10 độ) để đạt cánh tay đòn cực đại nhằm kích hoạt áp suất tối đa van an toàn. Đã sửa đổi chính xác.
- Ghi chú cho Reviewer:
  - Hiện thực hóa đầy đủ các chuyển đổi đơn vị đo lường thủy lực (Pascal, bar, psi, m3/s, L/min, kW, HP).
  - Áp dụng các cảnh báo động lực học tự động (RELIEF_ACTIVE khi áp suất chạm đỉnh 250 bar, OVERLOAD khi payload quá tải).
  - Hiển thị model disclosure cảnh báo giáo dục rõ ràng ở chân TelemetryPanel theo đúng ràng buộc.

## JOB-009 Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T09:53:12+07:00
- Thời gian kết thúc: 2026-06-29T10:52:00+07:00
- Phiên bản code: commit `fd25fdf`
- File đã tạo/sửa:
  - [playwright.config.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/playwright.config.ts) (Tạo mới)
  - [tests/e2e/simulation.spec.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/e2e/simulation.spec.ts) (Tạo mới)
  - [tests/integration/simulation.integration.test.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/integration/simulation.integration.test.tsx) (Tạo mới)
  - [vitest.config.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/vitest.config.ts) (Sửa đổi)
  - [package.json](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/package.json) (Sửa đổi)
  - [README.md](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/README.md) (Sửa đổi)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run test:e2e`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (32/32 test cases pass, bao gồm 4 test integration sạch sẽ không còn bất kỳ warning act nào).
  - `npm run test:e2e` pass (5/5 tests trong Chromium trình duyệt thật pass, bao trùm đầy đủ 12 scenarios của blueprint).
  - `npm run build` pass (build thành công tĩnh và tối ưu hóa file production).
- Vấn đề gặp phải:
  - Lớp E2E trước đó sử dụng jsdom chỉ là component test. Đã chuyển toàn bộ sang `tests/integration/` và cài đặt Playwright E2E browser thật sự chạy Chromium không đầu (headless) cho đúng test-specification.
  - Các cảnh báo `act(...)` trong integration test đã được bao bọc sạch sẽ và dọn dẹp các pending timers.
  - Cần loại trừ `tests/e2e/**` khỏi Vitest config để tránh Vitest quét nhầm cú pháp của Playwright E2E và gây crash.
  - Tăng timeout E2E cho chu trình tự động lên 25s do tổng duration chạy thực sự của chu trình 8 bước là 17 giây.
- Ghi chú cho Reviewer:
  - Dự án hiện đã có cấu hình và chạy trơn tru cả 3 tầng kiểm thử: Unit Test (Vitest), Component/Integration Test (RTL), và E2E Browser Test (Playwright) theo đúng phân tầng kiến trúc kim tự tháp đã chốt.
  - Tài liệu README.md được bổ sung đầy đủ chi tiết và phân tích known limitations.

## Post-MVP Graphic & Motion Enhancements Log

- Trạng thái: DONE
- Thời gian bắt đầu: 2026-06-29T15:41:30+07:00
- Thời gian kết thúc: 2026-06-29T17:02:00+07:00
- Phiên bản code: commit `4733741`
- File đã sửa:
  - [src/config/geometry.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/config/geometry.ts) (Sửa đổi)
  - [src/components/SimulationScene/SimulationScene.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/SimulationScene.tsx) (Sửa đổi)
  - [src/components/SimulationScene/ExcavatorModel.tsx](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/components/SimulationScene/ExcavatorModel.tsx) (Sửa đổi)
  - [src/simulation/kinematics/forwardKinematics.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/src/simulation/kinematics/forwardKinematics.ts) (Sửa đổi)
  - [tests/unit/kinematics/kinematics.test.ts](file:///C:/Users/dohuy/Downloads/01.%20Documents/May_thuy_luc/tests/unit/kinematics/kinematics.test.ts) (Sửa đổi)
- Lệnh đã chạy:
  - `npm run typecheck`
  - `npm run test`
  - `npm run test:e2e`
  - `npm run build`
- Kết quả kiểm tra:
  - `npm run typecheck` pass.
  - `npm run test` pass (32/32 tests pass).
  - `npm run test:e2e` pass (5/5 Playwright tests pass).
  - `npm run build` pass.
- Chi tiết cải tiến:
  - **Sửa lỗi ngược hướng khớp**: Sửa đổi công thức động học thuận từ cộng góc sang trừ góc đối với Arm và Bucket (`phiArm = radBoom - radArm`, `phiBucket = phiArm - radBucket`), đồng thời đảo chiều xoay tương ứng trong SVG rotate (`rotate(${angles.arm})`, `rotate(${angles.bucket})`). Đảm bảo Arm và Bucket gập vào phía bụng (co gập tự nhiên hướng vào cabin giống ngón tay cuộn vào trong lòng bàn tay) thay vì bẻ ngược lên lưng như trước.
  - **Khắc phục lỗi lệch khung hình**: Thay đổi scale từ 80 xuống 70, dịch gốc máy baseX từ 250 về 200, baseY từ 350 về 380, và nới rộng viewBox của SVG thành 950x550. Đảm bảo toàn bộ chuyển động vươn tối đa hoặc nâng cao không bị cắt viền.
  - **Cài đặt 3 cụm Xy lanh Thủy lực động**: Tính toán lượng giác điểm neo để vẽ 3 cụm xy lanh tự động co duỗi piston chrome bóng loáng và tự xoay khớp chốt theo chuyển động của cần đòn Boom-Arm-Bucket.
  - **Trực quan hóa kịch bản múc & đổ đất**:
    - Vẽ đống đất (Soil pile) màu nâu sẫm bên dưới gầm gầu xúc.
    - Vẽ phễu chứa đất (Dump Hopper) công nghiệp lớn bên phải.
    - Thêm mảng cát trong gầu xuất hiện động khi múc lên (`SCOOP`, `LIFT`, `DUMP`).
    - Thêm hiệu ứng hạt cát chảy/rơi tự do từ gầu xuống phễu khi chu trình tự động ở bước `DUMP`.
  - **Cải tiến thẩm mỹ đồ họa**: Vẽ bánh xích thép xám đen, cabin màu vàng-đen có kính buồng lái màu xanh trong suốt, ống xả khói động, răng gầu bọc thép đúc và áp dụng gradients nổi khối cho tất cả cấu kiện.






