# Phát triển trên Open3DKit Core

Core hiện là mã nguồn dùng chung trong repo (`src/core`), chưa phải package npm phát hành riêng. Core dùng Three.js, không phụ thuộc React; riêng `Viewport` cần DOM và WebGL.

## Thành phần

| Thành phần | Trách nhiệm |
| --- | --- |
| `SceneDocument` | Tập đối tượng cấp cao, thêm/xóa, thông báo thay đổi |
| `ToolRegistry` | Đăng ký tool bằng id duy nhất, liệt kê, thực thi và hủy đăng ký |
| `Viewport` | Renderer, camera, OrbitControls, resize và vòng lặp vẽ |
| `disposeObjects` | Giải phóng geometry, material và texture trực tiếp trên material |
| `src/tools` | Nơi viết tính năng mở rộng |
| `src/Workspace.tsx` | UI mẫu kết nối core và tool |

## Thêm một tool

Ví dụ tạo tool mới `src/tools/myTool.ts` (tool hình cầu có sẵn trong repo):

```ts
import { Mesh, SphereGeometry, MeshStandardMaterial } from 'three';
import type { ToolDefinition } from '../core';

export const myTool: ToolDefinition = {
  id: 'community.my-sphere',
  label: 'Hình cầu tùy chỉnh',
  category: 'Cộng đồng',
  description: 'Tool hình cầu mở rộng của cộng tác viên.',
  run({ document }) {
    const mesh = new Mesh(
      new SphereGeometry(1, 32, 16),
      new MeshStandardMaterial({ color: '#72d9b0' }),
    );
    mesh.name = 'Hình cầu';
    mesh.position.y = 1;
    document.add(mesh);
  },
};
```

Import và gọi `registry.register(myTool)` trong `src/tools/index.ts`. UI mẫu tự tạo nút từ danh sách tool khi ứng dụng khởi tạo lại; nếu Vite giữ state cũ khi sửa registry, tải lại trang. Không cần sửa renderer hay App để thêm nút tool.

`run` hiện là thao tác đồng bộ, không có input chung. Tool bất đồng bộ, form tham số và progress cần hợp đồng riêng trước khi bổ sung; không đăng ký hàm async vào API hiện tại.

## Dữ liệu và vòng đời

- Tạo `SceneDocument`, rồi truyền vào `new Viewport(container, document)`.
- Thêm/xóa qua `document.add(object)` và `document.remove(uuid)` để subscriber được thông báo. `objects` trả về bản sao danh sách; các object Three.js bên trong vẫn là object có thể thay đổi.
- Không sửa trực tiếp children của `document.root`. Root được công khai để gắn vào scene, không phải API cập nhật có thông báo.
- `subscribe(callback)` trả về hàm unsubscribe. Thông báo hiện chỉ cho thêm/xóa, chưa theo dõi đổi tên hoặc transform.
- Mỗi document gắn với một viewport tại một thời điểm vì Object3D chỉ có một parent.
- `remove` trả lại object và **không dispose**: caller sở hữu object đã lấy ra, có thể thêm lại hoặc gọi `disposeObjects([object])` khi không còn dùng. Không dispose tài nguyên còn được object khác sử dụng.
- `viewport.dispose()` dừng animation/observer/controls và giải phóng renderer/grid, không dispose model của document. Host phải unsubscribe và `disposeObjects(document.objects)` khi kết thúc sử dụng document.
- `disposeObjects` deduplicate tài nguyên chia sẻ trong một lần gọi. Shader uniforms, render targets, skeletons, ImageBitmap và tài nguyên đặc biệt cần cleanup riêng của tool.

## Kiểm tra và đóng góp

```bash
npm ci
npm test
npm run build
npm run dev
```

Test core chạy bằng Node.js 24, không cần DOM/GPU. Với thay đổi viewport, kiểm tra thêm trình duyệt: render, resize, xoay/zoom/pan, reset và console. Gửi PR có mô tả hành vi và kết quả kiểm tra; giữ thay đổi gọn, cập nhật tài liệu khi API thay đổi.

Chưa có selection, undo/redo, lưu project, import/export model hoặc sandbox plugin. Tool hiện là TypeScript tin cậy được import khi build, không phải plugin ngoài có thể tải động.

## Trang thư viện và gắn tool lên trang

Trang mặc định (`#tools`) lấy danh sách trực tiếp từ `createTools().entries`. Các trường `label`, `description`, `category` là nội dung thẻ; `id` là định danh duy nhất và được dùng trong URL `#workspace/<id>`. `category` chưa có sẽ hiển thị trong nhóm Khác. Không cần tạo thẻ thủ công trong App.

Luồng mở tool: thẻ thư viện → workspace mới → thực thi tool đã chọn. Trở về thư viện sẽ hủy workspace và giải phóng tài nguyên; hiện chưa lưu scene khi điều hướng.

Trang `#contribute` có hướng dẫn và file TypeScript mẫu tải về. Cộng tác viên đóng góp bằng Git/PR; không có trình soạn code online hoặc chức năng tải plugin từ người dùng. Code mới xuất hiện sau khi đăng ký, kiểm tra, merge và triển khai bản build. Trên local chỉ cần sửa code rồi tải lại trang.

`src/App.tsx` quản lý thư viện, tìm kiếm, bộ lọc và route hash. `src/Workspace.tsx` kết nối core với UI làm việc. Tìm kiếm bỏ dấu tiếng Việt và không phân biệt chữ hoa/thường.
