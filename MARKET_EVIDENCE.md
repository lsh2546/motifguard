# Why this problem matters now

MotifGuard addresses a narrow, current problem: image generation can optimize
for photorealistic polish while changing the visual decisions that made a
source sketch distinctive. The need for output evaluation, provenance, and
human control is supported by current standards work and design research.

## Independent evidence

- [NIST's Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
  treats measurement and evaluation as part of trustworthy generative-AI
  design, development, use, and evaluation.
- [NIST's GenAI Evaluation Program](https://www.nist.gov/programs-projects/generative-artificial-intelligence-evaluation-program-genai)
  operates dedicated evaluation infrastructure for generative systems,
  including image challenges.
- The research paper [Automatic Measures for Evaluating Generative Design
  Methods for Architects](https://arxiv.org/abs/2303.11483) reports a mismatch
  between image-generation quality measures and the actual expectations of
  designers working from conceptual sketches. Realism is only one criterion.
- The 2026 ACM DIS program includes [ToMigo: Interpretable Design Concept Graphs
  for Aligning Generative AI with Creative Intent](https://dis.acm.org/2026/wp-content/uploads/2026/06/toc.html),
  identifying misalignment between generated results and user intentions as an
  active human-computer interaction problem.

## MotifGuard's practical response

MotifGuard does not claim to solve generative-AI alignment generally. It makes
one workflow inspectable today:

source sketch -> AI render -> visible-evidence audit -> revision instructions
-> revised render -> re-audit.

The public [Case 02 evidence](docs/evidence/case-02-revision-loop.md) demonstrates
that path under a frozen score contract, while preserving the unresolved wheel
drift and the original failure record. This is a working product response to a
documented evaluation gap, not a forecast of future capability.
