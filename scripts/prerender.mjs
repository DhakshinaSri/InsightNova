import {readFile,writeFile} from 'node:fs/promises';
import {render,routes} from '../.ssr/entry-server.js';
const template=await readFile('dist/index.html','utf8');
for(const [slug,title] of routes){const html=template.replace('<div id="root"></div>',()=>`<div id="root">${render(slug)}</div>`).replace('<title>InsightNova Data Analytics</title>',`<title>${title} | InsightNova Data Analytics</title>`);await writeFile(`dist/${slug||'index'}.html`,html);}
console.log(`Prerendered ${routes.length} pages with readable HTML content.`);
