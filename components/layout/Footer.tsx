import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { practices } from '@/data/practices';
import { offices } from '@/data/navigation';

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="bg-[#101312] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-brand text-white flex items-center justify-center font-serif font-bold text-lg border border-white/10">
                PA
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-white leading-none">
                  PHAN ANH LAW
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-medium mt-0.5">
                  Corporate & FDI Advisory
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Hãng luật tư vấn đầu tư và doanh nghiệp phục vụ các tập đoàn đa quốc gia, doanh nghiệp FDI và nhà đầu tư chiến lược tại Việt Nam.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-sage-brand shrink-0" />
              <span>Thành viên Liên đoàn Luật sư Việt Nam & Đoàn Luật sư Hà Nội / TP.HCM</span>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-brand">
              Lĩnh vực tư vấn
            </div>
            <ul className="space-y-2.5 text-sm text-stone-400">
              {practices.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/practices/${p.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{p.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-sage-brand" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/practices"
                  className="inline-flex items-center gap-1 text-xs font-medium text-sage-brand hover:text-white pt-1"
                >
                  <span>Xem tất cả 10 lĩnh vực →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-brand">
              Thông tin & Nguồn lực
            </div>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Về Phan Anh Law
                </Link>
              </li>
              <li>
                <Link href="/people" className="hover:text-white transition-colors">
                  Đội ngũ Luật sư & Chuyên gia
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Góc pháp lý & Cập nhật
                </Link>
              </li>
              <li>
                <Link href="/#industries" className="hover:text-white transition-colors">
                  Khối ngành kinh doanh
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Yêu cầu tư vấn (RFP)
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Contact */}
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-brand">
              Văn phòng giao dịch
            </div>
            <div className="space-y-4 text-xs text-stone-400">
              {offices.map((office) => (
                <div key={office.city} className="space-y-1">
                  <div className="font-semibold text-white text-sm">{office.city}</div>
                  <p className="leading-relaxed text-stone-400">{office.address}</p>
                  <p className="text-stone-300 font-mono pt-0.5">{office.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-stone-500">
          <p className="max-w-2xl leading-relaxed">
            <strong>Tuyên bố pháp lý:</strong> Toàn bộ tài liệu và bài viết phân tích trên website mang tính chất tham khảo học thuật và thông tin pháp lý phổ quát, không cấu thành ý kiến tư vấn pháp lý chính thức cho bất kỳ trường hợp cụ thể nào.
          </p>

          <div className="flex flex-wrap items-center gap-6 shrink-0">
            <span suppressHydrationWarning>© 2026 Phan Anh Law LLC. All rights reserved.</span>
            <Link href="/contact" className="hover:text-stone-400">
              Bảo mật dữ liệu
            </Link>
            <Link href="/contact" className="hover:text-stone-400">
              Điều khoản
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
