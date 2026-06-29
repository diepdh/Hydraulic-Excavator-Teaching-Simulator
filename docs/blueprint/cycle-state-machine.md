# Chi tiết Thiết kế — Máy Trạng Thái Chu Trình Tự Động (Automatic Cycle State Machine)
# Version: 1.0 — 2026-06-29
# Status: DRAFT
# Owner: The Coder

Tài liệu này chi tiết hóa thiết kế máy trạng thái hữu hạn (FSM) điều khiển chu trình xúc đổ tự động của máy xúc thủy lực.

---

## 1. Các trạng thái trong chu trình (FSM States)
Chu trình làm việc tuần tự gồm 8 trạng thái chính:

```
[IDLE] ──► [APPROACH] ──► [LOWER] ──► [SCOOP] 
                                         │
[COMPLETE] ◄── [RETURN] ◄── [DUMP] ◄── [LIFT]
```

1. **IDLE (Chờ)**: Hệ thống đứng yên ở tư thế sẵn sàng ban đầu.
2. **APPROACH (Tiếp cận)**: Cần nâng duỗi ra hướng về phía hố đào.
3. **LOWER (Hạ cần)**: Hạ thấp cần nâng và tay gầu xuống sát mặt đất hố đào.
4. **SCOOP (Xúc đất)**: Cúp gầu xúc (Bucket) để nạp đầy đất cát vào gầu.
5. **LIFT (Nâng cần)**: Nâng cần nâng lên cao để đưa gầu ra khỏi hố đào.
6. **DUMP (Đổ đất)**: Quay gầu xúc mở ra để đổ đất vào phễu chứa hoặc xe tải.
7. **RETURN (Trở về)**: Quay cụm khâu công tác trở về vị trí hố đào ban đầu.
8. **COMPLETE (Hoàn thành)**: Kết thúc chu kỳ làm việc, dừng chuyển động mượt và trả về trạng thái chờ.

---

## 2. Lược đồ chuyển trạng thái (State Transitions)
FSM được điều khiển bởi các sự kiện (Events):

| Trạng thái hiện tại | Sự kiện kích hoạt | Trạng thái tiếp theo | Hành động thực hiện (Actions) |
|---|---|---|---|
| **IDLE** | `START` | **APPROACH** | Khởi chạy clock, nạp góc mục tiêu bước APPROACH |
| **APPROACH** | `STEP_COMPLETE` | **LOWER** | Chuyển tiếp mượt sang góc mục tiêu hạ cần |
| **LOWER** | `STEP_COMPLETE` | **SCOOP** | Kích hoạt cúp gầu xúc |
| **SCOOP** | `STEP_COMPLETE` | **LIFT** | Nâng cần chứa tải trọng |
| **LIFT** | `STEP_COMPLETE` | **DUMP** | Mở gầu để xả tải trọng |
| **DUMP** | `STEP_COMPLETE` | **RETURN** | Đưa các khớp quay về tư thế xuất phát |
| **RETURN** | `STEP_COMPLETE` | **COMPLETE** | Phát tín hiệu hoàn tất chu trình |
| **COMPLETE** | `RESET` | **IDLE** | Trở về trạng thái ban đầu |
| *BẤT KỲ* | `PAUSE` | **PAUSED** | Dừng clock mô phỏng, đóng băng các chuyển động |
| **PAUSED** | `RESUME` | *Trạng thái cũ* | Tiếp tục clock từ điểm ngắt |
| *BẤT KỲ* | `RESET` | **IDLE** | Hủy bỏ chu trình lập tức, reset cụm khớp về ready pose |

---

## 3. Cơ chế nội suy chuyển động (Interpolation & Animation)
Mỗi bước trong chu trình có:
- **Bộ góc khớp mục tiêu** $(\theta_{boom}^T, \theta_{arm}^T, \theta_{bucket}^T)$ được định nghĩa trong file cấu hình `src/config/cycleDefinition.ts`.
- **Thời lượng thực thi** $Duration$ của bước (giây).

Vòng lặp RequestAnimationFrame (RAF) tính toán thời gian trôi qua thực tế $elapsed$. Hệ số nội suy chuẩn hóa $t$ được tính như sau:
$$t = \text{clamp}\left(\frac{elapsed}{Duration}, 0.0, 1.0\right)$$

Áp dụng hàm nội suy làm mượt (Cubic Ease-In-Out / Smoothstep):
$$t_{smooth} = t^2 \times (3 - 2t)$$

Góc khớp tại frame hiện tại được cập nhật:
$$\theta = \theta_{start} + (\theta_{target} - \theta_{start}) \times t_{smooth}$$

Khi $t = 1.0$, sự kiện `STEP_COMPLETE` được phát ra để chuyển sang bước tiếp theo.
