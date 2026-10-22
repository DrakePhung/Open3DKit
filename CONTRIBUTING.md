# Đóng góp tool cho Open3DKit

1. Fork repository, clone về máy và dùng Node.js 24.
2. Chạy `npm ci` và `npm run dev`.
3. Viết tool TypeScript trong `src/tools/`, triển khai `ToolDefinition` từ `src/core`.
4. Đặt `id` duy nhất; thêm `label`, `description`, `category` để tạo thẻ trong thư viện.
5. Import tool và gọi `registry.register(tool)` trong `src/tools/index.ts`.
6. Chạy `npm test` và `npm run build`; mở thử tool, xoay/zoom/pan, reset và kiểm tra console.
7. Gửi pull request kèm mô tả, kết quả kiểm tra và ảnh nếu có thay đổi UI.

Xem [API core và ví dụ code](docs/CORE.md). Mở `#contribute` trên ứng dụng để tải file mẫu.

Tool cần xử lý local theo mặc định; mô tả rõ định dạng hỗ trợ và quản lý tài nguyên Three.js đúng vòng đời. Không commit node_modules, dist, secrets hay model riêng tư.

Sau khi PR được merge, người quản lý build/triển khai phiên bản mới. Đăng ký tool sẽ tự tạo thẻ trên trang; không cần chỉnh danh mục thủ công. Hiện dự án chạy local, chưa có pipeline triển khai công khai hay cơ chế duyệt code trong trình duyệt.

Coding agent có thể dùng [bộ skill của dự án](docs/SKILLS.md), đặc biệt `open3dkit-tool` để viết tính năng và `open3dkit-verification` để kiểm tra.
