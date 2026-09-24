export type Partner = {
  id: string;
  name: string;
  shortName: string;
  descriptor: string;
  website?: string;
  logoUrl?: string;
  logoAlt?: string;
  sortOrder?: number;
  isActive?: boolean;
  displayRow?: 1 | 2 | 3;
};

/** Fallback only for local preview before the Supabase table is configured. */
export const partners: Partner[] = [
  { id: 'sunshine', name: 'Sunshine Group', shortName: 'SG', descriptor: 'Property & Investment', sortOrder: 10, isActive: true, displayRow: 1 },
  { id: 'jnc', name: 'JNC Group', shortName: 'JNC', descriptor: 'Infrastructure & Development', sortOrder: 20, isActive: true, displayRow: 2 },
  { id: 'mik', name: 'MIK Group', shortName: 'MIK', descriptor: 'Real Estate & Hospitality', sortOrder: 30, isActive: true, displayRow: 3 },
  { id: 'tl', name: 'TL Group', shortName: 'TL', descriptor: 'Business Solutions', sortOrder: 40, isActive: true, displayRow: 1 },
  { id: 'hung-hai', name: 'Hung Hai Group', shortName: 'HH', descriptor: 'Manufacturing & Trade', sortOrder: 50, isActive: true, displayRow: 2 },
  { id: 'northstar', name: 'Northstar Capital', shortName: 'NC', descriptor: 'Investment Advisory', sortOrder: 60, isActive: true, displayRow: 3 },
  { id: 'viet-bridge', name: 'Viet Bridge', shortName: 'VB', descriptor: 'Cross-border Business', sortOrder: 70, isActive: true, displayRow: 1 },
];
