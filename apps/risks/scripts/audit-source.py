"""Read the original XLSX ZIP/XML without editing or recalculating it."""
from pathlib import Path
from zipfile import ZipFile
import argparse, datetime, hashlib, json, xml.etree.ElementTree as ET

repo = Path(__file__).resolve().parents[3]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, help='External original XLSX; otherwise use materialsDirectory in .workspace.local.json')
parser.add_argument('--output', type=Path, help='New audit JSON path; never overwrites an existing file')
args = parser.parse_args()
settings_path = repo / '.workspace.local.json'
settings = json.loads(settings_path.read_text()) if settings_path.exists() else {}
materials = settings.get('materialsDirectory')
if args.source:
    source = args.source.resolve()
elif materials:
    source = Path(materials).expanduser() / '20261021/OpenSilicon_Production_Materials_20261021/Budget_and_Models/GB300_Project_Budget_2026-10-21.xlsx'
else:
    parser.error('Pass --source /path/to/original.xlsx or configure materialsDirectory in .workspace.local.json')
if not source.is_file():
    parser.error(f'Workbook not found: {source}')
ns = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with ZipFile(source) as z:
    strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        strings = [''.join(e.itertext()) for e in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', ns)]
    sheets = ET.fromstring(z.read('xl/workbook.xml')).findall('m:sheets/m:sheet', ns)
    relationships = {e.attrib['Id']: e.attrib['Target'] for e in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
    result = {'file': source.name, 'snapshotDate': '2026-10-21', 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'sheets': {}}
    for sheet in sheets:
        rid = sheet.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
        target = relationships[rid]
        target = target.lstrip('/') if target.startswith('/') else 'xl/' + target
        cells = {}
        for c in ET.fromstring(z.read(target)).findall('.//m:sheetData/m:row/m:c', ns):
            v, f = c.find('m:v', ns), c.find('m:f', ns)
            value = v.text if v is not None else None
            if c.attrib.get('t') == 's' and value is not None: value = strings[int(value)]
            elif c.attrib.get('t') == 'inlineStr': value = ''.join(c.find('m:is', ns).itertext())
            elif value is not None:
                try: value = float(value)
                except ValueError: pass
            if value is not None or f is not None:
                cells[c.attrib['r']] = {'value': value, 'formula': f.text if f is not None else None}
        result['sheets'][sheet.attrib['name']] = cells
stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H-%M-%SZ')
out = args.output or Path(settings.get('artifactsDirectory', repo / '.artifacts')) / ('risks-audit-' + stamp) / 'source-snapshot.json'
out = out.resolve()
out.parent.mkdir(parents=True, exist_ok=True)
with out.open('x') as handle:
    handle.write(json.dumps(result, indent=2) + '\n')
print(json.dumps({'output': str(out), 'sourceSha256': result['sha256'], 'sheets': {name: len(cells) for name, cells in result['sheets'].items()}}, indent=2))
