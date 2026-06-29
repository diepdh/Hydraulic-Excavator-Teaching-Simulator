# ADR-004: Thiết kế mô phỏng theo mô hình hướng cấu hình (Config-driven Simulation)
# Last updated: 2026-06-29

## Status
APPROVED

## Context
Máy xúc mô phỏng có nhiều thông số hình học (chiều dài khâu Boom, Arm, Bucket), các giới hạn vận hành (góc quay tối đa, tối thiểu), các bước trong chu trình tự động, và các tư thế đặt trước (Presets). 
Nếu các thông số này được lập trình cứng (hard-coded) phân tán trong các React component hoặc logic tính toán:
1. Sẽ cực kỳ khó khăn cho giảng viên khi muốn tùy biến kích thước máy xúc hoặc thiết lập các bài thực hành khác nhau (họ sẽ phải sửa mã nguồn và biên dịch lại).
2. Gây khó khăn lớn cho việc kiểm thử tự động (Unit Test) vì không thể inject các mock configurations khác nhau để kiểm tra các biên giới hạn.
3. Codebase bị coupling chặt chẽ giữa logic hiển thị và tham số mô phỏng.

## Decision
Quyết định thiết kế hệ thống theo mô hình **Config-driven**:
- Tách biệt toàn bộ thông số mô phỏng ra các file cấu hình chuyên biệt đặt tại thư mục `src/config/` (ví dụ: `geometry.ts`, `hydraulicParams.ts`, `cycleDefinition.ts`, `presets.ts`).
- Logic tính toán động học và thủy lực chỉ nhận cấu hình này làm đầu vào (input parameters) thông qua các hàm thuần khiết (pure functions).
- Giao diện UI tự động sinh ra các slider điều khiển, các nút bấm preset và các thẻ telemetry dựa trên schema của file cấu hình.

## Consequences
- **Ưu điểm**:
  - Giảng viên có thể tùy biến toàn bộ mô hình cơ học và thủy lực mà không cần biết lập trình frontend, chỉ cần thay đổi các giá trị số trong file cấu hình.
  - Dễ dàng viết Unit Test: kiểm thử viên có thể chạy kiểm định động học với nhiều kích thước máy xúc giả lập khác nhau.
  - Tách biệt hoàn toàn mối quan tâm (Separation of concerns) giúp code sạch, dễ bảo trì.
- **Nhược điểm**:
  - Cần xây dựng cơ chế kiểm tra tính hợp lệ của file cấu hình (config validation) khi ứng dụng khởi chạy để tránh crash do người dùng nhập giá trị sai biên (ví dụ: chiều dài khâu âm, góc max nhỏ hơn góc min).
