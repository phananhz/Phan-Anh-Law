export type Partner = {
  id: string;
  name: string;
  shortName: string;
  descriptor: string;
  website?: string;
};

/** Fallback partner marks shown before the Supabase partners table is seeded. */
export const partners: Partner[] = [
  { id: 'sunshine', name: 'Sunshine Group', shortName: 'SG', descriptor: 'Property & Investment' },
  { id: 'jnc', name: 'JNC Group', shortName: 'JNC', descriptor: 'Infrastructure & Development' },
  { id: 'mik', name: 'MIK Group', shortName: 'MIK', descriptor: 'Real Estate & Hospitality' },
  { id: 'tl', name: 'TL Group', shortName: 'TL', descriptor: 'Business Solutions' },
  { id: 'hung-hai', name: 'Hung Hai Group', shortName: 'HH', descriptor: 'Manufacturing & Trade' },
  { id: 'northstar', name: 'Northstar Capital', shortName: 'NC', descriptor: 'Investment Advisory' },
  { id: 'viet-bridge', name: 'Viet Bridge', shortName: 'VB', descriptor: 'Cross-border Business' },
];
