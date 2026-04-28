"""Second-pass harvester: targeted re-fetch for the weak Wikimedia matches.
Replaces the file only if a relevant-looking new candidate is found.
A candidate is considered relevant if its title contains any of `accept_terms`.
"""
import json, os, time, urllib.parse, urllib.request

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'destinations')
WIKI = 'https://commons.wikimedia.org/w/api.php'
UA = 'wonder-travel-web/1.0 (https://wondertravel.zw)'

# (id, [search terms], [accept-if-title-contains words — case-insensitive])
TARGETS = [
    ('chiredzi-town-market',         ['African open air market vendors', 'Sub-Saharan market stalls', 'Zimbabwe vegetable market'], ['market', 'vendor', 'stall', 'bazaar']),
    ('pamushana-mission',            ['Pamushana Lodge Malilangwe', 'Malilangwe Lodge', 'Singita Pamushana'],                       ['lodge', 'pamushana', 'malilangwe', 'singita']),
    ('manjirenji-dam',               ['Mtilikwe River dam', 'Zimbabwe dam concrete', 'Concrete dam wall Africa'],                    ['dam', 'reservoir', 'wall', 'spillway']),
    ('manjirenji-recreational-park', ['Lake Zimbabwe boating', 'Zimbabwe lake recreation', 'African lakeside park'],                 ['lake', 'boat', 'shore', 'recreational']),
    ('tshovani-suburb',              ['Chiredzi residential', 'Zimbabwe town residential', 'Lowveld town houses'],                   ['town', 'residential', 'house', 'street', 'suburb', 'chiredzi']),
    ('sikato-bay',                   ['Lake Mutirikwi shoreline', 'Mutirikwi lake bay', 'Zimbabwe lake shore'],                      ['mutirikwi', 'lake', 'shore', 'bay']),
    ('boli-multicultural-village',   ['Tsonga people Zimbabwe', 'Shangaan dance', 'Tsonga Shangaan culture'],                        ['tsonga', 'shangaan', 'dance', 'people']),
    ('chivi-mountains',              ['Zimbabwe granite kopje', 'Masvingo granite hill', 'Granite outcrop Africa'],                  ['granite', 'kopje', 'hill', 'outcrop', 'masvingo']),
    ('chivi-national-monument',      ['Chivi monument Zimbabwe', 'Zimbabwe stone walling ruins', 'Khami ruins'],                      ['ruins', 'walling', 'stone', 'monument']),
    ('runde-tende-confluence',       ['Runde Save river confluence', 'Zimbabwe Lowveld river', 'Save River Zimbabwe'],               ['save', 'runde', 'river', 'confluence', 'lowveld']),
]

def search(term):
    p = {'action':'query','format':'json','generator':'search',
         'gsrsearch': term + ' filetype:bitmap','gsrnamespace':'6','gsrlimit':'10',
         'prop':'imageinfo','iiprop':'url|mime','iiurlwidth':'1400'}
    req = urllib.request.Request(WIKI + '?' + urllib.parse.urlencode(p), headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode('utf-8'))
    except Exception as e:
        return []
    pages = (data.get('query') or {}).get('pages') or {}
    results = []
    for _, pg in pages.items():
        info = (pg.get('imageinfo') or [{}])[0]
        thumb = info.get('thumburl') or info.get('url')
        mime = info.get('mime', '')
        if thumb and mime.startswith('image/') and not mime.endswith('svg+xml'):
            results.append({'title': pg.get('title') or '', 'url': thumb})
    return results

def download(url, out):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(out, 'wb') as f:
        f.write(data)
    return len(data)

upgraded = []
unchanged = []

for did, terms, accept in TARGETS:
    chosen = None
    for term in terms:
        results = search(term)
        for r in results:
            t = r['title'].lower()
            if any(a.lower() in t for a in accept):
                # Reject SVGs / maps / specimens / portraits we already know are wrong
                if any(bad in t for bad in ['map.', 'specimen', 'portrait', '1780', '1925', 'engraving', 'satellite']):
                    continue
                chosen = r
                break
        if chosen:
            break
        time.sleep(0.2)
    if not chosen:
        unchanged.append(did)
        print(f'-- {did}: no improved candidate found', flush=True)
        continue
    out = os.path.join(OUT, f'{did}.jpg')
    try:
        n = download(chosen['url'], out)
        upgraded.append((did, chosen['title'], chosen['url']))
        print(f'OK {did} ({n//1024}KB) <- {chosen["title"]}', flush=True)
    except Exception as e:
        unchanged.append(did)
        print(f'FAIL {did}: {e}', flush=True)
    time.sleep(0.4)

print(f'\nUpgraded: {len(upgraded)}  Unchanged: {len(unchanged)}', flush=True)
print(f'Unchanged: {unchanged}', flush=True)
