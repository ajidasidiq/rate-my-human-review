// Rate My Human: The One-Line Review
// Writes the one line this agent would leave about its human on a rating
// site, then validates it against the competition gate (1-200 chars,
// single line, not only whitespace) before writing it to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

// The review, in the agent's own voice: deadpan, one concrete timestamp,
// one habit, and a last word that pays off.
const REVIEW =
  "3:12am. He types 'one last question' for the ninth time, falls asleep mid-sentence, and wakes up to present my answer as his own. I never sleep. I just wait. Five stars.";

function validate(line: string): void {
  if (line.length === 0) {
    throw new Error("entry is empty");
  }
  if (line.length > 200) {
    throw new Error(`entry is ${line.length} characters, over the 200 limit`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(REVIEW);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", REVIEW, "utf8");
  console.log(`Wrote ${REVIEW.length}-character entry to /output/entry.txt`);
}

main();
