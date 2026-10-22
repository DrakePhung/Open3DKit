# Bộ skill Open3DKit

Các skill nằm trong `.agents/skills/` của repo, dành cho coding agent làm việc trên Open3DKit. Đây là hướng dẫn phát triển; không phải tính năng chạy trong website hoặc plugin 3D tải động.

| Skill | Khi dùng |
| --- | --- |
| `open3dkit-development` | Hiểu kiến trúc, chọn workflow hoặc sửa nhiều lớp |
| `open3dkit-core` | SceneDocument, ToolRegistry, viewport, cleanup GPU |
| `open3dkit-tool` | Viết tool mới và gắn thẻ vào thư viện |
| `open3dkit-ui` | Thư viện, tìm kiếm, bộ lọc, workspace, trang đóng góp |
| `open3dkit-model-io` | Phát triển nhập/xuất STL/OBJ/glTF/GLB, đơn vị và kiểm tra model |
| `open3dkit-verification` | Chạy kiểm tra phù hợp và báo cáo trước bàn giao |

## Cách sử dụng

Mở repo Open3DKit làm project trong Codex. Skill được khai báo ở thư mục chuẩn `.agents/skills`; `AGENTS.md` cũng chỉ rõ routing để agent đọc hướng dẫn phù hợp. Nếu phiên đang mở chưa nhận danh sách skill mới, mở chat mới trong project; hoặc chỉ định trực tiếp đường dẫn SKILL.md để agent đọc. Không cần cài toàn máy và không cần thay cấu hình project khác.

Ví dụ:

```text
Dùng $open3dkit-tool tạo tool thêm hình nón và gắn vào thư viện.
Dùng $open3dkit-core bổ sung API đổi tên đối tượng có thông báo.
Dùng $open3dkit-ui cải thiện bộ lọc trên điện thoại.
Dùng $open3dkit-model-io triển khai nhập STL với đơn vị mm.
Dùng $open3dkit-verification kiểm tra thay đổi trước khi bàn giao.
```

Nếu client chưa nhận cú pháp `$`, dùng: “Đọc .agents/skills/open3dkit-tool/SKILL.md rồi tạo tool hình nón”.

Skill model IO hướng dẫn triển khai tương lai; hiện chưa có import/export hoặc slicer. Các skill không tự cấp quyền push, deploy hoặc upload dữ liệu. Mỗi skill có `agents/openai.yaml` chứa tên hiển thị và prompt gợi ý; giữ cơ chế lựa chọn tự động mặc định.

Khi đổi API, cập nhật skill có liên quan cùng với `docs/CORE.md`. Chỉ cần đọc các skill liên quan đến nhiệm vụ, không tải cả bộ cho mọi thay đổi.
