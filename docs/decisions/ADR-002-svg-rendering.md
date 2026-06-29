# ADR-002: Sử dụng công nghệ SVG cho đồ họa mô phỏng 2D
# Last updated: 2026-06-29

## Status
APPROVED

## Context
Mô phỏng máy xúc thủy lực 2D cần thể hiện được chuyển động quay và tịnh tiến của các khâu cơ học (Boom, Arm, Bucket) và các xy lanh thủy lực một cách trực quan, mượt mà (>= 60 FPS). Có ba phương án hiển thị đồ họa chính trong trình duyệt:
1. **HTML5 Canvas (2D Context)**: Vẽ bằng mã lệnh JavaScript, hiệu năng tốt nhưng khó quản lý đối tượng đồ họa và không có cấu trúc DOM để debug.
2. **WebGL / Three.js**: Đồ họa 3D/2D hiệu năng cực cao bằng GPU, tuy nhiên quá phức tạp cho mô hình cơ cấu phẳng và tốn thời gian phát triển lớn.
3. **SVG (Scalable Vector Graphics)**: Mô tả đồ họa dạng XML/DOM vector, hỗ trợ sẵn các phép biến đổi hình học (transform: rotate, translate) dựa trên hệ phân cấp thẻ.

## Decision
Quyết định sử dụng **SVG (Scalable Vector Graphics)** nội tuyến (inline SVG) trong React components để dựng và cập nhật mô hình máy xúc 2D.

## Consequences
- **Ưu điểm**:
  - Phù hợp hoàn hảo cho cơ cấu phẳng 2D: các khớp quay của máy xúc được biểu diễn tự nhiên qua phân cấp thẻ `<g>` (group) lồng nhau với thuộc tính `transform="rotate(...)"`.
  - SVG hoạt động như các phần tử DOM thông thường, dễ dàng kiểm tra (inspect elements) bằng trình duyệt Web khi debug tọa độ và điểm tâm xoay (pivot).
  - Tự động co giãn theo độ phân giải màn hình mà không bị vỡ ảnh (responsive tự nhiên).
  - Dễ dàng tích hợp với React state (các góc khớp trong store thay đổi sẽ cập nhật trực tiếp vào thuộc tính transform của thẻ SVG).
- **Nhược điểm**:
  - Hiệu năng render DOM của trình duyệt sẽ bị ảnh hưởng nếu số lượng phần tử SVG quá lớn (> hàng nghìn). Tuy nhiên mô hình máy xúc 2D chỉ có vài chục phần tử đồ họa nên hiệu năng được đảm bảo mượt mà ở mức 60 FPS.
