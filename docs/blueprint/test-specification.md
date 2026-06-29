# Chi tiết Thiết kế — Đặc Tả Kiểm Thử (Test Specification)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này xác định chiến lược kiểm thử, phân tầng kiểm thử, và các kịch bản kiểm tra bắt buộc đối với dự án mô phỏng máy xúc thủy lực.

---

## 1. Chiến lược phân tầng kiểm thử (Testing Strategy)

Dự án áp dụng mô hình phân tầng kiểm thử kim tự tháp:

```
      /\
     /  \     E2E Test (Playwright - 12 kịch bản)
    /----\
   /      \   Component Test (React Testing Library)
  /--------\
 /          \ Unit Test (Vitest - Lõi mô phỏng)
/____________\
```

- **Unit Test (Tầng cơ sở)**: Viết bằng **Vitest** chạy offline. Tập trung vào kiểm định toàn bộ hàm toán học thuần khiết trong `src/simulation/`. Mục tiêu coverage $\ge 80\%$.
- **Component Test**: Viết bằng **React Testing Library**. Kiểm tra khả năng render và tương tác cơ bản của các nút bấm, thanh trượt slider, bảng telemetry trong giao diện.
- **E2E Test (Tầng tích hợp)**: Viết bằng **Playwright**. Mô phỏng toàn bộ luồng thao tác thực tế của người học từ khi mở app, kéo slider khớp, chạy chu trình tự động, pause/resume/reset và xử lý cảnh báo.

---

## 2. Các hàm và module bắt buộc phải có Unit Test
Bất kỳ thay đổi nào ở các module này mà không đi kèm cập nhật test tương ứng hoặc làm giảm test coverage sẽ không được pass các GATE tiếp theo.

1. **`forwardKinematics`** (Động học thuận):
   - Test bộ góc zero ($0^\circ, 0^\circ, 0^\circ$).
   - Test các bộ góc biên (min/max).
   - So sánh kết quả tọa độ $(x, y)$ đầu gầu với số liệu tính toán bằng tay đã được phê duyệt.
2. **`clampAngle`** (Giới hạn góc):
   - Test giá trị nằm ngoài biên (phải bị cắt biên về min hoặc max).
   - Test giá trị nằm sát biên (chênh lệch cực nhỏ $\epsilon$).
3. **`pressureModel`** (Mô hình áp suất):
   - Test tính đơn điệu (Monotonicity): Khi tải trọng ($Payload$) tăng, áp suất ($Pressure$) đầu ra bắt buộc phải tăng hoặc giữ nguyên ở mức giới hạn, không được phép giảm.
   - Test giới hạn van an toàn ($p_{relief}$).
4. **`flowModel`** (Mô hình lưu lượng):
   - Test sự ảnh hưởng của tay ga ($Throttle$): Khi ga bằng 0, lưu lượng tối đa phải bằng 0.
5. **`cycleStateMachine`** (Máy trạng thái chu trình):
   - Test kịch bản chuyển bước thành công (Happy path) từ IDLE đến COMPLETE.
   - Test hành vi tạm dừng (PAUSE) và tiếp tục (RESUME) tại từng bước của chu trình.
   - Test hành vi đặt lại (RESET) tại mọi bước.

---

## 3. Tiêu chuẩn viết mã kiểm thử
- Sử dụng tên test mô tả rõ ràng hành vi kỳ vọng (Ví dụ: `describe('Forward Kinematics', () => { it('should return correct coordinates for zero pose', () => { ... }) })`).
- Mỗi test case phải độc lập, không phụ thuộc vào trạng thái của test case khác.
- Dữ liệu test (test fixtures) phải tách biệt khỏi logic test.
