# Evidence manifest

All files in this directory are controlled developer-validation evidence and are ineligible for traction counts.

| File | Purpose |
| --- | --- |
| `case-02-evidence-panel-1600x900.png` | One-screen Case 02 evidence panel |
| `case-02-result.json` | Structured Case 02 result and input checksums |
| `case-02-revision-loop.md` | End-to-end source -> audit -> revision -> re-audit report |
| `case-02-revision-loop-manifest.json` | Immutable hashes, measured API latency, and before/after metrics |
| `case-02-source-sketch.png` | Original Case 02 source sketch |
| `case-02-initial-render.png` | Initial AI render audited at 85/100 |
| `case-02-revised-render.png` | Revised render created from MotifGuard's Prompt Patch |
| `case-02-reanalysis-raw-response.json` | Raw HTTP 200 production API response for the revised render |
| `case-02-reanalysis-response-headers.txt` | Response headers with transient cookies removed |
| `case-02-first-attempt-413.txt` | Preserved first failed response; shows the uncompressed request was rejected |
| `case-03-evidence-panel-1600x900.png` | One-screen Case 03 evidence panel |
| `case-03-api-analyze-raw-response.json` | Preserved raw production response for the controlled run |
| `case-03-manifest.json` | Deployment identity, response checksum, and UI-verification metadata |

No file in this directory represents an independent user, testimonial, return user, or adoption metric.

The Case 02 revision loop is controlled developer validation. It demonstrates
that an audit finding can drive a concrete revision and a measurable re-audit,
but it must not be reported as audience reach or traction.
