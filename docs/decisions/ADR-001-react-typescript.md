# ADR-001: Lựa chọn React + TypeScript + Vite làm nền tảng
# Last updated: 2026-06-29

## Status
APPROVED

## Context
Dự án yêu cầu xây dựng một ứng dụng web mô phỏng máy xúc thủy lực 2D có khả năng tương tác cao phục vụ giảng dạy. Ứng dụng cần:
1. Chạy mượt mà, phản hồi lập tức khi người dùng thao tác kéo slider điều khiển góc khớp.
2. Đảm bảo tính an toàn dữ liệu kiểu tĩnh (type safety) để tránh lỗi runtime khó debug trong quá trình tính toán động học và thủy lực phức tạp.
3. Thời gian khởi động dev server nhanh, cấu trúc nhẹ, dễ đóng gói và triển khai.

## Decision
Quyết định sử dụng bộ công cụ:
- **React 18**: Làm thư viện xây dựng giao diện người dùng. Component model của React và mô hình render theo trạng thái (state-driven rendering) rất phù hợp để đồng bộ hóa giao diện điều khiển với canvas mô phỏng SVG.
- **TypeScript 5 (Strict Mode)**: Cung cấp kiểm tra kiểu tĩnh bắt buộc tại compile-time, giúp định nghĩa rõ ràng các kiểu dữ liệu của vector, điểm tọa độ, và cấu hình mô phỏng.
- **Vite 5**: Công cụ bundler/build tool thay thế cho Webpack, tăng tốc độ Hot Module Replacement (HMR) trong quá trình phát triển và tối ưu hóa đóng gói production.

## Consequences
- **Ưu điểm**:
  - Giao diện phản hồi nhanh và chính xác theo thay đổi của store.
  - Ngăn ngừa được phần lớn các lỗi tính toán số học nhờ định nghĩa type rõ ràng của TypeScript (ví dụ: phân biệt góc degree và radian, điểm `Point2D`).
  - Quá trình phát triển nhanh, nhẹ, dễ bảo trì.
- **Nhược điểm**:
  - Cần cấu hình TypeScript ban đầu tương đối nghiêm ngặt.
  - Người phát triển phải tuân thủ nghiêm chỉnh việc gán kiểu dữ liệu, không sử dụng kiểu `any` lạm dụng.
