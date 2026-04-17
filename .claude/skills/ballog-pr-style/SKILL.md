---
name: ballog-pr-style
description: Ballog 커밋 및 PR 메시지 컨벤션. 이모지 prefix(✨Feat/💄Style/✏️Fix)와 fix:/feat: 간결 스타일 혼용 규칙, 한국어 PR 본문 작성 틀. /review-pr 이 참조.
---

# Ballog 커밋 & PR 스타일

## 커밋 prefix (혼재 스타일)

최근 히스토리상 두 스타일이 공존한다.

**이모지 스타일** — 기능/스타일/리팩터 작업

- `✨ Feat : 친구 추가 바텀시트 키보드 자동 오픈`
- `💄 Style : 관람로그 버튼 스타일 작업`
- `✏️ Fix : default -> named export 로 수정`
- `♻️ Refactor : …`

**간결 스타일** — QA 수정 / 긴급 픽스

- `fix: TodayMatchCard import 순서 lint 에러 수정`
- `fix: 커뮤니티 빈 상태 이미지를 SVG 컴포넌트로 교체`

### 선택 기준

- QA / 버그픽스 / 긴급 수정 → `fix: ...`
- 신규 기능 / 스타일 / 리팩터 → 이모지 스타일
- **한 PR 내에서 두 스타일 섞지 말 것**

## PR 본문 템플릿

`.github/PULL_REQUEST_TEMPLATE.md` 기반:

```
## Summary

- ✨ 추가: <요약>
- 💄 스타일: <요약>
- ✏️ 수정: <요약>
- ♻️ 리팩터: <요약>

<변경 동기 1–3줄. 왜 이 변경이 필요했는지.>

## How did you test this change?

- [ ] `pnpm lint` 통과
- [ ] `pnpm --filter web build` 통과
- [ ] 수동 QA: <확인 항목>
- [ ] 스크린샷/영상 (UI 변경 시)
```

## 톤 & 포맷

- **한국어**, 명사형 종결 ("…추가", "…수정")
- bullet 한 줄 60자 내외
- 해당 없는 섹션 bullet은 삭제
- Summary 이모지와 본문 bullet 이모지는 일치시켜 일관성

## 리뷰 플래그

- 🟡 테스트 방법 섹션 비어있음 (템플릿상 closed 위험)
- 🟡 Summary가 커밋 메시지 1줄 복붙 수준 → 동기 문장 추가
- 🟢 이모지/간결 스타일 혼재 → 통일 제안
