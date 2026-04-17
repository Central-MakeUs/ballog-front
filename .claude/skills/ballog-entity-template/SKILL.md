---
name: ballog-entity-template
description: Ballog entity 슬라이스 생성 템플릿. ky API 그룹, query-key-factory 등록, query/mutation 훅 네이밍과 invalidation 규칙. /feat-new 가 참조.
---

# Ballog Entity Slice Template

기준 파일: `apps/web/src/entities/auth/*`

## 디렉토리

```
apps/web/src/entities/<kebab>/
├── api/
│   ├── <camel>.api.ts
│   ├── <camel>.queries.ts
│   └── index.ts                    ← 서브 barrel
├── model/
│   ├── <camel>.type.ts
│   └── index.ts                    ← 서브 barrel
├── hooks/
│   ├── use<Pascal><Endpoint>Query.ts
│   ├── use<Pascal><Endpoint>Mutation.ts
│   └── index.ts                    ← 서브 barrel
├── ui/                             (UI 있을 때만)
│   └── index.ts                    ← 서브 barrel
└── index.ts                        ← 루트 barrel
```

**barrel 규칙** (프로젝트 관례):
- 각 서브디렉토리에 `index.ts` 로 내부 파일을 `export *` 로 공개
- 루트 `index.ts` 는 서브디렉토리 barrel만 export (개별 파일 참조 X)
- 참고: `entities/auth/index.ts` 는 `./ui`, `./api` 만 export. 외부에서 `model/` 타입을 직접 쓰려면 deep path 사용 (예: `@/entities/auth/model/auth.type`)

## `model/<camel>.type.ts`

```ts
import type {
  ApiResponse,
  ApiResponseWithNoSuccess,
} from '@/types/api/common'

export interface Emotion {
  id: number
  type: 'HAPPY' | 'SAD'
  createdAt: string
}

export type EmotionResponseDTO = ApiResponseWithNoSuccess<Emotion[]>

export interface CreateEmotionRequestDTO {
  type: Emotion['type']
  matchRecordId: number
}
```

## `api/<camel>.api.ts` — ky 기반 method 그룹

```ts
import { api } from '@/shared/lib/ky'

import type {
  CreateEmotionRequestDTO,
  EmotionResponseDTO,
} from '../model/emotion.type'

export const emotionGet = {
  getEmotionRecord: async (
    matchRecordId: number,
  ): Promise<EmotionResponseDTO> => {
    return api.get(`emotion/${matchRecordId}`).json<EmotionResponseDTO>()
  },
}

export const emotionPost = {
  createEmotion: async (
    data: CreateEmotionRequestDTO,
  ): Promise<EmotionResponseDTO> => {
    return api.post('emotion', { json: data }).json<EmotionResponseDTO>()
  },
}
```

**핵심**:
- `api` (ky instance)는 prefix에 `/api/v1` 포함 → path 선행 슬래시 제거
- 객체 그룹핑: `<camel>Get` / `<camel>Post` / `<camel>Patch` / `<camel>Delete`
- 반환 타입 명시 필수 (암묵 추론 금지)

## `api/<camel>.queries.ts`

```ts
import { createQueryKeys } from '@lukemorales/query-key-factory'

import { emotionGet } from './emotion.api'

export const emotionQueries = createQueryKeys('emotion', {
  getEmotionRecord: (matchRecordId: number) => ({
    queryKey: [matchRecordId],
    queryFn: () => emotionGet.getEmotionRecord(matchRecordId),
  }),
})
```

- factory 변수명: `<camel>Queries`
- scope 키: `'<camel>'` (문자열 리터럴)

## `hooks/use<Pascal><Endpoint>Query.ts`

```ts
import { useQuery } from '@tanstack/react-query'

import { emotionQueries } from '../api/emotion.queries'

export const useGetEmotionRecordQuery = (matchRecordId: number) => {
  return useQuery({
    ...emotionQueries.getEmotionRecord(matchRecordId),
    enabled: matchRecordId > 0,
  })
}
```

- 훅 한 파일에 하나 (SRP)
- `enabled` 기본 규칙: path param이 falsy면 비활성화

## `hooks/use<Pascal><Endpoint>Mutation.ts`

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { emotionPost } from '../api/emotion.api'
import { emotionQueries } from '../api/emotion.queries'

export const useCreateEmotionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: emotionPost.createEmotion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: emotionQueries.getEmotionRecord._def,
      })
    },
  })
}
```

- `invalidates: [a, b]` → `invalidateQueries` 두 번 또는 `_def` 배열 loop
- optimistic update는 기본 템플릿에 포함하지 않음 (필요 시 수동 추가)

## Barrel 파일들

### `api/index.ts`
```ts
export * from './emotion.api'
export * from './emotion.queries'
```

### `model/index.ts`
```ts
export * from './emotion.type'
```

### `hooks/index.ts`
```ts
export * from './useGetEmotionRecordQuery'
export * from './useCreateEmotionMutation'
```

### `ui/index.ts` (UI 생성 시)
```ts
export * from './EmotionCard'
// ...각 컴포넌트
```

### 루트 `index.ts`
```ts
export * from './api'
export * from './hooks'
// ui 있으면 추가:
// export * from './ui'
```

**규칙**:
- 루트 barrel은 서브디렉토리 barrel만 참조 (개별 파일 X)
- `model` 은 관례상 루트 barrel에 넣지 않음 (실제 `auth/index.ts` 패턴). 타입이 필요한 외부 코드는 `@/entities/<kebab>/model/<camel>.type` 로 deep import
- `mocks/`는 인프라 레이어라 model deep import 허용 (`ballog-fsd-conventions` 의 예외 조항)

## import 순서 (ESLint 강제)

1. 외부 (`react`, `@tanstack/react-query`, ...)
2. alias (`@/shared/...`, `@/types/...`)
3. 상대 (`./`, `../`)

각 블록 사이 빈 줄 1칸.

## 리뷰 플래그

- 🔴 반환 타입 누락 → 명시 요구
- 🔴 서브디렉토리 barrel 누락 (`api/index.ts`, `hooks/index.ts` 등) → 참조 깨짐
- 🔴 루트 barrel에 개별 파일 참조 → 서브 barrel 경유로 변경
- 🟡 훅 한 파일에 여러 개 → 파일 분리
- 🟡 mutation에 `invalidateQueries` 없음 → spec `invalidates` 확인
