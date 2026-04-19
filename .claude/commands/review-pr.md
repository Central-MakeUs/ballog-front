---
description: 현재 브랜치 vs develop 전체 diff 리뷰 후 PR 본문 생성 (OOP/FSD/Tailwind 기준)
argument-hint: [base-branch] [--skip-lint]
allowed-tools: Bash(git:*), Bash(pnpm lint:*), Read, Grep, Glob
---

현재 브랜치와 base 브랜치(`$1` 또는 기본 `develop`) 사이의 모든 변경을 리뷰하고 PR 본문까지 생성한다.

관련 스킬이 있으면 자동 참조: `ballog-fsd-conventions`, `ballog-tailwind-cn`, `ballog-pr-style`.

## 1. 변경 수집
- `git fetch origin <base> --quiet`
- `git log <base>..HEAD --oneline` 으로 커밋 목록 확보
- `git diff <base>...HEAD --stat` 으로 파일 변경 요약
- 주요 변경 파일은 `git diff <base>...HEAD -- <file>` 로 전체 내용 확인

## 2. lint (옵션)
- `$2`가 `--skip-lint`가 아니면 `pnpm lint` 실행
- 실패 시 에러 요약을 리포트 최상단에 표시

## 3. 코드 리뷰 (객체지향 관점)

심각도: 🔴 must-fix / 🟡 should-fix / 🟢 nit. 각 항목은 `path:line — 문제 + 제안` 형태.

### SRP — 단일 책임
- 컴포넌트 한 파일에서 뷰 + fetch + 상태 가공이 섞였는가
- `useEffect` 한 블록에 역할 2개 이상 섞였는가
- 파일 300줄↑, 함수 50줄↑ 플래그

### ISP — 인터페이스 분리
- Props 타입 7개 이상 → 쪼갤 수 있는지
- 특정 분기에서만 쓰는 optional prop이 많다 → 컴포넌트 분리 후보
- `any`, 과도한 `Partial<>`, 임의 union 남발

### View ↔ 로직 분리
- JSX 파일 안에 비즈니스 로직/파생 상태 계산 → `use*` 훅 추출 제안
- API 호출·localStorage·날짜 포맷팅이 컴포넌트 내부에 있으면 `shared/lib`로 추출
- `features/*` 에 JSX 직접 렌더링이 비대 → `widgets`/`pages`로 이동 후보

### Tailwind + cn
- 긴 className / 조건부 분기 → `cn(...)` + bool 인자로 가독성 개선
- 동일 variant 반복 → 상수/맵 추출
- 외부 `className` prop은 `cn` 마지막 인자 (override 가능해야 함)
- import: `import { cn } from '@/shared/lib/classnames'`

### FSD 경계
- 하위 레이어가 상위 레이어를 import (app → pages → widgets → features → entities → shared 순서 역행)
- 같은 레이어 수평 참조 (shared 제외)
- `index.ts` 공개 API 우회 deep import

## 4. 출력 (2단 구성)

### 파트 A — 리뷰 리포트
- 🔴 / 🟡 / 🟢 버킷별 그룹
- 각 항목: `path/to/file.tsx:L23` — 문제 설명 + 한 줄 제안
- 말미에 카운트: must-fix n / should-fix n / nit n

### 파트 B — PR 본문
`.github/PULL_REQUEST_TEMPLATE.md` 포맷을 지키되, 커밋 이모지(`✨ Feat` / `💄 Style` / `✏️ Fix` / `♻️ Refactor`)를 감지해 Summary 섹션을 분류한다. 없으면 `fix:` / `feat:` prefix 사용.

```
## Summary

- ✨ 추가: <요약>
- 💄 스타일: <요약>
- ✏️ 수정: <요약>
- ♻️ 리팩터: <요약>

<변경 동기 1–3줄>

## How did you test this change?

- [ ] `pnpm lint` 통과
- [ ] `pnpm --filter web build` 통과
- [ ] 수동 QA: <확인 항목>
- [ ] 스크린샷/영상 (UI 변경 시)
```

톤: 한국어, 명사형 종결, bullet 한 줄 60자 내외, 빈 섹션은 삭제.

## 주의사항
- diff가 크면 파일 그룹별로 나눠 리뷰 (섣부른 결론 금지)
- 파일 삭제만 있는 변경은 테스트 섹션에서 빌드/타입체크만 요구
- lint 실패는 🔴로 올려 PR 본문 테스트 체크박스 해제
