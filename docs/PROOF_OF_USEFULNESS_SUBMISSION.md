# MotifGuard — Proof of Usefulness evidence

Status: public evidence package updated on 2026-08-09 KST.

## Public links

- Product: <https://motifguard.ljs2546.chatgpt.site/>
- GitHub: <https://github.com/lsh2546/motifguard>
- Production commit: [`f3353430b875ef92e41552222d5eb8b77af92350`](https://github.com/lsh2546/motifguard/commit/f3353430b875ef92e41552222d5eb8b77af92350)
- Proof of Usefulness report: <https://proofofusefulness.com/reports/motifguard>
- HackerNoon article: submitted to editorial review; no public URL exists yet

## What MotifGuard proves

MotifGuard compares a human source sketch with an AI-generated render. It reports visible design elements as preserved, drifted, or lost and produces a validated 0–100 intent-fidelity score, revision brief, and prompt patch. Automotive design is the current validation domain.

## Controlled developer validation

### Case 02

- Intent Fidelity: 85/100
- Preserved: overall silhouette (98%), headlight graphic (95%)
- Drifted: side vent/character line (88%), wheel design (90%)
- Lost: none
- Evidence: [panel](evidence/case-02-evidence-panel-1600x900.png), [result JSON](evidence/case-02-result.json)

### Case 03 score-contract verification

- Production API: HTTP 200
- Raw score: 92
- UI score: 92/100
- Preserved: Rear Light Signature (98%), Accent Graphics (95%), Body Silhouette (96%)
- Drifted: Wheel Design (90%)
- Lost: none
- Evidence: [panel](evidence/case-03-evidence-panel-1600x900.png), [raw API response](evidence/case-03-api-analyze-raw-response.json), [manifest](evidence/case-03-manifest.json)

The historical Case 03 UI displayed `0.85/100`. That historical value is not reinterpreted or modified. The controlled rerun verifies the corrected 0–100 score contract.

## Traction reconciliation

The production dashboard displays mixed operational telemetry: 9 visitors, 18 visits, 5 analyses, and 0 feedback. Those counters include developer checks and controlled validation, so they are not claimed as independent-user traction.

Verified independent-user evidence:

- independent users: 0
- completed real-user analyses: 0
- verified return users: 0
- consented testimonials: 0

Cases 02 and 03 are technical validation evidence only.

## Known limitations

- No eligible independent-user evidence has been collected.
- Two cases are not a statistically meaningful accuracy evaluation.
- The model can overestimate fidelity or miss subtle design intent.
- MotifGuard supports human review; it does not replace design judgment.
