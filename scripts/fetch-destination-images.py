"""
Fetch one unique image per destination from Wikimedia Commons (with fallback search terms).
Saves to public/images/destinations/{id}.jpg. Skips IDs we already have locally.

Strategy:
  1. For each (id, search_terms[]) try terms left-to-right against Wikimedia Commons API.
  2. Use the *thumbnail* (1200px) so image weight stays reasonable.
  3. If no result for any term, mark id as missing (will fall back to curated Unsplash URL).
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'destinations')
os.makedirs(OUT_DIR, exist_ok=True)

# Skip already-supplied images (great-zimbabwe is a folder, not a single file)
ALREADY_LOCAL = {
    'great-zimbabwe', 'gonarezhou-national-park', 'chilojo-cliffs',
    'lake-mutirikwi', 'kyle-recreational-park', 'tugwi-mukosi-dam',
    'hippo-valley-estates', 'runde-river',
}

# (id, [ordered search terms — first hit wins])
TARGETS = [
    ('save-valley-conservancy',     ['Save Valley Conservancy', 'Save River Zimbabwe', 'African savanna conservancy']),
    ('malilangwe-wildlife-reserve', ['Malilangwe Wildlife Reserve', 'Malilangwe Trust', 'Zimbabwe wildlife reserve']),
    ('triangle-estates',            ['Triangle Zimbabwe', 'Sugarcane plantation Zimbabwe', 'Sugarcane field Africa']),
    ('mkwasine-estate',             ['Mkwasine Estate', 'Sugarcane estate Zimbabwe', 'Sugarcane harvesting']),
    ('chilo-gorge',                 ['Chilo Gorge', 'Save river gorge', 'River gorge Zimbabwe']),
    ('buffalo-range-airport',       ['Buffalo Range Airport', 'Chiredzi airport', 'Small airport Africa runway']),
    ('boli-multicultural-village',  ['Shangaan culture', 'Tsonga people Zimbabwe', 'Traditional African village']),
    ('chipinda-pools',              ['Chipinda Pools', 'Runde river Gonarezhou', 'River pool Zimbabwe']),
    ('chiredzi-town-market',        ['Chiredzi', 'Chiredzi town', 'Zimbabwe market town']),
    ('sango-wildlife-lodge',        ['Sango wildlife conservancy', 'Save valley sango', 'African safari lodge']),
    ('tugwi-mukosi-dam-wall',       ['Tokwe-Mukorsi Dam', 'Tokwe Mukosi dam wall', 'Zimbabwe dam wall']),
    ('bangala-dam',                 ['Bangala Dam', 'Bangala Recreational Park', 'Zimbabwe small dam']),
    ('muzhwi-dam',                  ['Muzhwi Dam', 'Chivi dam', 'Zimbabwe rural dam']),
    ('chivi-mountains',             ['Chivi District', 'Chivi mountains', 'Zimbabwe rocky mountain']),
    ('runde-tende-confluence',      ['Runde river', 'Runde Tende river', 'River confluence Africa']),
    ('chivi-national-monument',     ['Chivi National Monument', 'Chivi ruins', 'Zimbabwe stone ruins']),
    ('ngundu',                      ['Ngundu Halt', 'Ngundu Zimbabwe', 'Zimbabwe roadside town']),
    ('nerumedzo-sacred-forest',     ['Nerumedzo', 'Harurwa Bikita', 'Sacred forest Zimbabwe']),
    ('chibvumani-ruins',            ['Chibvumani ruins', 'Bikita stone ruins', 'Zimbabwe ruins']),
    ('bikita-mountain',             ['Bikita District', 'Bikita Zimbabwe', 'Zimbabwe rural mountain']),
    ('devuli-ranch',                ['Devuli Ranch', 'Devuli river Zimbabwe', 'Cattle ranch Africa']),
    ('devuli-range',                ['Devuli range Zimbabwe', 'Devuli mountains', 'Zimbabwe mountain range']),
    ('ruvuravingwe-mountain',       ['Ruvuravingwe', 'Bikita mountain Zimbabwe', 'Granite hill Zimbabwe']),
    ('siya-dam',                    ['Siya Dam Zimbabwe', 'Zaka Zimbabwe', 'Small dam Zimbabwe']),
    ('rozva-dam',                   ['Rozva Dam', 'Bikita dam', 'Zimbabwe rural dam']),
    ('bikita-minerals-mine',        ['Bikita Minerals', 'Lithium mine Zimbabwe', 'Open pit mine']),
    ('save-conservatives',          ['Save valley conservancy elephant', 'Save river wildlife', 'African elephant savanna']),
    ('mashoko-mission',             ['Mashoko Mission', 'Catholic mission Zimbabwe', 'Mission station Africa']),
    ('silveira-mission',            ['Silveira Mission', 'Bishop Silveira Zimbabwe', 'Catholic mission Bikita']),
    ('pamushana-mission',           ['Pamushana school', 'Malilangwe Pamushana', 'Mission school Zimbabwe']),
    ('nyika-growth-point',          ['Nyika Bikita', 'Nyika growth point', 'Zimbabwe small town']),
    ('masvingo-museum',             ['Masvingo Museum', 'Great Zimbabwe Museum', 'Zimbabwe museum building']),
    ('old-fort-monument',           ['Fort Victoria Zimbabwe', 'Masvingo old fort', 'Colonial fort Africa']),
    ('mushandike-sanctuary',        ['Mushandike Sanctuary', 'Mushandike game', 'Zimbabwe game sanctuary']),
    ('mushandike-dam',              ['Mushandike Dam', 'Masvingo dam', 'Zimbabwe reservoir']),
    ('pokoteke-gorge',              ['Pokoteke gorge', 'Masvingo gorge', 'Granite gorge Zimbabwe']),
    ('sikato-bay',                  ['Sikato Bay Lake Mutirikwi', 'Lake Mutirikwi shore', 'Lake bay Zimbabwe']),
    ('kyle-dam-wall',               ['Kyle Dam', 'Lake Mutirikwi dam wall', 'Zimbabwe dam']),
    ('mabudziya-village',           ['Shona village Zimbabwe', 'Rural Zimbabwe homestead', 'Traditional Zimbabwe village']),
    ('takaindisa-village',          ['Zimbabwe rural village', 'Shona homestead', 'Africa rural village']),
    ('charles-austin-theatre',      ['Charles Austin Theatre Masvingo', 'Masvingo theatre', 'Zimbabwe theatre building']),
    ('mucheke-stadium',             ['Mucheke Stadium', 'Masvingo stadium', 'Zimbabwe football stadium']),
    ('great-zimbabwe-university',   ['Great Zimbabwe University', 'GZU campus', 'Zimbabwe university']),
    ('copota-school',               ['Copota School Blind', 'Copota Masvingo', 'School Zimbabwe']),
    ('copota-shakashe-dam',         ['Shakashe river', 'Masvingo dam small', 'Zimbabwe small reservoir']),
    ('sundowners-garden',           ['African sundowner', 'Garden restaurant Africa', 'Bushveld terrace']),
    ('goshen-ranch',                ['Goshen Ranch Zimbabwe', 'Wildlife ranch Africa', 'Cattle and game ranch']),
    ('pamawiro',                    ['Zimbabwe granite hills', 'Masvingo countryside', 'Zimbabwe landscape']),
    ('monga-mountain',              ['Monga mountain Zimbabwe', 'Masvingo mountain', 'Granite peak Zimbabwe']),
    ('sikato-lion-park',            ['Lion sanctuary Zimbabwe', 'African lion savanna', 'Lion in grassland']),
    ('nemanwa-growth-point',        ['Nemanwa Zimbabwe', 'Masvingo growth point', 'Zimbabwe village trading']),
    ('njelele-shrine-masvingo',     ['Njelele shrine', 'Mwari shrine Zimbabwe', 'Sacred site Zimbabwe']),
    ('manyuchi-dam',                ['Manyuchi Dam', 'Mberengwa Manyuchi', 'Zimbabwe large reservoir']),
    ('nuanetsi-ranch',              ['Nuanetsi Ranch', 'Mwenezi ranch', 'Zimbabwe game ranch']),
    ('mwenezana-estate',            ['Mwenezana Estate', 'Mwenezi sugar', 'Sugarcane estate']),
    ('matibi-2-communal',           ['Matibi Mwenezi', 'Communal land Zimbabwe', 'Rural Zimbabwe homestead']),
    ('rutenga',                     ['Rutenga Zimbabwe', 'Mwenezi Rutenga', 'Zimbabwe rail town']),
    ('mwenezi-river-valley',        ['Mwenezi river', 'Nuanetsi river', 'River valley Zimbabwe']),
    ('serima-mission',              ['Serima Mission', 'Serima church', 'Catholic mission Africa']),
    ('mupandawana',                 ['Mupandawana', 'Gutu town', 'Zimbabwe small town']),
    ('gutu-mission',                ['Gutu Mission', 'Gutu Zimbabwe church', 'Mission station']),
    ('driefontein-area',            ['Driefontein Mission Zimbabwe', 'Mvuma church', 'Catholic mission']),
    ('manjirenji-dam',              ['Manjirenji Dam', 'Manjirenji recreational', 'Zimbabwe lake reservoir']),
    ('manjirenji-recreational-park',['Manjirenji park Zimbabwe', 'Lake recreation Zimbabwe', 'Zimbabwe lake park']),
    ('jerera-growth-point',         ['Jerera Zaka', 'Jerera growth point', 'Zimbabwe small town centre']),
    ('ndanga-historical',           ['Ndanga district Zimbabwe', 'Ndanga hills', 'Zimbabwe heritage hill']),
    ('harurwa-season-bikita',       ['Harurwa edible insect', 'Encosternum delegorguei', 'Edible stink bug']),
    ('great-limpopo-cultural-fair', ['Great Limpopo Transfrontier', 'Limpopo cultural festival', 'Africa cultural festival']),
    ('mkonto-mine',                 ['Mining Zimbabwe', 'Open cast mine Africa', 'Zimbabwe mining']),
    ('chilonga-irrigation',         ['Chilonga irrigation', 'Chiredzi sugar irrigation', 'Sugarcane irrigation Zimbabwe']),
    ('tshovani-suburb',             ['Chiredzi suburb', 'Zimbabwe town suburb', 'Suburban Zimbabwe houses']),
    ('chiredzi-wildlife-area',      ['Chiredzi wildlife', 'Lowveld wildlife Zimbabwe', 'African savanna wildlife']),
]

WIKI_API = 'https://commons.wikimedia.org/w/api.php'

def find_image(term):
    """Search Wikimedia Commons; return (image_url, title) or (None, None)."""
    params = {
        'action': 'query',
        'format': 'json',
        'generator': 'search',
        'gsrsearch': term + ' filetype:bitmap',
        'gsrnamespace': '6',  # File: namespace
        'gsrlimit': '5',
        'prop': 'imageinfo',
        'iiprop': 'url|mime',
        'iiurlwidth': '1400',
    }
    url = WIKI_API + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': 'wonder-travel-web/1.0 (https://wondertravel.zw)'})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode('utf-8'))
    except Exception as e:
        print(f'  ERR search "{term}": {e}', flush=True)
        return None, None
    pages = (data.get('query') or {}).get('pages') or {}
    for _, p in pages.items():
        info = (p.get('imageinfo') or [{}])[0]
        thumb = info.get('thumburl') or info.get('url')
        mime = info.get('mime', '')
        if thumb and mime.startswith('image/') and not mime.endswith('svg+xml'):
            return thumb, p.get('title')
    return None, None

def download(url, out_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'wonder-travel-web/1.0 (https://wondertravel.zw)'})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(out_path, 'wb') as f:
        f.write(data)
    return len(data)

def main():
    successes = []
    misses = []
    for did, terms in TARGETS:
        if did in ALREADY_LOCAL:
            continue
        out = os.path.join(OUT_DIR, f'{did}.jpg')
        if os.path.exists(out) and os.path.getsize(out) > 0:
            print(f'OK (cached) {did}', flush=True)
            successes.append((did, 'cached', None))
            continue
        chosen_url, chosen_title = None, None
        for term in terms:
            url, title = find_image(term)
            if url:
                chosen_url, chosen_title = url, title
                break
            time.sleep(0.2)
        if not chosen_url:
            print(f'MISS {did} — no image for {terms}', flush=True)
            misses.append(did)
            continue
        try:
            n = download(chosen_url, out)
            print(f'OK {did} ({n//1024}KB) <- {chosen_title}', flush=True)
            successes.append((did, chosen_title, chosen_url))
        except Exception as e:
            print(f'DOWNLOAD-FAIL {did}: {e}', flush=True)
            misses.append(did)
        time.sleep(0.4)

    # Write attribution log
    log_path = os.path.join(OUT_DIR, '_attribution.json')
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump(
            {'fetched': [{'id': d, 'title': t, 'src': u} for (d, t, u) in successes],
             'missed': misses},
            f, indent=2)
    print(f'\nDone. {len(successes)} fetched, {len(misses)} missed.', flush=True)
    print(f'Missed ids: {misses}', flush=True)

if __name__ == '__main__':
    main()
