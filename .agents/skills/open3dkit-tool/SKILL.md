---
name: open3dkit-tool
description: "Use when creating or modifying a trusted Open3DKit TypeScript tool, its catalog metadata, or registration in src/tools/index.ts. Does not implement browser code execution or external plugin loading."
---

# Viết và gắn tool

Đọc `src/core/ToolRegistry.ts`, `src/tools/index.ts`, một tool gần nhu cầu và `docs/CORE.md`. Tạo tool trong `src/tools` dùng `ToolDefinition` từ `../core`.

## Hợp đồng tool

- `id`: duy nhất, ổn định và dùng được trực tiếp trong hash route; theo dạng `namespace.action-name`.
- `label`, `description`, `category`: nội dung tiếng Việt cho thẻ và bộ lọc. Không tạo thẻ riêng trong App cho mỗi tool.
- `run({ document })`: hiện đồng bộ, nhận document. Không thêm hàm async vào hợp đồng void rồi cho rằng host đang chờ nó. Nếu cần form, camera hoặc tiến trình, triển khai hợp đồng core/host tương ứng trước.
- Object mới không có parent; đặt tên và vị trí phù hợp để nhìn được trên sàn. Thêm bằng `document.add`.

Ví dụ khung (đổi tên/id và triển khai hành vi thật):

```ts
import type { ToolDefinition } from '../core';
export const myTool: ToolDefinition = {
  id: 'community.my-tool',
  label: 'Tên công cụ',
  description: 'Công cụ thực hiện thao tác gì.',
  category: 'Cộng đồng',
  run({ document }) {
    // Thao tác geometry/document theo chức năng đã yêu cầu.
  },
};
```

Import tool rồi gọi `registry.register(myTool)` trong `createTools()` ở `src/tools/index.ts`. Thẻ thư viện, danh mục và nút workspace lấy từ registry. Chọn icon minh họa phù hợp trong App nếu cần; hình mặc định không làm thay đổi hành vi tool. Tải lại trang khi thay registry để tránh state HMR cũ.

Tách phép tính geometry có thể tái sử dụng khỏi UI. Với xử lý nặng, cân nhắc worker. Khi thao tác thất bại, giữ dữ liệu gốc và giải phóng tài nguyên tạm. Không hứa selection, undo hoặc export nếu chưa triển khai.

Kiểm tra: chạy lặp trong cùng document; tên/vị trí/số object đúng; tool mở từ thẻ đúng hash; không lỗi console; thêm test cho tính toán/hành vi không tầm thường. Chạy `npm test` và `npm run build`. Cập nhật tài liệu và mô tả thẻ đúng với khả năng thực tế.
