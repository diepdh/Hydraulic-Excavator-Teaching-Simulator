# ADR-005: Sử dụng mô hình thủy lực tĩnh giả định (Quasi-static Hydraulic Approximation Model)
# Last updated: 2026-06-29

## Status
APPROVED

## Context
Mục tiêu cốt lõi của Simulator là phục vụ giảng dạy sinh viên đại học hiểu về mối quan hệ nhân quả trong hệ truyền động thủy lực máy công trình:
1. Tải trọng gầu tăng $\rightarrow$ Áp suất yêu cầu tăng.
2. Tốc độ chuyển động khớp tăng $\rightarrow$ Lưu lượng yêu cầu tăng.
3. Áp suất và lưu lượng cùng tăng $\rightarrow$ Công suất thủy lực tăng.
4. Ga động cơ giới hạn lưu lượng khả dụng tối đa.

Một mô hình thủy lực vật lý chính xác 100% (chất lỏng phân bố, tổn thất cục bộ qua van, động lực học dòng chảy quá độ) đòi hỏi giải hệ phương trình vi phân phi tuyến (ODEs/PDEs) theo thời gian thực. Điều này:
- Quá phức tạp và đòi hỏi năng lực tính toán cực lớn của CPU máy tính client.
- Dễ dẫn đến mất ổn định số học (lỗi phân kỳ) nếu bước thời gian tích phân không đủ nhỏ.
- Không cần thiết đối với một ứng dụng web phục vụ trực quan hóa khái niệm (Functional Replica).

## Decision
Quyết định áp dụng **Mô hình thủy lực tĩnh giả định (Quasi-static/Algebraic Model)** đơn giản hóa:
- Áp suất hệ thống $p$ được tính đại diện dựa trên tải trọng tĩnh (Payload) nhân với một hệ số proxy hình học đơn giản đại diện cho cánh tay đòn moment lực: $p = p_{base} + k_{p} \times Payload \times Reach$.
- Lưu lượng $Q$ được tính bằng tổng vận tốc chuyển động tịnh tiến giả định của các xy lanh: $Q = \sum (A_i \times v_i) \times k_{flow}$.
- Công suất thủy lực $P = p \times Q$ được tính trực tiếp từ áp suất và lưu lượng tức thời.
- Áp suất bị giới hạn cứng bởi van an toàn (Relief Valve) và lưu lượng bị giới hạn bởi tay ga (Throttle).
- Bắt buộc hiển thị nhãn disclaimer trong ứng dụng để thông báo tính chất đơn giản hóa của mô hình.

## Consequences
- **Ưu điểm**:
  - Tính toán siêu nhanh bằng công thức đại số cơ bản, không có nguy cơ mất ổn định số học hay crash trình duyệt.
  - Thể hiện được chính xác mối quan hệ vật lý định tính (Monotonicity) phục vụ giảng dạy.
  - Dễ kiểm thử và đảm bảo tính chất tất định (Deterministic - cùng đầu vào luôn cho cùng đầu ra).
- **Nhược điểm**:
  - Không thể hiện được các hiện tượng động lực học quá độ thực tế như hiện tượng búa nước, sụt áp nhanh khi đổi chiều van đột ngột, hay dao động áp suất.
