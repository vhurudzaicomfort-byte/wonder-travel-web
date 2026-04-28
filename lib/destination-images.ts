// Visit Masvingo destination → image source.
// Strict 1:1 map: every destination ID maps to exactly ONE image, and no
// two destinations share the same image. Run scripts/audit-images.mjs to
// verify zero duplication.
//
// Sources:
//   /images/destinations/<id>.jpg  — locally hosted (Wikimedia Commons /
//     supplied photo, see public/images/destinations/_attribution.json).
//   https://images.unsplash.com/... — themed stock fallback for destinations
//     where no suitable Wikimedia image was available; each photo ID is used
//     by exactly one destination.

const D = '/images/destinations';

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const IMAGE_BY_ID: Record<string, string> = {
  // 1. Heritage / culture / city — supplied & locally hosted Great Zimbabwe family
  'great-zimbabwe':                 `${D}/great-zimbabwe/great-zimbabwe-cover.jpg`,
  // 2-39. Wikimedia/supplied images (downloaded locally)
  'gonarezhou-national-park':       `${D}/gonarezhou-national-park.jpg`,
  'chilojo-cliffs':                 `${D}/chilojo-cliffs.jpg`,
  'lake-mutirikwi':                 `${D}/lake-mutirikwi.jpg`,
  'kyle-recreational-park':         `${D}/kyle-recreational-park.jpg`,
  'tugwi-mukosi-dam':               `${D}/tugwi-mukosi-dam.jpg`,
  'tugwi-mukosi-dam-wall':          `${D}/tugwi-mukosi-dam-wall.jpg`,
  'hippo-valley-estates':           `${D}/hippo-valley-estates.jpg`,
  'mkwasine-estate':                `${D}/mkwasine-estate.jpg`,
  'runde-river':                    `${D}/runde-river.jpg`,
  'save-valley-conservancy':        `${D}/save-valley-conservancy.jpg`,
  'malilangwe-wildlife-reserve':    `${D}/malilangwe-wildlife-reserve.jpg`,
  'chiredzi-town-market':           `${D}/chiredzi-town-market.jpg`,
  'chiredzi-wildlife-area':         `${D}/chiredzi-wildlife-area.jpg`,
  'chivi-mountains':                `${D}/chivi-mountains.jpg`,
  'chivi-national-monument':        `${D}/chivi-national-monument.jpg`,
  'runde-tende-confluence':         `${D}/runde-tende-confluence.jpg`,
  'nerumedzo-sacred-forest':        `${D}/nerumedzo-sacred-forest.jpg`,
  'kyle-dam-wall':                  `${D}/kyle-dam-wall.jpg`,
  'sikato-bay':                     `${D}/sikato-bay.jpg`,
  'sikato-lion-park':               `${D}/sikato-lion-park.jpg`,
  'silveira-mission':               `${D}/silveira-mission.jpg`,
  'pamushana-mission':              `${D}/pamushana-mission.jpg`,
  'serima-mission':                 `${D}/serima-mission.jpg`,
  'masvingo-museum':                `${D}/masvingo-museum.jpg`,
  'great-zimbabwe-university':      `${D}/great-zimbabwe-university.jpg`,
  'copota-school':                  `${D}/copota-school.jpg`,
  'goshen-ranch':                   `${D}/goshen-ranch.jpg`,
  'monga-mountain':                 `${D}/monga-mountain.jpg`,
  'mwenezi-river-valley':           `${D}/mwenezi-river-valley.jpg`,
  'matibi-2-communal':              `${D}/matibi-2-communal.jpg`,
  'rutenga':                        `${D}/rutenga.jpg`,
  'manjirenji-dam':                 `${D}/manjirenji-dam.jpg`,
  'manjirenji-recreational-park':   `${D}/manjirenji-recreational-park.jpg`,
  'ndanga-historical':              `${D}/ndanga-historical.jpg`,
  'harurwa-season-bikita':          `${D}/harurwa-season-bikita.jpg`,
  'great-limpopo-cultural-fair':    `${D}/great-limpopo-cultural-fair.jpg`,
  'mkonto-mine':                    `${D}/mkonto-mine.jpg`,
  'tshovani-suburb':                `${D}/tshovani-suburb.jpg`,
  'boli-multicultural-village':     `${D}/boli-multicultural-village.jpg`,

  // Unsplash fallbacks — each photo ID appears in exactly one row.
  // heritage / ruins
  'chibvumani-ruins':               u('1564507592333-c60657eea523'),
  'old-fort-monument':              u('1518709268805-4e9042af2176'),

  // wildlife
  'devuli-ranch':                   u('1535082623926-b39352a03fb7'),
  'mushandike-sanctuary':           u('1577971132997-c10be9372519'),
  'save-conservatives':             u('1503919005314-30d93d07d823'),
  'chipinda-pools':                 u('1523805009345-7448845a9e53'),
  'nuanetsi-ranch':                 u('1474968140846-9d10d6b66f1e'),

  // lakes & dams
  'bangala-dam':                    u('1612374106744-f9c50815e262'),
  'muzhwi-dam':                     u('1505142468610-359e7d316be0'),
  'siya-dam':                       u('1551357176-256bb0617ecb'),
  'rozva-dam':                      u('1500964757637-c85e8a162699'),
  'mushandike-dam':                 u('1502784444187-359ac186c5bb'),
  'manyuchi-dam':                   u('1455587734955-081b22074882'),
  'copota-shakashe-dam':            u('1469854523086-cc02fe5d8800'),
  'chilonga-irrigation':            u('1614000048244-a8b1c87b9706'),

  // mountains / gorges
  'chilo-gorge':                    u('1759169202397-a98b82665b5e'),
  'pokoteke-gorge':                 u('1551632811-561732d1e306'),
  'devuli-range':                   u('1464822759023-fed622ff2c3b'),
  'bikita-mountain':                u('1454496522488-7a8e488e8606'),
  'ruvuravingwe-mountain':          u('1486870591958-9b9d0d1dda99'),
  'pamawiro':                       u('1448375240586-882707db888b'),

  // estates / agriculture
  'triangle-estates':               u('1500382017468-9049fed747ef'),
  'mwenezana-estate':               u('1605002123544-c4ce2ce4c5e3'),

  // city / town landmarks
  'buffalo-range-airport':          u('1502920514313-52581002a659'),
  'ngundu':                         u('1505765050516-f72dcac9c60e'),
  'charles-austin-theatre':         u('1473445730015-841f29a9490b'),
  'mucheke-stadium':                u('1504457047772-27faf1c00561'),
  'sundowners-garden':              u('1486325212027-8081e485255e'),
  'mupandawana':                    u('1503095396549-807759245b35'),
  'jerera-growth-point':            u('1488646953014-85cb44e25828'),
  'nemanwa-growth-point':           u('1562774053-701939374585'),
  'nyika-growth-point':             u('1759157199071-cf1b46c8ee29'),

  // religious / shrines / mission villages
  'mashoko-mission':                u('1519892338195-2832b2d57bb3'),
  'gutu-mission':                   u('1497486751825-1233686d5d80'),
  'driefontein-area':               u('1655981654045-5c45b14f3bc2'),
  'njelele-shrine-masvingo':        u('1517429465923-b7a52f7af74a'),

  // culture / villages
  'mabudziya-village':              u('1535759554012-8cbbc491f0b7'),
  'takaindisa-village':             u('1505373877841-8d25f7d46678'),

  // industry / mining
  'bikita-minerals-mine':           u('1611288875785-a3d3149a5e7d'),

  // sundowners / leisure (no local image, use unique Unsplash)
  // Already assigned above.

  // (sango-wildlife-lodge — its dedicated wildlife photo)
  'sango-wildlife-lodge':           u('1547721064-da6cfb341d50')
};

const FALLBACK = `${D}/great-zimbabwe/great-zimbabwe-cover.jpg`;

export function destinationImage(d: { id: string }): string {
  return IMAGE_BY_ID[d.id] ?? FALLBACK;
}

// Local Great Zimbabwe gallery (used by GreatZimbabweShowcase)
export const GREAT_ZIMBABWE_GALLERY = [
  `${D}/great-zimbabwe/great-zimbabwe-cover.jpg`,
  `${D}/great-zimbabwe/great-zimbabwe-aerial.jpg`,
  `${D}/great-zimbabwe/great-zimbabwe-wall.jpg`,
  `${D}/great-zimbabwe/great-zimbabwe-hill-complex.jpg`,
  `${D}/great-zimbabwe/great-zimbabwe-tree.jpg`,
  `${D}/great-zimbabwe/great-zimbabwe-stones.jpg`,
  `${D}/great-zimbabwe/great-zimbabwe-twilight.jpg`
];
