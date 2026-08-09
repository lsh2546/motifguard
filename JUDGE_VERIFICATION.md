# MotifGuard judge verification

This page is the shortest path for an evaluator to verify what MotifGuard does,
what it proved, and what it has **not** proved.

## 1. Use the product

Open [the public MotifGuard deployment](https://motifguard.ljs2546.chatgpt.site/).

- No login is required.
- The 30-second example demonstrates the output structure without counting as a
  live analysis.
- A live comparison accepts one source sketch and one AI-generated render.
- The result separates preserved, drifted, and lost evidence and returns a
  Revision Brief plus a copy-ready Prompt Patch.

## 2. Verify that the result can change an action

Review the [Case 02 audited revision loop](docs/evidence/case-02-revision-loop.md).
It links every stage:

source sketch -> initial render -> 85/100 audit -> Prompt Patch -> revised render
-> raw production re-audit at 92/100.

The targeted side character line changed from drifted (88%) to preserved (95%).
The wheel remained drifted (90%) and is explicitly retained as an unresolved
finding.

## 3. Audit the raw evidence

- [Initial structured result](docs/evidence/case-02-result.json)
- [Raw production HTTP 200 re-analysis response](docs/evidence/case-02-reanalysis-raw-response.json)
- [Machine-readable hashes and deltas](docs/evidence/case-02-revision-loop-manifest.json)
- [Evidence directory index](docs/evidence/README.md)
- [Merged evidence PR with passing CI](https://github.com/lsh2546/motifguard/pull/7)

The manifest records immutable SHA-256 hashes for the source sketch, initial
render, revised render, upload derivatives, and raw response.

## 4. Verify engineering claims

- [CI workflow](https://github.com/lsh2546/motifguard/actions/workflows/ci.yml)
- [Contract tests](tests/product-contract.test.mjs)
- [Analysis API implementation](app/api/analyze/route.ts)
- [Upload compression and UI validation](app/page.tsx)
- [Anonymous event schema](app/api/events/route.ts)

The tests distinguish the 0-100 overall score from 0-1 evidence confidence,
reject malformed model output, ensure sample runs are not counted as live
analyses, and verify graceful handling of oversized uploads.

## 5. Verify privacy and claim boundaries

- Uploaded image bytes are sent to the configured model for the requested
  analysis and are not persisted by MotifGuard.
- Analytics contain a random anonymous browser identifier, event type,
  timestamp, and optional feedback; they do not contain image contents or
  filenames.
- Case 02 and Case 03 are controlled developer validation.
- They are not users, testimonials, audience reach, return usage, or traction.
- Verified independent users, completed real-user analyses, return users, and
  consented testimonials remain zero until third-party evidence exists.
- No independent manual-review time baseline has been measured, so MotifGuard
  makes no time-saving claim.

## Current limitations

- A high score does not prove that every visible motif was interpreted
  correctly; human judgment remains required.
- The Case 02 revision improved one diagnosed feature while the wheel drift
  remained unresolved.
- Current published evidence is automotive sketch-to-render validation only;
  other creative domains are future scope, not current claims.
