# docs/specs/

`/feat-new` 커맨드가 참조하는 API 명세 파일 디렉토리.

## 사용법

1. `docs/specs/<feature-name>.md` 생성
2. 첫 ` ```yaml ` 코드 블록에 스펙 작성 (→ `_example.md` 참고)
3. Claude Code에서 `/feat-new <feature-name>` 실행

## 플래그

| 플래그 | 설명 |
|---|---|
| `--figma <url>` | Figma 디자인 URL — UI 초안 자동 생성 |
| `--layer widgets\|features\|pages` | UI 배치 레이어 (기본 `widgets`) |
| `--dry-run` | 생성 예정 파일만 출력 |
| `--overwrite` | 기존 슬라이스 덮어쓰기 |

## 스키마

전체 스키마와 네이밍 변환 규칙은 `ballog-spec-format` 스킬 참조.

## 생성 결과

하나의 spec 실행 시 자동으로 만들어지는 파일:

- `apps/web/src/entities/<domain>/` — types / api / queries / hooks / index
- `apps/web/src/mocks/handlers/<camel>Handlers.ts`
- `apps/web/src/mocks/data/<camel>.ts`
- `apps/web/src/mocks/handlers.ts` (import + spread 삽입)
- `apps/web/src/<layer>/<domain>/ui/<Pascal>.tsx` — `--figma` 있을 때 초안, 없으면 빈 컨테이너
