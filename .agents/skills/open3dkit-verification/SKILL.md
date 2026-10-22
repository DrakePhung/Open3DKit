---
name: open3dkit-verification
description: "Use for validating Open3DKit changes before handoff, reviewing a contribution, or diagnosing failing project checks. This checks local readiness; it does not publish, push, or release."
---

# Kiểm tra trước bàn giao

Đọc diff, `package.json`, `AGENTS.md` và hợp đồng trong `docs/CORE.md`. Chọn kiểm tra theo thay đổi, không dựng lại môi trường nếu dependencies hiện tại phù hợp. Dùng Node.js 24; `npm ci` khi cần cài từ lockfile.

## Gate có sẵn

- `npm test`: Node test runner, kiểm tra core không cần GPU.
- `npm run build`: bao gồm `npm run typecheck` rồi Vite production build; không cần chạy typecheck lại nếu build đã qua với cùng input.
- `git diff --check`: lỗi whitespace trong thay đổi được theo dõi. File mới chưa theo dõi cần được xem riêng; lệnh này không kiểm tra chúng.

Khi chỉ sửa skill/tài liệu, validate skill và kiểm tra đường dẫn/nội dung; không cần chạy WebGL hay toàn bộ app test nếu không đổi app. Nếu tài liệu được import bằng `?raw` vào UI, build để xác nhận bundle.

Với thay đổi hành vi, test invariant có ý nghĩa, không test chỉ để khớp wording hoặc cấu trúc implementation. Node 24 strip-types không resolve alias/bundler directory import: test file `.mjs` import module `.ts` trực tiếp khi có thể; module cần DOM/WebGL phải kiểm tra qua browser hoặc adapter phù hợp.

## Browser theo phạm vi

- Thư viện: search không dấu, lọc, rỗng, khôi phục, mở đúng thẻ.
- Workspace: tool chạy nhiều lần, danh sách object cập nhật, xoay/zoom/pan, reset, resize.
- Vòng đời: ra/vào workspace nhiều lần, React StrictMode, không canvas/animation thừa hoặc cảnh báo mất WebGL context.
- UI: bàn phím/focus, desktop/điện thoại, trang đóng góp và file mẫu.

Chỉ khẳng định các bước đã thực hiện; build không chứng minh WebGL hay download hoạt động. Phân biệt warning (ví dụ chunk lớn) và lỗi gate. Không tự tăng ngưỡng để giấu lỗi. Khi fail, tìm nguyên nhân, sửa trong phạm vi, chạy lại kiểm tra bị ảnh hưởng.

Bàn giao ngắn: thay đổi chính, kết quả kiểm tra, hạn chế quan trọng và đường dẫn. Readiness local không đồng nghĩa đã push/deploy. Không tạo release, tag, commit hoặc publish chỉ vì đang chạy skill này.
