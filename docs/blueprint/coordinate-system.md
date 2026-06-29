# Chi tiết Thiết kế — Hệ Tọa Độ & Quy Ước Góc (Coordinate System)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này chi tiết hóa hệ quy chiếu, quy ước góc khớp, và phép chuyển đổi giữa tọa độ vật lý (mét) và tọa độ màn hình hiển thị (pixel SVG).

---

## 1. Hệ tọa độ vật lý (Physical Coordinate System)
- **Mặt phẳng**: Sử dụng mặt phẳng 2D thẳng đứng song song với chuyển động của cơ cấu cần máy xúc.
- **Trục X (Nằm ngang)**: Hướng dương chỉ về phía trước máy xúc (phía gầu xúc vươn ra).
- **Trục Y (Thẳng đứng)**: Hướng dương chỉ lên trên, vuông góc với mặt đất.
- **Gốc tọa độ (0, 0)**: Được đặt cố định tại **tâm khớp xoay của cần nâng (Boom Base Pivot)** với thân máy.
- **Đơn vị**: Mét (m).

---

## 2. Hệ tọa độ màn hình SVG (SVG Screen Coordinate System)
- **Trục X (Nằm ngang)**: Hướng dương chỉ từ trái sang phải màn hình.
- **Trục Y (Thẳng đứng)**: Hướng dương chỉ **từ trên xuống dưới** màn hình (ngược chiều Y vật lý).
- **Gốc tọa độ (0, 0)**: Nằm ở góc trên bên trái của vùng vẽ SVG (SVG Canvas).
- **Tọa độ tâm xoay cần nâng trên màn hình**: Được cấu hình bởi `baseX` (pixel) và `baseY` (pixel) tính từ gốc SVG.
- **Tỷ lệ xích (Scale Factor)**: Ký hiệu là $scale$ (đơn vị: pixel/mét). Mặc định là 80 px/m.

---

## 3. Quy ước Góc Khớp (Joint Angle Conventions)
Mọi góc khớp được tính toán nội bộ bằng **radian**, chiều dương là **ngược chiều kim đồng hồ** (theo quy ước toán học chuẩn). Trên giao diện người dùng, góc được đổi sang **độ** (degrees).

| Khớp xoay | Ký hiệu | Góc Zero (0° / 0 rad) | Chiều quay dương (+) | Chiều quay âm (-) |
|---|---|---|---|---|
| **Boom** (Cần nâng) | $\theta_{boom}$ | Cần nằm ngang song song trục X vật lý | Quay lên trên (nâng cần) | Quay xuống dưới (hạ cần) |
| **Arm** (Tay gầu) | $\theta_{arm}$ | Tay gầu duỗi thẳng thẳng hàng với Boom | Gập vào phía cabin | Duỗi thẳng ra ngoài |
| **Bucket** (Gầu xúc) | $\theta_{bucket}$ | Gầu duỗi thẳng thẳng hàng với Arm | Cúp gầu vào (xúc đất) | Mở gầu ra (đổ đất) |

---

## 4. Phép biến đổi tọa độ (Coordinate Transformations)

### 4.1. Chuyển đổi từ tọa độ vật lý sang màn hình SVG
Với điểm bất kỳ có tọa độ vật lý là $(x, y)$, tọa độ SVG tương ứng $(X_{svg}, Y_{svg})$ được tính như sau:
$$X_{svg} = baseX + x \times scale$$
$$Y_{svg} = baseY - y \times scale$$

*(Lưu ý dấu trừ ở công thức tính Y do trục Y của SVG hướng xuống dưới).*

### 4.2. Chuyển đổi từ tọa độ màn hình SVG về vật lý
Khi cần tính toán telemetry (Reach, Height) từ điểm đầu răng gầu xúc trên màn hình SVG:
$$Reach = \frac{X_{svg\_tip} - baseX}{scale}$$
$$Height = -\frac{Y_{svg\_tip} - baseY}{scale}$$
