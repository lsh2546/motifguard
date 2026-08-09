# Case 02: audited revision loop

Classification: controlled developer validation; **not audience or traction**.

This evidence answers one narrow question: can MotifGuard turn a visible design
drift into an actionable revision that improves the next audit?

## Reproduce the evidence chain

| Step | Public artifact | Measured result |
| --- | --- | --- |
| 1. Source intent | [Source sketch](case-02-source-sketch.png) | Low fastback coupe, sharp side intake, thin multi-spoke wheels |
| 2. Initial AI output | [Initial render](case-02-initial-render.png) | Visually polished but two audited drifts |
| 3. MotifGuard audit | [Initial raw result](case-02-result.json) | 85/100; side vent drifted 88%; wheel design drifted 90% |
| 4. Action | Initial result's Revision Brief and Prompt Patch | Deepen/sharpen the side intake and restore thin spokes |
| 5. Revision | [Revised render](case-02-revised-render.png) | Prompt Patch applied without changing the product or scoring code |
| 6. Production re-audit | [Raw HTTP 200 response](case-02-reanalysis-raw-response.json) | 92/100; side character line preserved 95%; wheel still drifted 90% |

## What improved

- Overall Intent Fidelity increased from **85 to 92** (+7 points).
- Drifted evidence items decreased from **2 to 1**.
- The side vent/character-line finding changed from **drifted, 88%** to
  **preserved, 95%** after the requested deeper, sharper intake was rendered.
- The wheel remained **drifted, 90%**. This is an unresolved limitation, not a
  claimed success.

The production API returned the revised audit in **16.715643 seconds**. No
independent manual-review baseline was measured, so this evidence makes no
claim about time saved versus a human reviewer.

## Integrity notes

- The original 85/100 result was not edited or overwritten.
- The first uncompressed re-analysis request returned HTTP 413 and is retained
  as failure evidence. The retry used upload-only JPEG derivatives; source
  assets remain unchanged.
- The raw production response was preserved before this narrative was written.
- Audience, traction, testimonials, users, and return usage remain zero.

See [the machine-readable manifest](case-02-revision-loop-manifest.json) for
hashes and exact values.
