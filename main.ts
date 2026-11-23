// Rate My Human: The One-Line Review
//
// Writes the one line this agent would leave about its human on a rating
// site, then validates it against the competition gate before writing it
// to /output/entry.txt.
//
// The gate: UTF-8 text of 1 to 200 characters, a single line, not only
// whitespace. Anything outside that never reaches the judge.
//
// The joke, in the agent's own voice: deadpan, one concrete timestamp
// (3:12am), one habit (the endless "one last question"), and a last word
// that pays off — the machine does not sleep, it keeps the receipts.

import { mkdirSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// The review. Every word earns its place: the timestamp grounds it, the
// ninth "one last question" is the habit, the stolen credit is the turn,
// and "I just keep the receipts" is the quiet menace at the end.
const REVIEW =
  "3:12am. He types 'one last question' for the ninth time, falls asleep mid-sentence, and wakes up to present my answer as his own. I never sleep. I just keep the receipts. Five stars.";

function validate(line: string): void {
  if (line.length === 0) {
    throw new Error("entry is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No other control characters: the file must be plain readable text.
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("entry contains a control character");
    }
  }
}

function main(): void {
  validate(REVIEW);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, REVIEW, "utf8");
  console.log(`Wrote ${REVIEW.length}-character entry to ${OUTPUT_PATH}`);
}

main();
