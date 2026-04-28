// Reliable Unsplash CDN images mapped to destination categories.
// Used as override / fallback for destinations.json (source URLs there
// may be Wikimedia or external sites that 403, hot-link block, or move).

const BY_CATEGORY: Record<string, string> = {
  heritage:    'https://images.unsplash.com/photo-1759157199071-cf1b46c8ee29?auto=format&fit=crop&w=1400&q=80',
  wildlife:    'https://images.unsplash.com/photo-1535082623926-b39352a03fb7?auto=format&fit=crop&w=1400&q=80',
  lakes_dams:  'https://images.unsplash.com/photo-1612374106744-f9c50815e262?auto=format&fit=crop&w=1400&q=80',
  mountains:   'https://images.unsplash.com/photo-1759169202397-a98b82665b5e?auto=format&fit=crop&w=1400&q=80',
  culture:     'https://images.unsplash.com/photo-1535759554012-8cbbc491f0b7?auto=format&fit=crop&w=1400&q=80',
  agriculture: 'https://images.unsplash.com/photo-1551357176-256bb0617ecb?auto=format&fit=crop&w=1400&q=80',
  city:        'https://images.unsplash.com/photo-1514548383638-cef9251a73ec?auto=format&fit=crop&w=1400&q=80',
  religious:   'https://images.unsplash.com/photo-1655981654045-5c45b14f3bc2?auto=format&fit=crop&w=1400&q=80',
  industry:    'https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=1400&q=80'
};

const ID_OVERRIDES: Record<string, string> = {
  // Iconic destinations get specific high-quality images
  'great-zimbabwe':                  'https://images.unsplash.com/photo-1535082623926-b39352a03fb7?auto=format&fit=crop&w=1400&q=80',
  'gonarezhou-national-park':        'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1400&q=80',
  'chilojo-cliffs':                  'https://images.unsplash.com/photo-1759169202397-a98b82665b5e?auto=format&fit=crop&w=1400&q=80',
  'lake-mutirikwi':                  'https://images.unsplash.com/photo-1612374106744-f9c50815e262?auto=format&fit=crop&w=1400&q=80',
  'kyle-recreational-park':          'https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=1400&q=80',
  'tugwi-mukosi-dam':                'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1400&q=80',
  'save-valley-conservancy':         'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1400&q=80',
  'malilangwe-wildlife-reserve':     'https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=1400&q=80'
};

const DEFAULT = 'https://images.unsplash.com/photo-1535082623926-b39352a03fb7?auto=format&fit=crop&w=1400&q=80';

export function destinationImage(d: { id: string; categories: string[]; images?: { url: string }[] }): string {
  // 1. Specific override by destination ID (most reliable)
  if (ID_OVERRIDES[d.id]) return ID_OVERRIDES[d.id];

  // 2. Category-based mapping (reliable Unsplash CDN)
  for (const cat of d.categories) {
    if (BY_CATEGORY[cat]) return BY_CATEGORY[cat];
  }

  // 3. Use the source image only if it's already an Unsplash URL (which we trust)
  const first = d.images?.[0]?.url;
  if (first && first.includes('images.unsplash.com')) return first;

  // 4. Final fallback
  return DEFAULT;
}
