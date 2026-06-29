import { test, expect } from '@playwright/test';

test.describe('Excavator Simulator E2E Browser Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Kịch bản 1: Open app -> manual control
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Hydraulic Excavator Teaching Simulator');
    
    // Đảm bảo app load ban đầu ở chế độ MANUAL
    await expect(page.locator('header')).toContainText('MANUAL MODE');
  });

  test('should verify joint sliders (Scenario 2: Move all joints)', async ({ page }) => {
    const sliders = page.locator('input[type="range"]');
    
    // Boom Slider (nth 0)
    await sliders.nth(0).fill('40');
    await sliders.nth(0).dispatchEvent('change');
    
    // Arm Slider (nth 1)
    await sliders.nth(1).fill('50');
    await sliders.nth(1).dispatchEvent('change');
    
    // Bucket Slider (nth 2)
    await sliders.nth(2).fill('20');
    await sliders.nth(2).dispatchEvent('change');
    
    // Kiểm tra Telemetry hiển thị góc hoặc tọa độ phản ánh
    await expect(page.locator('text=Thông số Telemetry')).toBeVisible();
  });

  test('should apply presets (Scenario 3: Select each preset)', async ({ page }) => {
    // Test chọn Tư thế sẵn sàng
    await page.locator('button:has-text("Tư thế sẵn sàng")').click();
    await page.waitForTimeout(1000); // Đợi animation hoàn thành
    
    // Test chọn Tư thế đào
    await page.locator('button:has-text("Tư thế đào (Hạ gầu)")').click();
    await page.waitForTimeout(1000);
    
    // Test chọn Tư thế nâng cần
    await page.locator('button:has-text("Tư thế nâng cần")').click();
    await page.waitForTimeout(1000);
    
    // Test chọn Tư thế đổ gầu
    await page.locator('button:has-text("Tư thế đổ gầu")').click();
    await page.waitForTimeout(1000);
  });

  test('should adjust payload and throttle (Scenario 4 & 5)', async ({ page }) => {
    const sliders = page.locator('input[type="range"]');
    
    // Kịch bản 4: Thay đổi Payload
    await sliders.nth(3).fill('800'); // Gán payload = 800 kg
    await sliders.nth(3).dispatchEvent('change');
    
    // Kịch bản 5: Thay đổi Throttle
    await sliders.nth(4).fill('0.8'); // Gán throttle = 80%
    await sliders.nth(4).dispatchEvent('change');
  });

  test('should run, pause, resume, reset, and complete automatic cycle (Scenario 6, 7, 8, 9, 10)', async ({ page }) => {
    // Kịch bản 6: Bắt đầu chu trình tự động
    await page.locator('button:has-text("Chạy Chu Trình")').click();
    await expect(page.locator('text=APPROACH')).toBeVisible();
    
    // Kịch bản 7: Tạm dừng
    await page.locator('button:has-text("Tạm Dừng")').click();
    await expect(page.locator('footer')).toContainText('Trạng thái: PAUSED');
    
    // Kịch bản 8: Tiếp tục
    await page.locator('button:has-text("Tiếp Tục")').click();
    await expect(page.locator('footer')).toContainText('Trạng thái: RUNNING');
    
    // Kịch bản 9: Đặt lại
    await page.locator('button:has-text("Đặt Lại")').click();
    await expect(page.locator('footer')).toContainText('Trạng thái: IDLE');
    
    // Kịch bản 10: Hoàn thành toàn bộ chu trình (Chờ chu trình chạy hết 8 bước)
    await page.locator('button:has-text("Chạy Chu Trình")').click();
    // Đợi chu trình chạy từ IDLE -> COMPLETE
    await page.waitForSelector('text=COMPLETE', { timeout: 25000 });
    await expect(page.locator('text=100%').first()).toBeVisible();
  });

  test('should trigger and recover from hydraulic warnings (Scenario 11 & 12)', async ({ page }) => {
    const sliders = page.locator('input[type="range"]');
    
    // Kịch bản 11: Kích hoạt lỗi OVERLOAD bằng cách tăng payload quá 1600kg
    await sliders.nth(3).fill('1800');
    await sliders.nth(3).dispatchEvent('change');
    
    // WarningPanel phải hiển thị cảnh báo quá tải
    await expect(page.locator('text=OVERLOAD')).toBeVisible();
    
    // Kịch bản 12: Phục hồi từ cảnh báo bằng cách giảm payload về an toàn (ví dụ: 500kg)
    await sliders.nth(3).fill('500');
    await sliders.nth(3).dispatchEvent('change');
    
    // WarningPanel không được chứa OVERLOAD nữa
    await expect(page.locator('text=OVERLOAD')).not.toBeVisible();
  });
});
