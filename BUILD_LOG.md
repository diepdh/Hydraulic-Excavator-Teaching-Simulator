# BUILD_LOG.md
# Nhật ký thực thi của The Coder — Hydraulic Excavator Teaching Simulator
# Status: WAITING_FOR_BUILD_PLAN
# Last updated: 2026-06-27

---

## Quy tắc ghi log

The Coder cập nhật file này sau mỗi phiên làm việc hoặc khi gặp blocker.

Mỗi JOB phải có một mục riêng, giữ nguyên lịch sử thay vì ghi đè toàn bộ nội dung cũ.

---

## Trạng thái hiện tại

- Đang thực thi các JOB trong BUILD_PLAN.md.
- JOB-001: DONE.
- JOB-002: DONE.

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



