# Production deployment provenance

This record binds the public MotifGuard deployment to the exact source and
validated artifact used for the final judge-verification release.

| Field | Value |
| --- | --- |
| Production URL | <https://motifguard.ljs2546.chatgpt.site/> |
| GitHub repository | <https://github.com/lsh2546/motifguard> |
| Source branch | `main` |
| Source commit | [`33abb464bf6217ba827b9da88ca988a64fa61027`](https://github.com/lsh2546/motifguard/commit/33abb464bf6217ba827b9da88ca988a64fa61027) |
| Evidence UI PR | [#10](https://github.com/lsh2546/motifguard/pull/10) |
| PR CI run | [MotifGuard CI #13](https://github.com/lsh2546/motifguard/actions/runs/31302004976) |
| CI conclusion | `success` |
| Sites version | `5` |
| Deployment status | `succeeded` |
| Deployment timestamp | `2026-08-09T07:51:55.741208Z` |
| Packaged artifact SHA-256 | `0fd1bb0a114e044e2b7278a0b0acf403e0127f48d88b045a37087070ed560911` |

The deployed UI links the Case 02 revision-loop report, raw production API
response, and SHA-256 manifest. The release changes only the judge-verification
path and presentation of already frozen evidence. It does not modify the AI
prompt, scoring contract, event counting, or evidence files.

## Verification performed

- Production root returned HTTP 200 after deployment.
- The deployed page contained the 85/100 initial score, 92/100 revised score,
  remaining wheel drift at 90%, and the controlled-validation boundary.
- Every public evidence document and image linked by the judge path returned
  HTTP 200.
- The public raw response reported score 92.
- The public manifest reported 85 -> 92, side drifted 0.88 -> preserved 0.95,
  and the unresolved wheel drift at 0.90.

This is deployment and reproducibility evidence. It is not audience or
traction evidence.
