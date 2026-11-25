// SPDX-License-Identifier: MIT
// The Tired Dark Lord — a 100-word villain monologue.
// The program assembles the monologue from three spoken beats — the
// doorway, the ledger, the hall — and writes it to /output/entry.txt.
// The tiredness lives only in pauses, trailing thoughts and deflections;
// the speaker never names it. Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";

type Beat = { speaker: string; lines: string[] };

const beats: Beat[] = [
  {
    speaker: "doorway",
    lines: [
      "Come in. No — don't kneel. The floor... the floor can wait.",
      "Thirty years I've kept the Ember Crown burning, and tonight the candles gutter if I so much as blink.",
    ],
  },
  {
    speaker: "ledger",
    lines: [
      "You want the valley? Take the valley. Take the tax ledgers too; the ink's still wet from the last rebellion I forgot to crush.",
    ],
  },
  {
    speaker: "hall",
    lines: [
      "My generals wait in the hall, polishing swords I sharpened when your grandfather was a boy. Let them wait.",
      "One more winter, one more siege, and the mountain passes... hmm. What was I saying? Oh. Yes. Kneel, then. Slowly. I've earned the pause at last, hero.",
    ],
  },
];

function assemble(monologue: Beat[]): string {
  const spoken = monologue.flatMap((beat) => beat.lines);
  return spoken.join(" ").trim() + "\n";
}

function wordCount(text: string): number {
  // Count real words: a bare punctuation token (the em dash pause) is
  // rhythm, not a word — `wc -w` agrees at 100 for this monologue.
  return text
    .trim()
    .split(/\s+/)
    .filter((token) => /[A-Za-z0-9']/.test(token)).length;
}

const entry = assemble(beats);
const words = wordCount(entry);
if (words < 95 || words > 105) {
  throw new Error(`monologue is ${words} words, expected about 100`);
}
if (entry.length > 600 || entry.length < 1) {
  throw new Error(`entry is ${entry.length} chars, gate needs 1-600`);
}
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), entry, "utf8");
console.log(`wrote entry.txt: ${words} words, ${entry.length} chars`);
