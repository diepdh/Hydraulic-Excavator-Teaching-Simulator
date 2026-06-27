# GATE_001.md — Cổng kiểm tra cho JOB-001
# Owner: The Brain
# Status: PENDING
# Last updated: 2026-06-27

---

## JOB

- **JOB**: JOB-001
- **Tên**: Project foundation và scaffolding
- **Brief**: `BUILD_PLAN.md` — mục `JOB BRIEF — JOB-001`

---

## Tiêu chí Pass/Fail

| # | Tiêu chí | Loại | Kết quả |
|---|---|---|---|
| 1 | `package.json` tồn tại và có scripts `dev`, `build`, `test`, `typecheck` | REQUIRED | Chưa kiểm tra |
| 2 | `npm install` hoàn tất không lỗi blocking | REQUIRED | Chưa kiểm tra |
| 3 | `npm run build` pass | REQUIRED | Chưa kiểm tra |
| 4 | `npm run test` pass | REQUIRED | Chưa kiểm tra |
| 5 | `npm run typecheck` pass | REQUIRED | Chưa kiểm tra |
| 6 | `src/main.tsx` và `src/App.tsx` tồn tại | REQUIRED | Chưa kiểm tra |
| 7 | Cấu trúc thư mục nền theo `BLUEPRINT.md` tồn tại | REQUIRED | Chưa kiểm tra |
| 8 | App shell có header, scene placeholder, control placeholder, status/footer | REQUIRED | Chưa kiểm tra |
| 9 | README có hướng dẫn install/run/build/test/typecheck | REQUIRED | Chưa kiểm tra |
| 10 | `BUILD_LOG.md` có log JOB-001 | REQUIRED | Chưa kiểm tra |
| 11 | JOB-001 không triển khai vượt scope sang kinematics/hydraulics/cycle | REQUIRED | Chưa kiểm tra |
| 12 | CSS dùng CSS variables/CSS Modules hoặc CSS thường có cấu trúc, không ép đổi stack | RECOMMENDED | Chưa kiểm tra |

---

## Hướng dẫn cho The Reviewer

Reviewer kiểm tra theo thứ tự:

1. Đọc `BUILD_PLAN.md`, mục `JOB BRIEF — JOB-001`.
2. Đọc `CONTRACT.md`, nhóm Scope A và mục môi trường kỹ thuật.
3. Đọc `BLUEPRINT.md`, mục Project Layout và Tech Stack Decisions.
4. Đọc `BUILD_LOG.md`, mục `JOB-001 Log`.
5. Kiểm tra file và chạy lệnh:

```powershell
npm run build
npm run test
npm run typecheck
```

6. Nếu dev server cần kiểm tra giao diện, có thể chạy:

```powershell
npm run dev
```

7. Ghi kết quả vào `REVIEW_REPORT.md` dưới mục `Review JOB-001`.

---

## Kết quả Gate

- **Trạng thái**: PENDING
- **Reviewer**: Chưa có
- **Timestamp**: Chưa có
- **Ghi chú**: Chờ The Coder hoàn tất JOB-001 và cập nhật `BUILD_LOG.md`.
