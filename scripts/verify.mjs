import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const content=JSON.parse(await readFile('src/content.json','utf8'));
const files=(await readdir('dist')).filter(f=>f.endsWith('.html'));
const pages=new Map(await Promise.all(files.map(async f=>[f,await readFile(`dist/${f}`,'utf8')])));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
for(const text of content.filter(Boolean)) assert.ok(pages.get('profile.html').includes(escape(text)),`Missing source text: ${text}`);
for(const [file,html] of pages){assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: single H1`);assert.ok(html.includes('<main'),`${file}: main landmark`);for(const match of html.matchAll(/href="\.\/([^"#]+\.html)(?:#([^"]+))?"/g)){assert.ok(pages.has(match[1]),`${file}: broken page ${match[1]}`);if(match[2])assert.ok(pages.get(match[1]).includes(`id="${match[2]}"`),`Missing anchor ${match[2]}`);}}
console.log(`PASS: ${files.length} prerendered pages, ${content.filter(Boolean).length} source paragraphs, internal links, service anchors, and single H1 per page.`);
