# Hydraulic Excavator Teaching Simulator

Webapp mô phỏng máy xúc thủy lực 2D phục vụ giảng dạy sinh viên đại học.

## Công nghệ sử dụng
- **Frontend**: React 18, TypeScript 5, Vite 5
- **Quản lý trạng thái**: Zustand 4
- **Mô hình hóa / Hiển thị**: SVG (Client-side rendering)
- **Kiểm thử**: Vitest, React Testing Library

---

## Hướng dẫn cài đặt và chạy trên Local

### 1. Cài đặt các package phụ thuộc
Yêu cầu Node.js >= 20 LTS. Chạy lệnh sau để cài đặt:
```bash
npm install
```

### 2. Chạy ứng dụng trong môi trường phát triển (Dev)
Khởi động dev server tại local (mặc định chạy tại port 5173):
```bash
npm run dev
```

### 3. Build sản phẩm (Production)
Biên dịch ứng dụng thành các file tĩnh HTML/JS/CSS để deploy:
```bash
npm run build
```

### 4. Kiểm thử (Test)
Chạy bộ unit test và integration test bằng Vitest:
```bash
npm run test
```

### 5. Kiểm tra kiểu dữ liệu (Type check)
Kiểm tra tính đúng đắn của TypeScript type:
```bash
npm run typecheck
```

---

## Cấu trúc thư mục dự án
- `src/config/`: Cấu hình hình học, tham số thủy lực, chu trình,...
- `src/types/`: Định nghĩa các kiểu dữ liệu và interface.
- `src/simulation/`: Lõi tính toán động học (kinematics) và thủy lực (hydraulics) - không import React.
- `src/store/`: Zustand store quản lý state ứng dụng.
- `src/features/`: Các hook logic theo từng feature.
- `src/components/`: Các React component hiển thị (SimulationScene, ControlPanel, TelemetryPanel,...).
- `src/styles/`: Quản lý styles với CSS variables (tokens) và CSS Modules.
- `tests/`: Bộ test unit và integration cho dự án.

---

## Lưu ý quan trọng
⚠️ **Mô hình đơn giản hóa giáo dục — chưa dùng cho thiết kế hoặc vận hành máy thật.**
