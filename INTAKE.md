# INTAKE.md
# Thu Thập Yêu Cầu — Hydraulic Excavator Teaching Simulator

---

## Mô tả bài toán

Xây dựng một **webapp mô phỏng máy xúc thủy lực 2D** phục vụ giảng dạy sinh viên đại học.

Webapp tái tạo chức năng cốt lõi của một ứng dụng tham chiếu (video), bao gồm:

- Hiển thị mô hình máy xúc thủy lực 2D.
- Cho phép điều khiển cần nâng (Boom), tay gầu (Arm) và gầu xúc (Bucket) qua 3 bậc tự do chính.
- Có chế độ điều khiển thủ công (Manual) và chu trình tự động (Automatic Cycle).
- Hiển thị tọa độ, tầm với và cao độ đầu gầu.
- Hiển thị các thông số thủy lực: áp suất, lưu lượng và công suất.
- Có tư thế đặt trước (Preset).
- Có trạng thái: chạy, tạm dừng, tiếp tục và đặt lại.
- Có cảnh báo giới hạn vận hành.

Đây là sản phẩm giai đoạn đầu (**MVP**): mục tiêu là tái tạo được trải nghiệm tương tác và cấu trúc chức năng của ứng dụng tham chiếu, sau đó phát triển thành nền tảng mô phỏng giảng dạy.

---

## Đầu vào / Đầu ra

### Đầu vào

| Nguồn đầu vào | Mô tả |
|---|---|
| Thanh trượt góc khớp | Ba slider điều khiển Boom, Arm, Bucket |
| Slider ga động cơ | Throttle ảnh hưởng lưu lượng/tốc độ |
| Slider tải trọng gầu | Payload ảnh hưởng áp suất |
| Nút Preset | Chuyển sang tư thế đặt trước |
| Nút chu trình | Start / Pause / Resume / Reset |
| Nút chế độ | Manual / Automatic |
| File cấu hình | geometry.json, cycle.json (hình học + chu trình) |

### Đầu ra

| Đầu ra | Mô tả |
|---|---|
| Scene SVG | Mô hình máy xúc 2D chuyển động liên tục, đúng quan hệ khớp |
| Telemetry | Tọa độ đầu gầu (X, Y), tầm với, cao độ |
| Hydraulic panel | Áp suất (bar), lưu lượng (L/min), công suất (kW) |
| Status indicator | Trạng thái mô phỏng (IDLE/RUNNING/PAUSED/COMPLETE) |
| Warning indicator | Cảnh báo vượt giới hạn, quá tải |
| Progress indicator | Tiến trình chu trình tự động |

---

## Đối tượng sử dụng

### Người dùng chính

- **Sinh viên đại học** học các môn: Máy và thiết bị thủy khí, Truyền động thủy lực, Cơ cấu máy, Động học máy, Máy công trình, Điều khiển tự động, Mô phỏng kỹ thuật.
- **Giảng viên** cần công cụ trực quan hoá trong giảng dạy và có thể cấu hình bài học mà không sửa mã nguồn.

### Người dùng phụ

- Học viên cao học, sinh viên học từ xa, người học nghề kỹ thuật.
- Nhà xây dựng bài giảng điện tử, nhà phát triển mô phỏng đào tạo.

---

## Tech stack & ràng buộc

| Hạng mục | Quyết định |
|---|---|
| Ngôn ngữ | TypeScript (strict) |
| Framework UI | React 18+ |
| Bundler | Vite |
| Rendering | SVG (inline, trong React component) |
| State management | Zustand |
| CSS | CSS Modules hoặc Tailwind CSS |
| Unit test | Vitest + React Testing Library |
| E2E test | Playwright |
| Deploy target | localhost (static, không cần backend) |
| Trình duyệt hỗ trợ | Chrome + Edge (primary), Firefox (optional) |

**Ràng buộc bất biến:**
- Type safety bắt buộc.
- Không phụ thuộc backend cho MVP.
- Kiến trúc module, có thể kiểm thử.
- Nội dung cấu hình phải tách khỏi UI code.
- Config-driven (hình học, chu trình, giới hạn quản lý bằng file dữ liệu).

---

## Tài nguyên hiện có

| Tài nguyên | Trạng thái |
|---|---|
| Video tham chiếu | Có (chứa trong thư mục dự án) |
| goal.md | Đã phê duyệt |
| plan.md | Đã phê duyệt |
| Blueprint | Chưa có — cần tạo trong PHA 2 |
| Source code | Chưa có |
| Asset SVG máy xúc | Chưa có — cần thiết kế theo pivot chuẩn |
| Bộ dữ liệu bài thực hành | Chưa có — scope Phase 9 |
| Git repository | Chưa có — cần khởi tạo trong JOB-001 |

---

## Ràng buộc quan trọng

| Ràng buộc | Mức độ |
|---|---|
| Chạy hoàn toàn local, không cần Internet | BẮTBUỘC |
| Không cần backend cho MVP | BẮTBUỘC |
| Mô hình vật lý phải có công thức ghi rõ, không random | BẮTBUỘC |
| Cùng input → cùng output (deterministic) | BẮTBUỘC |
| Không hard-code thông số hình học/chu trình/giới hạn | BẮTBUỘC |
| MVP ưu tiên desktop/laptop | BẮT BUỘC |
| Animation mục tiêu ≥ 60 FPS trên máy phổ thông | RECOMMENDED |
| Không triển khai cấp vật lý cao hơn khi cấp trước chưa ổn định | BẮTBUỘC |
| Authentication, Cloud, LMS, 3D, AI, VR/AR | NGOÀI SCOPE MVP |

---

## [Xác nhận của Chủ dự án: APPROVED]

Tài liệu này được tổng hợp tự động từ `goal.md` và `plan.md` đã được phê duyệt.

Brain xác nhận đã đủ thông tin để tiến sang **PHA 2 — BLUEPRINT**.
