# [작업 3] 홈 메인 + 실시간 기록

| 항목 | 내용 |
| --- | --- |
| 담당 범위 | F-04, F-05, F-06 |
| 우선순위 | F-06 🔴 High → F-04/F-05 🟡 Medium |
| 선행 조건 | 피그마 디자인 수치 확보 |
| 원문 | [QA(260511).md](../QA(260511).md) |

> **주의**: F-05, F-06 모두 `EmotionCard.tsx`를 만집니다. 같은 에이전트가 순서대로 처리하세요.

---

## F-04 · 홈 메인 여백/사이즈 조정

| | 내용 |
| --- | --- |
| AS IS | 피그마 대비 여백 미반영, 캐릭터 상하 여백 없음 |
| TO BE | 피그마 스펙 기준 px 적용, 캐릭터 상단·하단 여백 추가 |

### 영향 범위
- `apps/web/src/pages/home/ui/HomePageV2.tsx`
- `apps/web/src/features/home/ui/CharacterSection.tsx`

### 현재 상태
- `HomePageV2.tsx:71` → `gap-2 pb-24`, 캐릭터 섹션 위 여백 없음
- `CharacterSection.tsx:22` 루트 `pt-4`만 존재
- `Character.tsx:37` `-mt-3`로 캐릭터를 말풍선 쪽으로 끌어올림, 하단 여백 없음 (뱃지가 `mt-[8px]`로 바로 붙음)

### 해결 단계
1. 피그마 노드(`HomePageV2` / `CharacterSection`)에서 컨테이너·캐릭터 상하 px 측정 (`mcp__figma-remote-mcp__get_design_context`)
2. `HomePageV2.tsx:71` 의 `gap-2 pb-24` → `gap-[Npx] pt-[Npx] pb-[Npx]`로 치환
3. `CharacterSection.tsx:22` 루트 `pt-4` → 피그마 상단 px, 추가로 `pb-[Npx]` 적용
4. `CharacterSection.tsx:37` 캐릭터 `-mt-3` 제거 또는 디자인 수치로 교체, `mt-[Npx]`로 캐릭터 ↔ 뱃지 간격 분리
5. 캐릭터 사이즈도 피그마 스펙과 비교 (`w-[120px] h-[180px]` 검토)

### 검증 방법
- DevTools BoundingBox vs 피그마 Inspect px 비교
- 스크린샷 비교

### 리스크/주의
- `CharacterSection`은 `HomePage.tsx`(레거시)에서도 재사용될 수 있어 양쪽 페이지 영향 확인
- **사전 확인: 디자인 — 캐릭터 섹션 상하 여백 px**

---

## F-05 · 실시간 기록 — 그래프 배경 + 감정 뱃지 색상

| 항목 | AS IS | TO BE |
| --- | --- | --- |
| 원형 그래프 | 회색 배경 없음 | 회색 배경 반영 |
| 감정 뱃지 색상 | 미반영 | 아래 스펙 |

**감정 뱃지 색상 스펙**
| 감정 | 배경 | 텍스트 |
| --- | --- | --- |
| 기뻐요 | `#A4D4AA` | `#3F8F46` |
| 화나요 | `#F3B3B8` | `#E63946` |

### 영향 범위
- `apps/web/src/shared/ui/common/Card/EmotionCard.tsx` (record 도메인 공용)
- `apps/web/src/entities/record/ui/TeamsEmotionStat.tsx`

### 현재 상태
- `EmotionCard.tsx:88` → `const trackColor = 'var(--color-brand-neutral-white)'` (트랙 흰색)
- `EmotionCard.tsx:39` → 뱃지 배경 `bg-brand-red-disabled / bg-brand-green-disabled`, 텍스트 `text-brand-red-hover / text-brand-green-hover` (피그마 hex와 토큰 불일치 가능)

### 해결 단계
1. `trackColor` → 회색 토큰(`var(--color-usage-background-strong)`)으로 교체. 토큰 부재 시 `tailwind.config`/`tokens`에 회색 추가
2. 디자인 토큰에서 `#A4D4AA/#3F8F46/#F3B3B8/#E63946` 매칭 alias 확인 → 없으면 컴포넌트 내 `bg-[#A4D4AA] text-[#3F8F46]`, `bg-[#F3B3B8] text-[#E63946]` 하드코딩으로 임시 대응
3. 동일 컬러 사용처(`TeamsEmotionStat`, `RecordMainPage`)에 일관성 검토

### 검증 방법
- Storybook `EmotionCard.stories`, 라이브 페이지에서 joy/angry 우세 케이스 캡처 → 피그마 비교

### 리스크/주의
- 토큰 변경 시 다른 화면 영향 → **최소 변경은 컴포넌트 내부 hex 적용**, 토큰화는 별도 PR 권장
- **사전 확인: 디자인 — 회색 트랙의 정확한 hex (또는 토큰명)**

---

## F-06 · 실시간 기록 — 숫자 단위 / 표시 / 카메라

| 항목 | AS IS | TO BE | 비고 |
| --- | --- | --- | --- |
| 숫자 단위 | `%` | `번` | - |
| 사진 업로드 후 숫자 | 미표시 | 업로드 개수 표시 | 데이터 미반영 이슈 가능성 |
| 카메라 버튼 | 회색 배경 없음 | 회색 배경 반영 | - |

### 영향 범위
- 단위: `apps/web/src/shared/ui/common/Button/EmotionButton.tsx:138`, `apps/web/src/shared/ui/common/Card/EmotionCard.tsx:148,175,179`
- 카운트: `apps/web/src/features/record/ui/RecordCameraButton.tsx`, `useRecordImages.ts`
- 데이터 흐름: `useMyTeamLiveRecord.ts:61` → `recordingData.imageList` → `RecordCameraButton.initialImages` → `useRecordingImages.addImage`

### 현재 상태
- `EmotionButton.tsx:138` → `{Math.round(percent)}%` (단위 `%`)
- `RecordCameraButton.tsx:92-105` → 버튼 `bg-usage-background-default text-white`, 카운트 뱃지 `bg-brand-primary-default text-[10px] rounded-full px-[4px] py-[1px]` — **텍스트 컬러 미지정으로 부모 `text-white` 상속 → 밝은 배경에서 숫자 안 보임 (미표시 1차 원인 추정)**
- 카운트 자체는 `useRecordingImages.images.length` 로 연결되어 있으나 `useEffect([initializeImages])`가 `initialImages` 변경 때마다 재실행 → 동일 이미지 중복 add 가능성 존재

### 해결 단계
1. `EmotionButton.tsx:138` `%` → `번` (`{Math.round(percent)}번`). `EmotionCard.tsx:148,175,179`도 동일 단위 적용 여부 **PM 확인 필요**
2. `RecordCameraButton.tsx:95` 버튼 배경을 피그마 회색 토큰(`bg-usage-background-strong`)으로, `text-white` → `text-usage-text-default`
3. **카운트 뱃지에 명시 텍스트 컬러 추가** (1차 원인 해결): `text-brand-neutral-white` 등 대비색 → 흰 배경 위 흰 글자 문제 해결
4. `initializeImages` 안정성 강화: `initialImages` 변경 시 1회만 동기화하도록 createdAt set 가드 추가
5. 실데이터 검증: DevTools에서 `images` state 증가 확인 → 미증가 시 `useWebViewBridgeListener` → `uploadImage` 응답 / `addImage` 호출 추적

### 검증 방법
- `%` → `번` 진입 시 표시 확인
- WebView 카메라로 1~3장 업로드 후 뱃지 숫자 증가 확인
- 카메라 버튼 배경 회색 + 피그마 비교 스크린샷

### 리스크/주의
- `EmotionCard`는 `RecordMainPage`, `CommunityPage`, `FriendDetailPage`, `FriendPhotoBottomSheet` 등에서 공유 → **단위 변경 전 PM 컨펌 필수**
- `useRecordingImages`는 컴포넌트 unmount 시 state 초기화 → 재진입 시 imageList 재시드 동작 확인
- **사전 확인: PM — EmotionCard 모든 호출처에서 `%` → `번` 변경 의도인지**

---

## 작업 체크리스트

- [ ] 피그마에서 홈 캐릭터 섹션 px 측정
- [ ] `HomePageV2.tsx` 여백 적용
- [ ] `CharacterSection.tsx` 상하 여백 적용
- [ ] 피그마에서 회색 트랙 토큰 확인
- [ ] `EmotionCard.tsx` trackColor 변경
- [ ] 감정 뱃지 hex 적용 (F-05)
- [ ] PM에 `%` → `번` 변경 범위 컨펌
- [ ] `EmotionButton.tsx` 단위 변경
- [ ] `RecordCameraButton.tsx` 버튼 배경/텍스트 색상 변경
- [ ] **카운트 뱃지 텍스트 색상 추가** (미표시 원인 해결)
- [ ] `initializeImages` 중복 add 가드
- [ ] WebView 카메라 업로드 → 카운트 증가 회귀 테스트
- [ ] `pnpm --filter web typecheck && lint` 통과
