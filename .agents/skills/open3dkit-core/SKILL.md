---
name: open3dkit-core
description: "Use when changing Open3DKit SceneDocument, ToolRegistry, Viewport, public core exports, or Three.js resource ownership. For a new tool using existing APIs, use open3dkit-tool."
---

# Core và vòng đời 3D

Đọc `docs/CORE.md` và module liên quan trong `src/core`. Core không phụ thuộc React; `Viewport` là adapter DOM/WebGL. Export API dùng chung từ `src/core/index.ts`.

## Những hợp đồng cần giữ

- Thêm/xóa qua `SceneDocument.add/remove`; không thay `root.children` trực tiếp. `objects` là snapshot danh sách, không phải bản sao sâu của model.
- Subscriber hiện chỉ nhận thêm/xóa. Nếu cần phản ánh đổi tên/transform, bổ sung API thông báo và test thay vì giả định UI đã theo dõi.
- Một document gắn vào một viewport tại một thời điểm; Object3D chỉ có một parent.
- `remove` trả lại object và chuyển trách nhiệm tài nguyên cho caller; không tự dispose object còn được dùng.
- `Viewport.dispose` giải phóng renderer/grid/controls/observer và dừng animation. Host unsubscribe và giải phóng model của document riêng.
- `disposeObjects` deduplicate geometry/material/texture trực tiếp trên material trong một lần gọi. Uniform, render target, skeleton và ImageBitmap cần cleanup riêng. Không dispose tài nguyên còn được đối tượng sống chia sẻ.

Với renderer: resize theo container, bỏ kích thước 0, giới hạn pixel ratio, không tạo lại renderer khi React cập nhật thông thường. Xử lý cả StrictMode mount/unmount và lỗi khởi tạo giữa chừng; rollback tài nguyên đã tạo nếu constructor thất bại.

Với API: giữ tương thích khi có thể, xác định quyền sở hữu và cách báo lỗi. Kiểm tra caller trong tool và Workspace sau khi thay chữ ký. Thêm test hành vi như cycle, duplicate id, unsubscribe, xóa/khôi phục và cleanup khi thay các hợp đồng này.

Chạy `npm test` và `npm run build`; nếu thay viewport, kiểm tra WebGL, resize, xoay/zoom/pan, reset và chuyển qua lại thư viện nhiều lần. Cập nhật `docs/CORE.md` nếu API thay đổi.
