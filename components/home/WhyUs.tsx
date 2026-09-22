import React from 'react';

const pillars = [
  {
    number: '01',
    title: 'Hiểu doanh nghiệp',
    tagline: 'Giải pháp pháp lý phải phù hợp với mục tiêu kinh doanh.',
    description:
      'Chúng tôi không tư vấn theo lối trích dẫn điều luật khô cứng. Mỗi giải pháp được cân nhắc kỹ lưỡng dựa trên bài toán dòng tiền, hạn chế rủi ro chi phí và tiến độ thương mại của doanh nghiệp.',
  },
  {
    number: '02',
    title: 'Rõ ràng & Dứt khoát',
    tagline: 'Biến quy định phức tạp thành những lựa chọn có thể hành động.',
    description:
      'Thay vì đưa ra những bản ghi nhớ dài dòng không có kết luận, chúng tôi phân loại rõ các kịch bản rủi ro, xác suất xảy ra và đề xuất phương án tối ưu để ban điều hành đưa ra quyết định.',
  },
  {
    number: '03',
    title: 'Đồng hành Xuyên suốt',
    tagline: 'Hỗ trợ doanh nghiệp xuyên suốt quá trình triển khai.',
    description:
      'Từ các cuộc đàm phán hợp đồng căng thẳng đến quá trình làm việc trực tiếp với các cơ quan quản lý nhà nước tại Việt Nam, chúng tôi luôn có mặt để bảo vệ tối đa lợi ích của khách hàng.',
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 bg-paper-alt border-t border-stone-300/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-4">
          TRIẾT LÝ HÀNH NGHỀ
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111] max-w-2xl mb-16 sm:mb-20">
          Ba nguyên tắc định hình chất lượng tư vấn của chúng tôi.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((item) => (
            <div key={item.number} className="space-y-6 pt-6 border-t border-stone-300">
              <div className="font-mono text-base font-semibold text-emerald-brand">
                {item.number}
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111]">
                  {item.title}
                </h3>
                <p className="text-base font-serif italic text-stone-900 leading-snug">
                  &ldquo;{item.tagline}&rdquo;
                </p>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
