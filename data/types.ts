export interface PracticeArea {
  id: string;
  slug: string;
  number: string;
  title: string;
  titleEn: string;
  shortDescription: string;
  fullDescription?: string;
  featured?: boolean;
  services: string[];
  workflow?: {
    step: string;
    title: string;
    description: string;
  }[];
  commonIssues?: {
    issue: string;
    solution: string;
  }[];
  leadExpertSlugs: string[];
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  highlightPoints: string[];
  relevantPractices: string[];
  imagePlaceholderText: string;
  bgGradient: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  position: string;
  positionEn: string;
  office: 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Cả hai văn phòng';
  primaryExpertise: string[];
  languages: string[];
  email: string;
  phone: string;
  linkedin: string;
  bio: string;
  experience: string[];
  education: string[];
  admissions: string[];
  photoUrl: string;
  featured?: boolean;
}

export interface LegalCitation {
  document: string; // e.g., "Nghị định số 31/2021/NĐ-CP"
  article?: string; // e.g., "Điều 15 & Điều 16"
  effectiveDate: string; // e.g., "01/01/2021"
  summary: string;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Đầu tư' | 'Doanh nghiệp' | 'Thuế' | 'Lao động' | 'M&A' | 'Thương mại' | 'FDI' | 'Tuân thủ';
  type: 'Cập nhật pháp luật' | 'Bài phân tích chuyên sâu' | 'Bình luận chính sách' | 'Cẩm nang pháp lý';
  publishDate: string;
  formattedDate: string;
  readTime: string;
  authorSlug: string;
  authorName: string;
  authorRole: string;
  featured?: boolean;
  coverImage?: string;
  abstractTheme?: string;
  legalReferences?: LegalCitation[];
  toc: {
    id: string;
    title: string;
    level: 2 | 3;
  }[];
  contentHtml?: string;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface SearchResultItem {
  id: string;
  type: 'practice' | 'people' | 'insight';
  typeLabel: string;
  title: string;
  subtitle: string;
  url: string;
  keywords: string[];
}
