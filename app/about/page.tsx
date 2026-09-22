import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Users2,
  Cpu,
  Compass,
  CheckCircle,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Glass from '@/components/ui/Glass';
import { metricsData } from '@/data/navigation';
import { people } from '@/data/people';

export const metadata = {
  title: 'Về Phan Anh Law | Hãng luật Doanh nghiệp & FDI',
  description: 'Câu chuyện, phương pháp làm việc và giá trị cốt lõi của Phan Anh Law.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {/* Section 1: Hero & Storytelling (Pháp lý cho doanh nghiệp hiện đại) */}
        <section className="max-w-4xl space-y-8">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand">
            VỀ PHAN ANH LAW
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#111111] leading-[1.08]">
            Pháp lý cho một kỷ nguyên kinh doanh mới.
          </h1>

          <div className="space-y-6 text-lg sm:text-xl text-stone-700 font-light leading-relaxed">
            <p>
              Phan Anh Law được thành lập với một niềm tin kiên định: Các doanh nghiệp xuất sắc cần những luật sư không chỉ am hiểu pháp điển hóa, mà phải thấu hiểu logic thương mại đằng sau mỗi quyết định kinh doanh.
            </p>
            <p className="text-stone-600 text-base sm:text-lg">
              Trong bối cảnh nền kinh tế Việt Nam hội nhập sâu rộng với làn sóng đầu tư FDI công nghệ cao, chuỗi cung ứng toàn cầu và các hiệp định thương mại thế hệ mới, sự phức tạp về mặt pháp lý là điều tất yếu. Vai trò của chúng tôi không phải là liệt kê các rủi ro để ngăn cản doanh nghiệp, mà là kiến tạo cấu trúc giải pháp an toàn để doanh nghiệp tự tin tiến bước.
            </p>
          </div>
        </section>

        {/* Metrics Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-paper-alt border border-stone-300/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {metricsData.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-4xl sm:text-6xl text-[#111111] font-light">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Cách chúng tôi làm việc (Methodology) */}
        <section className="space-y-12">
          <SectionHeading
            eyebrow="PHƯƠNG PHÁP HÀNH NGHỀ"
            title="Cách chúng tôi làm việc"
            description="Quy trình tư vấn của chúng tôi loại bỏ tính quan liêu, tập trung cao độ vào kết quả thực tế và sự rõ ràng."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-brand flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-2xl text-[#111111]">
                Khởi đầu từ bài toán kinh doanh
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Chúng tôi lắng nghe mục tiêu thương mại, thời hạn cần đạt được và ngân sách trước khi bắt tay vào xây dựng chiến lược pháp lý.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-brand flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-2xl text-[#111111]">
                Đơn giản hóa sự phức tạp
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Các bản ghi nhớ pháp lý được tinh giản tối đa. Chúng tôi trình bày bằng sơ đồ, kịch bản lựa chọn (Option Matrix) và khuyến nghị dứt khoát.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-brand flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-2xl text-[#111111]">
                Trách nhiệm trực tiếp của Partner
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Mỗi khách hàng đều được làm việc trực tiếp với Luật sư Thành viên phụ trách, bảo đảm chất lượng tư vấn và tính bảo mật cao nhất.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Giá trị cốt lõi */}
        <section className="p-8 sm:p-14 rounded-3xl bg-[#101312] text-white">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-brand">
              GIÁ TRỊ CỐT LÕI
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4 font-normal">
              Những điều chúng tôi không bao giờ thỏa hiệp.
            </h2>
            <p className="text-stone-400 text-base sm:text-lg">
              Uy tín và sự tin cậy của thân chủ là tài sản vô giá nhất mà chúng tôi tích lũy qua gần hai thập kỷ hành nghề.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6 border-t border-white/10">
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-white">Chính trực Tuyệt đối</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Minh bạch trong mọi phân tích rủi ro. Chúng tôi thẳng thắn chỉ ra những điều khoản bất lợi mà khách hàng cần tránh.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-white">Chuẩn mực Quốc tế</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Áp dụng quy trình quản trị hồ sơ và soạn thảo hợp đồng theo chuẩn mực của các hãng luật hàng đầu tại London và Singapore.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-white">Bảo mật Tối đa</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Mọi thông tin thương vụ và hồ sơ khách hàng được mã hóa và bảo mật nghiêm ngặt theo tiêu chuẩn an ninh thông tin cấp cao.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-white">Thấu hiểu Địa phương</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Kinh nghiệm làm việc hiệu quả với các cơ quan quản lý nhà nước tại Hà Nội, TP.HCM và các tỉnh trọng điểm công nghiệp.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Technology & Legal Intelligence */}
        <section className="space-y-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-brand">
                <Cpu className="w-4 h-4" />
                <span>TECHNOLOGY & LEGAL INTELLIGENCE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111]">
                Ứng dụng công nghệ vào quản trị pháp lý hiện đại
              </h2>

              <p className="text-stone-600 text-base leading-relaxed">
                Chúng tôi tiên phong tích hợp các nền tảng số hóa trong việc tra cứu văn bản quy phạm pháp luật, lập bản đồ rủi ro tuân thủ tự động và quản lý tiến độ giao dịch (Deal Room). Nhờ đó, thời gian phản hồi cho thân chủ được rút ngắn đáng kể mà vẫn bảo đảm tính chuẩn xác cao độ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-700">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-brand shrink-0" />
                  Hệ thống tra cứu dữ liệu pháp điển thời gian thực
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-brand shrink-0" />
                  Phòng lưu trữ tài liệu M&A ảo (Virtual Data Room)
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-brand shrink-0" />
                  Công cụ đánh giá rủi ro Nghị định 13 & An ninh mạng
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-brand shrink-0" />
                  Tương thích đa nền tảng cho Ban điều hành
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Glass
                variant="card"
                cornerRadius={24}
                className="p-8 bg-[#F4F3EF] border border-stone-300/80 shadow-md space-y-4"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-brand">
                  DIGITAL EXCELLENCE
                </div>
                <div className="font-serif text-2xl text-stone-900">
                  &ldquo;Công nghệ không thay thế luật sư, nhưng hãng luật làm chủ công nghệ sẽ đem lại lợi thế vượt trội cho doanh nghiệp.&rdquo;
                </div>
                <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                  Phan Anh Law Innovation Lab
                </div>
              </Glass>
            </div>
          </div>
        </section>

        {/* Section 5: Con người (People preview & link) */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="CON NGƯỜI"
            title="Được xây dựng trên nền tảng chuyên môn vững chắc"
            description="Đội ngũ luật sư tốt nghiệp từ các trường luật danh tiếng trong nước và quốc tế."
            align="split"
            action={
              <Link
                href="/people"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-brand hover:underline"
              >
                <span>Gặp gỡ toàn bộ đội ngũ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {people.map((person) => (
              <Link
                key={person.id}
                href={`/people/${person.slug}`}
                className="group p-5 rounded-2xl bg-white border border-stone-200/80 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <Image
                    src={person.photoUrl}
                    alt={person.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="font-serif text-lg text-stone-900 group-hover:text-emerald-brand transition-colors">
                  {person.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{person.position}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="p-8 sm:p-14 rounded-3xl bg-[#153E35] text-white flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Sẵn sàng cùng chúng tôi kiến tạo giải pháp?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2">
              Chúng tôi luôn sẵn sàng lắng nghe và trao đổi về kế hoạch phát triển của quý doanh nghiệp.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-[#153E35] font-semibold text-sm hover:bg-stone-100 transition-colors shadow-lg shrink-0"
          >
            Liên hệ với chúng tôi →
          </Link>
        </section>
      </div>
    </div>
  );
}
