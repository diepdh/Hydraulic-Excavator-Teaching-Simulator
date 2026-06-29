# ADR-003: Kiến trúc Local-first (không cần Backend/Internet) cho bản MVP
# Last updated: 2026-06-29

## Status
APPROVED

## Context
Dự án được xây dựng với mục tiêu ban đầu là tạo ra bản Functional Replica mô phỏng máy xúc thủy lực, sau đó ứng dụng rộng rãi trong các phòng máy thực hành tại các trường đại học (nơi chất lượng kết nối Internet có thể không ổn định hoặc không có máy chủ riêng để duy trì). MVP cần:
1. Triển khai nhanh gọn, giảm thiểu tối đa chi phí vận hành máy chủ và bảo trì API.
2. Dễ dàng chạy offline hoàn toàn trên mọi máy tính cá nhân của sinh viên hoặc giảng viên.
3. Không bị tắc nghẽn hoặc gián đoạn do các sự cố mạng.

## Decision
Quyết định xây dựng ứng dụng theo kiến trúc **Local-first/Client-side only**:
- Toàn bộ thuật toán động học (Kinematics), mô hình thủy lực (Hydraulics), bộ nội suy chuyển động (Animation), và máy trạng thái (Cycle State Machine) đều được viết bằng TypeScript thuần chạy trực tiếp trên Browser Engine của Client.
- Trạng thái được quản lý cục bộ trong RAM bằng Zustand store.
- Không xây dựng cơ sở dữ liệu máy chủ hay API backend. Sản phẩm đóng gói cuối cùng chỉ là một bộ file tĩnh HTML, JS và CSS (Static build).

## Consequences
- **Ưu điểm**:
  - Không tốn chi phí vận hành server, database hay API Gateway.
  - Tốc độ tải và phản hồi siêu nhanh do tính toán chạy trực tiếp tại local mà không chịu độ trễ mạng (Network Latency).
  - Có thể chạy offline hoàn toàn (ví dụ: mở file HTML từ đĩa cứng hoặc chạy local server ngoại tuyến).
  - An toàn, bảo mật dữ liệu, không có rủi ro lộ lọt thông tin người dùng qua mạng.
- **Nhược điểm**:
  - Việc lưu kết quả thực hành của sinh viên (Phase 9) sẽ bị giới hạn ở LocalStorage hoặc export ra file CSV tải về đĩa cứng của người dùng thay vì lưu tập trung trên database.
  - Khó phân tích hành vi người dùng trên diện rộng nếu không có backend thu thập log telemetry.
