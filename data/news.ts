export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  author: string;
  coverClass: string;
  content: string[];
  body?: unknown;
  coverImageUrl?: string;
  coverImageAlt?: string;
  featured?: boolean;
};

/**
 * Editorial fallback used while Supabase is not configured. The public pages
 * can therefore be previewed locally without a database, while the data layer
 * transparently replaces this list with published rows in production.
 */
export const newsArticles: NewsArticle[] = [
  {
    id: 'news-foreign-investment-forum',
    slug: 'phan-anh-law-dong-hanh-cung-dien-dan-dau-tu-nuoc-ngoai',
    title: 'Phan Anh Law đồng hành cùng diễn đàn đầu tư nước ngoài tại Việt Nam',
    excerpt:
      'Những góc nhìn thực tiễn về quản trị rủi ro pháp lý và các bước chuẩn bị cho nhà đầu tư trong giai đoạn mở rộng hoạt động.',
    category: 'Hoạt động',
    publishDate: '2026-09-20',
    readTime: '3 phút đọc',
    author: 'Phan Anh Law',
    coverClass: 'news-cover-forest',
    featured: true,
    content: [
      'Phan Anh Law tiếp tục đồng hành cùng cộng đồng doanh nghiệp và nhà đầu tư nước ngoài trong các chương trình trao đổi về môi trường pháp lý tại Việt Nam.',
      'Tại sự kiện, đội ngũ luật sư chia sẻ cách doanh nghiệp có thể chủ động rà soát giấy phép, cấu trúc giao dịch và nghĩa vụ tuân thủ trước khi triển khai kế hoạch kinh doanh mới.',
      'Chúng tôi tin rằng tư vấn pháp lý hiệu quả cần bắt đầu từ việc hiểu rõ mục tiêu kinh doanh và chuyển hóa quy định phức tạp thành những quyết định có thể hành động.',
    ],
  },
  {
    id: 'news-new-office',
    slug: 'phan-anh-law-mo-rong-khong-gian-lam-viec-tai-ha-noi',
    title: 'Phan Anh Law mở rộng không gian làm việc tại Hà Nội',
    excerpt:
      'Không gian mới được thiết kế để tăng cường trao đổi trực tiếp và bảo mật trong các phiên tư vấn chuyên sâu.',
    category: 'Văn hóa doanh nghiệp',
    publishDate: '2026-09-12',
    readTime: '2 phút đọc',
    author: 'Phan Anh Law',
    coverClass: 'news-cover-paper',
    content: [
      'Văn phòng mới của Phan Anh Law tại Hà Nội là một bước tiếp theo trong hành trình xây dựng môi trường tư vấn tập trung, riêng tư và hiệu quả.',
      'Không gian được bố trí với các phòng họp riêng, khu vực nghiên cứu và hạ tầng trao đổi tài liệu bảo mật, phục vụ cả khách hàng trong nước và quốc tế.',
    ],
  },
  {
    id: 'news-ma-roundtable',
    slug: 'toa-dam-kiem-soat-rui-ro-trong-giao-dich-ma',
    title: 'Tọa đàm: Kiểm soát rủi ro trong giao dịch M&A',
    excerpt:
      'Các chuyên gia trao đổi về due diligence, cơ chế phân bổ rủi ro và những điểm cần lưu ý khi đàm phán hợp đồng.',
    category: 'Sự kiện',
    publishDate: '2026-08-29',
    readTime: '4 phút đọc',
    author: 'Phan Anh Law',
    coverClass: 'news-cover-ink',
    content: [
      'Tọa đàm tập trung vào các vấn đề thường xuất hiện trong giai đoạn thẩm định pháp lý và đàm phán hợp đồng mua bán doanh nghiệp.',
      'Bên cạnh việc kiểm tra hồ sơ, doanh nghiệp cần xây dựng ma trận rủi ro để xác định vấn đề nào cần xử lý trước giao dịch và vấn đề nào có thể phân bổ bằng cơ chế bồi thường.',
    ],
  },
];

export function getStaticNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug) ?? null;
}
