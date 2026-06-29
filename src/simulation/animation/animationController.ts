/**
 * Lớp điều khiển thời gian mô phỏng (Simulation Clock Controller)
 * Hỗ trợ các tính năng tạm dừng (Pause), tiếp tục (Resume) và đặt lại (Reset)
 * Giúp tính toán chính xác lượng thời gian logic đã trôi qua (Elapsed time)
 */
export class SimClock {
  private startTime = 0;
  private elapsedBeforePause = 0;
  private pauseTime = 0;
  private isPaused = false;

  /**
   * Khởi động đồng hồ đo thời gian mô phỏng
   */
  start(): void {
    this.startTime = performance.now();
    this.elapsedBeforePause = 0;
    this.isPaused = false;
  }

  /**
   * Tạm dừng đồng hồ, đóng băng lượng thời gian đã tích lũy
   */
  pause(): void {
    if (this.isPaused) return;
    this.pauseTime = performance.now();
    this.elapsedBeforePause += this.pauseTime - this.startTime;
    this.isPaused = true;
  }

  /**
   * Tiếp tục chạy đồng hồ từ thời điểm bị tạm dừng
   */
  resume(): void {
    if (!this.isPaused) return;
    this.startTime = performance.now();
    this.isPaused = false;
  }

  /**
   * Lấy lượng thời gian trôi qua thực tế (miliseconds)
   */
  getElapsed(): number {
    if (this.isPaused) {
      return this.elapsedBeforePause;
    }
    return this.elapsedBeforePause + (performance.now() - this.startTime);
  }
}
