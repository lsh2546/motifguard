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
