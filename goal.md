# GOAL.md

# Project Goal — Hydraulic Excavator Teaching Simulator

## 1. Tên dự án tạm thời

**Hydraulic Excavator Teaching Simulator**

Tên tiếng Việt:

**Webapp mô phỏng máy xúc thủy lực phục vụ giảng dạy**

Tên dự án có thể thay đổi trong giai đoạn hoàn thiện sản phẩm, nhưng mục tiêu kỹ thuật và mục tiêu đào tạo trong tài liệu này phải được giữ ổn định.

---

## 2. Mục đích của tài liệu

`goal.md` là tài liệu định hướng xuyên suốt của dự án.

Tài liệu này dùng để:

- Giữ thống nhất mục tiêu giữa Brain, Planner, Coder và Reviewer.
- Ngăn dự án mở rộng sai phạm vi.
- Làm căn cứ xây dựng `blueprint.md`, kiến trúc phần mềm và backlog.
- Làm căn cứ đánh giá mọi quyết định kỹ thuật.
- Làm căn cứ nghiệm thu từng phase.
- Giữ sự thống nhất giữa mô phỏng kỹ thuật và mục tiêu giảng dạy.

Khi có mâu thuẫn giữa các tài liệu, thứ tự ưu tiên là:

1. `goal.md`
2. Blueprint đã được phê duyệt
3. `plan.md`
4. Tài liệu thiết kế chi tiết
5. Mã nguồn hiện tại

Mọi thay đổi làm ảnh hưởng đến mục tiêu, phạm vi hoặc nguyên tắc cốt lõi phải được cập nhật vào `goal.md` trước khi triển khai.

---

## 3. Bối cảnh dự án

Dự án bắt đầu từ nhu cầu xây dựng lại một webapp mô phỏng máy xúc thủy lực 2D quan sát được trong video tham chiếu.

Webapp tham chiếu có các đặc điểm chính:

- Hiển thị mô hình máy xúc thủy lực 2D.
- Cho phép điều khiển cần nâng, tay gầu và gầu xúc.
- Có chế độ điều khiển thủ công.
- Có các tư thế đặt trước.
- Có chu trình làm việc tự động.
- Hiển thị tọa độ, tầm với và cao độ đầu gầu.
- Hiển thị các thông số thủy lực như áp suất, lưu lượng và công suất.
- Có trạng thái chạy, tạm dừng, tiếp tục và đặt lại.

Mục tiêu ban đầu không phải tạo ngay một digital twin chính xác cao, mà là tái tạo được trải nghiệm tương tác và cấu trúc chức năng của webapp tham chiếu, sau đó phát triển thành nền tảng mô phỏng phục vụ giảng dạy sinh viên.

---

## 4. Tầm nhìn sản phẩm

Xây dựng một nền tảng web mô phỏng thiết bị cơ khí – thủy lực có khả năng:

- Trực quan hóa cơ cấu và chuyển động.
- Giải thích quan hệ giữa hình học, tải trọng và thông số thủy lực.
- Cho sinh viên thao tác và quan sát kết quả tức thời.
- Tổ chức bài thực hành có hướng dẫn.
- Ghi nhận kết quả học tập.
- Cho phép giảng viên cấu hình bài học mà không phải sửa mã nguồn.
- Có thể mở rộng sang các cơ cấu thủy lực, khí nén và máy công trình khác.

Máy xúc thủy lực là mô hình đầu tiên và là use case chuẩn để xây dựng nền tảng.

---

## 5. Mục tiêu tổng quát

Xây dựng một webapp chạy trên trình duyệt, ban đầu chạy hoàn toàn trên `localhost`, có giao diện và hành vi tương tự video tham chiếu, cho phép sinh viên:

1. Quan sát cấu tạo và chuyển động của máy xúc thủy lực.
2. Điều khiển ba bậc tự do chính của cơ cấu công tác.
3. Theo dõi vị trí đầu gầu và các đại lượng vận hành.
4. Chạy một chu trình đào – nâng – đổ – trở về.
5. Thực hiện bài tập mô phỏng theo hướng dẫn.
6. Hiểu mối liên hệ giữa góc khớp, tải trọng, áp suất, lưu lượng và công suất.

---

## 6. Mục tiêu giai đoạn đầu

Giai đoạn đầu phải tái tạo được webapp trong video ở mức đủ gần để:

- Nhận diện ngay là cùng loại ứng dụng.
- Có bố cục, nhóm điều khiển và luồng tương tác tương đương.
- Mô hình máy xúc chuyển động liên tục và đúng quan hệ khớp.
- Các thanh trượt điều khiển được mô hình.
- Các tư thế đặt trước hoạt động.
- Chu trình tự động hoạt động.
- Các thông số hiển thị thay đổi hợp lý.
- Ứng dụng chạy ổn định trên Chrome và Edge.
- Không cần backend để vận hành bản MVP.

Mục tiêu của giai đoạn đầu là **functional replica**, không phải bản sao pixel tuyệt đối và không phải mô hình vật lý độ trung thực cao.

---

## 7. Mục tiêu đào tạo

Webapp phải hỗ trợ ít nhất các mục tiêu học tập sau:

### 7.1. Kiến thức

Sinh viên có thể:

- Nhận biết các bộ phận chính của cơ cấu công tác máy xúc.
- Mô tả chuyển động tương đối giữa cần nâng, tay gầu và gầu.
- Giải thích ảnh hưởng của góc khớp đến vị trí đầu gầu.
- Giải thích quan hệ cơ bản giữa tải, lực, áp suất, lưu lượng và công suất.
- Mô tả các bước trong một chu trình làm việc của máy xúc.

### 7.2. Kỹ năng

Sinh viên có thể:

- Điều khiển cơ cấu đến một vị trí yêu cầu.
- Đọc tọa độ, tầm với và cao độ đầu gầu.
- Thay đổi tải trọng và quan sát phản ứng của hệ thống.
- Thực hiện chu trình vận hành thủ công.
- So sánh thao tác thủ công với chu trình tự động.
- Ghi nhận và phân tích dữ liệu mô phỏng.

### 7.3. Năng lực phân tích

Sinh viên có thể:

- Xác định giới hạn vùng làm việc của cơ cấu.
- Phân tích ảnh hưởng của tải trọng đến áp suất và công suất.
- Nhận biết trạng thái quá tải hoặc vận hành không phù hợp.
- Đề xuất trình tự thao tác hiệu quả hơn.

---

## 8. Người dùng mục tiêu

### 8.1. Người dùng chính

- Sinh viên đại học.
- Giảng viên các môn:
  - Máy và thiết bị thủy khí.
  - Truyền động thủy lực.
  - Cơ cấu máy.
  - Động học máy.
  - Máy công trình.
  - Điều khiển tự động.
  - Mô phỏng kỹ thuật.

### 8.2. Người dùng phụ

- Học viên cao học.
- Sinh viên học từ xa.
- Người học nghề kỹ thuật.
- Người xây dựng bài giảng điện tử.
- Nhà phát triển mô phỏng đào tạo.

---

## 9. Phạm vi sản phẩm MVP

### 9.1. Trong phạm vi

MVP phải có:

- Webapp responsive ở mức sử dụng tốt trên desktop/laptop.
- Mô hình máy xúc 2D.
- Ba khớp điều khiển:
  - Boom.
  - Arm/Stick.
  - Bucket.
- Điều khiển bằng slider.
- Hiển thị góc từng khớp.
- Tính và hiển thị tọa độ đầu gầu.
- Tính và hiển thị tầm với.
- Tính và hiển thị cao độ đầu gầu.
- Điều chỉnh ga động cơ.
- Điều chỉnh tải trọng gầu.
- Hiển thị áp suất.
- Hiển thị lưu lượng.
- Hiển thị công suất.
- Chế độ thủ công.
- Các tư thế đặt trước.
- Chu trình tự động.
- Chạy, tạm dừng, tiếp tục, đặt lại.
- Hiển thị trạng thái mô phỏng.
- Cảnh báo giới hạn cơ bản.
- Chạy hoàn toàn trên localhost.
- Cấu hình hình học và chu trình bằng file dữ liệu.

### 9.2. Ngoài phạm vi MVP

MVP chưa bắt buộc có:

- Đăng nhập.
- Quản lý lớp học.
- Cơ sở dữ liệu máy chủ.
- Đồng bộ cloud.
- Mô phỏng CFD.
- Mô hình chất lỏng phân bố.
- Mô hình van chi tiết.
- Mô hình động cơ diesel chi tiết.
- Mô hình đàn hồi kết cấu.
- Mô phỏng 3D.
- VR/AR.
- AI chatbot.
- Chấm điểm tự động hoàn chỉnh.
- Hệ thống LMS.
- Digital twin thời gian thực.
- Kết nối PLC hoặc phần cứng thật.

Các nội dung này chỉ được đưa vào sau khi MVP đạt tiêu chí nghiệm thu.

---

## 10. Nguyên tắc thiết kế cốt lõi

### 10.1. Teaching-first

Mọi tính năng phải phục vụ khả năng quan sát, thao tác, giải thích hoặc đánh giá học tập.

Không thêm tính năng chỉ để tăng độ phức tạp kỹ thuật.

### 10.2. Visual-first

Sinh viên phải nhìn thấy ngay:

- Cơ cấu nào đang chuyển động.
- Khớp nào đang thay đổi.
- Đầu gầu đang ở đâu.
- Thông số nào đang tăng hoặc giảm.
- Hệ thống đang ở bước nào của chu trình.

### 10.3. Physics-aware, not physics-fake

MVP được phép dùng mô hình đơn giản hóa, nhưng:

- Công thức phải được ghi rõ.
- Đơn vị phải nhất quán.
- Giới hạn phải được cấu hình.
- Giá trị không được thay đổi ngẫu nhiên chỉ để tạo hiệu ứng.
- Mọi đại lượng giả lập phải có quan hệ hợp lý với trạng thái hệ thống.
- Không được trình bày mô hình đơn giản hóa như mô hình thực nghiệm chính xác.

### 10.4. Deterministic

Cùng một cấu hình và cùng một chuỗi thao tác phải tạo ra cùng kết quả.

Điều này cần thiết cho giảng dạy, kiểm thử và chấm bài.

### 10.5. Config-driven

Các thông tin sau không được hard-code phân tán trong giao diện:

- Chiều dài khâu.
- Giới hạn góc.
- Tư thế đặt trước.
- Các bước chu trình.
- Giới hạn vận hành.
- Thông số xi lanh.
- Hệ số mô hình thủy lực.
- Nội dung bài thực hành.

Chúng phải được quản lý bằng các object cấu hình hoặc file JSON/TypeScript tập trung.

### 10.6. Separation of concerns

Phải tách riêng:

- Rendering.
- Trạng thái ứng dụng.
- Động học.
- Mô hình thủy lực.
- Điều khiển chu trình.
- Nội dung giảng dạy.
- Kiểm tra điều kiện bài tập.

### 10.7. Progressive fidelity

Độ trung thực được nâng theo từng cấp:

1. Hình ảnh và tương tác.
2. Động học.
3. Quan hệ thủy lực đơn giản.
4. Mô hình tải và động lực học.
5. Mô hình vật lý nâng cao.

Không triển khai cấp cao hơn khi cấp trước chưa ổn định.

### 10.8. Local-first

Bản đầu phải:

- Cài đặt đơn giản.
- Chạy không cần Internet.
- Không phụ thuộc dịch vụ trả phí.
- Có thể triển khai trong phòng máy.

### 10.9. Extensible

Kiến trúc phải cho phép bổ sung:

- Bài thực hành mới.
- Cơ cấu mới.
- Sensor mới.
- Đồ thị mới.
- Chế độ đánh giá.
- Backend và tài khoản sau này.

---

## 11. Mô hình chức năng cấp cao

Hệ thống gồm sáu khối:

1. **Simulation Scene**
   - Hiển thị máy xúc.
   - Hiển thị mặt đất, hố đào và hệ tọa độ.
   - Hiển thị quỹ đạo hoặc vùng làm việc khi cần.

2. **Manual Control**
   - Điều khiển từng khớp.
   - Điều chỉnh ga.
   - Điều chỉnh tải.
   - Chọn tư thế đặt trước.

3. **Automatic Cycle Controller**
   - Quản lý trình tự các bước.
   - Nội suy trạng thái.
   - Tạm dừng, tiếp tục và reset.
   - Phát sự kiện chuyển bước.

4. **Kinematic Model**
   - Tính vị trí các khớp.
   - Tính vị trí đầu gầu.
   - Tính tầm với và cao độ.
   - Kiểm tra giới hạn hình học.

5. **Hydraulic Approximation Model**
   - Ước lượng lực.
   - Ước lượng áp suất.
   - Ước lượng lưu lượng.
   - Tính công suất.
   - Phát cảnh báo.

6. **Teaching Layer**
   - Hiển thị mục tiêu bài học.
   - Giao nhiệm vụ.
   - Kiểm tra điều kiện hoàn thành.
   - Ghi nhận kết quả.
   - Cho phép mở rộng sang chấm điểm.

---

## 12. Mô hình động học mục tiêu

MVP sử dụng mô hình động học phẳng.

Các biến chính:

- `thetaBoom`
- `thetaArm`
- `thetaBucket`
- `L_boom`
- `L_arm`
- `L_bucket`
- `baseX`
- `baseY`

Mô hình phải:

- Xác định hệ quy chiếu rõ ràng.
- Xác định chiều dương của góc.
- Xác định đơn vị góc.
- Chuyển đổi độ sang radian tại ranh giới tính toán.
- Trả về tọa độ của tất cả khớp.
- Trả về vị trí đầu gầu.
- Không phụ thuộc trực tiếp vào UI framework.

Sai số hình học của MVP được đánh giá theo tính nhất quán nội bộ và khả năng tái tạo chuyển động tham chiếu, chưa bắt buộc khớp một mẫu máy xúc thương mại cụ thể.

---

## 13. Mô hình thủy lực mục tiêu

MVP dùng mô hình quasi-static đơn giản hóa.

Tối thiểu phải thể hiện được các quan hệ:

- Tải tăng thì lực yêu cầu tăng.
- Lực yêu cầu tăng thì áp suất tăng.
- Tốc độ chuyển động tăng thì lưu lượng tăng.
- Áp suất và lưu lượng tăng thì công suất tăng.
- Ga động cơ ảnh hưởng đến lưu lượng hoặc tốc độ khả dụng.
- Áp suất bị giới hạn bởi áp suất hệ thống hoặc van an toàn.

Các quan hệ nền tảng:

- `F = p × A`
- `Q = A × v`
- `P = p × Q`

Blueprint phải quy định rõ:

- Cách ước lượng lực do tải.
- Cách phân bổ lực theo cơ cấu.
- Cách ước lượng vận tốc xi lanh.
- Đơn vị sử dụng.
- Hệ số hiệu suất.
- Giới hạn và clamp.
- Cờ cảnh báo khi clamp hoặc quá tải.

Mọi giá trị gần đúng phải được gắn nhãn là mô phỏng giáo dục hoặc mô hình đơn giản hóa.

---

## 14. Chu trình tự động mục tiêu

Chu trình chuẩn ban đầu:

1. `IDLE`
2. `APPROACH`
3. `LOWER`
4. `SCOOP`
5. `LIFT`
6. `DUMP`
7. `RETURN`
8. `COMPLETE`

Mỗi bước phải có:

- ID duy nhất.
- Tên hiển thị.
- Góc mục tiêu.
- Thời lượng hoặc tốc độ.
- Điều kiện hoàn thành.
- Thông báo trạng thái.
- Quy tắc chuyển bước.
- Khả năng tạm dừng.
- Khả năng reset.

Chu trình phải được khai báo bằng dữ liệu, không viết cứng toàn bộ trình tự trong component giao diện.

---

## 15. Mục tiêu giao diện

Giao diện MVP ưu tiên desktop, gồm:

### Khu vực trái

- Scene mô phỏng lớn.
- Hệ tọa độ hoặc mốc tham chiếu.
- Chỉ báo đầu gầu.
- Các thẻ telemetry.
- Trạng thái mô phỏng.

### Khu vực phải

- Điều khiển khớp.
- Điều khiển hệ thống.
- Chọn manual/automatic.
- Preset.
- Điều khiển chu trình.
- Tiến trình chu trình.
- Cảnh báo.

Yêu cầu:

- Trạng thái đang hoạt động phải rõ.
- Giá trị và đơn vị phải luôn đi cùng nhau.
- Slider phải có min, max và giá trị hiện tại.
- Không dùng màu làm phương tiện truyền đạt duy nhất.
- Chuyển động phải mượt.
- Không để mô hình vỡ hoặc tách khớp khi resize.

---

## 16. Stack kỹ thuật định hướng

Stack mặc định:

- React.
- TypeScript.
- Vite.
- SVG.
- Zustand hoặc state manager tương đương nhẹ.
- CSS Modules hoặc Tailwind CSS.
- Vitest.
- React Testing Library.
- Playwright cho kiểm thử end-to-end.

Có thể thay đổi thư viện nếu blueprint chứng minh được lợi ích, nhưng phải giữ:

- Type safety.
- Khả năng chạy local.
- Kiến trúc module.
- Khả năng kiểm thử.
- Không phụ thuộc backend cho MVP.

---

## 17. Yêu cầu chất lượng

### 17.1. Correctness

- Khớp luôn liên kết đúng.
- Góc không vượt giới hạn.
- Telemetry cập nhật đồng bộ.
- Chu trình không bỏ bước trái phép.
- Pause không làm mất trạng thái.
- Reset đưa hệ thống về trạng thái xác định.

### 17.2. Performance

- Tương tác slider không giật rõ rệt.
- Animation mục tiêu 60 FPS trên máy tính phổ thông.
- Không render lại toàn bộ app không cần thiết.
- Không tích lũy timer hoặc animation loop.

### 17.3. Maintainability

- Hàm tính toán thuần khi có thể.
- Không trộn công thức vật lý vào JSX.
- Không trộn state machine vào component nút.
- Có type/interface rõ ràng.
- Có comment cho công thức và quy ước.
- Có tài liệu cấu hình.

### 17.4. Testability

Phải kiểm thử được độc lập:

- Forward kinematics.
- Clamp góc.
- Tính telemetry.
- Chuyển trạng thái chu trình.
- Pause/resume/reset.
- Preset.
- Điều kiện bài thực hành.

### 17.5. Accessibility

- Điều khiển có label.
- Có thể thao tác bàn phím ở mức cơ bản.
- Có focus state.
- Có độ tương phản hợp lý.
- Không phụ thuộc hoàn toàn vào hover.

---

## 18. Định nghĩa thành công của MVP

MVP được coi là thành công khi:

1. Chạy được bằng một quy trình cài đặt rõ ràng.
2. Không cần Internet khi vận hành.
3. Hiển thị được mô hình máy xúc 2D hoàn chỉnh.
4. Ba slider điều khiển đúng ba khớp.
5. Mô hình không tách khớp trong toàn miền góc.
6. Tọa độ đầu gầu thay đổi đúng theo động học.
7. Preset hoạt động.
8. Chu trình tự động chạy đủ các bước.
9. Pause, resume và reset hoạt động ổn định.
10. Áp suất, lưu lượng và công suất thay đổi theo quy tắc xác định.
11. Có ít nhất một cảnh báo vận hành.
12. Có test cho các hàm tính toán trọng yếu.
13. Giao diện đủ gần video tham chiếu về cấu trúc và trải nghiệm.
14. Có tài liệu để coder khác tiếp tục phát triển.
15. Có thể mở rộng sang lớp bài thực hành mà không phải viết lại lõi mô phỏng.

---

## 19. Các chỉ số nghiệm thu đề xuất

- 100% hàm động học cốt lõi có unit test.
- 100% transition của chu trình chuẩn có test.
- Không có lỗi runtime trong luồng demo chuẩn.
- Không có góc ngoài giới hạn sau bất kỳ thao tác UI hợp lệ nào.
- Sai lệch tọa độ giữa hàm tính và điểm SVG dưới ngưỡng do blueprint quy định.
- Chu trình tự động có thể chạy lặp lại ít nhất 20 lần không treo.
- Pause/resume hoạt động tại mọi step.
- Reset hoàn tất trong một hành động.
- Lighthouse accessibility đạt mức mục tiêu do blueprint quy định.
- Giao diện sử dụng được ở chiều rộng desktop tối thiểu do blueprint quy định.

---

## 20. Hướng phát triển sau MVP

### Level 2 — Teaching MVP

- Bài thực hành cấu hình bằng JSON.
- Hướng dẫn từng bước.
- Điều kiện hoàn thành task.
- Lưu kết quả local.
- Xuất CSV.
- Đồ thị theo thời gian.
- So sánh kết quả.

### Level 3 — Course Platform

- Tài khoản.
- Lớp học.
- Backend.
- Database.
- Dashboard giảng viên.
- Chấm điểm.
- LMS integration.

### Level 4 — Advanced Simulation

- Mô hình xi lanh chi tiết.
- Moment và tải theo hình học.
- Động lực học.
- Mô hình van và bơm.
- Hiệu suất và tổn thất.
- Fault simulation.
- Calibration bằng dữ liệu thực nghiệm.

### Level 5 — Intelligent Tutoring

- AI trợ giảng.
- Phân tích lỗi thao tác.
- Câu hỏi thích ứng.
- Phản hồi cá nhân hóa.
- Sinh bài tập theo mục tiêu học tập.

---

## 21. Quy tắc kiểm soát phạm vi

Một tính năng chỉ được đưa vào phase hiện tại khi đáp ứng ít nhất một điều kiện:

- Cần thiết để tái tạo video tham chiếu.
- Cần thiết để đạt tiêu chí nghiệm thu.
- Cần thiết để tránh phải viết lại kiến trúc.
- Cần thiết để kiểm thử hoặc giải thích mô hình.
- Được phê duyệt như một thay đổi phạm vi.

Không đưa vào MVP chỉ vì:

- Thư viện hỗ trợ sẵn.
- Nhìn hiện đại.
- Có thể hữu ích trong tương lai.
- Một đối thủ có tính năng đó.
- AI có thể tạo nhanh.

---

## 22. Quy trình thay đổi goal

Mọi đề xuất thay đổi phải ghi:

- Vấn đề hiện tại.
- Thay đổi đề xuất.
- Lý do.
- Ảnh hưởng tới phạm vi.
- Ảnh hưởng tới kiến trúc.
- Ảnh hưởng tới lịch triển khai.
- Tiêu chí nghiệm thu mới.
- Các tài liệu cần cập nhật.

Không sửa goal ngầm thông qua code.

---

## 23. Các quyết định đã chốt

- Sản phẩm đầu tiên là webapp.
- Chạy local-first.
- Ưu tiên desktop.
- Mô hình ban đầu là 2D.
- Rendering ưu tiên SVG.
- Có ba khớp chính.
- Có manual mode.
- Có automatic cycle.
- Có telemetry.
- Mô hình vật lý MVP là mô hình đơn giản hóa có giải thích.
- Backend không bắt buộc trong MVP.
- Nội dung cấu hình phải tách khỏi UI.
- Kiến trúc phải sẵn sàng cho lớp giảng dạy.
- Tái tạo video là milestone đầu, không phải đích cuối của sản phẩm.

---

## 24. Các vấn đề blueprint phải quyết định

Blueprint tiếp theo phải chốt rõ:

1. Hệ tọa độ và quy ước góc.
2. Cấu trúc SVG của máy xúc.
3. Tâm quay và kích thước hình học.
4. State schema.
5. Event schema.
6. State machine của automatic cycle.
7. Công thức telemetry MVP.
8. Cách nội suy animation.
9. Cách pause/resume không gây nhảy trạng thái.
10. Cách quản lý preset.
11. Cấu trúc file config.
12. Cấu trúc module và dependency direction.
13. Chiến lược test.
14. Acceptance test cho từng feature.
15. Mức độ giống video cần đạt.
16. Cách quản lý dữ liệu bài thực hành trong phase sau.
17. Quy ước đơn vị.
18. Quy tắc warning, clamp và invalid state.
19. Responsive breakpoint.
20. Definition of Done cho coder và reviewer.

---

## 25. Tuyên bố sản phẩm

> Dự án xây dựng một webapp mô phỏng máy xúc thủy lực 2D, trực quan, có thể kiểm thử và mở rộng, giúp sinh viên học thông qua thao tác, quan sát và phân tích; trước mắt tái tạo chức năng cốt lõi của video tham chiếu, sau đó phát triển thành nền tảng mô phỏng giảng dạy kỹ thuật.
