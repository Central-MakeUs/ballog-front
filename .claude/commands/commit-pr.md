---
description: 변경사항을 논리 단위로 분할해 atomic commit 생성 후 PR까지 올린다 (Ballog 컨벤션 준수)
argument-hint: [--base <branch>] [--dry-run] [--no-pr] [--draft]
allowed-tools: Bash(git:*), Bash(gh:*), Bash(pnpm lint:*), Read, Grep, Glob
---

현재 브랜치의 커밋되지 않은 변경 + 푸시되지 않은 커밋을 분석해 논리 단위 atomic commit으로 분할 후 PR을 생성한다.

자동 참조 스킬: `ballog-pr-style`, `ballog-fsd-conventions`.

## 인자
- `--base <branch>` — PR base 브랜치 (기본 `develop`)
- `--dry-run` — 커밋 계획만 출력하고 종료 (실제 커밋/푸시 X)
- `--no-pr` — 커밋·푸시만 하고 PR 생성 건너뜀
- `--draft` — PR을 draft로 생성

## 1. 사전 검증

```bash
git status
git branch --show-current
git log <base>..HEAD --oneline   # 이미 있는 unpushed 커밋
```

- **브랜치 체크**: 현재 브랜치가 `main`/`master`/`develop` 이면 **중단**. 작업용 feature 브랜치로 이동/생성 요구
- **빈 변경 체크**: uncommitted + unpushed 모두 없으면 종료
- **base 브랜치 fetch**: `git fetch origin <base> --quiet`

## 2. 변경 분석

```bash
git diff --stat                  # unstaged
git diff --cached --stat         # staged
git diff                         # unstaged 본문
git diff --cached                # staged 본문
```

이미 커밋된 unpushed 히스토리가 있으면:
- `git log <base>..HEAD --format='%h %s'` 로 목록 확인
- 기존 커밋은 **유지** (재구성 안 함). 새 변경만 분할 대상.

## 3. 커밋 계획 생성

아래 기준으로 논리 단위 그룹화:

| 분류 | 판별 힌트 | prefix |
|---|---|---|
| Feature | 신규 파일 + features/pages 추가 | `✨ Feat : ...` |
| Style (UI) | `.tsx` className / CSS만 변경 | `💄 Style : ...` |
| Fix (QA) | 기존 파일 소폭 수정 + 버그 성격 | `fix: ...` |
| Refactor | 이동/이름변경/구조 변경 | `♻️ Refactor : ...` |
| Docs | `.md` / 주석만 | `📝 Docs : ...` |
| Chore | 설정/의존성 | `🔧 Chore : ...` |

**그룹 분할 규칙**:
- 동일 slice(FSD) 내 변경은 한 커밋에 모으기
- 서로 다른 feature/domain 섞지 않기
- `mocks/` + 관련 `entities/` 는 같은 커밋 (MSW-entity 짝)
- 한 커밋 파일 수 15개 초과 시 분할 후보

메시지는 `ballog-pr-style` 컨벤션:
- 한국어 명사형, 60자 내외
- 이모지 스타일(Feat/Style/Refactor) vs 간결(`fix:`) 혼용 금지 — 한 PR 내 통일

**출력 형식** (사용자 승인용):

```
커밋 계획 (n개):

[1/n] ✨ Feat : 감정 기록 엔티티 스캐폴딩
  A  apps/web/src/entities/emotion-v2/api/emotion-v2.api.ts
  A  apps/web/src/entities/emotion-v2/model/emotion-v2.type.ts
  ...

[2/n] 💄 Style : 홈 카드 간격 조정
  M  apps/web/src/widgets/home/ui/TodayCard.tsx

진행할까요? (yes / edit / abort)
```

## 4. 사용자 승인

- `yes` → 실행
- `edit` → 사용자가 계획 수정 의견 제시 → 재계획
- `abort` → 종료
- `--dry-run`이면 승인 없이 종료

## 5. 커밋 실행

각 그룹마다:
```bash
git add <group-files>           # -A, . 금지. 파일 명시
git commit -m "<message>"       # 민감 파일(.env 등) 섞이면 경고
```

- 커밋 훅 실패 시 **중단**하고 원인 보고. `--no-verify` 금지.
- 한 커밋이라도 실패하면 이후 그룹 보류, 상태 리포트.

## 6. Push

```bash
git push -u origin <current-branch>
```

- 이미 upstream 있으면 일반 push
- `--force` 계열 금지

## 7. PR 생성 (`--no-pr` 없을 때)

- `gh pr list --head <current-branch> --base <base>` 로 기존 PR 확인
- 있으면 업데이트만, 없으면 신규 생성
- **본문 생성**: `/review-pr` 과 동일 로직 (`ballog-pr-style` 템플릿, 전체 커밋 기반 Summary)
- `gh pr create --base <base> --title "<title>" --body "$(cat <<'EOF' ... EOF)"`
- `--draft` 있으면 `--draft` 플래그 추가

**Title** 규칙:
- 70자 이하
- 가장 비중 큰 그룹의 prefix + 간결 요약 (예: `✨ Feat : 감정 기록 기능 추가`)

## 8. 최종 리포트

- 🟢 생성된 커밋 목록 + hash
- 🟢 push 결과
- 🟢 PR URL (생성한 경우)
- 🟡 건너뛴 파일 (민감/대용량)
- 🔴 실패한 단계 (있으면)

## 안전 규칙

- `git push --force` 계열, `--no-verify`, `git add -A`/`git add .` **금지**
- `.env`, `*.pem`, `credentials*` 등 민감 파일 감지 시 사용자에게 경고 + 제외
- 커밋 메시지는 HEREDOC으로 전달 (포맷 보존)
- 불확실하면 중단하고 질문
