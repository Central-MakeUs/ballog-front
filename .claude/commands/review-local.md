---
description: 커밋 전 staged diff 빠른 리뷰 (리포트만, PR 본문 없음)
allowed-tools: Bash(git:*), Read, Grep
---

`git diff --cached` 내용만 대상으로 빠르게 리뷰한다. PR 본문은 생성하지 않는다.

관련 스킬이 있으면 자동 참조: `ballog-fsd-conventions`, `ballog-tailwind-cn`.

## 수집
- `git diff --cached --stat`
- `git diff --cached` 전체 본문
- staged가 비어있으면 즉시 종료하고 안내

## 리뷰 기준
`/review-pr` 과 동일 — SRP / ISP / View-로직 분리 / Tailwind + cn / FSD 경계.

## 출력
- 🔴 / 🟡 / 🟢 버킷 리포트
- 각 항목: `path:line` — 문제 + 한 줄 제안
- 마지막 줄: must-fix가 없으면 ✅ `커밋 OK`, 있으면 🔴 `커밋 보류 권장 (n건)`

## 주의
- 빠른 피드백 우선 — 파일당 핵심 이슈 위주로 압축
- 포맷/스페이스 수준 지적은 생략 (lint가 담당)
