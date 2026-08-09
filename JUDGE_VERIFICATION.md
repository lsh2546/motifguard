# MotifGuard judge verification

This page is the shortest path for an evaluator to verify what MotifGuard does,
what it proved, and what it has **not** proved.

## Five-minute verification route

| Time | Verify | Public evidence |
| --- | --- | --- |
| 0:00-1:00 | Open the product and run the 30-second example. Confirm that the exact Case 02 source and initial render produce the published 85/100 structured audit. | [Public product](https://motifguard.ljs2546.chatgpt.site/) |
| 1:00-2:00 | Follow the diagnosis through Prompt Patch, revised render, and production re-audit. Confirm 85 -> 92, side character line 88% drifted -> 95% preserved, and unresolved wheel drift at 90%. | [Case 02 revision loop](docs/evidence/case-02-revision-loop.md) |
| 2:00-3:00 | Compare the raw HTTP response to the machine-readable manifest and verify the recorded SHA-256 identities. | [Raw response](docs/evidence/case-02-reanalysis-raw-response.json) / [manifest](docs/evidence/case-02-revision-loop-manifest.json) |
| 3:00-4:00 | Inspect the shared executable validator, negative fixtures, and passing CI. | [Technical evidence](TECHNICAL_EVIDENCE.md) / [tests](tests/product-contract.test.mjs) / [CI](https://github.com/lsh2546/motifguard/actions/workflows/ci.yml) |
| 4:00-5:00 | Bind the public deployment to source and review privacy, claim boundaries, and known limitations. | [Deployment provenance](docs/evidence/deployment-provenance.md) / [market evidence](MARKET_EVIDENCE.md) |

The route verifies one bounded claim: MotifGuard can turn a sketch/render pair
into a structured diagnosis, revision instructions, and a comparable re-audit.
It does not establish adoption, replace a designer, or prove that every visual
motif will be interpreted correctly.

## 1. Use the product

Open [the public MotifGuard deployment](https://motifguard.ljs2546.chatgpt.site/).

- No login is required.
- The 30-second example demonstrates the output structure without counting as a
  live analysis.
- A live comparison accepts one source sketch and one AI-generated render.
- The result separates preserved, drifted, and lost evidence and returns a
  Revision Brief plus a copy-ready Prompt Patch.
- After a live audit, **Save as Revision Baseline** keeps that result while the
  evaluator replaces only the AI render. A second live audit then displays the
  score, drifted-count, and lost-count deltas for the same source sketch, plus
  baseline and revised feature/status/confidence lists side by side.
- **Copy Prompt Patch** moves the actionable instruction into the next
  generation step, while **Download Audit JSON** exports a timestamped
  `motifguard.audit.v1` decision artifact for review or archival.

## 2. Verify that the result can change an action

Review the [Case 02 audited revision loop](docs/evidence/case-02-revision-loop.md).
It links every stage:

source sketch -> initial render -> 85/100 audit -> Prompt Patch -> revised render
-> raw production re-audit at 92/100.

The targeted side character line changed from drifted (88%) to preserved (95%).
The wheel remained drifted (90%) and is explicitly retained as an unresolved
finding.

## What MotifGuard automates—and what remains human

Without MotifGuard, a reviewer must visually compare two images, decide which
features matter, remember or record each difference, translate those findings
into revision instructions, and then compare a later render against the first
review. MotifGuard automates the repeatable structure around that judgment:

- payload preparation and bounded retry;
- one named, four-feature evidence contract across the two images;
- preserved/drifted/lost classification with source evidence, render evidence,
  reason, and confidence;
- a Revision Brief and copy-ready Prompt Patch;
- a saved baseline and computed score, drifted-count, and lost-count deltas;
- a portable JSON audit and SHA-bound public validation record.

The designer still chooses the important intent, accepts or rejects the model's
interpretation, generates the next render, and decides whether the revision is
good enough. No manual-review time benchmark has been run, so this project does
not claim measured time savings.

## 3. Audit the raw evidence

- [Initial structured result](docs/evidence/case-02-result.json)
- [Raw production HTTP 200 re-analysis response](docs/evidence/case-02-reanalysis-raw-response.json)
- [Machine-readable hashes and deltas](docs/evidence/case-02-revision-loop-manifest.json)
- [Evidence directory index](docs/evidence/README.md)
- [Merged evidence PR with passing CI](https://github.com/lsh2546/motifguard/pull/7)

The manifest records immutable SHA-256 hashes for the source sketch, initial
render, revised render, upload derivatives, and raw response.

## 4. Verify engineering claims

- [Technical evidence and architecture](TECHNICAL_EVIDENCE.md)
- [Independent market-timing evidence](MARKET_EVIDENCE.md)
- [Evidence-gated roadmap](ROADMAP.md)
- [Production deployment provenance](docs/evidence/deployment-provenance.md)
- [CI workflow](https://github.com/lsh2546/motifguard/actions/workflows/ci.yml)
- [Contract tests](tests/product-contract.test.mjs)
- [Analysis API implementation](app/api/analyze/route.ts)
- [Upload compression and UI validation](app/page.tsx)
- [Anonymous event schema](app/api/events/route.ts)

The tests distinguish the 0-100 overall score from 0-1 evidence confidence,
reject incomplete or duplicate-feature model output, ensure sample runs are not
counted as live analyses, verify graceful handling of oversized uploads and
bounded inference timeouts, keep the API key out of request URLs, and enforce
the revision-comparison and portable-artifact contracts. The shared validator
is executed against valid, out-of-range, incomplete, duplicate-feature,
single-status, and invalid-confidence fixtures rather than checked only as text.

The provenance record binds the public deployment to its exact GitHub commit,
successful CI run, packaged artifact hash, and deployment timestamp.

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
