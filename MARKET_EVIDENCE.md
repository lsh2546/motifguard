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
- [NIST's AI test, evaluation, validation, and verification program](https://www.nist.gov/ai-test-evaluation-validation-and-verification-tevv)
  states that trustworthy AI products depend on reliable measurement and that
  evaluation must be interpreted in the context in which a system is used.
- BMW's official description of its [design DNA](https://www.press.bmwgroup.com/global/article/attachment/T0124586EN/194118)
  identifies proportions, surfaces, and details as the interplay that creates a
  recognizable vehicle character. This supports auditing specific design
  decisions rather than treating photorealism as the only success criterion.
- BMW's current [Neue Klasse design-language explanation](https://www.bmwgroup.com/en/news/general/2025/bmw-ix3-design-language.html)
  explicitly connects hallmark proportions, precise lines, reduced surfaces,
  and a light signature to brand-distinctive vehicle design.

## The specific market gap

The cited sources establish three adjacent facts rather than a broad claim that
"AI is growing":

1. Generative systems require contextual measurement and evaluation.
2. Concept-sketch users judge more than realism, while common image-generation
   quality measures can miss those expectations.
3. In automotive design, proportions, surfaces, precise lines, details, and
   light signatures are identity-bearing decisions.

The resulting gap is narrow: a polished sketch-to-render result can look
successful while silently changing the design decisions a reviewer cares
about. MotifGuard occupies the review step between generation and acceptance.
It does not generate the car, score market desirability, or replace a design
review; it makes the intended visual comparison structured, actionable, and
auditable.

## MotifGuard's practical response

MotifGuard does not claim to solve generative-AI alignment generally. It makes
one workflow inspectable today:

source sketch -> AI render -> visible-evidence audit -> revision instructions
-> revised render -> re-audit.

The public [Case 02 evidence](docs/evidence/case-02-revision-loop.md) demonstrates
that path under a frozen score contract, while preserving the unresolved wheel
drift and the original failure record. This is a working product response to a
documented evaluation gap, not a forecast of future capability.

Case 02 maps the market argument to a falsifiable product result. The audit
identified a side character-line drift, generated a revision instruction, and
the re-audit recorded that feature as preserved. It also retained the remaining
wheel drift. That partial result is important: the product is a verification
layer for an iterative workflow, not a guarantee that one prompt fixes an
entire design.
