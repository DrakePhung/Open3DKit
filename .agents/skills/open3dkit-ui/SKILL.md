---
name: open3dkit-ui
description: "Use for Open3DKit catalog cards, Vietnamese search, category filters, hash navigation, contribution page, workspace controls, accessibility, or responsive styles. Not for geometry algorithms."
---

# Giao diện thư viện và workspace

Đọc `src/App.tsx`, `src/Workspace.tsx`, `src/catalog.ts` và phần CSS liên quan. Giữ phong cách đồng nhất: thư viện và workspace nền sáng xanh lá, dùng design tokens trong :root của src/style.css. Viewport đọc màu nền/lưới từ CSS khi khởi tạo.

## Nguồn dữ liệu và route

- Danh sách tool lấy từ `createTools().entries`, không nhân bản metadata/hardcode số tool.
- `#tools`: thư viện; `#contribute`: hướng dẫn; `#workspace/<tool-id>`: mở workspace và chạy tool đã chọn; `#catalog`: neo tới danh sách.
- Tìm kiếm dùng `normalizeSearch`, hỗ trợ tiếng Việt không dấu và đ/Đ. Kết hợp với bộ lọc và hiển thị trạng thái rỗng có cách khôi phục.
- Chuyển khỏi workspace hiện bỏ scene chưa lưu. Không hứa lưu state khi chưa thêm cơ chế persistence.
- Core/geometry không đặt vào JSX. Lỗi WebGL hoặc tool cần hiển thị rõ, không để màn hình trống.

Dùng link cho điều hướng, button cho hành động; label ô tìm kiếm, trạng thái bộ lọc, focus và keyboard phải dùng được. Tôn trọng reduced motion, kiểm tra màn hình hẹp và panel code cuộn nội bộ. Tránh style global ảnh hưởng chéo portal/editor.

Trang đóng góp mô tả quy trình Git/PR, không phải editor online hay chợ plugin tải động. File mẫu/tài liệu tải xuống phải khớp API hiện tại. Link GitHub phải trỏ đúng repo, không mô tả code local là đã push.

Sau thay đổi, chạy `npm run build`. Kiểm tra trình duyệt: search không dấu, xóa tìm kiếm, lọc kết hợp, empty state, mở đúng tool, quay lại, trang đóng góp/tải mẫu và lỗi console; kiểm tra desktop/điện thoại theo phạm vi thay đổi. Nếu không có browser, báo giới hạn thay vì khẳng định đã kiểm tra hình ảnh.
