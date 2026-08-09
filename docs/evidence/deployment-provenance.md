# Production deployment provenance

This record binds the public MotifGuard deployment to the exact source and
validated artifact used for the final judge-verification release.

| Field | Value |
| --- | --- |
| Production URL | <https://motifguard.ljs2546.chatgpt.site/> |
| GitHub repository | <https://github.com/lsh2546/motifguard> |
| Source branch | `main` |
| Source commit | [`1b3e5bfdebc5d4337582a37584df1f21084d470b`](https://github.com/lsh2546/motifguard/commit/1b3e5bfdebc5d4337582a37584df1f21084d470b) |
| Product hardening PRs | [#14](https://github.com/lsh2546/motifguard/pull/14), [#15](https://github.com/lsh2546/motifguard/pull/15) |
| PR CI run | [MotifGuard CI #18](https://github.com/lsh2546/motifguard/actions/runs/31305606690) |
| CI conclusion | `success` |
| Sites version | `8` |
| Deployment status | `succeeded` |
| Deployment timestamp | `2026-08-09T09:20:45.537585Z` |
| Sites archive SHA-256 | `aa68367fd5dac30d3b1aa14a03309a35085f50d97ac2d5dc9dc3e86a595e5a49` |

The deployed UI links the Case 02 revision-loop report, raw production API
response, and SHA-256 manifest. It also supports live revision-baseline
comparison, Prompt Patch copying, portable JSON audit export, bounded inference
timeouts, and explicit retries. The frozen Case 02 and Case 03 evidence files
and audience/traction counting rules are unchanged.

## Verification performed

- Production root returned HTTP 200 after deployment.
- The deployed page contained the 85/100 initial score, 92/100 revised score,
  remaining wheel drift at 90%, and the controlled-validation boundary.
- Every public evidence document and image linked by the judge path returned
  HTTP 200.
- The public raw response reported score 92.
- The public manifest reported 85 -> 92, side drifted 0.88 -> preserved 0.95,
  and the unresolved wheel drift at 0.90.
- The deployed JavaScript contained the revision comparison, copy, download,
  retry, timeout, and `motifguard.audit.v1` artifact contracts.
- A malformed production API request returned HTTP 400 after the runtime-safe
  error-boundary fix instead of the previously reproduced HTTP 500.

## Preserved deployment history

The prior judge-evidence release remains traceable as Sites version 5, source
commit [`33abb464bf6217ba827b9da88ca988a64fa61027`](https://github.com/lsh2546/motifguard/commit/33abb464bf6217ba827b9da88ca988a64fa61027),
deployed at `2026-08-09T07:51:55.741208Z` with archive SHA-256
`0fd1bb0a114e044e2b7278a0b0acf403e0127f48d88b045a37087070ed560911`.

This is deployment and reproducibility evidence. It is not audience or
traction evidence.
