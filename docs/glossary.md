# Thuật Ngữ Dự Án (Glossary)
# Hydraulic Excavator Teaching Simulator
# Version: 1.0 — 2026-06-29

Tài liệu này định nghĩa các thuật ngữ kỹ thuật, cơ học và thủy lực được sử dụng thống nhất trong toàn bộ tài liệu thiết kế (Blueprint), mã nguồn (Codebase), và giao diện người dùng (UI) của dự án.

---

## 1. Cơ cấu công tác (Excavator Linkage)

### 1.1. Boom (Cần nâng)
- **Tên tiếng Việt**: Cần nâng
- **Định nghĩa**: Khâu đầu tiên của cơ cấu công tác máy xúc, nối trực tiếp với thân máy (Base) qua một khớp quay. Cần nâng chịu trách nhiệm nâng hoặc hạ toàn bộ cụm tay gầu và gầu.
- **Ký hiệu & Đơn vị**: $L_{boom}$ (mét), $\theta_{boom}$ (radian/độ)

### 1.2. Arm / Stick (Tay gầu)
- **Tên tiếng Việt**: Tay gầu
- **Định nghĩa**: Khâu thứ hai của cơ cấu công tác, nối giữa cần nâng (Boom) và gầu xúc (Bucket). Có nhiệm vụ đẩy gầu ra xa hoặc kéo gầu về phía cabin để đào đất.
- **Ký hiệu & Đơn vị**: $L_{arm}$ (mét), $\theta_{arm}$ (radian/độ)

### 1.3. Bucket (Gầu xúc)
- **Tên tiếng Việt**: Gầu xúc
- **Định nghĩa**: Khâu cuối cùng của cơ cấu công tác, thực hiện trực tiếp nhiệm vụ xúc hoặc đổ vật liệu.
- **Ký hiệu & Đơn vị**: $L_{bucket}$ (mét), $\theta_{bucket}$ (radian/độ)

### 1.4. Joint (Khớp xoay)
- **Tên tiếng Việt**: Khớp xoay
- **Định nghĩa**: Các điểm liên kết xoay giữa các khâu công tác (Base-Boom, Boom-Arm, Arm-Bucket). Trong mô phỏng 2D phẳng, mỗi khớp đại diện cho 1 bậc tự do quay.
- **Đơn vị**: Radian (trong tính toán động học) / Độ (hiển thị giao diện)

### 1.5. End Effector / Bucket Tip (Đầu gầu)
- **Tên tiếng Việt**: Đầu gầu / Điểm tác động cuối
- **Định nghĩa**: Điểm xa nhất trên răng gầu xúc, được dùng làm điểm tham chiếu chính để tính toán tọa độ làm việc (Reach và Height) trong hệ tọa độ 2D phẳng.

---

## 2. Thông số hình học & Động học (Kinematics)

### 2.1. Reach (Tầm với)
- **Tên tiếng Việt**: Tầm với
- **Định nghĩa**: Khoảng cách nằm ngang từ tâm xoay của cần nâng (Boom Base Pivot) đến đầu gầu (Bucket Tip).
- **Ký hiệu & Đơn vị**: $X$ (mét) hoặc $Reach$ (mét)

### 2.2. Height (Cao độ)
- **Tên tiếng Việt**: Cao độ / Chiều cao đầu gầu
- **Định nghĩa**: Khoảng cách thẳng đứng tính từ tâm xoay cần nâng đến đầu gầu. Giá trị dương khi đầu gầu cao hơn tâm xoay, âm khi thấp hơn mặt đất (đang đào dưới sâu).
- **Ký hiệu & Đơn vị**: $Y$ (mét) hoặc $Height$ (mét)

---

## 3. Hệ thống thủy lực (Hydraulics)

### 3.1. Payload (Tải trọng gầu)
- **Tên tiếng Việt**: Tải trọng gầu / Khối lượng tải
- **Định nghĩa**: Khối lượng của đất đá hoặc vật liệu chứa trong gầu xúc. Tải trọng này sinh ra mô-men cản tại các khớp, ảnh hưởng trực tiếp đến áp suất yêu cầu của hệ thống thủy lực.
- **Đơn vị**: Kilôgam (kg)

### 3.2. Pressure (Áp suất)
- **Tên tiếng Việt**: Áp suất thủy lực
- **Định nghĩa**: Áp suất dầu trong hệ thống xi lanh thủy lực tạo ra lực để di chuyển các khâu. Trong mô hình MVP, áp suất tỷ lệ thuận với tải trọng gầu (Payload) và mô-men cản tĩnh.
- **Đơn vị**: Pascal (Pa) trong tính toán / Bar ở UI (1 bar = 100,000 Pa)

### 3.3. Flow Rate (Lưu lượng)
- **Tên tiếng Việt**: Lưu lượng dầu
- **Định nghĩa**: Thể tích chất lỏng đi qua hệ thống trong một đơn vị thời gian. Lưu lượng tỷ lệ thuận với tốc độ di chuyển của các xy lanh (tốc độ quay các khớp) và chịu ảnh hưởng của ga động cơ (Throttle).
- **Đơn vị**: $m^3/s$ trong tính toán / Lít/phút (L/min) ở UI

### 3.4. Hydraulic Power (Công suất thủy lực)
- **Tên tiếng Việt**: Công suất thủy lực
- **Định nghĩa**: Tích của áp suất và lưu lượng trong hệ thống, thể hiện mức năng lượng tiêu thụ của cơ cấu công tác.
- **Công thức & Đơn vị**: $P = p \times Q$ (Watt trong tính toán / kW ở UI)

### 3.5. Throttle (Ga động cơ)
- **Tên tiếng Việt**: Ga động cơ / Tay ga
- **Định nghĩa**: Thanh điều khiển lượng cung cấp công suất tối đa từ động cơ diesel cho bơm thủy lực, giới hạn lưu lượng dầu lớn nhất mà hệ thống có thể cung cấp.
- **Giá trị**: Chuẩn hóa trong khoảng $[0.0, 1.0]$ hoặc $[0\%, 100\%]$

---

## 4. Điều khiển & Trạng thái mô phỏng (Control & Simulation State)

### 4.1. Preset (Tư thế đặt trước)
- **Tên tiếng Việt**: Tư thế đặt trước / Preset
- **Định nghĩa**: Tập hợp các góc khớp xác định sẵn đại diện cho một tư thế làm việc chuẩn của máy xúc (ví dụ: Ready, Dig, Lift, Dump). Khi chọn, hệ thống tự động nội suy chuyển động để di chuyển mượt mà tới tư thế đó.

### 4.2. Cycle Step (Bước chu trình)
- **Tên tiếng Việt**: Bước chu trình tự động
- **Định nghĩa**: Các trạng thái phân tách tuần tự trong một chu kỳ tự động xúc đổ (ví dụ: IDLE, APPROACH, LOWER, SCOOP, LIFT, DUMP, RETURN, COMPLETE).

### 4.3. Simulation Time (Thời gian mô phỏng)
- **Tên tiếng Việt**: Thời gian mô phỏng
- **Định nghĩa**: Thời gian logic của mô phỏng, có thể bị tạm dừng (Paused) hoặc tua nhanh. Khác với thời gian thực của hệ thống (Wall clock).
- **Đơn vị**: Giây (s)

### 4.4. Real Time / Wall Clock (Thời gian thực)
- **Tên tiếng Việt**: Thời gian thực
- **Định nghĩa**: Thời gian thực tế trôi qua trên đồng hồ của hệ điều hành, được sử dụng để tính toán lượng thời gian trôi qua giữa các frame vẽ (Delta time) nhằm đảm bảo chuyển động mượt mà độc lập tốc độ xử lý.

### 4.5. Clamp (Giới hạn giá trị / Cắt biên)
- **Tên tiếng Việt**: Giới hạn biên / Cắt biên
- **Định nghĩa**: Hàm toán học giữ cho một giá trị nằm cố định trong phạm vi $[Min, Max]$ cho trước, ngăn không cho các khâu quay vượt quá góc giới hạn cơ khí vật lý.

### 4.6. Warning (Cảnh báo)
- **Tên tiếng Việt**: Cảnh báo vận hành
- **Định nghĩa**: Các chỉ báo trực quan hiển thị khi hệ thống chạm hoặc vượt quá ranh giới vận hành an toàn nhưng chưa gây hỏng hóc (ví dụ: chạm giới hạn khớp cơ học, áp suất chạm ngưỡng van an toàn).

### 4.7. Fault (Lỗi hệ thống)
- **Tên tiếng Việt**: Lỗi hệ thống
- **Định nghĩa**: Trạng thái lỗi không thể tự phục hồi và yêu cầu reset mô phỏng (ví dụ: quá tải nghiêm trọng kéo dài, dữ liệu cấu hình đầu vào không hợp lệ).
