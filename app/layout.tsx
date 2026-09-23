import type { Metadata, Viewport } from 'next';
import { Newsreader, Inter } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/layout/SiteChrome';

const newsreader = Newsreader({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#F4F3EF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://phananhlaw.vn'),
  title: {
    default: 'Phan Anh Law | Tư vấn Pháp lý, Đầu tư FDI & Doanh nghiệp',
    template: '%s | Phan Anh Law',
  },
  description:
    'Hãng luật tư vấn đầu tư nước ngoài (FDI), mua bán & sáp nhập (M&A), thuế, lao động và quản trị tuân thủ cho doanh nghiệp hàng đầu tại Việt Nam.',
  keywords: [
    'luat su doanh nghiep',
    'tu van dau tu nuoc ngoai',
    'fdi vietnam law firm',
    'mergers and acquisitions vietnam',
    'phan anh law',
    'giay phep kinh doanh fdi',
    'tu van phap ly corporate',
  ],
  authors: [{ name: 'Phan Anh Law' }],
  creator: 'Phan Anh Law LLC',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://phananhlaw.vn',
    siteName: 'Phan Anh Law',
    title: 'Phan Anh Law | Tư vấn Pháp lý Doanh nghiệp & Đầu tư',
    description:
      'Kết hợp chuyên môn pháp lý với tư duy kinh doanh để giúp doanh nghiệp xử lý những vấn đề phức tạp một cách rõ ràng và thực tiễn.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phan Anh Law | Corporate Legal Advisory',
    description: 'Legal Clarity For A Changing Business World.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Phan Anh Law',
    alternateName: 'Phan Anh & Partners Legal Advisory',
    url: 'https://phananhlaw.vn',
    description:
      'Hãng luật tư vấn đầu tư nước ngoài (FDI), mua bán & sáp nhập (M&A), thuế và tuân thủ doanh nghiệp tại Việt Nam.',
    telephone: '+842439388899',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Tầng 18, Tòa nhà CornerStone, 16 Phan Chu Trinh',
        addressLocality: 'Quận Hoàn Kiếm',
        addressRegion: 'Hà Nội',
        addressCountry: 'VN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Tầng 22, Deutsches Haus, 33 Lê Duẩn, Phường Bến Nghé',
        addressLocality: 'Quận 1',
        addressRegion: 'TP. Hồ Chí Minh',
        addressCountry: 'VN',
      },
    ],
    priceRange: '$$$$',
    knowsLanguage: ['vi', 'en', 'fr'],
  };

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[#F4F3EF] text-[#111111] selection:bg-[#153E35] selection:text-white min-h-screen flex flex-col justify-between"
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
