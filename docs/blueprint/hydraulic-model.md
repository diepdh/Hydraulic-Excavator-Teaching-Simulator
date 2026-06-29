# Chi tiết Thiết kế — Mô hình Vật lý Thủy lực Giả định (Hydraulic Approximation Model)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này chi tiết hóa các công thức toán học và quan hệ nhân quả trong Mô hình thủy lực tĩnh giả định (Quasi-static Hydraulic Model) của máy xúc.

---

## 1. Đầu vào & Đầu ra của Mô hình

### 1.1. Các biến đầu vào (Inputs)
- $\theta_{boom}, \theta_{arm}, \theta_{bucket}$ (Góc khớp hiện tại)
- $\omega_{boom}, \omega_{arm}, \omega_{bucket}$ (Vận tốc góc khớp hiện tại - rad/s)
- $Payload$ (Khối lượng tải trọng gầu - kg)
- $Throttle$ (Độ mở ga động cơ diesel - $[0.0, 1.0]$)

### 1.2. Các biến đầu ra (Outputs)
- $Pressure$ ($p$ - Áp suất dầu hệ thống - bar)
- $FlowRate$ ($Q$ - Lưu lượng dầu - L/min)
- $Power$ ($P$ - Công suất thủy lực - kW)
- $Warnings$ (Mã cảnh báo quá tải, mở van an toàn)

---

## 2. Công thức áp suất thủy lực (Pressure Model)
Áp suất hệ thống đại diện được tính toán tĩnh dựa trên tải trọng cơ bản cộng với tải trọng tĩnh của gầu nhân cánh tay đòn moment (Reach):

$$p_{demand} = p_{base} + \left(k_1 \times \text{mass}_{empty} + k_2 \times Payload\right) \times Reach$$

Trong đó:
- $p_{base}$: Áp suất chờ tối thiểu khi hệ thống đứng yên không tải (ví dụ: 15 bar).
- $Reach$: Tầm với nằm ngang từ tâm cần nâng tới đầu gầu (m).
- $k_1, k_2$: Các hệ số tỷ lệ hình học.

### Giới hạn bởi Van an toàn (Relief Valve)
Áp suất thực tế trong hệ thống không thể vượt quá giới hạn van an toàn:
$$p = \text{clamp}\left(p_{demand}, 0.0, p_{relief}\right)$$

Nếu $p_{demand} \ge p_{relief}$, hệ thống kích hoạt cảnh báo `RELIEF_ACTIVE`.

---

## 3. Công thức lưu lượng thủy lực (Flow Rate Model)
Lưu lượng dầu tỷ lệ thuận với tốc độ tịnh tiến của các xy lanh quay khớp. Vận tốc tịnh tiến xi lanh được xấp xỉ từ vận tốc góc của các khớp:

$$Q_{demand} = \sum_{i \in \{boom, arm, bucket\}} \left(A_i \times |\omega_i| \times k_{flow}\right)$$

Trong đó:
- $A_i$: Diện tích piston hiệu dụng của xy lanh tương ứng.
- $\omega_i$: Vận tốc góc tức thời của khớp ($rad/s$).
- $k_{flow}$: Hệ số xấp xỉ chuyển đổi.

### Giới hạn bởi Ga động cơ (Throttle Limit)
Ga động cơ ($Throttle$) giới hạn lưu lượng cung cấp lớn nhất của bơm thủy lực:
$$Q_{max} = Q_{pump\_nominal} \times Throttle$$
$$Q = \text{clamp}\left(Q_{demand}, 0.0, Q_{max}\right)$$

---

## 4. Công thức công suất thủy lực (Hydraulic Power)
Công suất tiêu thụ của hệ thống thủy lực tỷ lệ thuận với áp suất thực tế và lưu lượng thực tế:

$$P_{hydraulic} = p \times Q \times \frac{1}{\eta}$$

Trong đó:
- $P_{hydraulic}$: Công suất thủy lực ($kW$ ở UI, $W$ trong tính toán).
- $p$: Áp suất thủy lực hệ thống ($Pa$).
- $Q$: Lưu lượng thực tế ($m^3/s$).
- $\eta$: Hiệu suất truyền động tổng thể (ví dụ: 0.85).
