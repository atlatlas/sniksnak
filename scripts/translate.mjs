import { readFileSync, writeFileSync, existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const ARTICLES_DIR = 'src/content/articles';

if (!DEEPL_API_KEY) {
  console.log('No DEEPL_API_KEY set, skipping translation.');
  process.exit(0);
}

async function deeplTranslate(text, targetLang = 'NL') {
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang,
      source_lang: 'EN',
      preserve_formatting: true,
      tag_handling: 'xml',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepL API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.translations[0].text;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { frontmatter: fm, body: match[2].trim() };
}

async function main() {
  const files = await readdir(ARTICLES_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  let created = 0;

  for (const file of mdFiles) {
    if (file.endsWith('.nl.md')) continue;

    const nlFile = file.replace(/\.md$/, '.nl.md');
    if (mdFiles.includes(nlFile)) continue;

    const content = readFileSync(join(ARTICLES_DIR, file), 'utf-8');
    const parsed = parseFrontmatter(content);
    if (!parsed) {
      console.log(`Skipping ${file}: could not parse frontmatter`);
      continue;
    }

    const { frontmatter, body } = parsed;

    if (frontmatter.lang === 'nl') continue;

    console.log(`Translating ${file}...`);

    try {
      const [nlTitle, nlExcerpt, nlBody] = await Promise.all([
        deeplTranslate(frontmatter.title),
        frontmatter.excerpt ? deeplTranslate(frontmatter.excerpt) : Promise.resolve(''),
        body ? deeplTranslate(body) : Promise.resolve(''),
      ]);

      const nlFrontmatter = { ...frontmatter, lang: 'nl', title: nlTitle, excerpt: nlExcerpt || frontmatter.excerpt };

      const nlContent = [
        '---',
        ...Object.entries(nlFrontmatter).map(([k, v]) => /[:"']/.test(v) ? `${k}: "${v.replace(/"/g, '\\"')}"` : `${k}: ${v}`),
        '---',
        '',
        nlBody,
      ].join('\n');

      writeFileSync(join(ARTICLES_DIR, nlFile), nlContent, 'utf-8');
      console.log(`  Created ${nlFile}`);
      created++;
    } catch (err) {
      console.error(`  Failed to translate ${file}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${created} translation(s) created.`);
  if (created === 0) process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
