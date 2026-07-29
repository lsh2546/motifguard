# MotifGuard

MotifGuard is an AI automotive design-intent auditor. A car designer uploads a source sketch and an AI-generated render; MotifGuard shows what was preserved, changed, or lost and returns a revision brief plus a copy-ready prompt patch.

## Product scope

Version 1 deliberately solves one problem: automotive sketch-to-render fidelity. Product design, industrial design, illustration, and concept art are future directions, not current claims.

## AI and evidence

Gemma 4 receives both images in one multimodal context and compares visible proportion, silhouette, character lines, graphics, surface tension, and identity. The product automatically records unique anonymous visitors, visits, successful live analyses, and feedback. Sample runs are excluded from live-analysis counts. Images and filenames are not stored.

Development is taking place on the `agent/proof-of-usefulness-launch` branch before release to `main`.

## License

MIT
