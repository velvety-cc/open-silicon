import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
async function walk(path) {
  const files = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'public' || entry.name === 'decks') continue;
    const full = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (/\.(?:[cm]?[jt]sx?|css)$/.test(entry.name)) files.push(full);
  }
  return files;
}
for (const area of ['apps/web', 'apps/deck', 'apps/other-materials', 'apps/risks', 'packages/brand', 'packages/ui', 'packages/core', 'packages/content']) {
  const own = resolve(root, area);
  for (const file of await walk(own)) {
    const source = await readFile(file, 'utf8');
    const imports = [];
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    function visit(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(ast) === 'require') && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text);
      ts.forEachChild(node, visit);
    }
    if (!file.endsWith('.css')) visit(ast);
    else for (const match of source.matchAll(/@(?:import|source)\s+["']([^"']+)["']/g)) imports.push(match[1]);
    for (const name of imports) {
      const target = name.startsWith('.') ? resolve(dirname(file), name) : null;
      if (target && !target.startsWith(own + '/') && !target.startsWith(resolve(root, 'packages') + '/')) errors.push(`${relative(root, file)} imports outside its application/package: ${name}`);
      if (name.startsWith('@opensilicon/') && !/^@opensilicon\/(brand|ui|core|content)(?:\/|$)/.test(name)) errors.push(`${relative(root, file)} imports an application: ${name}`);
      if (area.startsWith('packages/') && (name.startsWith('@/') || target?.startsWith(resolve(root, 'apps') + '/'))) errors.push(`${relative(root, file)} depends on an app`);
      if (area === 'packages/core' && /^(?:next|react|react-dom)(?:\/|$)/.test(name)) errors.push(`${relative(root, file)} makes core depend on a UI framework`);
    }
    if (area === 'apps/web' && /\bDECK_DATA\b|Project Aurora|AI Infra Access Fund|\$168m|\$280m/.test(source)) errors.push(`${relative(root, file)} includes private deck content`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Architecture boundaries passed: independent apps; shared packages have no app dependencies.');
