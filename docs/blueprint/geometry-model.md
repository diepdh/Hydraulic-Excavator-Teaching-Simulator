# Chi tiết Thiết kế — Mô hình Hình học & Động học Thuận (Geometry & Kinematics)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này định nghĩa mô hình hình học phẳng 2D của cơ cấu công tác máy xúc thủy lực và thiết lập công thức toán học cho Động học thuận (Forward Kinematics).

---

## 1. Các thông số hình học (Geometric Parameters)
Kích thước thực tế của máy xúc được cấu hình tập trung trong `src/config/geometry.ts` với các tham số cốt lõi:
- $L_{boom}$: Chiều dài cần nâng (từ tâm xoay Boom Base đến khớp Boom-Arm).
- $L_{arm}$: Chiều dài tay gầu (từ khớp Boom-Arm đến khớp Arm-Bucket).
- $L_{bucket}$: Chiều dài gầu xúc (từ khớp Arm-Bucket đến điểm đầu răng gầu Bucket Tip).

---

## 2. Mô hình Động học thuận (Forward Kinematics - FK)
Động học thuận xác định vị trí của các khớp xoay và điểm đầu gầu $(x, y)$ trong hệ tọa độ vật lý dựa trên bộ 3 góc khớp đầu vào: $(\theta_{boom}, \theta_{arm}, \theta_{bucket})$.

Các khớp xoay được tính tuần tự từ gốc tọa độ vật lý $(0, 0)$:

### 2.1. Khớp Boom Base (Gốc vật lý)
$$x_0 = 0$$
$$y_0 = 0$$

### 2.2. Khớp Boom-Arm (Boom End)
Khớp này quay một góc $\theta_{boom}$ quanh gốc tọa độ:
$$x_{boom\_end} = L_{boom} \times \cos(\theta_{boom})$$
$$y_{boom\_end} = L_{boom} \times \sin(\theta_{boom})$$

### 2.3. Khớp Arm-Bucket (Bucket Pivot)
Khâu Arm quay tương đối một góc $\theta_{arm}$ so với khâu Boom. Góc tuyệt đối của Arm so với phương nằm ngang là $\theta_{boom} + \theta_{arm}$:
$$x_{bucket\_pivot} = x_{boom\_end} + L_{arm} \times \cos(\theta_{boom} + \theta_{arm})$$
$$y_{bucket\_pivot} = y_{boom\_end} + L_{arm} \times \sin(\theta_{boom} + \theta_{arm})$$

### 2.4. Đầu răng gầu (Bucket Tip)
Khâu Bucket quay tương đối một góc $\theta_{bucket}$ so với khâu Arm. Góc tuyệt đối của Bucket so với phương nằm ngang là $\theta_{boom} + \theta_{arm} + \theta_{bucket}$:
$$x_{bucket\_tip} = x_{bucket\_pivot} + L_{bucket} \times \cos(\theta_{boom} + \theta_{arm} + \theta_{bucket})$$
$$y_{bucket\_tip} = y_{bucket\_pivot} + L_{bucket} \times \sin(\theta_{boom} + \theta_{arm} + \theta_{bucket})$$

---

## 3. Hệ số làm việc đầu ra (Derived Telemetry)
Từ kết quả tính toán động học thuận của điểm đầu răng gầu $(x_{bucket\_tip}, y_{bucket\_tip})$, ta suy ra hai thông số làm việc quan trọng:
- **Tầm với (Reach)**: Khoảng vươn xa nằm ngang của gầu.
  $$Reach = x_{bucket\_tip}$$
- **Cao độ (Height)**: Chiều cao thẳng đứng của gầu so với tâm cần nâng.
  $$Height = y_{bucket\_tip}$$

---

## 4. Giới hạn hành trình khớp (Joint Limits)
Để ngăn ngừa biến dạng cơ cấu phi vật lý, các góc khớp bắt buộc phải được lọc qua bộ giới hạn (Constraints Engine) trước khi đưa vào tính toán động học:
- $\theta_{boom} \in [\theta_{boom\_min}, \theta_{boom\_max}]$
- $\theta_{arm} \in [\theta_{arm\_min}, \theta_{arm\_max}]$
- $\theta_{bucket} \in [\theta_{bucket\_min}, \theta_{bucket\_max}]$
