// Audit lib/destination-images.ts:
//   1. Every destination in data/destinations.json has a map entry.
//   2. No two IDs share the same image source.
//   3. Every local path resolves to an actual file on disk.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const destFile = path.join(root, 'data', 'destinations.json');
const data = JSON.parse(fs.readFileSync(destFile, 'utf-8'));
const destIds = data.destinations.map(d => d.id);

const mapSrc = fs.readFileSync(path.join(root, 'lib', 'destination-images.ts'), 'utf-8');
// Crude parser: pull out the `'id': value` pairs inside IMAGE_BY_ID
const block = mapSrc.split('IMAGE_BY_ID')[1].split('};')[0];
const entries = [...block.matchAll(/'([a-z0-9-]+)':\s*(?:`([^`]+)`|u\('([^']+)'\))/g)]
  .map(m => ({ id: m[1], img: m[2] || `unsplash:${m[3]}` }));

const idToImg = new Map();
const imgToIds = new Map();
const errors = [];

for (const { id, img } of entries) {
  if (idToImg.has(id)) errors.push(`duplicate map row for ${id}`);
  idToImg.set(id, img);
  if (!imgToIds.has(img)) imgToIds.set(img, []);
  imgToIds.get(img).push(id);
}

const missing = destIds.filter(id => !idToImg.has(id));
const extra = [...idToImg.keys()].filter(id => !destIds.includes(id));

const dupGroups = [...imgToIds.entries()].filter(([, ids]) => ids.length > 1);

const fileMisses = [];
for (const [id, img] of idToImg) {
  if (!img.startsWith('/images/')) continue;
  const p = path.join(root, 'public', img);
  if (!fs.existsSync(p)) fileMisses.push(`${id} → ${img}`);
}

const ok = errors.length === 0 && missing.length === 0 && dupGroups.length === 0 && fileMisses.length === 0;

console.log(`Destinations: ${destIds.length}`);
console.log(`Map entries:  ${idToImg.size}`);
console.log(`Unique images: ${imgToIds.size}`);
if (missing.length) {
  console.log(`\nMISSING (${missing.length}):`);
  missing.forEach(id => console.log('  - ' + id));
}
if (extra.length) {
  console.log(`\nEXTRA (in map but not in destinations.json):`);
  extra.forEach(id => console.log('  - ' + id));
}
if (dupGroups.length) {
  console.log(`\nDUPLICATE images (${dupGroups.length}):`);
  for (const [img, ids] of dupGroups) {
    console.log('  ' + img);
    ids.forEach(i => console.log('    - ' + i));
  }
}
if (fileMisses.length) {
  console.log(`\nLOCAL FILE MISSING (${fileMisses.length}):`);
  fileMisses.forEach(s => console.log('  - ' + s));
}
if (errors.length) {
  console.log(`\nERRORS: ${errors.join(', ')}`);
}

console.log(ok ? '\n✓ AUDIT PASS — zero duplicates, every destination mapped, every local file present.' : '\n✗ AUDIT FAILED');
process.exit(ok ? 0 : 1);
