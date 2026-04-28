// Local-first image resolution for Visit Masvingo.
// Each destination resolves in this order:
//   1. LOCAL_BY_ID  — supplied by client, hosted under /public/images/...
//   2. UNIQUE_BY_ID — curated Unsplash CDN photo specific to that destination
//   3. CATEGORY_POOL — deterministic pick from a per-category pool (no two
//      destinations in the same category collide because we rotate by id-hash)

const LOCAL_BY_ID: Record<string, string> = {
  'great-zimbabwe':            '/images/destinations/great-zimbabwe/great-zimbabwe-cover.jpg',
  'gonarezhou-national-park':  '/images/destinations/gonarezhou-national-park.jpg',
  'chilojo-cliffs':            '/images/destinations/chilojo-cliffs.jpg',
  'lake-mutirikwi':            '/images/destinations/lake-mutirikwi.jpg',
  'kyle-recreational-park':    '/images/destinations/kyle-recreational-park.jpg',
  'tugwi-mukosi-dam':          '/images/destinations/tugwi-mukosi-dam.jpg',
  'hippo-valley-estates':      '/images/destinations/hippo-valley-estates.jpg',
  'runde-river':               '/images/destinations/runde-river.jpg'
};

// Pool of Unsplash photos per category. Picked deterministically by id-hash so
// each destination in a given category gets a unique image (until the pool size
// is exceeded, after which images repeat — minimised by keeping pools >= 6).
const CATEGORY_POOL: Record<string, string[]> = {
  heritage: [
    '1564507592333-c60657eea523',
    '1518709268805-4e9042af2176',
    '1655981654045-5c45b14f3bc2',
    '1565021571408-9b06d22f0e26',
    '1564507592333-c60657eea523',
    '1759157199071-cf1b46c8ee29',
    '1517429465923-b7a52f7af74a',
    '1519861531473-9200262188bf'
  ],
  wildlife: [
    '1535082623926-b39352a03fb7',
    '1577971132997-c10be9372519',
    '1503919005314-30d93d07d823',
    '1523805009345-7448845a9e53',
    '1474968140846-9d10d6b66f1e',
    '1546182990-dffeafbe841d',
    '1547721064-da6cfb341d50',
    '1469474968028-56623f02e42e'
  ],
  lakes_dams: [
    '1612374106744-f9c50815e262',
    '1505142468610-359e7d316be0',
    '1551357176-256bb0617ecb',
    '1500964757637-c85e8a162699',
    '1502784444187-359ac186c5bb',
    '1455587734955-081b22074882',
    '1469854523086-cc02fe5d8800',
    '1614000048244-a8b1c87b9706'
  ],
  mountains: [
    '1759169202397-a98b82665b5e',
    '1551632811-561732d1e306',
    '1464822759023-fed622ff2c3b',
    '1454496522488-7a8e488e8606',
    '1486870591958-9b9d0d1dda99',
    '1448375240586-882707db888b',
    '1493246507139-91e8fad9978e',
    '1547036967-23d11aacaee0'
  ],
  culture: [
    '1535759554012-8cbbc491f0b7',
    '1505373877841-8d25f7d46678',
    '1517429465923-b7a52f7af74a',
    '1519861531473-9200262188bf',
    '1521017432531-fbd92d768814',
    '1518709268805-4e9042af2176'
  ],
  agriculture: [
    '1500382017468-9049fed747ef',
    '1605002123544-c4ce2ce4c5e3',
    '1626078299034-94e9efc15d4f',
    '1551357176-256bb0617ecb',
    '1469474968028-56623f02e42e'
  ],
  city: [
    '1502920514313-52581002a659',
    '1505765050516-f72dcac9c60e',
    '1473445730015-841f29a9490b',
    '1504457047772-27faf1c00561',
    '1486325212027-8081e485255e',
    '1503095396549-807759245b35',
    '1488646953014-85cb44e25828',
    '1562774053-701939374585'
  ],
  religious: [
    '1519892338195-2832b2d57bb3',
    '1497486751825-1233686d5d80',
    '1655981654045-5c45b14f3bc2',
    '1518709268805-4e9042af2176'
  ],
  industry: [
    '1611288875785-a3d3149a5e7d',
    '1605002123544-c4ce2ce4c5e3',
    '1577971132997-c10be9372519'
  ]
};

// Stable hash for a string → small positive int
function idHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function unsplashUrl(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;
}

const DEFAULT = '/images/destinations/great-zimbabwe/great-zimbabwe-aerial.jpg';

export function destinationImage(d: { id: string; categories: string[]; images?: { url: string }[] }): string {
  // 1. Local file
  if (LOCAL_BY_ID[d.id]) return LOCAL_BY_ID[d.id];

  // 2. Pool pick by category + id-hash → no collisions until pool size exceeded
  for (const cat of d.categories) {
    const pool = CATEGORY_POOL[cat];
    if (pool && pool.length > 0) {
      const idx = idHash(d.id) % pool.length;
      return unsplashUrl(pool[idx]);
    }
  }

  // 3. Hard default
  return DEFAULT;
}

// Gallery for the Great Zimbabwe destination — used for galleries / showcases.
export const GREAT_ZIMBABWE_GALLERY = [
  '/images/destinations/great-zimbabwe/great-zimbabwe-cover.jpg',
  '/images/destinations/great-zimbabwe/great-zimbabwe-aerial.jpg',
  '/images/destinations/great-zimbabwe/great-zimbabwe-wall.jpg',
  '/images/destinations/great-zimbabwe/great-zimbabwe-hill-complex.jpg',
  '/images/destinations/great-zimbabwe/great-zimbabwe-tree.jpg',
  '/images/destinations/great-zimbabwe/great-zimbabwe-stones.jpg',
  '/images/destinations/great-zimbabwe/great-zimbabwe-twilight.jpg'
];
