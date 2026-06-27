# BUILD_PLAN.md
# Kế hoạch giao việc cho The Coder — Hydraulic Excavator Teaching Simulator
# Version: 1.0
# Status: ACTIVE — GATE 0 PASS
# Owner: The Brain
# Last updated: 2026-06-27

---

## Trạng thái hiện tại

`BUILD_PLAN.md` đã được mở sau khi Chủ dự án xác nhận:

- `BLUEPRINT.md`: APPROVED.
- `CONTRACT.md`: APPROVED.
- `GATE_000.md`: PASS.

The Brain phát hành **JOB-001** cho The Coder. Các JOB sau vẫn `LOCKED` cho đến khi JOB hiện tại được Reviewer kiểm tra và Gate tương ứng được The Brain mở.

---

## Thứ tự JOB

| JOB | Tên | Phụ thuộc | Gate | Trạng thái |
|---|---|---|---|---|
| JOB-001 | Project foundation và scaffolding | GATE 0 | `GATE_001.md` | READY |
| JOB-002 | Documentation foundation, glossary và ADR | JOB-001 PASS | `GATE_002.md` | LOCKED |
| JOB-003 | Config schema, types và simulation primitives | JOB-002 PASS | `GATE_003.md` | LOCKED |
| JOB-004 | Kinematics, constraints và unit tests | JOB-003 PASS | `GATE_004.md` | LOCKED |
| JOB-005 | App shell, store skeleton và static UI | JOB-004 PASS | `GATE_005.md` | LOCKED |
| JOB-006 | Manual control, SVG model và preset animation | JOB-005 PASS | `GATE_006.md` | LOCKED |
| JOB-007 | Automatic cycle, animation controller và progress | JOB-006 PASS | `GATE_007.md` | LOCKED |
| JOB-008 | Hydraulic telemetry, warnings và model disclosure | JOB-007 PASS | `GATE_008.md` | LOCKED |
| JOB-009 | MVP integration, E2E tests và release docs | JOB-008 PASS | `GATE_009.md` | LOCKED |

---

## Quy tắc cho The Coder

- Chỉ triển khai JOB có trạng thái `READY`.
- Đọc `INTAKE.md`, `BLUEPRINT.md`, `CONTRACT.md`, `BUILD_PLAN.md`, và Gate tương ứng trước khi sửa file.
- Ghi tiến độ vào `BUILD_LOG.md`.
- Không tự ý thay đổi scope, kiến trúc, công thức, dependency direction hoặc tên module đã chốt.
- Nếu thiếu thông tin, dừng ở trạng thái `BLOCKED` và ghi rõ câu hỏi trong `BUILD_LOG.md`.

---

## JOB BRIEF — JOB-001: Project foundation và scaffolding

### Trạng thái

- **Trạng thái**: READY
- **Phụ thuộc**: `GATE_000.md` PASS
- **Gate**: `GATE_001.md`
- **Người thực hiện**: The Coder
- **Người kiểm tra**: The Reviewer

---

### Mục tiêu

Khởi tạo nền móng dự án React + TypeScript + Vite chạy được trên local, có cấu trúc thư mục đúng theo `BLUEPRINT.md`, có công cụ kiểm tra tối thiểu, và có app shell ban đầu để các JOB sau phát triển tiếp.

JOB này tạo nền kỹ thuật, chưa triển khai logic mô phỏng máy xúc, chưa triển khai động học, thủy lực hoặc chu trình tự động.

---

### Context

Tham khảo:

- `BLUEPRINT.md` — mục `Tech Stack Decisions`.
- `BLUEPRINT.md` — mục `Cấu trúc Thư mục Dự án`.
- `CONTRACT.md` — nhóm Scope A: Hạ tầng dự án.
- `CONTRACT.md` — mục `Môi Trường Kỹ Thuật`.

JOB-001 nằm ở đầu pipeline. Output của JOB này là project frontend chạy được, để JOB-002 bổ sung tài liệu nền và các ADR, sau đó JOB-003 mới bắt đầu tạo type/config/simulation primitive.

---

### Input

| Input | Mô tả | Source |
|---|---|---|
| Kiến trúc đã duyệt | Module map, dependency direction, project layout | `BLUEPRINT.md` |
| Phạm vi MVP | Deliverable, DoD, môi trường kỹ thuật | `CONTRACT.md` |
| Tooling mục tiêu | React 18, TypeScript 5, Vite 5, Zustand, Vitest, RTL, Playwright, CSS Modules | `CONTRACT.md` |
| Repository hiện tại | Thư mục dự án đang có tài liệu và asset tham chiếu | Workspace hiện tại |

---

### Output

The Coder cần tạo hoặc cập nhật:

| Output | Format / vị trí | Ghi chú |
|---|---|---|
| Project frontend Vite | `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html` | Dùng React + TypeScript |
| Entry app | `src/main.tsx`, `src/App.tsx` | App shell tối thiểu |
| Style nền | `src/styles/tokens.css`, `src/styles/global.css`, CSS module nếu cần | CSS Modules + CSS variables |
| Cấu trúc thư mục | `src/config/`, `src/types/`, `src/simulation/`, `src/store/`, `src/features/`, `src/components/`, `tests/` | Có thể có `.gitkeep` nếu thư mục rỗng |
| Quality tooling | script `dev`, `build`, `test`, `typecheck` | `lint` khuyến nghị nếu thiết lập nhanh |
| Test smoke | Một test tối thiểu cho app render hoặc utility mẫu | Vitest + React Testing Library |
| README nền | `README.md` | Hướng dẫn install/run/build/test ở mức tối thiểu |
| BUILD_LOG cập nhật | `BUILD_LOG.md` | Ghi file đã tạo, lệnh đã chạy, vấn đề nếu có |

---

### Đặc tả kỹ thuật

1. Khởi tạo frontend bằng React + TypeScript + Vite.
2. Bật TypeScript strict mode.
3. Cấu hình path alias nếu phù hợp, ưu tiên alias ngắn như `@/`.
4. Tạo cấu trúc thư mục theo `BLUEPRINT.md`; chưa cần implement đầy đủ module.
5. `App.tsx` chỉ cần app shell tối thiểu:
   - Header tên dự án.
   - Main area có vùng scene placeholder.
   - Sidebar control placeholder.
   - Footer/status placeholder.
   - Nhãn rõ: "Mô hình đơn giản hóa giáo dục — chưa dùng cho thiết kế hoặc vận hành máy thật."
6. Chưa viết logic mô phỏng:
   - Không viết `forwardKinematics`.
   - Không viết hydraulic model.
   - Không viết animation controller.
   - Không viết cycle state machine.
7. Tạo smoke test để chứng minh project test được.
8. README phải đủ cho người khác chạy:
   - Install.
   - Run dev.
   - Build.
   - Test.
   - Typecheck.

---

### Ràng buộc The Coder không được tự ý thay đổi

- Không thêm backend.
- Không dùng framework khác React.
- Không đổi rendering target khỏi SVG cho MVP.
- Không dùng Tailwind nếu chưa có Architecture Review; JOB-001 dùng CSS Modules/CSS variables như `CONTRACT.md`.
- Không hard-code logic mô phỏng trong component.
- Không đưa thư viện nặng hoặc không cần thiết vào project foundation.
- Không triển khai ngoài scope JOB-001.
- Không xóa hoặc sửa nội dung phê duyệt trong `INTAKE.md`, `BLUEPRINT.md`, `CONTRACT.md`, `GATE_000.md`.

---

### Lệnh kiểm tra bắt buộc

The Coder phải chạy và ghi kết quả vào `BUILD_LOG.md`:

```powershell
npm install
npm run build
npm run test
npm run typecheck
```

Nếu có script chưa tồn tại, The Coder phải tạo script tương ứng trong `package.json`.

---

### Tiêu chí Gate của JOB-001

- [ ] Project có `package.json` với scripts `dev`, `build`, `test`, `typecheck`.
- [ ] `npm install` hoàn tất.
- [ ] `npm run build` pass.
- [ ] `npm run test` pass.
- [ ] `npm run typecheck` pass.
- [ ] `src/main.tsx` và `src/App.tsx` tồn tại.
- [ ] Cấu trúc thư mục nền tồn tại theo blueprint.
- [ ] App shell hiển thị đủ vùng chính: header, scene placeholder, control placeholder, status/footer.
- [ ] README có hướng dẫn chạy tối thiểu.
- [ ] `BUILD_LOG.md` được cập nhật cho JOB-001.

---

## JOB BRIEF các JOB tiếp theo

Chưa phát hành.

The Brain sẽ chỉ phát hành JOB-002 sau khi:

- The Coder hoàn tất JOB-001 và cập nhật `BUILD_LOG.md`.
- The Reviewer kiểm tra theo `GATE_001.md`.
- The Brain xác nhận `GATE_001.md` PASS.
