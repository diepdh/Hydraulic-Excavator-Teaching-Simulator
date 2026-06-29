# Chi tiết Thiết kế — Kiến Trúc Phần Mềm & Module (Architecture & Modules)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này định nghĩa cấu trúc phân lớp mã nguồn, sơ đồ phụ thuộc giữa các module, và quy định lập trình của dự án.

---

## 1. Chiều phụ thuộc bắt buộc (Dependency Direction)
Để đảm bảo khả năng kiểm thử độc lập và tách biệt mối quan tâm, dự án áp dụng chiều phụ thuộc một chiều nghiêm ngặt:

```
[React UI Layer] 
       │ (đọc trạng thái / gọi actions)
       ▼
[Zustand Store] 
       │ (gọi tính toán logic)
       ▼
[Simulation Engine Core] (Pure Functions)
       │ (đọc tham số)
       ▼
[Configuration Layer]
```

- **Simulation Engine Core**: Gồm các pure functions tính toán hình học, động học, thủy lực, đổi đơn vị. Lớp này **cấm tuyệt đối** import bất kỳ thư viện liên quan đến React, UI hoặc Zustand Store.
- **Zustand Store**: Nhận callbacks và updates từ Simulation Engine để lưu vào state, cung cấp dữ liệu phản ứng (reactive state) cho UI.
- **React UI**: Lớp hiển thị SVG và bảng điều khiển. Chỉ đọc dữ liệu thông qua Store selectors và tương tác thông qua Store actions.

---

## 2. Cấu trúc thư mục nguồn (`src/`)
Đã được khởi tạo và phân tầng tại JOB-001:

- `src/config/`: Quản lý các file cấu hình tĩnh (`geometry.ts`, `presets.ts`,...).
- `src/types/`: Khai báo kiểu TypeScript dùng chung.
- `src/simulation/`: Thư mục chứa lõi mô phỏng không chứa React.
  - `simulation/kinematics/`: Thuật toán động học thuận và kiểm tra biên.
  - `simulation/hydraulics/`: Mô hình tính toán áp suất, lưu lượng, công suất.
  - `simulation/animation/`: Clock điều khiển thời gian và nội suy lerp/smoothstep.
  - `simulation/cycle/`: Máy trạng thái FSM chu trình tự động.
  - `simulation/units/`: Hệ thống đổi đơn vị vật lý.
- `src/store/`: Quản lý Zustand store ứng dụng.
- `src/features/`: Chứa các custom hooks đóng gói logic tương tác cho UI.
- `src/components/`: Các React Component giao diện.
- `src/styles/`: Quản lý tokens CSS và global CSS.

---

## 3. Quy tắc phát triển (Coding Conventions)
1. **Hàm thuần khiết (Pure Functions)**: Mọi hàm tính toán lý thuyết trong `simulation/` phải là pure functions: cùng input $\rightarrow$ cùng output, không side-effect, dễ dàng viết unit test.
2. **Type Safety**: Bật strict mode TypeScript. Định nghĩa cụ thể interface cho mọi object cấu hình và trạng thái. Cấm sử dụng kiểu `any`.
3. **Configuration Isolation**: Không hard-code bất kỳ con số kích thước hay giới hạn vật lý nào ngoài thư mục `src/config/`.
