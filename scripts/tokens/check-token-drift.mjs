#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const srcRoot = path.resolve('src');
const exclude = [
  path.join(srcRoot, 'styles', 'generated'),
  path.join(srcRoot, 'lib', 'tokens')
];

const colorRegex = /(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\))/g;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (exclude.some(ex => full.startsWith(ex))) continue;
      files = files.concat(await walk(full));
    } else if (e.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  try {
    const stat = await fs.stat(srcRoot).catch(() => null);
    if (!stat) {
      console.log('No src/ directory found; nothing to scan.');
      process.exit(0);
    }

    const files = await walk(srcRoot);
    const matches = [];

    const textExts = new Set(['.ts','.tsx','.js','.jsx','.mjs','.cjs','.css','.scss','.sass','.html','.astro','.md','.json','.yml','.yaml']);

    for (const file of files) {
      if (exclude.some(ex => file.startsWith(ex))) continue;
      const ext = path.extname(file).toLowerCase();
      if (!textExts.has(ext)) continue;
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const m = line.match(colorRegex);
        if (m) {
          for (const mm of m) {
            matches.push({ file, line: i + 1, match: mm.trim() });
          }
        }
      }
    }

    if (matches.length) {
      for (const mo of matches) {
        console.log(`${mo.file}:${mo.line} => ${mo.match}`);
      }
      process.exit(1);
    } else {
      console.log('No raw color tokens found.');
      process.exit(0);
    }
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
}

main();
