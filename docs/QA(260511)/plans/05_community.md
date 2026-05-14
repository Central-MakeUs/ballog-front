# [작업 5] 커뮤니티 4건

| 항목 | 내용 |
| --- | --- |
| 담당 범위 | F-08, F-09, F-10, F-11 |
| 우선순위 | F-09 🔴 High → F-10 🟡 Medium → F-08/F-11 🟢 Low |
| 선행 조건 | 없음 |
| 원문 | [QA(260511).md](../QA(260511).md) |

> **주의**: F-09, F-10은 모두 `CommunityPage.tsx`를 만집니다. 같은 에이전트가 순서대로 처리하세요.

---

## F-08 · KBO 순위 — 바텀시트 높이 + 감정 뱃지 색상

| 항목 | AS IS | TO BE |
| --- | --- | --- |
| 바텀시트 높이 | 9위까지만 표시 | 10위까지 한 번에 표시 |
| 감정 뱃지 색상 | 미반영 | 아래 스펙 |

**감정 뱃지 색상 스펙**
| 감정 | 배경 | 텍스트 |
| --- | --- | --- |
| 기뻐요 | `#CEF7D1` | `#3F8F46` |
| 화나요 | `#FFE5E6` | `#E63946` |
| 감정없음 | `#E0E0E0` | `#616161` |

### 영향 범위
- `apps/web/src/pages/community/ui/KBORankBottomSheet.tsx`

### 현재 상태
- `KBORankBottomSheet.tsx:61` → `contentClassName="h-[80vh] gap-6 ..."` 고정 80vh, 작은 디바이스에서 9위까지만 노출
- `BADGE_STYLES` (L15–19) → 토큰 클래스(`bg-brand-red-subtle` 등) 사용
- L101 → 모든 행이 `<RankBadge tone="none" />` 하드코딩 (API 미연동 상태)

### 해결 단계
1. 시트 높이 조정:
   - 콘텐츠 기반 자동: `max-h-[90vh]` + 내부 컨테이너 `h-fit`
   - 또는 최소 `h-[88vh]`로 조정 (safe-area 포함 가정)
   - 내부 `flex-1 overflow-y-auto` (L68) 유지로 4.7" 기기 fallback 보장
2. `BADGE_STYLES` hex 갱신:
   - `positive`: `bg-[#CEF7D1] text-[#3F8F46]`
   - `negative`: `bg-[#FFE5E6] text-[#E63946]`
   - `none`: `bg-[#E0E0E0] text-[#616161]`
3. 디자인 토큰이 동일 hex라면 토큰 유지가 FSD/디자인 시스템상 더 적절 → 토큰 정의(`shared/styles` 또는 tailwind config) 확인 후 토큰 값 조정 우선 검토

### 검증 방법
- iPhone SE(375×667), iPhone 14(390×844) 뷰포트에서 10위 행 끝까지 한 화면 노출
- 라이트/다크 모두 hex 시각 검증

### 리스크/주의
- 고정 vh 키우면 작은 기기에서 핸들바 잘릴 수 있음 → `BottomSheetModal.Root` safe-area 처리 확인
- 토큰 변경 시 `FriendPhotoBottomSheet` 등 다른 화면 파급
- **사전 확인: 디자인 — 작은 디바이스(SE) 대응 가이드**

---

## F-09 · 친구 추가 바텀시트 — 키보드 자동 활성화

| | 내용 |
| --- | --- |
| AS IS | '친구 추가' 클릭 시 바텀시트 내 텍스트 입력창만 표시 |
| TO BE | 바텀시트 표시와 동시에 키보드 자동 활성화 |

### 영향 범위
- `apps/web/src/pages/community/ui/AddFriendBottomSheet.tsx`
- `apps/web/src/pages/community/ui/CommunityPage.tsx`

### 현재 상태
- `AddFriendBottomSheet.tsx:57–61` → `requestAnimationFrame` 안에서 `inputRef.current?.focus()`
- RN 환경은 `onEntered` (L82) 콜백에서 포커스
- `autoFocus={!isRNEnvironment}` (L122)

### 핵심 원인
- **iOS Safari/PWA는 `focus()`가 사용자 제스처(`click`/`touchend`) 콜스택 안에서만 키보드를 띄움**
- 현재 코드는 `useEffect` → `requestAnimationFrame` 비동기 경로 → 제스처 컨텍스트가 끊겨 키보드가 안 뜸
- `CommunityPage.tsx:115–118`의 `setIsAddFriendBottomSheetOpen(true)` 클릭 핸들러와 분리되어 있음

### 해결 단계
1. **dummy-input 패턴 도입**:
   - 트리거 버튼 `onClick`에서 동기적으로 hidden input에 focus
   - 시트 마운트 후 실제 input으로 옮김
2. (대안) 단순 개선안: `requestAnimationFrame` 제거하고 `onEntered` 콜백 시점(웹/RN 공통)으로 통일 → iOS Safari에서 여전히 막힐 수 있음
3. RN webview는 네이티브 측 `keyboardDisplayRequiresUserAction={false}` 설정 필요 → **네이티브 팀 조율 필수**

### 검증 방법
- iOS Safari(실기기), iOS 인앱 WebView, Android Chrome에서 ‘+ 친구추가’ 탭 시 키보드 즉시 표시
- `keyboardInset` 값에 따른 시트 위치 보정 동작 확인

### 리스크/주의
- iOS Safari 보안 제약상 비동기 focus 무시
- dummy-input 패턴은 스크린리더 영향 검토 필요
- RN `keyboardDisplayRequiresUserAction` 변경은 네이티브 빌드 동반
- **사전 확인: 네이티브 팀 — RN `keyboardDisplayRequiresUserAction` 변경 가능 여부**

---

## F-10 · ‘친구 추가하기’ 버튼 무반응

| | 내용 |
| --- | --- |
| AS IS | 친구 없는 상태에서 ‘친구 추가하기’ 버튼 클릭 시 아무 동작 없음 |
| TO BE | F-09와 동일한 친구 추가 바텀시트 표시 |

### 영향 범위
- `apps/web/src/pages/community/ui/CommunityEmptyState.tsx`
- `apps/web/src/pages/community/ui/CommunityPage.tsx:127–129`

### 현재 상태
- `CommunityPage.tsx:128` → `onExploreFriends={() => push('FriendRequest', {})}`
- 빈 상태 버튼 라벨 `CommunityEmptyState.tsx:32` → ‘친구 탐색하기’
- **요구사항(‘친구 추가하기’ 클릭 시 F-09 시트 표시)과 라벨/동작 모두 불일치**

### 해결 단계
1. PM 확정 — 빈 상태 버튼 라벨을 ‘친구 추가하기’로 통일할지, 추가/탐색 두 버튼 분리할지 결정
2. `CommunityPage.tsx`에서 `onExploreFriends` 핸들러를 `() => setIsAddFriendBottomSheetOpen(true)`로 교체 (F-09 시트 호출)
3. 라벨 변경 시 `CommunityEmptyState` 버튼 텍스트 동기화. props 시그니처 `onExploreFriends` → `onAddFriend` 리네이밍 권장 (슬라이스 내부 변경이라 외부 영향 없음)
4. 기존 `FriendRequest` 라우트 진입 경로는 별도 엔트리(예: ‘친구 요청 보기’)로 분리 또는 보류

### 검증 방법
- 친구가 0명일 때 버튼 탭 → `AddFriendBottomSheet` 오픈
- F-09 키보드 동작도 동시 작동

### 리스크/주의
- F-09와 같은 트리거 경로 공유 → iOS 키보드 제약 동일 적용
- `FriendRequest` 진입 경로 사라지지 않는지 확인
- **사전 확인: PM — 빈 상태 버튼 라벨 (‘친구 추가하기’ vs ‘친구 탐색하기’) 및 `FriendRequest` 진입 경로 유지 여부**

---

## F-11 · 친구 카드 클릭 비활성화

| | 내용 |
| --- | --- |
| AS IS | 친구 목록에서 친구 클릭 시 친구 기록 페이지로 이동 |
| TO BE | 클릭 시 아무 동작 없음 (임시 비활성) |

### 영향 범위
- `apps/web/src/pages/community/ui/CommunityFriendGrid.tsx`
- 라우트 정의 `apps/web/src/app/routes/stackflow.ts:61,86` (수정 불필요)

### 현재 상태
- `CommunityFriendGrid.tsx:65–67` → `onClick={() => push('FriendDetail', {}, { animate: true })}`
- 라우트와 `FriendDetailPage`는 그대로 존재

### 해결 단계
1. `CommunityFriendCard`의 `<button>`을 `<div>` 또는 `<button disabled>`로 변경
2. `onClick`/`useFlow` 임포트 제거
3. 시각 변화 없도록 button 스타일 유지
4. 라우트 자체는 유지 (추후 재활성 대비), `stackflow.ts` 수정 불필요
5. 접근성: `role`/`aria-disabled` 적절히 부여

### 검증 방법
- 친구 카드 탭 → 라우트 미진입
- 콘솔 에러 없음, 시각 상태(hover/active) 동일

### 리스크/주의
- 임시 비활성이므로 향후 복원을 위해 push 호출은 주석보다 git history 의존이 깔끔
- `useFlow` import 미제거 시 lint 경고

---

## 작업 체크리스트

### F-08
- [ ] 시트 높이 `max-h-[90vh]` 또는 `h-[88vh]` 조정
- [ ] `BADGE_STYLES` hex 갱신 (positive/negative/none)
- [ ] iPhone SE/14 뷰포트 10위 노출 확인

### F-09
- [ ] dummy-input 패턴 구현 (또는 동등 방식)
- [ ] 네이티브 팀과 `keyboardDisplayRequiresUserAction` 협의
- [ ] iOS Safari 실기기 키보드 자동 활성 확인
- [ ] Android Chrome 회귀 확인

### F-10
- [ ] PM에 빈 상태 버튼 라벨/동작 컨펌
- [ ] `CommunityPage.tsx` `onExploreFriends` → `onAddFriend` 핸들러 교체
- [ ] `CommunityEmptyState` 라벨/props 리네이밍
- [ ] F-09 동작과 통합 확인

### F-11
- [ ] `CommunityFriendCard` button → div 또는 disabled 처리
- [ ] `useFlow`, push 임포트 제거
- [ ] `aria-disabled` 부여
- [ ] 클릭 시 라우트 미진입 확인

### 공통
- [ ] `pnpm --filter web typecheck && lint` 통과
