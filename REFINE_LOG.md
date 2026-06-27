# REFINE_LOG.md
# Kê đơn sửa lỗi của The Brain — Hydraulic Excavator Teaching Simulator
# Status: EMPTY
# Last updated: 2026-06-27

---

## Mục đích

The Brain dùng file này sau khi đọc `REVIEW_REPORT.md` và phát hiện một JOB bị `FAIL`.

File này không dùng để viết lại code, mà dùng để chỉ rõ:

- Lỗi thuộc loại nào.
- Cần sửa logic/interface/ràng buộc nào.
- Tiêu chí cụ thể để pass lần sau.

---

## Trạng thái hiện tại

Chưa có JOB nào được review `FAIL`, nên chưa có REFINE.

---

## Template REFINE

```markdown
## REFINE-[NNN] — JOB-[NNN] (YYYY-MM-DD HH:mm)

### Chẩn đoán

- Loại lỗi: Logic Error / Interface Error / Constraint Violation / Quality Issue / Scope Creep
- Mô tả:
  - [mô tả cụ thể vấn đề]

### Kê đơn sửa lỗi

- File/module cần sửa:
  - [path hoặc module]
- Nội dung cần sửa:
  - [mô tả chính xác]
- Không được thay đổi:
  - [ràng buộc giữ nguyên]

### Tiêu chí để PASS lần sau

- [ ] [tiêu chí cụ thể]
- [ ] [tiêu chí cụ thể]
```
