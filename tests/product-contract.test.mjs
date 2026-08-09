import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { hasValidAuditContract } from "../lib/audit-contract.mjs";

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

test("the verified sample displays the exact Case 02 input pair and audit", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const source = await readFile(new URL("../public/case-02-source-sketch.png", import.meta.url));
  const render = await readFile(new URL("../public/case-02-initial-render.png", import.meta.url));
  assert.match(page, /case-02-source-sketch\.png/);
  assert.match(page, /case-02-initial-render\.png/);
  assert.match(page, /score: 85/);
  assert.match(page, /Side vent \/ character line/);
  assert.notDeepEqual(source, render);
});

test("overall score and evidence confidence use explicit separate ranges", async () => {
  const route = await readFile(new URL("../app/api/analyze/route.ts", import.meta.url), "utf8");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const contract = await readFile(new URL("../lib/audit-contract.mjs", import.meta.url), "utf8");
  assert.match(route, /overall score must be a finite number from 0 through 100 inclusive/i);
  assert.match(route, /Do not return the overall score as a 0-to-1 normalized fraction/);
  assert.match(route, /Evidence confidence uses a separate contract/);
  assert.match(contract, /inRange\(audit\.score, 0, 100\)/);
  assert.match(contract, /inRange\(item\.confidence, 0, 1\)/);
  assert.match(route, /hasValidAuditContract\(parsed\)/);
  assert.match(page, /hasValidAuditContract\(payload\)/);
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

test("live audits can be compared as an honest revision loop", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /SAVE AS REVISION BASELINE/);
  assert.match(page, /REVISION DELTA/);
  assert.match(page, /revisionBaseline\.score/);
  assert.match(page, /evidenceCounts/);
  assert.match(page, /BASELINE EVIDENCE/);
  assert.match(page, /REVISED EVIDENCE/);
  assert.match(page, /revisionBaseline\.evidence\.map/);
  assert.match(page, /Review individual evidence before accepting a revision/);
});

test("audit artifacts are portable and prompt guidance is actionable", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /COPY PROMPT PATCH/);
  assert.match(page, /DOWNLOAD AUDIT JSON/);
  assert.match(page, /motifguard\.audit\.v1/);
  assert.match(page, /requestId/);
});

test("live inference has bounded waits and keeps the API key out of the URL", async () => {
  const api = await readFile(new URL("../app/api/analyze/route.ts", import.meta.url), "utf8");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(api, /"x-goog-api-key": apiKey/);
  assert.doesNotMatch(api, /generateContent\?key=/);
  assert.match(api, /AbortSignal\.timeout\(60_000\)/);
  assert.match(page, /AbortSignal\.timeout\(70_000\)/);
  assert.match(page, /RETRY ANALYSIS/);
  assert.match(api, /Send the source sketch and AI render as multipart form data/);
  assert.match(api, /name === "TimeoutError" \|\| name === "AbortError"/);
  assert.doesNotMatch(api, /instanceof DOMException/);
});

test("the complete structured audit contract is validated", async () => {
  const evidence = [
    { feature: "Silhouette", status: "preserved", sourceEvidence: "low roof", resultEvidence: "low roof", reason: "stance", confidence: .9 },
    { feature: "Shoulder", status: "drifted", sourceEvidence: "rising", resultEvidence: "flat", reason: "motion", confidence: .8 },
    { feature: "Graphic", status: "preserved", sourceEvidence: "slash", resultEvidence: "slash", reason: "identity", confidence: .85 },
    { feature: "Wheel", status: "drifted", sourceEvidence: "turbine", resultEvidence: "generic", reason: "detail", confidence: .75 },
  ];
  const valid = { score: 85, verdict: "Partial fidelity", intent: "Preserve motion", evidence, brief: "Restore shoulder", promptPatch: "Keep the rising shoulder" };
  assert.equal(hasValidAuditContract(valid), true);
  assert.equal(hasValidAuditContract({ ...valid, score: .85 }), true, "0.85 is valid on the explicit 0-100 scale");
  assert.equal(hasValidAuditContract({ ...valid, score: 101 }), false);
  assert.equal(hasValidAuditContract({ ...valid, brief: "" }), false);
  assert.equal(hasValidAuditContract({ ...valid, evidence: evidence.map(item => ({ ...item, status: "preserved" })) }), false);
  assert.equal(hasValidAuditContract({ ...valid, evidence: evidence.map((item, index) => ({ ...item, feature: index ? item.feature : "Shoulder" })) }), false);
  assert.equal(hasValidAuditContract({ ...valid, evidence: evidence.map((item, index) => ({ ...item, confidence: index ? item.confidence : 1.1 })) }), false);
});
