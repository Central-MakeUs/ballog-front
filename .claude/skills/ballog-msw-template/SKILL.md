---
name: ballog-msw-template
description: Ballog MSW handler/data 생성 템플릿과 handlers.ts 레지스트리 삽입 규칙. /feat-new 가 참조.
---

# Ballog MSW Template

기준 파일: `apps/web/src/mocks/handlers/authHandlers.ts`, `apps/web/src/mocks/data/auth.ts`

## 디렉토리

```
apps/web/src/mocks/
├── handlers.ts                   (수정 — 레지스트리)
├── handlers/
│   └── <camel>Handlers.ts        (생성)
└── data/
    └── <camel>.ts                (생성)
```

## `handlers/<camel>Handlers.ts`

```ts
import { http, HttpResponse, delay } from 'msw'

import type {
  CreateEmotionRequestDTO,
  EmotionResponseDTO,
} from '@/entities/emotion/model/emotion.type'
import type { ApiErrorMessage } from '@/types/api/common'

import { emotion } from '@/mocks/data/emotion'

const EMOTION_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/emotion`

export const emotionHandlers = [
  http.get<
    { matchRecordId: string },
    never,
    EmotionResponseDTO | ApiErrorMessage
  >(`${EMOTION_API_PREFIX}/:matchRecordId`, async () => {
    await delay(emotion.delay)
    return HttpResponse.json<EmotionResponseDTO>({ data: emotion.records })
  }),

  http.post<
    never,
    CreateEmotionRequestDTO,
    EmotionResponseDTO | ApiErrorMessage
  >(EMOTION_API_PREFIX, async ({ request }) => {
    const body = await request.json()
    await delay(emotion.delay)

    // msw.scenarios[*] 의 when 분기
    if (body.matchRecordId === 0) {
      return HttpResponse.json<ApiErrorMessage>(
        {
          error: 'invalid match',
          status: 400,
          code: 'INVALID_MATCH',
          message: 'invalid match',
        },
        { status: 400 },
      )
    }

    return HttpResponse.json<EmotionResponseDTO>({ data: emotion.records })
  }),
]
```

**핵심**:
- 배열 이름: `<camel>Handlers`
- `http.<method>` 제네릭: `<PathParams, RequestBody, ResponseBody>`
- URL prefix 상수: `${VITE_PUBLIC_API_URL}/api/v1/<path-root>`
- `delay` 는 data 파일의 `delay` 필드를 참조 (일관성)
- 시나리오는 handler 상단에서 분기 → 기본 응답은 말미에 반환

## `data/<camel>.ts`

```ts
import type { Emotion } from '@/entities/emotion/model/emotion.type'

export const emotion: {
  delay: number
  records: Emotion[]
} = {
  delay: 1500,
  records: [
    { id: 1, type: 'HAPPY', createdAt: '2024-01-01T00:00:00Z' },
  ],
}
```

- fixture 변수명: `<camel>` (도메인명 그대로)
- 타입 명시 (엄격)
- scenarios 전용 필드가 필요하면 객체 확장

## `handlers.ts` 레지스트리 수정

실제 파일 예시 (순서는 **append-order**, 알파벳 아님):

```ts
import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { emotionHandlers } from './handlers/emotionHandlers'
import { userHandlers } from './handlers/userHandlers'
// ...

export const handlers = [
  ...authHandlers,
  ...matchHandlers,
  ...emotionHandlers,
  // ...
]
```

삽입 규칙:
1. **import 블록 말미**: 마지막 `import { ...Handlers } from './handlers/...'` 줄 **다음**에 `import { <camel>Handlers } from './handlers/<camel>Handlers'` 추가
2. **handlers 배열 말미**: 마지막 `...xxxHandlers,` 줄 **다음**에 `...<camel>Handlers,` 추가
3. **후처리**: `pnpm lint --fix` — import 순서는 이 파일 형태상 재정렬되지 않음 (동일 상대경로 그룹). 안전.

구현은 AST 아닌 Edit 기반 문자열 삽입으로. 마지막 import 줄 / `export const handlers = [` 블록 닫는 `]` 을 anchor로 잡아 말미 삽입.

## 리뷰 플래그

- 🔴 `handlers.ts` 에 등록 누락 → mock 동작 안 함
- 🔴 제네릭 타입 누락 (`http.get<...>`) → 타입 안전성 손실
- 🟡 `delay` 하드코딩 (data 파일 참조 없이) → 일관성 깨짐
- 🟡 scenarios 분기 누락 → spec에 있으면 추가
