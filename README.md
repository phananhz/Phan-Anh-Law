# Phan Anh Law

Website Next.js theo hướng static-first cho Phan Anh Corporate Law. Nội dung công khai có dữ liệu fallback tĩnh nên vẫn render được khi chưa cấu hình Supabase; khi có Supabase, tin tức, đối tác, tin nhắn liên hệ và khu vực quản trị sẽ dùng dữ liệu thật.

## Chạy local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Các URL chính:

- `/` — trang chủ, tin tức mới và dải đối tác chạy ngang.
- `/news` — danh sách tin tức; `/news/[slug]` — bài viết chi tiết.
- `/login` — đăng nhập quản trị, không liên kết công khai trên navbar.
- `/admin` — dashboard; `/admin/messages` — tin nhắn; `/admin/news` — quản lý bài viết.
- /preview/news/[id] — xem trước bài nháp, chỉ mở được khi đã đăng nhập quản trị.

## Supabase

1. Tạo project Supabase và chạy toàn bộ `supabase/schema.sql` trong SQL Editor.
2. Tạo user email/password đầu tiên trong Authentication → Users.
3. Thay `AUTH_USER_UUID` trong ví dụ ở `supabase/seed.sql`, rồi thêm user đó vào `admin_profiles` với role `super_admin`.
4. Chạy phần seed đối tác trong `supabase/seed.sql`. Schema đồng thời tạo bucket Storage công khai `news-media` (JPEG/PNG/WebP/AVIF, tối đa 5 MB) và policy chỉ cho editor/super_admin tải ảnh vào thư mục riêng theo user ID.
5. Đặt các biến trong `.env.local` hoặc Vercel theo `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

Service-role key không được đưa vào frontend hoặc biến `NEXT_PUBLIC_*`. RLS trong schema giới hạn bài viết/đối tác/tin nhắn theo vai trò; public chỉ được đọc bài đã xuất bản, đối tác đang hoạt động và insert form liên hệ. Nội dung rich-text được lưu dạng JSON đã whitelist node/mark, URL và kiểu ảnh; editor có upload ảnh, định dạng chữ và nút xem trước trước khi xuất bản.

## Vercel và Cloudflare Free

- Import repository vào Vercel, dùng lệnh mặc định `npm run build`.
- Khai báo ba biến môi trường ở cả Preview và Production; sau khi đổi biến cần redeploy.
- Trong Supabase Auth, đặt Site URL và Redirect URL trùng domain Vercel/domain thật.
- Trỏ DNS domain qua Cloudflare, bật proxy và Always Use HTTPS. Cloudflare có thể bổ sung WAF/Rate Limiting/Turnstile sau khi có domain thật.

Form liên hệ hiện có Zod validation, honeypot và rate limit best-effort theo IP/email ở API route. Vì Vercel serverless không giữ bộ nhớ giữa mọi instance, production nên bật thêm Cloudflare Rate Limiting hoặc Turnstile nếu form bị spam.

## Kiểm tra trước khi deploy

```bash
npx tsc --noEmit
npm run build
npm audit --omit=dev
```
