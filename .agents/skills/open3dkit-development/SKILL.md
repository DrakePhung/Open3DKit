---
name: open3dkit-development
description: "Use for planning or implementing Open3DKit changes spanning core, tool extensions, or host UI; routes to focused repository skills. Not for unrelated repositories."
---

# Phát triển Open3DKit

Đọc `AGENTS.md`, `package.json` và các file liên quan trước khi sửa. Các đường dẫn mã nguồn trong bộ skill tính từ gốc repo. Dùng Node.js 24, npm và TypeScript strict; nội dung UI/tài liệu mặc định tiếng Việt, identifier tiếng Anh.

## Chọn skill theo công việc

Chỉ đọc skill phù hợp; không cần tải cả bộ:

- Core, document, camera, tài nguyên GPU: `../open3dkit-core/SKILL.md`.
- Viết hoặc đăng ký tool mới: `../open3dkit-tool/SKILL.md`.
- Thư viện, tìm kiếm, trang đóng góp, workspace UI: `../open3dkit-ui/SKILL.md`.
- Nhập/xuất file mô hình và định dạng: `../open3dkit-model-io/SKILL.md`.
- Kiểm tra trước bàn giao hoặc review: `../open3dkit-verification/SKILL.md`.

Core nằm trong `src/core`; tool nằm trong `src/tools`; `src/App.tsx` là thư viện/trang đóng góp; `src/Workspace.tsx` là host React cho viewport. Đọc `docs/CORE.md` khi thay đổi API.

Giữ xử lý local theo mặc định. Tính năng mới cần upload phải có yêu cầu rõ về dịch vụ và dữ liệu. Giữ diff theo phạm vi yêu cầu; cập nhật tài liệu khi API hoặc workflow thay đổi. Không tự push, publish hoặc đổi cấu hình toàn máy chỉ vì đang dùng skill.

Kết thúc bằng kiểm tra phù hợp ở skill verification và báo rõ việc chưa kiểm tra. Không mô tả tính năng dự định là tính năng đã có.
