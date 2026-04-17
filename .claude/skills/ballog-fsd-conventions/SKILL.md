---
name: ballog-fsd-conventions
description: Ballog(apps/web) FSD 레이어 규칙. 의존 방향, public API, import 순서, 네이밍. 파일 생성/리뷰 시 경계 위반 검증에 사용.
---

# Ballog FSD 컨벤션

## 레이어 순서 (상 → 하)

```
app → pages → widgets → features → entities → shared
```

- 상위 레이어는 하위만 import
- **역방향 import 금지**
- 같은 레이어 수평 참조 금지 (shared 제외)

## 위치

- `apps/web/src/app` — 앱 초기화, provider, 라우터
- `apps/web/src/pages` — 라우트 화면 (auth / community / home / live-recording / mypage / onBoarding / record / term)
- `apps/web/src/widgets` — 여러 feature를 합성한 UI 블록
- `apps/web/src/features` — 사용자 액션 단위 (로그인, 친구 추가 등)
- `apps/web/src/entities` — 도메인 모델 단위 UI/스토어
- `apps/web/src/shared` — 공용 lib / ui / config

## Public API (`index.ts`)

각 슬라이스는 `index.ts`로만 외부에 공개한다.

```
features/add-friend/
├── ui/AddFriendSheet.tsx
├── model/useAddFriend.ts
└── index.ts   ← export { AddFriendSheet }
```

외부에서 `features/add-friend/ui/AddFriendSheet` 직접 deep import 금지.

## Import 순서 (ESLint 강제)

1. 외부 패키지 (`react`, 라이브러리)
2. 절대경로 alias (`@/app`, `@/pages`, `@/widgets`, ...)
3. 상대경로 (`./`, `../`)

각 블록 사이 빈 줄 1칸.

## 공용 유틸

```ts
import { cn } from '@/shared/lib/classnames'
```

## 파일 네이밍

- 컴포넌트 파일: `PascalCase.tsx`
- 훅: `useXxx.ts`
- 유틸/상수: `camelCase.ts`
- 슬라이스 디렉토리: 기존 관례 유지 (현재 `kebab-case` / `camelCase` 혼재 — PR에서 통일 제안)

## 리뷰 플래그

- 🔴 하위 레이어가 상위 레이어를 import (예: `entities` → `features`)
- 🔴 `index.ts` 우회 deep import (예: `features/foo/ui/Bar`)
- 🟡 같은 레이어 수평 참조 (shared 제외)
- 🟡 import 순서 위반 (최근 커밋 `8ade176`에서 발생한 유형)
- 🟢 디렉토리 네이밍 혼재
