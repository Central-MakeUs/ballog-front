---
description: API 명세 MD를 읽어 entity 슬라이스 + MSW mock + (선택) Figma 기반 UI 초안까지 자동 스캐폴딩
argument-hint: <feature-name> [--figma <url>] [--layer widgets|features|pages] [--dry-run] [--overwrite]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(pnpm:*), Bash(git:*)
---

`docs/specs/$1.md` 의 YAML 블록을 파싱해 Ballog(apps/web) 규칙대로 entity + MSW + (선택) UI 초안을 생성한다.

자동 참조 스킬: `ballog-spec-format`, `ballog-entity-template`, `ballog-msw-template`, `ballog-fsd-conventions`, `ballog-tailwind-cn`.

## 인자
- `$1` — feature name (필수). `docs/specs/$1.md` 를 spec으로 사용
- `--figma <url>` — Figma URL. 있으면 `mcp__figma-remote-mcp__get_design_context` 로 디자인 읽어 UI 초안 생성
- `--layer widgets|features|pages` — UI 배치 레이어 (기본 `widgets`)
- `--dry-run` — 생성 예정 파일 목록만 출력하고 종료
- `--overwrite` — 기존 슬라이스 덮어쓰기 (없으면 질문)

## 1. Spec 로딩
- `docs/specs/$1.md` 읽기. 없으면 에러 + `docs/specs/_example.md` 참조 안내
- 첫 ` ```yaml ` 블록 파싱 (`ballog-spec-format` 참조)
- 필수 필드 확인: `domain`, `endpoints[]`, `types`
- 네이밍 정규화:
  - `kebab` = `domain` 값 그대로 (kebab-case)
  - `camel` = kebab → camelCase (`emotion-v2` → `emotionV2`)
  - `Pascal` = 첫 글자 대문자 (`EmotionV2`)

## 2. 사전 검증
- `apps/web/src/entities/<kebab>/` 존재 여부
- `apps/web/src/mocks/handlers/<camel>Handlers.ts` 존재 여부
- 있고 `--overwrite` 없으면 **append / overwrite / abort** 질문
- `--dry-run`이면 생성 예정 파일 트리 출력 후 종료

## 3. Entity 스캐폴딩 → `apps/web/src/entities/<kebab>/`

| 파일 | 내용 |
|---|---|
| `model/<camel>.type.ts` | spec `types` + endpoint별 Request/Response DTO |
| `api/<camel>.api.ts` | ky 기반 HTTP method 그룹 (`<camel>Get` / `<camel>Post` / `<camel>Patch` / `<camel>Delete`) |
| `api/<camel>.queries.ts` | `createQueryKeys('<camel>', {...})` |
| `api/index.ts` | `export * from './<camel>.api' / '.queries'` (서브 barrel) |
| `model/index.ts` | `export * from './<camel>.type'` (서브 barrel) |
| `hooks/use<Pascal><Endpoint>Query.ts` | GET endpoint → `useQuery` |
| `hooks/use<Pascal><Endpoint>Mutation.ts` | 기타 method → `useMutation` + `invalidates` 처리 |
| `hooks/index.ts` | 훅 서브 barrel |
| `index.ts` | 루트 barrel. `./api`, `./hooks` (+ ui 있으면 `./ui`) 만 export. `./model` 은 관례상 제외 |

구체 템플릿은 `ballog-entity-template` 참조. 기준: `entities/auth/*`.

## 4. MSW 스캐폴딩 → `apps/web/src/mocks/`

| 파일 | 내용 |
|---|---|
| `handlers/<camel>Handlers.ts` | endpoint별 `http.<method>` + `delay` |
| `data/<camel>.ts` | default fixture + `msw.scenarios` |
| `handlers.ts` (수정) | import 1줄 + 배열 spread 1줄 (파일 **말미**에 append) |

구체 템플릿은 `ballog-msw-template` 참조. 기준: `mocks/handlers/authHandlers.ts`, `mocks/data/auth.ts`.

**`handlers.ts` 수정 방식**:
- Read로 먼저 읽고, 마지막 import 줄 다음 + `handlers` 배열 닫는 `]` 바로 위에 Edit로 삽입 (**append-order**, 알파벳 순 아님)
- 기존 포맷(따옴표·공백) 보존
- 후처리에서 `pnpm lint --fix` 실행 (이 파일은 동일 상대경로 그룹이라 재정렬 안 됨)

## 5. UI 스캐폴딩 (선택)

**`--figma <url>` 있거나 spec에 `figma:` 있을 때**:
1. URL에서 `fileKey`/`nodeId` 파싱 후 `mcp__figma-remote-mcp__get_design_context` 호출
2. React+Tailwind 참조 코드 수신 → ballog 규칙으로 리라이트:
   - `cn` 임포트 (`@/shared/lib/classnames`)
   - 긴 className 줄바꿈 분해, 조건부는 bool 인자 (`ballog-tailwind-cn` 참조)
   - `@/shared/ui/*` 의 기존 컴포넌트 재사용 (Grep으로 확인)
   - import 순서 (외부 → alias → 상대)
3. 레이어별 배치:
   - `widgets` → `apps/web/src/widgets/<kebab>/ui/<Pascal>.tsx`
   - `features` → `apps/web/src/features/<kebab>/ui/<Pascal>.tsx`
   - `pages` → `apps/web/src/pages/<kebab>/ui/<Pascal>Page.tsx`
4. 3단계에서 만든 첫 GET `use*Query` 훅을 import해 loading/error/empty 분기 연결

**없을 때**: 빈 컨테이너 + query 훅 연결된 3상태 boilerplate만 생성.

## 6. 후처리
- `pnpm lint --fix`
- `pnpm --filter web exec tsc --noEmit` — 실패해도 중단 X, 리포트 상단에 🔴
- 최종 리포트:
  - 🟢 생성된 파일 트리
  - 🟡 수정된 파일 (`mocks/handlers.ts`)
  - 🔴 lint/typecheck 실패 요약
  - 다음 수동 단계 안내 (실제 비즈니스 로직 연결, 스토리 추가 등)

## 규칙
- 기존 파일은 `--overwrite` 없이 덮어쓰지 않음
- 확실치 않으면 중단하고 질문
- 생성 직후 `<camel>.type.ts` 1개를 Read로 자가 점검
- 객체지향 관점 유지: view(UI 컴포넌트)와 로직(hooks) 분리, 한 파일 단일 책임
