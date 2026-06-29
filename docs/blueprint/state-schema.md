# Chi tiết Thiết kế — Lược Đồ Trạng Thái (State Schema)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này định nghĩa cấu trúc dữ liệu lưu trữ (State Schema) trong ứng dụng thông qua Zustand Store, phân định rõ ràng giữa trạng thái gốc (Source State) và trạng thái dẫn xuất (Derived State).

---

## 1. Nguyên tắc quản lý trạng thái
- **Single Source of Truth**: Mọi trạng thái tương tác của ứng dụng chỉ lưu trữ tại một nơi duy nhất là Zustand Store.
- **Tách biệt dữ liệu gốc và dẫn xuất**: Chỉ lưu trữ trong Store những dữ liệu gốc thay đổi trực tiếp (như góc khớp, khối lượng tải, vị trí ga). Các dữ liệu tính toán ăn theo (như tọa độ xy khớp, áp suất, công suất) sẽ được tính toán động (derived) khi UI subscribe hoặc qua selectors để tránh dư thừa và không đồng bộ.

---

## 2. Chi tiết Lược đồ dữ liệu (Zustand Store Schema)

### 2.1. Cấu trúc State
Zustand Store quản lý một object duy nhất thực thi interface `AppState`:

```typescript
export interface AppState {
  // --- Trạng thái góc khớp (Source State) ---
  angles: {
    boom: number;   // độ, giới hạn trong [boomMin, boomMax]
    arm: number;    // độ, giới hạn trong [armMin, armMax]
    bucket: number; // độ, giới hạn trong [bucketMin, bucketMax]
  };

  // --- Trạng thái điều khiển tay (Source State) ---
  payload: number;    // kg, khối lượng vật liệu trong gầu
  throttle: number;   // 0.0 .. 1.0, độ mở tay ga động cơ
  mode: 'MANUAL' | 'AUTOMATIC'; // Chế độ vận hành

  // --- Trạng thái chu trình tự động (Source State) ---
  cycleStatus: 'IDLE' | 'APPROACH' | 'LOWER' | 'SCOOP' | 'LIFT' | 'DUMP' | 'RETURN' | 'COMPLETE' | 'ERROR';
  cycleStepIndex: number;      // Chỉ số bước hiện tại (0-based)
  cycleOverallProgress: number; // Tiến trình tổng thể [0, 1]
  stepProgress: number;         // Tiến trình bước hiện tại [0, 1]

  // --- Trạng thái cảnh báo (Derived/Active Warnings) ---
  warnings: Set<string>; // Bộ các mã cảnh báo đang hoạt động

  // --- Trạng thái điều khiển thời gian mô phỏng (Source State) ---
  simStatus: 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETE';
}
```

### 2.2. Trạng thái dẫn xuất (Derived State - Selectors)
Các selectors được dùng để tính toán nhanh từ State mà không ghi đè vào Store:

- **Động học (Kinematics)**:
  - `selectJointPositions(state)`: Trả về tọa độ pixel SVG $(X, Y)$ của các khớp.
  - `selectTipCoordinates(state)`: Trả về tọa độ vật lý $Reach$ và $Height$ của đầu gầu.
- **Thủy lực (Hydraulics)**:
  - `selectHydraulicPressure(state)`: Tính toán áp suất hệ thống (bar) dựa trên `angles`, `payload`.
  - `selectHydraulicFlow(state)`: Tính toán lưu lượng dầu (L/min) dựa trên tốc độ thay đổi góc khớp và `throttle`.
  - `selectHydraulicPower(state)`: Tính công suất tiêu thụ $P = p \times Q$ (kW).

---

## 3. Các Actions cập nhật State (Mutations)
State chỉ được cập nhật qua các hàm action định nghĩa sẵn trong Store:
- `setJointAngle(joint: 'boom' | 'arm' | 'bucket', value: number)`: Cập nhật góc khớp (sau khi đi qua Constraints check).
- `setPayload(value: number)`: Điều chỉnh tải trọng gầu.
- `setThrottle(value: number)`: Điều chỉnh ga động cơ.
- `setMode(value: 'MANUAL' | 'AUTOMATIC')`: Chuyển chế độ vận hành.
- `startCycle()`, `pauseCycle()`, `resumeCycle()`, `resetCycle()`: Điều khiển chu trình tự động.
