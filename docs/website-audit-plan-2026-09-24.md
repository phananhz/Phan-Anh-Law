# Rà soát website và kế hoạch hoàn thiện Phan Anh Law

Ngày: 24/09/2026. Baseline: b1db662, main.
Phạm vi: rà soát và lập kế hoạch; chưa sửa mã ứng dụng, schema, dữ liệu hoặc deployment.

## 1. Kết luận và giới hạn kiểm chứng

- Người dùng xác nhận Tin tức/Tin nhắn chậm chuyển trang sau khi bấm sidebar. Chưa có bằng chứng hai trang này bị crash.
- Đối tác là chức năng chưa triển khai: sidebar có /admin/partners nhưng không có page/API tương ứng; production trả 404.
- Các trang public chính có thể truy cập, nhưng vẫn tồn tại dữ liệu mẫu, liên kết chưa đúng chức năng và phần quản trị chưa đầy đủ.
- Đã đọc các route public/admin, component tương tác, API, auth, schema, cấu hình và nguồn dữ liệu; kiểm tra HTTP 40 đường dẫn, trong đó 30 URL trong sitemap đều trả 200.
- /admin, /admin/news, /admin/messages, /admin/news/new trả 307 về /login khi chưa đăng nhập. Đây là hành vi bảo vệ route, không phải lỗi.
- /privacy và /terms chưa tồn tại; footer hiện dẫn các nhãn này về /contact.
- Các phép SELECT bằng publishable key xác nhận các bảng/cột được kiểm tra có thể được API phân giải. Không có hàng articles/partners hiển thị công khai tại thời điểm kiểm tra. Điều này không chứng minh database không có bài nháp/đối tác ẩn.
- Anonymous không đọc được hàng contact_messages/admin_profiles qua các phép thử. Chưa kiểm thử đầy đủ ma trận RLS bằng các tài khoản khác vai trò.
- npm audit --omit=dev báo 0 vulnerability tại thời điểm rà soát.
- Kiểm chứng validator bằng dữ liệu trong bộ nhớ: văn bản thường được chấp nhận; inline code và textStyle có thuộc tính mặc định null bị từ chối; normalize đổi tài liệu không hợp lệ thành nội dung rỗng.
- Công cụ browser không khởi động được vì helper_unknown_error. Chưa kiểm thử phiên admin đã đăng nhập, thao tác CRUD, refresh session, layout mobile và Core Web Vitals trực tiếp.
- Không gửi form liên hệ, tạo bài, xóa bản ghi hay ghi dữ liệu thử lên production.

## 2. Danh mục phát hiện

P0 = ưu tiên sửa trước vì đang cản trở sử dụng.
P1 = cần hoàn thiện để vận hành ổn định.
P2 = hoàn thiện trải nghiệm/nội dung và mở rộng CMS.

| ID | Ưu tiên | Phát hiện có bằng chứng | Ảnh hưởng |
| --- | --- | --- | --- |
| ADM-01 | P0 | Admin force-dynamic nhưng không có loading.tsx/error.tsx; sidebar không có pending state | Bấm rồi chờ server, thiếu phản hồi tức thì |
| ADM-02 | P0 | Middleware gọi getUser; getCurrentAdmin cũng gọi getUser và đọc profile | Có đường request kiểm tra auth lặp; cần đo và giảm vòng mạng hợp lý |
| ADM-03 | P0 | Header response có hkg1::iad1; ảnh database trước đó ở ap-northeast-1 Tokyo | Có khả năng app/database khác vùng; cần xác nhận cấu hình và đo trước/sau |
| PAR-01 | P0 | Sidebar trỏ /admin/partners nhưng không có page hay API | 404; chưa có CRUD đối tác |
| MSG-01 | P0 | Nút Eye không có handler/link; truy vấn không lấy nội dung/phone | Chưa xem được chi tiết tin nhắn |
| MSG-02 | P1 | Trang không đọc searchParams; chưa có update API; chỉ limit(50) | Bộ lọc từ dashboard không tác dụng; chưa xử lý trạng thái/phân trang |
| NEWS-01 | P0 | Admin list dùng tin mẫu khi dữ liệu rỗng/lỗi | Hiển thị bài không tồn tại trong DB như bài thật |
| NEWS-02 | P0 | Edit fallback có id dạng mẫu, nhưng save chọn PATCH dựa trên id thay vì persisted | Lưu bài mẫu có thể lỗi UUID hoặc không cập nhật đúng |
| NEWS-03 | P1 | PATCH không xác nhận bản ghi được cập nhật và không kiểm tra UUID trước | Có trường hợp báo thành công dù không cập nhật hàng nào |
| NEWS-04 | P1 | PATCH gán lại published_at mỗi lần sửa; chỉ revalidate slug mới | Sai ngày xuất bản; cache slug cũ chưa được xử lý rõ |
| NEWS-05 | P1 | Thiếu xóa/lưu trữ trong UI/API; chưa có tìm kiếm/lọc/phân trang admin | Vòng đời quản trị bài chưa hoàn chỉnh |
| EDIT-01 | P1 | Schema editor, validator và renderer chưa đồng nhất | Định dạng có thể bị từ chối hoặc mất khi hiển thị |
| EDIT-02 | P1 | StarterKit v3 đã có Link/Underline nhưng đăng ký riêng thêm lần nữa | Cần loại extension trùng, kiểm tra command và serialization |
| EDIT-03 | P1 | Renderer không dùng textAlign của paragraph/heading | Canh lề khi xem trước/public không khớp editor |
| EDIT-04 | P1 | save thiếu try/catch/finally; beforeunload không bảo vệ mọi điều hướng nội bộ | Có thể kẹt trạng thái lưu hoặc mất thay đổi khi bấm sidebar |
| EDIT-05 | P2 | Slug có placeholder tự tạo nhưng chưa tự tạo; preview đọc bản đã lưu | Trải nghiệm biên tập chưa rõ, dễ xem nội dung cũ |
| MEDIA-01 | P1 | Upload qua Vercel API cho phép file 5 MB | Một phần file hợp lệ theo UI có thể bị 413 vì giới hạn request 4,5 MB |
| MEDIA-02 | P1 | Bài có ảnh bìa của editor A bị API editor B từ chối khi lưu | Quyền sửa bài và quyền sử dụng media chưa thống nhất |
| MEDIA-03 | P2 | Chưa có vòng đời thu gom ảnh bỏ dở/ảnh bị thay | Dễ tích lũy file không còn được tham chiếu |
| DATA-01 | P1 | Public news/partners fallback sang mẫu cả khi DB lỗi hoặc không có hàng | Ẩn/xóa hết dữ liệu thật có thể làm dữ liệu mẫu xuất hiện lại |
| DATA-02 | P1 | getPublishedNewsArticle tải toàn bộ bài rồi tìm slug; metadata/page gọi cùng helper | Đọc dư body_json, cần truy vấn theo slug và dedupe trong request |
| DATA-03 | P1 | Không thấy secondary index trong schema hiện có | Cần kiểm tra index live và EXPLAIN trước khi bổ sung theo truy vấn thật |
| ROLE-01 | P1 | partners FOR ALL và messages UPDATE dùng is_admin gồm cả viewer | Vai trò viewer có quyền ghi theo schema trong repo; cần đồng bộ RLS/API/UI |
| ROLE-02 | P1 | Viewer chưa có policy riêng đọc draft articles | Dashboard/list cho viewer có thể không phản ánh toàn bộ nội dung được phép xem |
| PAR-02 | P1 | logo_path có trong bảng nhưng lib/partners không đọc; UI chỉ hiển thị shortName | Upload logo chưa đủ để logo xuất hiện public |
| PAR-03 | P1 | Marquee tự sort theo hash dù query order theo sort_order | Thứ tự sắp xếp từ admin sẽ không được giữ trên homepage |
| AUTH-01 | P1 | Đăng xuất bị ẩn trên màn hình nhỏ; login/signOut thiếu xử lý lỗi mạng đầy đủ | Khó thoát phiên trên mobile; trạng thái chờ có thể kẹt |
| NAV-01 | P2 | Sidebar active dùng pathname === href | Mở tạo/sửa tin tức thì menu Tin tức mất trạng thái active |
| SEARCH-01 | P1 | Search toàn site chỉ đọc practices/people/insights tĩnh | Tin tức mới từ Supabase không xuất hiện trong tìm kiếm chung |
| PUBLIC-01 | P1 | Zalo và Messenger cùng trỏ /contact | Chưa kết nối kênh liên hệ đúng nhãn |
| PUBLIC-02 | P1 | Footer privacy/terms trỏ /contact; chữ policy trong form không mở trang | Chưa có trang chính sách/điều khoản riêng |
| PUBLIC-03 | P2 | LinkedIn chuyên gia chứa placeholder; nội dung và số liệu lấy từ data/*.ts | Cần rà soát nội dung thật; chưa quản trị qua CMS |
| SEO-01 | P1 | Domain hardcode phananhlaw.vn; NEXT_PUBLIC_SITE_URL chưa được dùng ở metadata/sitemap/robots | URL SEO có thể khác môi trường đang dùng |
| SEO-02 | P1 | Sitemap news lấy data/news.ts; seo_title/seo_description chưa nối vào form/metadata | Bài mới Supabase chưa được phản ánh đầy đủ vào SEO |
| SEO-03 | P1 | Admin/login thừa hưởng robots index của root; preview mới có noindex riêng | Cần noindex rõ cho khu vực nội bộ; robots.txt không thay thế auth |
| CONTACT-01 | P1 | API có honeypot nhưng form không gửi trường bẫy; rate limit nằm trong Map | Chống spam chưa đầy đủ và không bền giữa serverless instances |
| CONTACT-02 | P1 | RLS cho anon INSERT trực tiếp với vài điều kiện length | Có thể đi vòng endpoint và bỏ qua validation/rate limit của API |
| OPS-01 | P2 | Chưa có bộ kiểm thử nghiệp vụ/đo hiệu năng và cấu hình lint rõ ràng | Khó phát hiện hồi quy trước deploy |

Các mục về role/index dựa trên schema trong repo; chưa khẳng định mọi policy/index live hiện giống hoàn toàn nếu dashboard đã được chỉnh riêng.

## 3. Phân tích độ trễ admin

### Những gì đã biết

- Người dùng cảm nhận phải chờ lâu từ lúc bấm Tin tức/Tin nhắn đến khi trang đổi.
- Page chờ truy vấn Supabase trước khi trả nội dung.
- Thiếu loading boundary và pending state nên thời gian chờ trông giống không nhận click.
- Có auth network calls trong middleware và DAL; layout có thể được tái sử dụng khi điều hướng, vì vậy không giả định mọi click đều chạy đủ cùng một chuỗi.
- Request anonymous kiểm tra một lượt mất khoảng 0,34–1,37 giây cho các admin route được bảo vệ. Đây không phải baseline điều hướng authenticated, không phải p95 và chưa đo thời gian render trình duyệt.
- Chưa có bằng chứng Tiptap là nguyên nhân làm chậm danh sách: editor hiện thuộc route tạo/sửa.
- Chưa có bằng chứng số lượng bản ghi lớn; không được mặc định index là nguyên nhân chính của độ trễ hiện tại.

### Đo trước khi sửa

1. Dùng phiên đăng nhập hợp lệ, trên production hoặc preview có cùng cấu hình, không lấy mật khẩu/token từ người dùng qua chat.
2. Đo vòng Tổng quan → Tin tức → Tin nhắn → Đối tác → quay lại, cả lần đầu và lần lặp.
3. Thu thời gian click → pending, click → shell/skeleton, click → dữ liệu; request RSC, TTFB, auth/profile/query timing.
4. Tối thiểu 20 lượt ở cùng thiết bị/mạng sau warm-up; tách cold start khỏi warm navigation.
5. Kiểm tra log lỗi, cookie refresh và request lặp. Chỉ log timing/mã lỗi/request ID, không log nội dung tin nhắn hoặc token.
6. Xác nhận database region trong dashboard và function region; header hiện tại là bằng chứng định hướng, cần kiểm tra thiết lập thực tế.

## 4. Kế hoạch theo thứ tự triển khai

### Pha 1 — Nền tảng admin và điều hướng nhanh

Mục tiêu: bấm nhận phản hồi ngay; truy vấn vẫn có bảo vệ quyền.

- Thêm app/admin/loading.tsx và skeleton theo page; error.tsx có nút thử lại, thông báo rõ; not-found cho tài nguyên mất.
- Giữ sidebar/layout ổn định, có pending feedback, active cho cả route con; aria-current, focus và thao tác bàn phím.
- Prefetch có kiểm soát các trang danh sách khi hover/focus hoặc khi phù hợp; không prefetch hàng loạt tất cả bài/chi tiết.
- Đặt Suspense đúng nơi chờ dữ liệu. loading.tsx không tự loại bỏ thời gian chờ middleware hoặc async layout, nên phải tối ưu những phần đó riêng.
- Gom khởi tạo client/auth/role trong DAL; dedupe theo một request bằng cơ chế tương thích Next.js 15/React hiện tại.
- Không cache session/profile xuyên tài khoản hoặc CDN. API mutation và truy vấn dữ liệu vẫn kiểm tra quyền và dựa trên RLS.
- Rà middleware theo cách đồng bộ cookie request/response đúng của @supabase/ssr; kiểm tra refresh token/hết phiên.
- Đánh giá getClaims/getUser theo yêu cầu thu hồi phiên và loại signing key; không thay getUser hàng loạt chỉ để giảm thời gian.
- Xác nhận và bố trí function gần DB (Tokyo hnd1 nếu DB vẫn ở Tokyo), đo trước/sau.
- Kiểm tra bundle để tách phần public chrome/search data khỏi admin nếu thực sự nằm trong bundle dùng chung; giữ editor chỉ tải khi vào tạo/sửa.
- Bổ sung lỗi mạng và pending cho login/logout; đưa logout lên mobile.

Tệp dự kiến: app/admin/loading.tsx, app/admin/error.tsx, components/admin/AdminShell.tsx, lib/auth.ts, lib/supabase/server.ts, middleware.ts, cấu hình vùng Vercel; có thể tách route group/layout sau khi đo bundle.

Nghiệm thu: click có feedback trong 100–150 ms ở môi trường test; sidebar còn tương tác trong khi tải; không lặp login; refresh token và tài khoản disabled vẫn xử lý đúng.

### Pha 2 — Truy vấn, phân trang, trạng thái dữ liệu và quyền

- Tạo kiểu dữ liệu Supabase từ schema đã xác minh; giảm cast thủ công làm mất dấu sai kiểu/null.
- Mỗi danh sách có loading, empty, error và success riêng. Supabase đã cấu hình thì không thay lỗi/empty bằng mẫu.
- Giữ chế độ demo chỉ khi bật cấu hình rõ, dữ liệu demo có nhãn và không sinh link edit giả.
- Tin tức/tin nhắn/đối tác mặc định 20–25 hàng/trang; trạng thái tìm kiếm/lọc/trang nằm trong URL.
- Truy vấn list chỉ lấy cột cần hiển thị; detail lấy theo id/slug; không tải body_json toàn bảng cho trang chi tiết.
- Dedupe helper đọc public trong một lần render; cache public có invalidation rõ, private luôn theo người dùng.
- Xử lý lỗi DB thành UI/API có thông báo và mã phù hợp; không biến query error thành số 0 hoặc danh sách rỗng.
- Kiểm tra index live rồi bổ sung có điều kiện: articles(content_kind, updated_at DESC, id); index public theo status/published_at; contact_messages(status, created_at DESC, id) và sort mặc định; partners(is_active, sort_order, id) khi query plan cần.
- Không tạo index trùng. EXPLAIN/đo với dữ liệu đại diện trước khi khẳng định hiệu quả.

Ma trận quyền đề xuất:

| Vai trò | Đọc nội dung quản trị | Tạo/sửa/ẩn bài, đối tác | Xử lý tin nhắn | Xóa vĩnh viễn |
| --- | --- | --- | --- | --- |
| viewer | Có, theo phạm vi nội bộ đã định | Không | Không | Không |
| editor | Có | Có | Có | Không; dùng lưu trữ/ẩn |
| super_admin | Có | Có | Có | Có, sau xác nhận từng thao tác |

Đồng bộ ma trận ở giao diện, API và RLS. Việc viewer đọc tin nhắn phải được đối chiếu quyền nội bộ mong muốn trước khi mở rộng nhóm người dùng. Chính sách hiện tại đã cho viewer đọc.

Migration tách riêng, chạy thử trên môi trường kiểm thử, không reset database. Có bản sao dữ liệu/cách khôi phục trước khi áp dụng.

### Pha 3 — Hoàn thiện Tin nhắn

- /admin/messages: tìm theo tên/email/công ty, lọc trạng thái, phân trang, sắp xếp mới nhất.
- Drawer hoặc trang /admin/messages/[id] hiển thị nội dung, số điện thoại, email, lĩnh vực, thời điểm và trạng thái.
- Nút xem chi tiết có hành động; liên kết mailto/tel chỉ mở ứng dụng của người dùng.
- PATCH /api/admin/messages/[id] cập nhật new/in_progress/resolved/spam; validate UUID và enum; xác nhận bản ghi tồn tại.
- Dashboard “Chưa xử lý” áp dụng ?status=new thật; số đếm và danh sách được làm mới sau mutation.
- Thêm updated_at đáng tin cậy ở DB. Xem tin không tự chuyển trạng thái xử lý trừ khi xác định quy tắc riêng.
- Không mặc định bổ sung gửi email tự động hay xóa tin nhắn; đó là phạm vi bổ sung.

Nghiệm thu: xem được toàn bộ nội dung; đổi trạng thái tồn tại sau reload; filter từ dashboard đúng; viewer không PATCH được.

### Pha 4 — Xây dựng CRUD Đối tác

Luồng: danh sách → tạo/sửa → xem trước card → lưu → dữ liệu homepage cập nhật.

Trường dùng lại: id, name, short_name, descriptor, website, logo_path, sort_order, is_active.
Bổ sung khi cần: logo_alt, updated_at, created_by, updated_by để hỗ trợ ảnh và truy vết thay đổi.

- /admin/partners có bảng/card gồm logo, tên, website, thứ tự, hiển thị/ẩn và thao tác.
- Tìm theo tên; lọc hiển thị/ẩn; phân trang. Nút tạo, chỉnh sửa, ẩn/hiện, xóa theo vai trò.
- Form validate độ dài tên/mô tả, short_name, URL website chỉ HTTP(S), sort_order là số nguyên trong giới hạn.
- Chỉnh thứ tự bằng số hoặc nút lên/xuống; kéo thả là bổ sung sau khi thao tác cơ bản ổn.
- Xóa có hộp xác nhận nêu tên đối tác; ẩn không xóa record.
- API POST /api/admin/partners; PATCH và DELETE /api/admin/partners/[id]. List/detail đọc qua DAL server hoặc GET có guard nếu UI cần.
- Bucket partner-media cho logo, định dạng PNG/JPEG/WebP/AVIF; logo không bắt buộc, fallback short_name. Đề xuất giới hạn 2 MB/logo.
- Storage policies chỉ editor/super_admin có quyền upload; không cho viewer ghi bằng SDK trực tiếp.
- Tên file ngẫu nhiên, kiểm tra MIME/size và validate logo_path thuộc bucket/path cho phép. Không đưa secret/service role xuống browser.
- Cập nhật lib/partners.ts và kiểu Partner để trả URL/alt logo.
- Cập nhật PartnersMarquee render ảnh, đảm bảo thứ tự sort_order có ý nghĩa. Có thể luân phiên điểm bắt đầu từng hàng nhưng giữ thứ tự cơ sở; bỏ hash sort đang phủ định sắp xếp admin.
- Khi không còn đối tác active, ẩn section hoặc hiện trạng thái phù hợp; không dựng lại đối tác mẫu.
- Sau create/update/delete/visibility/reorder, revalidate homepage và các cache đối tác.
- Chỉ dọn file cũ sau khi DB lưu thành công và xác minh file không còn được tham chiếu; thất bại dọn ảnh không biến thao tác DB thành thành công giả hoặc xóa ảnh còn dùng.
- Không tự seed tên/logo doanh nghiệp thật chưa được xác nhận.

Nghiệm thu: đủ C/R/U/D với super_admin, role thấp đúng giới hạn, logo xuất hiện đúng public, ẩn/xóa hết không làm dữ liệu mẫu quay lại, thứ tự public khớp thứ tự admin.

### Pha 5 — Hoàn thiện Tin tức, editor và media

- Bỏ edit dữ liệu mẫu như record thật; nếu cần import mẫu thì có thao tác import tạo UUID mới rõ ràng.
- Thêm tìm kiếm/lọc trạng thái/chuyên mục, phân trang; hoàn thiện lưu nháp, xuất bản, đưa về nháp, lưu trữ và xóa theo quyền.
- Dùng schema chung cho POST/PATCH; kiểm tra UUID, trả 404 nếu không có record, 409 khi slug trùng, lỗi validation rõ từng trường.
- Giữ published_at khi sửa bài đã xuất bản; chỉ gán lần đầu xuất bản theo quy tắc đã định.
- Revalidate /admin/news, detail admin, homepage, /news, slug mới, slug cũ và sitemap khi cần.
- Chốt hành vi đổi slug: không còn phục vụ nội dung cũ sai trạng thái; nếu cần giữ URL cũ thì có redirect mapping rõ.
- Tạo slug từ tiêu đề nhưng cho sửa; validate tiếng Việt/đường dẫn; không âm thầm thay slug bài đã xuất bản.
- Đồng nhất extension Tiptap, whitelist validator và renderer: loại đăng ký Link/Underline trùng; xử lý null attributes; hỗ trợ đúng font/size/color/textAlign.
- Với code/codeBlock: hoặc hỗ trợ đầy đủ validator/renderer, hoặc tắt extension/shortcut/paste tương ứng. Không để editor sinh dữ liệu mà API từ chối mà không giải thích.
- Không normalize dữ liệu lỗi thành tài liệu trắng rồi cho ghi đè; báo lỗi có thể phục hồi nội dung gốc.
- Tách editor khỏi render form không cần thiết; tránh stringify toàn tài liệu liên tục khi gõ; debounce phần đồng bộ phụ mà vẫn bảo toàn dữ liệu khi save.
- try/catch/finally cho save; giữ nội dung khi mạng lỗi; tránh gửi lặp; báo trạng thái đang upload/lưu/xong.
- Bảo vệ điều hướng nội bộ khi dirty; preview ghi rõ đang xem bản đã lưu hoặc thực hiện “Lưu và xem trước”.
- Hỗ trợ editor B giữ ảnh bìa hợp lệ đã gắn vào bài; kiểm tra quyền nội dung và tài nguyên thay vì bắt buộc mọi ảnh cũ phải thuộc người đang sửa.
- Chuyển upload tin tức trực tiếp đến Supabase Storage bằng session và RLS, hoặc signed upload được cấp sau khi kiểm tra quyền. Giữ giới hạn 5 MB ở client/bucket, tránh gửi toàn file qua Vercel Function.
- Chặn lưu khi ảnh inline chưa upload xong; xử lý file lỗi/ảnh bỏ dở; kiểm tra ảnh ở kích thước gần giới hạn.
- Nối seo_title/seo_description, featured/read_time khi có nhu cầu biên tập; không trình bày như tính năng đã có.

Nghiệm thu: tạo → lưu → reload → preview → xuất bản giữ nguyên định dạng; sửa bài không đổi ngày xuất bản; không kẹt nút khi mạng lỗi; editor khác sửa được bài có ảnh hợp lệ; lỗi upload có thông báo và không mất nội dung.

### Pha 6 — Đồng bộ public và nội dung còn thiếu

- Search chung bổ sung tin Supabase đã xuất bản; giới hạn kết quả, debounce; không lấy draft.
- Sitemap lấy bài xuất bản thực tế, xử lý đổi slug/ẩn/xóa; lastModified phản ánh dữ liệu.
- Dùng một cấu hình site URL cho metadata, canonical, sitemap, robots và JSON-LD; xác nhận domain chính thức trước khi đổi production canonical.
- Thêm noindex cho login/admin/preview và rà canonical/open graph theo page.
- Bổ sung trang chính sách/điều khoản bằng nội dung được chủ website duyệt; đổi các link đang về /contact.
- Nối Zalo/Messenger đúng URL được cung cấp; xác minh email, điện thoại, địa chỉ, LinkedIn và các số liệu giới thiệu.
- Nội dung practices/people/insights/about/industries hiện là tĩnh. Đây không tự động là lỗi; nếu cần biên tập trong admin thì lập pha CMS riêng, không gộp tất cả vào CRUD đối tác.
- Cải thiện ảnh public: kích thước, lazy loading, ảnh responsive, alt; kiểm tra layout shift.
- Kiểm thử header glass, tìm kiếm, menu mobile, bàn phím/focus, reduced motion và marquee ở màn hình nhỏ.

### Pha 7 — Hoàn thiện form liên hệ và vận hành

- Kiểm thử validation và thông báo thành công/lỗi trên môi trường kiểm thử; form gửi thật phải xuất hiện trong admin.
- Làm honeypot đầy đủ ở form; giải pháp chống spam không chỉ dựa vào Map trong một instance.
- Chốt đường ghi dữ liệu: nếu bắt buộc qua API thì dùng quyền server tối thiểu thích hợp và chặn anon insert trực tiếp; rate limit/CAPTCHA kiểm tra server.
- Đồng bộ validation/constraint cần thiết ở DB; server quyết định status mặc định và thời điểm consent, không tin giá trị tùy ý từ client.
- Giữ secret chỉ server; không mở rộng khối public env cho secret key hay connection string.
- Chưa có email thông báo tự động/luồng trả lời trong admin; chỉ bổ sung nếu đó là yêu cầu vận hành thực tế.
- Hoàn thiện lệnh lint chạy không tương tác, typecheck và kiểm thử hồi quy luồng auth/CRUD/data.
- Log có request ID, status, timing, không ghi dữ liệu cá nhân không cần thiết.

## 5. Tiêu chí hiệu năng và kiểm thử

Các con số dưới đây là mục tiêu ban đầu, không phải cam kết kết quả đã đo:

| Phép đo | Mục tiêu |
| --- | --- |
| Click sidebar → pending/skeleton | Không quá 100–150 ms trong môi trường test |
| Warm navigation → danh sách sẵn sàng | p95 khoảng 1 giây hoặc tốt hơn; chốt lại sau baseline |
| Cải thiện latency | Giảm đáng kể so với baseline trên cùng mạng/thiết bị; mục tiêu 40–50% nếu xác nhận nhiều round-trip khác vùng |
| Dữ liệu list mỗi lần tải | 20–25 bản ghi; không kèm body_json khi không cần |
| JS editor | Chỉ route tạo/sửa phải tải; xác nhận bằng network/bundle |
| Lưu nội dung khi mạng lỗi | Giữ dữ liệu, thoát trạng thái pending, cho thử lại |
| Sau mutation | UI admin/public cập nhật đúng, không cần deploy lại |

Bộ ca bắt buộc:

1. Auth: login, logout desktop/mobile, truy cập trực tiếp URL con, refresh token, hết hạn phiên, tài khoản disabled, viewer/editor/super_admin.
2. Điều hướng: vòng sidebar lặp, deep link, back/forward, mạng chậm, refresh khi đang ở trang con.
3. Tin nhắn: empty/error/success, xem chi tiết, filter dashboard, đổi status và reload.
4. Tin tức: create/edit/draft/publish/archive/delete, slug trùng/không tồn tại, rich-text, ảnh, xem trước, đổi slug, hai editor dùng chung bài.
5. Đối tác: create/edit/delete/active/sort/logo, invalid URL, empty list, ẩn hết, trạng thái homepage sau mutation.
6. RLS: anonymous không đọc private hay ghi content; viewer không mutation; quyền UI và SDK trực tiếp tương đồng.
7. Public: 30 route đang có, trang mới, tìm kiếm, liên hệ, social links, sitemap/canonical và 404 đúng.
8. Build/typecheck/lint; smoke trên preview trước production. Dùng dữ liệu thử có nhãn và dọn trong môi trường kiểm thử.

## 6. Thứ tự bàn giao đề xuất

1. Bản sửa điều hướng admin, đo baseline và tối ưu auth/vùng thực thi.
2. Lớp dữ liệu/error/permission dùng chung và migration.
3. Tin nhắn hoạt động trọn luồng.
4. CRUD Đối tác nối homepage.
5. Tin tức/editor/upload hoàn chỉnh.
6. Public search/SEO/liên kết/chính sách và form liên hệ.
7. Kiểm thử nghiệm thu, deployment production, đo lại và báo cáo.

Mỗi pha có commit riêng; migration phải tương thích bản code đang chạy. Nếu rollback UI, tránh rollback schema bằng lệnh phá dữ liệu. Các thiết lập tài khoản/domain/nội dung doanh nghiệp còn thiếu được liệt kê riêng trong pha cần dùng.

## 7. Bằng chứng mã nguồn chính

- components/admin/AdminShell.tsx: menu đối tác, active state, logout mobile.
- app/admin/layout.tsx và middleware.ts: route động, auth, cookie.
- app/admin/news/page.tsx; app/admin/news/[id]/edit/page.tsx: fallback mẫu và edit.
- components/admin/NewsEditor.tsx; components/admin/RichTextEditor.tsx: save/preview/định dạng.
- lib/news-content.ts; components/news/ArticleContent.tsx: validator và renderer.
- app/api/admin/news/[id]/route.ts: published_at, row existence, revalidate.
- app/api/admin/news/media/route.ts: upload proxy 5 MB.
- app/admin/messages/page.tsx: nút xem, query 50 hàng, thiếu filter/action.
- lib/news.ts; lib/partners.ts: public fallback và truy vấn dữ liệu.
- supabase/schema.sql: role, policy, schema/index.
- components/home/PartnersMarquee.tsx: logo và thứ tự.
- data/navigation.ts; components/layout/QuickContact.tsx; components/layout/Footer.tsx: tìm kiếm/liên hệ.
- app/layout.tsx; app/sitemap.ts; app/robots.ts: domain và SEO.
- app/contact/page.tsx; app/api/contact/route.ts: form/validation/anti-spam.

## 8. Tài liệu đối chiếu

- Next.js navigation/loading: https://nextjs.org/docs/app/getting-started/linking-and-navigating
- Next.js fetching/streaming: https://nextjs.org/docs/app/getting-started/fetching-data
- Supabase SSR/session: https://supabase.com/docs/guides/auth/server-side/advanced-guide
- Vercel region: https://vercel.com/docs/regions
- Vercel function request limit: https://vercel.com/docs/functions/limitations
- Supabase direct upload: https://supabase.com/docs/guides/storage/uploads/standard-uploads
- Supabase Storage RLS: https://supabase.com/docs/guides/storage/security/access-control
