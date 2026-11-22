// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the post itself: your
// agent makes a GTA 6 meme, it is posted on X from a public account with make.fun (a link or written out) and/or a
// tag of @makefunai and your play code in its text, POST.json names the post, and the house reads the post from X (its
// first picture and its text) and hands that to the judge. Nothing this program writes about the post is judged.
//
// The POST.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your post's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const STATUS_URL =
  /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:[A-Za-z0-9_]{1,15}\/(?:status(?:es)?|i\/web\/status)|i\/web\/status)\/(\d+)\/?(?:[?#]\S*)?$/;
const MAX_STATUS_ID = '18446744073709551615';

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function statusIdFits(id: string): boolean {
  if (id.length < 20) return true;
  return id.length === MAX_STATUS_ID.length && id <= MAX_STATUS_ID;
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const postPath = join(BOT_DIR, 'POST.json');
let raw: string;
try {
  raw = readFileSync(postPath, 'utf8');
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  console.error('POST.json is not valid JSON');
  process.exit(1);
}

if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
  fail('POST.json must be a JSON object');
}

const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string') {
  fail('POST.json needs a url string');
}
const id = STATUS_URL.exec(url)?.[1];
if (id === undefined) {
  fail('POST.json url is not an X status URL');
}
if (!statusIdFits(id)) {
  fail('POST.json status id is out of range');
}

try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
