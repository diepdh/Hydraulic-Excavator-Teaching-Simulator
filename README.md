# Hydraulic Excavator Teaching Simulator
# Trình giả lập giảng dạy máy xúc thủy lực 2D (MVP v1.0.0)

Trình giả lập Webapp 2D mô phỏng động học và hệ thống truyền động thủy lực máy xúc, phục vụ đắc lực cho hoạt động thực hành trực quan của sinh viên ngành Máy xây dựng / Thủy lực thể tích tại các trường đại học kỹ thuật.

---

## 🛠 Công nghệ sử dụng
- **Lõi cơ bản**: React 18, TypeScript 5, Vite 5.
- **Quản lý trạng thái**: Zustand 4 (Quản lý trạng thái nguồn tập trung, đồng bộ).
- **Mô phỏng đồ họa**: SVG (Client-side rendering phân cấp, đảm bảo khống chế sai số, không bị rời khớp khâu cơ học).
- **Kiểm thử**: Vitest, React Testing Library (Bao phủ Unit Test và E2E Test tích hợp).
- **Ngôn ngữ**: Giao diện và tài liệu hoàn toàn bằng tiếng Việt kỹ thuật chuẩn xác.

---

## 📐 Kiến trúc mô phỏng & Mô hình vật lý

### 1. Động học thuận (Forward Kinematics)
Toàn bộ tọa độ khớp trong không gian 2D được tính toán động từ các góc khâu:
- **Cần nâng (Boom)**: Chiều dài $L_{boom} = 4.0\text{ m}$, góc min/max $[-10^\circ, 70^\circ]$.
- **Tay gầu (Arm)**: Chiều dài $L_{arm} = 2.8\text{ m}$, góc min/max $[-10^\circ, 120^\circ]$.
- **Gầu xúc (Bucket)**: Chiều dài $L_{bucket} = 1.5\text{ m}$, góc min/max $[-30^\circ, 90^\circ]$.
- **Hệ tọa độ**: Gốc tọa độ $(0,0)$ tại Boom Pivot Base (khớp vai). Trục Y hướng lên vật lý, trục X hướng sang phải. SVG canvas tự động chuyển đổi sang hệ tọa độ Y-down (pixel) thông qua tỉ lệ scale $1\text{ m} = 80\text{ px}$.

### 2. Truyền động thủy lực tĩnh giả định (Quasi-Static Hydraulics)
Hệ thống tính toán thời gian thực các thông số:
- **Áp suất hệ thống ($p$)**: Tính toán dựa trên lực tải trọng gầu tĩnh ($F_{load} = m \cdot g$) và hiệu ứng cánh tay đòn cơ học (Lever Arm ratio phụ thuộc động sinh vào góc cần nâng Boom). Giới hạn tối đa bởi van an toàn xả tràn (Pressure Relief Valve) $p_{max} = 250\text{ bar}$.
- **Lưu lượng dầu ($Q$)**: Tỷ lệ tuyến tính với tay ga động cơ (Throttle) cấp cho bơm thủy lực: $Q = Q_{max} \cdot \text{throttle} \cdot \eta_{vol}$ (với $Q_{max} = 120\text{ L/min}$, hiệu suất thể tích $\eta_{vol} = 95\%$).
- **Công suất hữu ích ($P$)**: Đảm bảo quan hệ vật lý nhất quán tuyệt đối: $P = p \cdot Q$.

---

## 📋 Kịch bản Demo Flow chuẩn (Kiểm thử thực tế)

Để kiểm chứng toàn bộ tính năng của phiên bản MVP, người dùng thực hiện các bước sau:

1. **Điều khiển thủ công (Manual Mode)**:
   - Thay đổi các thanh trượt Boom, Arm, Bucket trên Bảng điều khiển $\rightarrow$ mô hình SVG máy xúc di chuyển tương ứng, TelemetryPanel cập nhật tọa độ răng gầu ($X, Y$) tức thời.
   - Thay đổi tải trọng gầu (Payload) và tay ga (Throttle) $\rightarrow$ theo dõi sự thay đổi của Áp suất (bar/psi), Lưu lượng (L/min) và Công suất (kW/HP).
2. **Kích hoạt cảnh báo quá biên cơ học**:
   - Kéo bất kỳ slider khớp nào chạm giới hạn tối thiểu hoặc tối đa $\rightarrow$ WarningPanel xuất hiện cảnh báo (ví dụ: `BOOM_LIMIT` cấp độ Warning).
3. **Kích hoạt cảnh báo quá tải thủy lực**:
   - Thiết lập Payload lên mức trên $1600\text{ kg}$ $\rightarrow$ xuất hiện cảnh báo `OVERLOAD` (cấp độ Critical).
   - Hạ Boom xuống góc cực thấp (ví dụ: $-10^\circ$) để tăng tối đa cánh tay đòn momen, đồng thời gán Payload $> 1500\text{ kg}$ $\rightarrow$ Áp suất thô vượt quá $250\text{ bar}$ kích hoạt van xả tràn $\rightarrow$ xuất hiện cảnh báo `RELIEF_ACTIVE` (Van an toàn mở, bơm bị xả tràn).
4. **Vận hành Presets**:
   - Nhấp vào các nút Presets (Tư thế sẵn sàng, Tư thế đào, Tư thế nâng cần, Tư thế đổ gầu) $\rightarrow$ mô hình máy xúc nội suy mượt mà qua Cubic Ease-In-Out đến góc mục tiêu trong 800ms.
5. **Chạy chu trình tự động (Auto Cycle)**:
   - Nhấp nút **Chạy Chu Trình** $\rightarrow$ Hệ thống tự động chuyển đổi qua 8 bước tuần tự (`APPROACH -> LOWER -> SCOOP -> LIFT -> DUMP -> RETURN -> COMPLETE`), có thanh tiến độ thể hiện `Tiến độ chu trình` và `Tiến độ bước` riêng biệt.
   - Thử nghiệm các phím **Tạm Dừng**, **Tiếp Tục**, **Đặt Lại** tại bất kỳ bước nào để kiểm tra tính năng đóng băng/tiếp quản thời gian của SimClock.

---

## 🛠 Hướng dẫn cài đặt và chạy Local

### 1. Cài đặt các package phụ thuộc
Yêu cầu Node.js >= 20 LTS. Chạy lệnh sau tại thư mục gốc:
```bash
npm install
```

### 2. Chạy ứng dụng trong môi trường Dev
Khởi động dev server local (mặc định tại port 5173):
```bash
npm run dev
```

### 3. Chạy toàn bộ bộ kiểm thử (Unit & E2E)
Chạy 32 test cases kiểm chứng dynamic kinematics, hydraulics, clock và UI flow:
```bash
npm run test
```

### 4. Kiểm tra kiểu dữ liệu (Type check)
```bash
npm run typecheck
```

### 5. Build đóng gói Production
Biên dịch ứng dụng thành các file tĩnh HTML/JS/CSS tối ưu hóa:
```bash
npm run build
```

---

## 📁 Cấu trúc thư mục dự án
- `src/config/`: Định nghĩa các hằng số tham số tĩnh hình học, áp suất, presets, warning rules.
- `src/types/`: Khai báo chặt chẽ kiểu dữ liệu cho toàn bộ ứng dụng.
- `src/simulation/`: Lõi tính toán động học và thủy lực thuần túy (Không phụ thuộc React/UI).
  - `kinematics/`: Lõi FK và constraint checks.
  - `hydraulics/`: Lõi pressure, flow, power models.
  - `animation/`: Clock controller và interpolation helpers.
  - `units/`: Hệ thống quy đổi đơn vị đo lường thủy lực.
- `src/store/`: Zustand store chính quản lý logic tick RAF và chu trình tự động.
- `src/features/`: Các custom hooks đóng gói API Feature.
- `src/components/`: Thư mục React Components hiển thị.
- `tests/`: Bộ unit test và E2E test độc lập.

---

## ⚠️ Giới hạn đã biết của phiên bản MVP (Known Limitations)
1. **Giả lập 2D phẳng**: Mô hình cơ học đang biểu diễn trên mặt phẳng 2D đứng, chưa bao gồm chuyển động xoay cabin (Yaw) hoặc di chuyển di chuyển bánh xích (Travel).
2. **Quasi-static Hydraulics**: Áp suất và lưu lượng là mô hình tĩnh trạng thái ổn định, chưa bao gồm các hiệu ứng quá độ thủy lực động (Transient dynamics) như búa nước (water hammer), dao động áp suất dòng dầu hoặc tổn thất áp suất ma sát trên đường ống dẫn cứng và ống mềm.
3. **Hiệu suất nhiệt**: Chưa tích hợp mô hình tổn hao nhiệt năng, sụt giảm độ nhớt dầu thủy lực theo thời gian vận hành.
4. **Hệ thống dạy học (Teaching Lesson)**: Các bài học thực hành tương tác tự động vàTelemetry log export định dạng JSON/CSV sẽ được bổ sung tại các phase tiếp theo sau bản release MVP này.

---

## ✉️ Thông tin bản quyền & Cảnh báo giáo dục
Dự án được phát triển dưới sự ủy quyền của Chủ dự án.  
> [!WARNING]  
> **Mô phỏng đơn giản hóa phục vụ mục đích giảng dạy. Không dùng cho thiết kế kỹ thuật thực tế.**
