# Open3DKit

Bộ công cụ 3D mã nguồn mở, chạy cục bộ trên trình duyệt.

## Môi trường

- Node.js 24 LTS, npm.
- TypeScript strict + React + Three.js + Vite.
- Trình duyệt hỗ trợ WebGL và bật tăng tốc đồ họa.

Máy hiện tại được cấu hình Node.js chính thức tại `~/.local/share/open3dkit/` và PATH trong `~/.zprofile`. Mở terminal mới hoặc chạy `source ~/.zprofile` trước khi dùng npm.

Trên máy khác, macOS có thể dùng Homebrew: `brew install node@24`. Nếu Node chưa có trong PATH, chạy `export PATH="/opt/homebrew/opt/node@24/bin:$PATH"` trong terminal hiện tại (Apple Silicon). Với nvm, chạy `nvm install` và `nvm use` theo `.nvmrc`.

## Chạy dự án

```bash
cd /Open3DKit
npm ci
npm run dev
```

Mở URL localhost được Vite in ra (mặc định http://127.0.0.1:5173). Dev server chỉ lắng nghe trên loopback.

```bash
npm run typecheck
npm run build
npm run preview
```

## Core cho cộng tác viên

Core TypeScript trong `src/core` độc lập với React. UI gồm trang thư viện tool, hướng dẫn đóng góp và workspace sử dụng core.

- `SceneDocument`: quản lý đối tượng và sự kiện thêm/xóa.
- `Viewport`: renderer, camera, điều khiển và vòng đời WebGL.
- `ToolRegistry`: đăng ký và chạy tool qua API thống nhất.
- `src/tools/addCube.ts`: tool mẫu; đăng ký tool mới tại `src/tools/index.ts`.

Xem [hướng dẫn API và cách viết tool](docs/CORE.md). Chạy `npm test` để kiểm tra hợp đồng core; `npm run build` bao gồm typecheck.

Mở `http://127.0.0.1:5173/#tools` để xem thư viện có tìm kiếm và bộ lọc. Trang `#contribute` hướng dẫn viết tool và tải code mẫu. Thẻ tool mở workspace với đúng hình đã chọn. Có ba tool: khối hộp, hình cầu, hình trụ; scene có lưới sàn, xoay/zoom/pan và reset camera. Điều hướng ra khỏi workspace hiện sẽ bỏ scene chưa lưu. Chưa có nhập/xuất mô hình, selection, undo/redo hay lưu dự án. Core chưa phát hành thành package npm riêng.

## Cấu trúc

```text
src/
  core/       # API và vòng đời 3D dùng chung
  tools/      # Tool do cộng tác viên viết
  App.tsx     # Thư viện tool và trang đóng góp
  Workspace.tsx # UI sử dụng core
  main.tsx    # Entry React
  style.css   # Bố cục
tests/        # Kiểm tra core không cần GPU
```

`AGENTS.md` và `.agents/skills/open3dkit-development/SKILL.md` chứa hướng dẫn cho coding agent. Không có backend hay dịch vụ upload trong bản hiện tại.

## Skill cho coding agent

Có bộ 6 skill riêng cho phát triển, core, tool, UI, model IO và verification trong `.agents/skills/`. Xem [cách dùng và ví dụ](docs/SKILLS.md). Skill model IO là hướng dẫn triển khai, chưa bổ sung chức năng import/export vào ứng dụng.

Giao diện thư viện và workspace dùng chung palette sáng xanh lá, logo và typography. Màu nền/lưới 3D lấy từ design tokens `--viewport-background`, `--grid-center`, `--grid-lines` trong `src/style.css` khi viewport khởi tạo.
