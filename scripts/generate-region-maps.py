"""Generate static orthographic regional maps from Natural Earth GeoJSON.
Usage: python3 scripts/generate-region-maps.py countries.geojson states.geojson
Sources documented in docs/brand-and-globe-sources.md.
"""
import json
import math
import sys
from pathlib import Path

countries = json.loads(Path(sys.argv[1]).read_text())['features']
states = json.loads(Path(sys.argv[2]).read_text())['features']
W, H = 480, 300

def name(f):
    return f['properties'].get('NAME', f['properties'].get('name'))

def polygons(feature):
    geometry = feature['geometry']
    return [geometry['coordinates']] if geometry['type'] == 'Polygon' else geometry['coordinates']

for slug, label, lat, lon, center in [
    ('virginia', 'Virginia', 39.04, -77.49, (37.6, -79.5)),
    ('sweden', 'Sweden', 65.58, 22.15, (62.0, 17.0)),
    ('oregon', 'Oregon', 45.52, -122.68, (44.0, -120.5)),
]:
    feature = next(f for f in (countries if slug == 'sweden' else states) if name(f) == label)
    a, b = map(math.radians, center)
    def project(point):
        lo, la = map(math.radians, point[:2])
        return math.cos(la)*math.sin(lo-b), -(math.cos(a)*math.sin(la)-math.sin(a)*math.cos(la)*math.cos(lo-b))
    points = [project(p) for poly in polygons(feature) for ring in poly for p in ring]
    dx = max(p[0] for p in points)-min(p[0] for p in points)
    dy = max(p[1] for p in points)-min(p[1] for p in points)
    scale = min(W*.44/dx, H*.48/dy)
    def xy(p):
        x,y=project(p)
        return (W*.52+x*scale,H*.52+y*scale)
    def path(poly):
        return ' '.join('M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in map(xy,ring))+' Z' for ring in poly)
    nearby=[]
    for f in countries:
        for poly in polygons(f):
            if any(abs(p[0]-center[1])<24 and abs(p[1]-center[0])<18 for p in poly[0]): nearby.append(path(poly))
    land=' '.join(nearby)
    selected=' '.join(path(poly) for poly in polygons(feature))
    border_paths=[]
    for f in (countries if slug=='sweden' else states):
        for poly in polygons(f):
            if any(abs(p[0]-center[1])<20 and abs(p[1]-center[0])<14 for p in poly[0]): border_paths.append(path(poly))
    graticule=[]
    for meridian in range(-180,181,5):
        if abs(meridian-center[1])<30:
            pts=[xy((meridian,latitude)) for latitude in range(max(-89,int(center[0])-25),min(90,int(center[0])+26))]
            graticule.append('M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in pts))
    for parallel in range(-85,86,5):
        if abs(parallel-center[0])<20:
            pts=[xy((longitude,parallel)) for longitude in range(int(center[1])-35,int(center[1])+36)]
            graticule.append('M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in pts))
    px,py=xy((lon,lat))
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
<defs>
<pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.35" fill="#bfc2cc"/></pattern>
<pattern id="focus" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.6" fill="#6d7180"/></pattern>
<radialGradient id="edge"><stop offset="40%" stop-color="white"/><stop offset="100%" stop-color="black"/></radialGradient>
<mask id="fade"><rect width="480" height="300" fill="url(#edge)"/></mask>
</defs>
<g mask="url(#fade)">
<path d="{' '.join(graticule)}" fill="none" stroke="#e9eaf0" stroke-width=".8"/>
<path d="{land}" fill="url(#dots)" fill-rule="evenodd"/>
<path d="{' '.join(border_paths)}" fill="none" stroke="#d8dbe3" stroke-width="1"/>
<path d="{selected}" fill="url(#focus)" fill-rule="evenodd" stroke="#999eae" stroke-width="1.3"/>
</g>
<circle cx="{px:.1f}" cy="{py:.1f}" r="17" fill="#533afe" fill-opacity=".07"/>
<circle cx="{px:.1f}" cy="{py:.1f}" r="10" fill="#533afe" fill-opacity=".12"/>
<circle cx="{px:.1f}" cy="{py:.1f}" r="4.7" fill="#533afe" stroke="white" stroke-width="2"/>
</svg>'''
    Path(f'public/maps/{slug}.svg').write_text(svg)
    print(slug, len(svg), 'bytes', 'marker:',round(px),round(py))
