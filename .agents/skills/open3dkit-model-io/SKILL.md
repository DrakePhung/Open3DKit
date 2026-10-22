---
name: open3dkit-model-io
description: "Use when implementing or debugging Open3DKit model import/export, STL/OBJ/glTF/GLB handling, scale/units, or print-oriented geometry validation. The current starter does not yet provide these features."
---

# Nhập/xuất model và dữ liệu in 3D

Đây là workflow cho tính năng mới; starter hiện chưa có import/export, slicer hoặc kiểm tra model để in. Đọc `docs/CORE.md` và API thực tế trước khi thiết kế. Không dựa vào tên Open3DKit để giả định đang dùng thư viện Python Open3D.

Xác định định dạng, mục đích và đơn vị theo yêu cầu. Nếu chưa rõ một quyết định làm thay đổi dữ liệu, hỏi về quyết định đó trước khi chuyển đổi. Three.js dùng tọa độ không có đơn vị: quy ước mm/cm/m và chuyển đổi chỉ khi đã xác định. Không tự scale model dựa trên kích thước đoán.

## Luồng xử lý

1. Chọn loader/exporter trong Three.js addons phù hợp định dạng, đối chiếu tài liệu chính thức hiện hành khi cần. Phân biệt STL chỉ geometry, OBJ có tài nguyên liên quan, glTF/GLB có cấu trúc scene/material.
2. Parse và kiểm tra vào vùng tạm; chỉ gắn vào document khi thành công. Xử lý file rỗng/hỏng, tài nguyên phụ thiếu, NaN/Infinity, và giới hạn kích thước theo nhu cầu thực tế.
3. Giữ file gốc. Đặt tên object, xử lý transform/scale có chủ đích; không flatten group hoặc bỏ material âm thầm.
4. Xử lý local. Kiểm soát tài nguyên URI bên ngoài của model; không tự tải lên dịch vụ hay truy cập đường dẫn tùy ý. Revoke object URL và giải phóng tài nguyên tạm/worker khi xong hoặc hủy.
5. Export từ trạng thái đã xác định, xử lý world transform đúng định dạng, giữ đơn vị đã công bố. Chỉ tải file sau khi export thành công.

Với yêu cầu in 3D: báo riêng manifold/watertight, hướng normal, mặt suy biến, kích thước và đơn vị nếu đã có thuật toán kiểm tra. Không tuyên bố model chắc chắn in được từ việc nó hiển thị thành công. Sửa mesh cần có kết quả kiểm chứng và giữ cách quay lại dữ liệu gốc.

Test bằng fixture nhỏ do dự án tạo: hợp lệ, rỗng, hỏng, transform, scale; round trip khi định dạng hỗ trợ. So sánh bounding box/topology/tolerances theo mục đích, không mặc định so byte. Chạy gate dự án; cập nhật các định dạng và giới hạn thực sự hỗ trợ.
