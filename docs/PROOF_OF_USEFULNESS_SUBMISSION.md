# MotifGuard — Proof of Usefulness 제출 키트

상태: **제출 준비 중 — 아직 제출하지 않음**

## 공식 링크

- 제품: <https://motifguard.ljs2546.chatgpt.site>
- GitHub 저장소: <https://github.com/lsh2546/motifguard>
- 기준 브랜치: <https://github.com/lsh2546/motifguard/tree/main>
- 검증된 애플리케이션 기준 커밋: [`f9d725dca839bf6a24c17f8fd382465b17d5692d`](https://github.com/lsh2546/motifguard/commit/f9d725dca839bf6a24c17f8fd382465b17d5692d)
- 기준 CI: <https://github.com/lsh2546/motifguard/actions/runs/30422718591>

## 제품 한 줄 설명

MotifGuard helps automotive designers compare a source sketch with an AI-generated render and see which design intentions were preserved, changed, or lost.

## 짧은 제출 설명

AI 이미지 생성기는 자동차 스케치를 빠르게 완성도 높은 렌더로 바꾸지만, 그 과정에서 원본의 핵심 비례, 실루엣, 캐릭터 라인과 그래픽 의도가 조용히 사라질 수 있습니다.

MotifGuard는 원본 스케치와 AI 생성 렌더를 하나의 멀티모달 Gemma 컨텍스트에서 비교합니다. 의도 충실도 점수, 시각적 근거가 포함된 네 가지 특징 판단, 다음 반복을 위한 수정 브리프와 복사 가능한 프롬프트 패치를 제공합니다. 샘플 실행은 실제 분석 횟수에서 명시적으로 제외됩니다.

## 대상 사용자와 문제

주요 사용자는 자동차 디자인 학생, 독립 운송기기 디자이너와 콘셉트 아티스트입니다. MotifGuard가 해결하는 문제는 이미지를 한 장 더 생성하는 것이 아니라, 원본 스케치의 구체적인 비례와 선의 긴장감, 그래픽 구조와 실루엣 의도를 다음 생성 결과에서도 유지하도록 돕는 것입니다.

## 기술 구성

- Next.js/Vinext 기반 인터페이스와 Cloudflare 호환 서버리스 실행 환경
- Gemini Developer API를 통한 Gemma 멀티모달 비교
- 구조화 JSON 검증과 정확히 네 개의 근거 카드 출력 계약
- 클라이언트·서버 양쪽의 이미지 형식 및 크기 검증
- Cloudflare D1 기반 익명 이벤트 집계
- 애플리케이션 내부 이미지·파일명 비저장
- 데스크톱·모바일 반응형 UI

## 증거 원칙

- 실제 사용자 방문, 성공한 실제 분석과 제출된 피드백만 공개 지표로 사용합니다.
- 샘플 실행과 내부 검증은 실제 분석으로 계산하지 않습니다.
- 사용자 이미지와 파일명은 저장하지 않습니다.
- 제출 수치는 제출 직전 제품 화면과 원본 집계에서 다시 확인합니다.

## 배포 출처 설명

현재 라이브 버전 2는 커밋 `29618890d0a868568b54da6bac29d90799c263f1`에서 패키징되었습니다. 이후 `main`의 변경은 커밋 이력 통합, 줄바꿈 정규화, 패키지 관리자·CI·문서 정리이며 실행되는 제품 로직은 변경하지 않았습니다. 따라서 현재 제품 동작을 위해 재배포할 필요는 없습니다. 공개 접근 권한은 배포와 별개로 설정할 수 있으며, 실제 제출 전 익명 접근 검증이 필요합니다.

## 제출 전 금지 사항

- 최종 승인 전 제출하지 않습니다.
- 검증되지 않은 사용자 수나 분석 수를 기입하지 않습니다.
- 애플리케이션 동작을 바꾸는 재배포를 제출 준비와 혼합하지 않습니다.
