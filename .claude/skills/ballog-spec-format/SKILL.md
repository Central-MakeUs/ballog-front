---
name: ballog-spec-format
description: /feat-new 가 읽는 Ballog API 명세 MD의 YAML 스키마 정의. endpoints/types/msw/figma 필드와 작성 규칙. spec 파일 작성이나 파싱할 때 참조.
---

# Ballog API Spec Format

`docs/specs/<feature>.md` 안에 첫 ` ```yaml ` 코드 블록으로 작성한다. 첫 블록 외에는 무시.

## 스키마

```yaml
domain: emotion-v2                  # 필수. kebab-case 권장. entity 슬라이스 디렉토리 이름
layer: widgets                      # 선택. widgets(기본) | features | pages
figma: https://figma.com/design/... # 선택. --figma 생략 시 사용

endpoints:                          # 필수. 1개 이상
  - name: getEmotionRecord          # camelCase. 훅 이름 = use<Pascal>Query
    method: GET                     # GET | POST | PATCH | PUT | DELETE
    path: /emotion/:matchRecordId   # 선행 슬래시, 경로 파라미터는 :name
    params:                         # 선택. path/query 파라미터
      matchRecordId: number
    response: EmotionResponseDTO    # types의 이름 or TS 문자열

  - name: createEmotion
    method: POST
    path: /emotion
    request: CreateEmotionRequestDTO
    response: EmotionResponseDTO
    invalidates: [getEmotionRecord] # 선택. mutation 성공 시 invalidate할 query name

types:                              # 필수
  Emotion:
    id: number
    type: "'HAPPY' | 'SAD' | 'ANGRY'"   # 유니온/리터럴은 문자열로 감싸기
    createdAt: string
  EmotionResponseDTO: "ApiResponseWithNoSuccess<Emotion[]>"   # 값 위치에 TS 원문 허용
  CreateEmotionRequestDTO:
    type: "Emotion['type']"
    matchRecordId: number

msw:                                # 선택
  scenarios:
    - endpoint: createEmotion       # endpoints의 name과 일치
      when: "body.matchRecordId === 0"   # JS 표현식. `body`/`params`/`request` 참조 가능
      status: 400
      response: { error: "invalid match" }
```

## 작성 규칙

- **타입 표현력**: 값 위치에 문자열을 주면 TypeScript 원문으로 취급. 유니온/제네릭/유틸리티 타입 전부 가능.
- **공용 타입 자동 import**: `ApiResponse<T>`, `ApiResponseWithNoSuccess<T>`, `ApiErrorMessage`, `KyHttpError` 는 `@/types/api/common` 에서 자동 임포트.
- **Mutation 판별**: method가 GET이 아니면 mutation 훅 생성.
- **invalidates**: 각 name → `<camel>Queries.<name>._def` 기준으로 `invalidateQueries`.
- **path 파라미터**: `:name` 은 `params`에 반드시 선언. 자동으로 URL 치환 + 타입 반영.

## 네이밍 변환

| spec `domain` | directory | file/variable base | Pascal |
|---|---|---|---|
| `emotion` | `emotion/` | `emotion` | `Emotion` |
| `emotion-v2` | `emotion-v2/` | `emotionV2` | `EmotionV2` |
| `demo-ticket` | `demo-ticket/` | `demoTicket` | `DemoTicket` |

- **디렉토리**: spec 값 그대로 (kebab 허용)
- **파일명·변수명**: camelCase 변환 (`demoTicket.api.ts`, `demoTicketGet`)
- **클래스/타입/훅 prefix**: PascalCase (`useDemoTicketQuery`, `DemoTicketResponseDTO`)

## 파싱 결과 → 생성물 매핑

| spec 필드 | 생성 |
|---|---|
| `types.*` | `entities/<kebab>/model/<camel>.type.ts` |
| `endpoints[].request/response` | 같은 파일에 Request/Response DTO alias 추가 |
| `endpoints[GET]` | `<camel>Get.<name>` + `use<Pascal><Endpoint>Query` |
| `endpoints[!GET]` | `<camel><Method>.<name>` + `use<Pascal><Endpoint>Mutation` |
| `endpoints[].invalidates` | mutation `onSuccess` 의 `invalidateQueries` |
| `msw.scenarios` | handler 내부 조건 분기 |
| `figma` | `--figma` 미지정 시 fallback URL |
