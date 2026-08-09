# MotifGuard

MotifGuard is an AI automotive design-intent auditor. A car designer uploads a source sketch and an AI-generated render; MotifGuard shows what was preserved, changed, or lost and returns a revision brief plus a copy-ready prompt patch.

## Product scope

Version 1 deliberately solves one problem: automotive sketch-to-render fidelity. Product design, industrial design, illustration, and concept art are future directions, not current claims.

## AI function

Gemma 4 receives both images in one multimodal context. It compares visible proportion, silhouette, character lines, graphics, surface tension, and distinctive identity. The server validates file type and size, requests structured JSON, and rejects malformed output. The sample mode is clearly labelled and is not counted as a live analysis.

## Privacy

- Images are sent to the configured Gemma API only for the requested analysis.
- MotifGuard does not persist images or filenames.
- Analytics store a random anonymous browser identifier, event type, timestamp, and optional feedback.
- Never commit `GEMINI_API_KEY`; configure it as a deployment secret.

## Automatic evidence

The public counter records:

- unique anonymous visitors;
- total visits;
- successful live analyses (sample runs excluded);
- submitted feedback.

The D1 event log also records sample runs and failed analyses for debugging. Metrics begin at zero and represent real activity only.

## Verified production cases

MotifGuard currently publishes two controlled developer-validation cases. They demonstrate the production workflow and score contract, but they are **not** counted as independent users, traction, testimonials, or product adoption.

| Case | Result | Preserved | Drifted | Lost | Evidence |
| --- | ---: | ---: | ---: | ---: | --- |
| Case 02 | 85/100 | 2 | 2 | 0 | [Panel](docs/evidence/case-02-evidence-panel-1600x900.png) · [Result JSON](docs/evidence/case-02-result.json) |
| Case 03 | 92/100 | 3 | 1 | 0 | [Panel](docs/evidence/case-03-evidence-panel-1600x900.png) · [Raw API response](docs/evidence/case-03-api-analyze-raw-response.json) · [Manifest](docs/evidence/case-03-manifest.json) |

### Audited revision loop

Case 02 now includes a complete, public source-to-revision proof. MotifGuard's
initial audit scored the render at 85/100 and identified two drifts. Applying
the generated Prompt Patch produced a revised render that scored 92/100: the
side character line changed from drifted (88%) to preserved (95%), while the
wheel remained drifted (90%). The unresolved wheel finding is retained rather
than presented as a success.

[Review the images, raw production response, hashes, failure record, and machine-readable manifest.](docs/evidence/case-02-revision-loop.md)

This is controlled developer validation. It is not counted as an independent
user, testimonial, audience reach, return usage, or traction.

Case 03 is the controlled score-contract verification: the production API returned HTTP 200 with raw score `92`, and the UI displayed `92/100`. The historical `0.85/100` display remains a historical record and is not retrospectively converted to 85.

The production dashboard currently contains mixed operational telemetry from developer checks and controlled validation. The verified independent-user ledger remains: **0 users, 0 completed real-user analyses, 0 return users, and 0 consented testimonials**.

## Local setup

Requirements: Node.js 22.13+ and pnpm 10.

```bash
pnpm install --frozen-lockfile
copy .env.example .env.local
pnpm dev
```

Set `GEMINI_API_KEY` to a free-tier Google AI Studio key. `GEMMA_MODEL` is optional and defaults to `gemma-4-26b-a4b-it`.

## Verification

```bash
pnpm test
pnpm run build
pnpm exec eslint .
```

## Deployment

The project uses OpenAI Sites with a Cloudflare D1 binding named `DB`. Runtime secrets are managed by the hosting platform and are never stored in Git.

## License

MIT
