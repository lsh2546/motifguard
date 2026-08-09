# Technical evidence

MotifGuard is not a generic image captioner. It is a constrained audit pipeline
that turns two visual inputs into a contract-validated decision artifact and a
reproducible revision loop.

## Auditable pipeline

1. The browser prepares each PNG, JPEG, or WebP upload under a measured payload
   target and retries HTTP 413 responses with a smaller derivative.
2. The server sends the source sketch and AI render as separate multimodal
   evidence inputs with an automotive design-audit rubric.
3. Model output must satisfy two deliberately separate numeric contracts:
   overall Intent Fidelity is 0-100; evidence confidence is 0-1.
4. Invalid ranges, missing evidence, unsupported files, oversized payloads, and
   non-JSON errors fail explicitly instead of being silently coerced.
5. The result exposes preserved, drifted, and lost evidence, a Revision Brief,
   and a copy-ready Prompt Patch. Human judgment remains in the loop.
6. A user can save one live audit as a revision baseline, replace the AI render,
   and run the same source sketch again. The UI reports score, drifted-count,
   and lost-count deltas and renders both audits' feature, status, and confidence
   evidence side by side.
7. The Prompt Patch can be copied directly and the full validated audit can be
   exported as a timestamped, versioned JSON decision artifact.
8. Both browser and server bound inference time. The Gemini credential travels
   in an API header rather than the request URL, and timeout failures preserve
   the selected images for an explicit retry.

Verify the implementation:

- [Analysis API and score contract](app/api/analyze/route.ts)
- [Upload preparation, retry, UI validation, and result presentation](app/page.tsx)
- [Contract tests](tests/product-contract.test.mjs)
- [Passing GitHub Actions workflow](https://github.com/lsh2546/motifguard/actions/workflows/ci.yml)

## What is technically differentiated

- **Evidence before claims:** raw model output is preserved before narrative
  interpretation, and original evidence is never retrospectively rewritten.
- **Closed-loop measurement:** the same audit contract evaluates an initial
  render and a revision produced from the audit's own Prompt Patch. The public
  product can compare those two live audits directly instead of requiring a
  manual score transcription.
- **Failure transparency:** the first Case 02 HTTP 413 and the historical Case
  03 score-contract defect remain public.
- **Machine-verifiable identity:** source, renders, upload derivatives, raw API
  response, code, CI, and deployment artifact are bound by commit IDs and
  SHA-256 hashes.
- **Claim boundaries:** controlled validation is explicitly excluded from
  audience, traction, testimonials, and user counts.
- **Complete output contract:** verdict, intent, revision brief, prompt patch,
  four unique evidence features, two or more statuses, per-image evidence, and
  reasons are required in addition to the numeric range checks.

## Verified production result

The [Case 02 revision loop](docs/evidence/case-02-revision-loop.md) improved the
overall score from 85 to 92 and changed the targeted side character line from
drifted at 88% to preserved at 95%. The wheel remained drifted at 90%, proving
that the system reports partial success rather than collapsing the run into a
single promotional score.

The [deployment provenance](docs/evidence/deployment-provenance.md) connects the
public product to its exact source commit, successful CI run, packaged artifact
hash, and production timestamp.

## Privacy and operational boundaries

- Image bytes are sent only for the requested analysis and are not persisted by
  MotifGuard.
- Anonymous events contain a random browser identifier, event type, timestamp,
  and optional feedback, never image contents or filenames.
- The curated sample is excluded from live-analysis counts.
- No independent-user, time-saving, revenue, or adoption claim is made.
