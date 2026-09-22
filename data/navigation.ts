import { OfficeLocation, SearchResultItem } from './types';
import { practices } from './practices';
import { industries } from './industries';
import { people } from './people';
import { insights } from './insights';

export const navigationLinks = [
  { label: 'Lĩnh vực', href: '/practices', hasMegaMenu: 'practices' },
  { label: 'Ngành nghề', href: '/#industries', hasMegaMenu: 'industries' },
  { label: 'Chuyên gia', href: '/people' },
  { label: 'Góc pháp lý', href: '/insights' },
  { label: 'Về chúng tôi', href: '/about' },
];

export const offices: OfficeLocation[] = [
  {
    city: 'Hà Nội',
    address: 'Tầng 18, Tòa nhà CornerStone, 16 Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội',
    phone: '+84 (0) 24 3938 8899',
    email: 'hanoi@phananhlaw.vn',
    workingHours: 'Thứ Hai - Thứ Sáu: 08:30 - 18:00',
  },
  {
    city: 'TP. Hồ Chí Minh',
    address: 'Tầng 22, Deutsches Haus, 33 Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    phone: '+84 (0) 28 3822 7788',
    email: 'hcmc@phananhlaw.vn',
    workingHours: 'Thứ Hai - Thứ Sáu: 08:30 - 18:00',
  },
];

export const metricsData = [
  { value: '10+', label: 'Lĩnh vực chuyên môn' },
  { value: '500+', label: 'Hồ sơ doanh nghiệp & FDI' },
  { value: '$1.8B+', label: 'Tổng giá trị giao dịch tư vấn' },
  { value: '18+', label: 'Năm kinh nghiệm thực tiễn' },
];

// Helper to remove Vietnamese diacritics for accent-insensitive search
export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function getAllSearchItems(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // Practices
  practices.forEach((p) => {
    items.push({
      id: `practice-${p.id}`,
      type: 'practice',
      typeLabel: 'Lĩnh vực',
      title: p.title,
      subtitle: p.shortDescription,
      url: `/practices/${p.slug}`,
      keywords: [p.title, p.titleEn, ...p.services],
    });
  });

  // People
  people.forEach((per) => {
    items.push({
      id: `person-${per.id}`,
      type: 'people',
      typeLabel: 'Chuyên gia',
      title: per.name,
      subtitle: `${per.position} • ${per.office}`,
      url: `/people/${per.slug}`,
      keywords: [per.name, per.position, ...per.primaryExpertise, ...per.languages],
    });
  });

  // Insights
  insights.forEach((ins) => {
    items.push({
      id: `insight-${ins.id}`,
      type: 'insight',
      typeLabel: 'Bài viết / Pháp lý',
      title: ins.title,
      subtitle: `${ins.type} • ${ins.formattedDate} • ${ins.readTime}`,
      url: `/insights/${ins.slug}`,
      keywords: [ins.title, ins.category, ins.type, ins.excerpt],
    });
  });

  return items;
}
