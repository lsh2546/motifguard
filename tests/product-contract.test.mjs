import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("product is independently branded and exposes required evidence", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /MOTIFGUARD/);
  assert.doesNotMatch(page, /FormProof|MemoryForge/i);
  for (const label of ["UNIQUE VISITORS", "VISITS", "LIVE ANALYSES", "FEEDBACK"]) assert.match(page, new RegExp(label));
  for (const claim of ["85/100", "92/100", "drifted at 90%", "CONTROLLED DEVELOPER VALIDATION"]) assert.match(page, new RegExp(claim));
  assert.match(page, /JUDGE_VERIFICATION\.md/);
  assert.match(page, /case-02-reanalysis-raw-response\.json/);
  assert.match(page, /case-02-revision-loop-manifest\.json/);
});

test("live analysis validates inputs and never embeds an API key", async () => {
  const route = await readFile(new URL("../app/api/analyze/route.ts", import.meta.url), "utf8");
  assert.match(route, /runtimeEnv\.GEMINI_API_KEY/);
  assert.match(route, /8_000_000/);
  assert.doesNotMatch(route, /AIza[0-9A-Za-z_-]{20,}/);
});

test("sample runs are not counted as live analyses", async () => {
  const events = await readFile(new URL("../app/api/events/route.ts", import.meta.url), "utf8");
  assert.match(events, /event_type='analysis_completed'/);
  assert.match(events, /sample_run/);
});

test("overall score and evidence confidence use explicit separate ranges", async () => {
  const route = await readFile(new URL("../app/api/analyze/route.ts", import.meta.url), "utf8");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(route, /overall score must be a finite number from 0 through 100 inclusive/i);
  assert.match(route, /Do not return the overall score as a 0-to-1 normalized fraction/);
  assert.match(route, /Evidence confidence uses a separate contract/);
  assert.match(route, /isFiniteNumberInRange\(audit\.score, 0, 100\)/);
  assert.match(route, /isFiniteNumberInRange\(evidence\.confidence, 0, 1\)/);
  assert.match(page, /inRange\(payload\.score, 0, 100\)/);
  assert.match(page, /inRange\(evidence\.confidence, 0, 1\)/);
  assert.match(page, /\{audit\.score\}<small>\/100<\/small>/);
  assert.match(page, /Math\.round\(item\.confidence \* 100\)\}%/);
});

test("uploads are compressed, retried, and handle non-JSON 413 responses", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /uploadTargetBytes = 400_000/);
  assert.match(page, /retryTargetBytes = 250_000/);
  assert.match(page, /createImageBitmap/);
  assert.match(page, /response\.status === 413/);
  assert.match(page, /contentType\.includes\("application\/json"\)/);
  assert.match(page, /still too large after compression/);
});
