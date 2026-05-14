# QA(260511) 해결 플랜

| 항목 | 내용 |
| --- | --- |
| 원문 | [QA(260511).md](./QA(260511).md) |
| 작성일 | 2026-05-14 |
| 기준 브랜치 | `develop` (현재 작업 브랜치) |

---

## 📋 전체 목록

| ID | 화면 | 우선순위 | 비고 |
| --- | --- | --- | --- |
| [F-01](#f-01--상단-nav바-높이-조정) | 공통 | 🔴 High | 모든 페이지 영향 |
| [F-02](#f-02--로그인-화면-3건-라이트-모드) | 로그인 | 🟡 Medium | 디자인 토큰 검토 동반 |
| [F-03](#f-03--이용약관-마크다운-렌더링) | 로그인 | 🟡 Medium | deps 추가 필요 (`react-markdown`) |
| [F-04](#f-04--홈-메인-여백사이즈-조정) | 홈 | 🟢 Low | 피그마 수치 필요 |
| [F-05](#f-05--실시간-기록--그래프-배경--감정-뱃지) | 홈 > 실시간 | 🟡 Medium | 토큰 공용 컴포넌트 영향 |
| [F-06](#f-06--실시간-기록--숫자-단위--표시--카메라) | 홈 > 실시간 | 🔴 High | 사진 카운트 미표시 데이터/색상 검증 |
| [F-07](#f-07--경기-일정-ui-5건) | 홈 > 경기 일정 | 🟡 Medium | 캘린더 정렬 로직 변경 |
| [F-08](#f-08--kbo-순위--바텀시트-높이--감정-뱃지-색상) | 커뮤니티 | 🟢 Low | hex 일괄 적용 |
| [F-09](#f-09--친구-추가-바텀시트-키보드-자동-활성화) | 커뮤니티 | 🔴 High | iOS Safari 제약, 네이티브 조율 필요 |
| [F-10](#f-10--친구-추가하기-버튼-무반응) | 커뮤니티 | 🟡 Medium | F-09 와 동시 처리 |
| [F-11](#f-11--친구-카드-클릭-비활성화) | 커뮤니티 | 🟢 Low | 임시 비활성, 최소 수정 |
| [F-12](#f-12--마이페이지-nav바--문의하기-2건) | 마이페이지 | 🟡 Medium | 메일 주소 PM 확정 필요 |

---

## ✅ 공통

### F-01 · 상단 nav바 높이 조정

- **영향 범위**
  - `apps/web/src/widgets/header/ui/Header.tsx`
  - `apps/web/src/widgets/header/ui/HomeHeaderV2.tsx`
  - `apps/web/src/pages/mypage/ui/MyPage.tsx` (appBar height 불일치)
- **현재 상태**
  - `Header.tsx:19` → `h-14 flex items-center ...` (56px)
  - `HomeHeaderV2.tsx:17` → `... h-14 shrink-0` (56px)
  - 다른 페이지 stackflow `appBar.height: '48px'` (예: `LoginPage.tsx:15`, `AlermPage.tsx:19`)
  - `MyPage.tsx:29`만 `'44px'`로 다름 → F-12에서 “버튼 없음”으로 보이는 원인일 가능성
- **해결 단계**
  1. 피그마 디자인에서 상단 nav바 정확한 픽셀 값 확인 (디자인 캡처 기준)
  2. `Header.tsx`, `HomeHeaderV2.tsx`의 `h-14` 토큰을 피그마 기준(예: `h-12`=48px)으로 변경
  3. stackflow `appBar.height` 값을 피그마 기준으로 통일 (혼재된 `44px`/`48px` 단일 값 적용)
  4. `appBar` 사용처 전수(`grep "appBar" apps/web/src`) `height` 키 일괄 동기화
- **검증 방법**
  - 홈/마이/기록/친구 등 모든 라우트에서 DevTools로 헤더 픽셀 측정 → 피그마와 일치 확인
  - safe-area-inset (iOS notch) 환경 회귀 확인
- **리스크/주의**
  - `Header.tsx`는 공통 컴포넌트, 모든 파생 페이지 레이아웃 영향
  - `MyPage.tsx:32` `pb-27.5` 등 헤더 높이에 맞춰진 하단 패딩 재검토 필요

---

## ✅ 로그인/회원가입

### F-02 · 로그인 화면 3건 (라이트 모드)

#### F-02-A · 로고 색상/크기
- **영향 범위**
  - `apps/web/src/assets/BallogAppBar.tsx`
  - `apps/web/src/pages/auth/ui/LoginPage.tsx`
- **현재 상태**
  - `BallogAppBar.tsx:14` → `theme === 'dark' ? WhiteBallogLogo : ColoredBallogLogo`
  - `BallogAppBar.tsx:16` → `cn('h-16 w-auto', className)` 고정 64px
  - `LoginPage.tsx:13` → `appBar.height: '48px'` 인데 로고 `h-16`(64px) → 컨테이너 초과
  - `ColoredBallogLogo.tsx:3` → 텍스트 `fill="#212121"`(검정), 심볼만 `#36C1B3` → “초록색 로고” 요구와 불일치
- **해결 단계**
  1. 피그마에서 로그인 AppBar 로고 색상 토큰(`brand-primary-*`)·크기 측정
  2. `@ballog/asset`에 로그인 전용 그린 로고 variant 존재 여부 확인 → 없으면 SVG 요청 또는 `ColoredBallogLogo` 텍스트 fill 토큰 교체
  3. `LoginPage.tsx`에서 `BallogAppBar`에 피그마 스펙 `className`(예: `h-6 w-auto`) 전달, 또는 로그인 전용 로고로 분리
  4. `appBar.height`를 로고 크기에 맞춰 재조정
- **검증 방법**: 라이트/다크 모드 양쪽 스크린샷 피그마 비교
- **리스크/주의**: `BallogAppBar`는 home/mypage 등 공용 사용 중 → **로그인 전용 variant 분리 권장**, props로 size override 도 가능

#### F-02-B · 카카오 버튼 텍스트 색상
- **영향 범위**: `apps/web/src/pages/auth/ui/SocialButton.tsx`
- **현재 상태**: `SocialButton.tsx:25` → `text-usage-text-inverse` (다크모드 분기에 따라 검정/흰색이 바뀜)
- **해결 단계**
  1. `text-usage-text-inverse` → `text-brand-neutral-90` (=`#212121`) 또는 `text-[#212121]` 하드코딩
  2. 카카오 아이콘은 이미 `fill="#212121"` 고정이므로 수정 불필요
- **검증 방법**: 라이트/다크 모두 텍스트 `#212121` 확인

#### F-02-C · 애플 버튼 색상
- **영향 범위**: `apps/web/src/pages/auth/ui/SocialButton.tsx`
- **현재 상태**: `SocialButton.tsx:54-56`
  ```
  'bg-brand-neutral-5 ... text-brand-neutral-90',
  'dark:bg-brand-neutral-90 dark:text-brand-neutral-5',
  ```
  → 라이트 모드는 `#fafafa` 배경 + `#212121` 텍스트. QA 요구는 라이트도 `#212121` 배경 + `#FFFFFF` 텍스트
- **해결 단계**
  1. 다크 분기 제거 → `bg-brand-neutral-90 text-brand-neutral-white` 단일 적용
  2. `active:` 상태도 `bg-brand-neutral-90/80`로 통일
  3. `Apple.tsx`는 `fill="currentColor"`이므로 부모 `text-*`가 적용됨
- **리스크/주의**: 다크모드에서도 동일 색상이 됨 → 디자인 의도 PM 확정 필요

---

### F-03 · 이용약관 마크다운 렌더링

- **영향 범위**
  - `apps/web/src/entities/term/ui/TermContent.tsx`
  - `apps/web/src/entities/term/constants/{service,privacy,marketing}.ts`
  - `apps/web/package.json` (deps 추가)
- **현재 상태**
  - `TermContent.tsx:13,18,23` → `whitespace-pre-line break-words`로 raw 문자열만 출력
  - `service.ts:7` 등 → `### **제1조 ...**`, `**굵게**`, 마크다운 표 등 문법 그대로 포함
  - `package.json` dependencies → `react-markdown`/`marked`/`remark-gfm` **모두 없음**
- **해결 단계**
  1. `pnpm --filter web add react-markdown remark-gfm` 추가 (표 지원)
  2. `TermContent.tsx`를 `<ReactMarkdown remarkPlugins={[remarkGfm]} components={{...}}>`로 교체
  3. `components` prop에서 `h3`/`strong`/`table`/`th`/`td`/`li`/`a`를 Ballog 디자인 토큰(`body-md-bold`, `text-usage-text-default`, `border-brand-neutral-50`)으로 매핑
  4. 기존 `whitespace-pre-line` 제거 (마크다운 파서가 줄바꿈 처리)
  5. (대안) deps 추가 불가 시 → constants의 마크다운 표를 `<table>` JSX로 변환 후 type별 사전 렌더 컴포넌트로 분리
- **검증 방법**
  - `/term/service`, `/term/privacy`, `/term/marketing` 3개 라우트에서 `###`/`**`/`|`이 텍스트로 안 보이고 헤딩/볼드/표로 렌더링되는지 확인
  - 다크모드 가독성 회귀 확인
- **리스크/주의**
  - 번들 사이즈 증가 (`react-markdown` ~30KB gz)
  - FSD 경계: `react-markdown` import는 `entities/term/ui/`로 한정
  - 외부 링크 안전(`a` 컴포넌트에 `rel="noopener noreferrer" target="_blank"`)
  - 정적 텍스트이므로 XSS 리스크 낮음

---

## ✅ 홈

### F-04 · 홈 메인 여백/사이즈 조정

- **영향 범위**
  - `apps/web/src/pages/home/ui/HomePageV2.tsx`
  - `apps/web/src/features/home/ui/CharacterSection.tsx`
- **현재 상태**
  - `HomePageV2.tsx:71` → `gap-2 pb-24`, 캐릭터 섹션 위 여백 없음
  - `CharacterSection.tsx:22` 루트 `pt-4`만 존재
  - `Character.tsx:37` `-mt-3`로 캐릭터를 말풍선 쪽으로 끌어올림, 하단 여백 없음 (뱃지가 `mt-[8px]`로 바로 붙음)
- **해결 단계**
  1. 피그마 노드(`HomePageV2` / `CharacterSection`)에서 컨테이너·캐릭터 상하 px 측정 (`mcp__figma-remote-mcp__get_design_context`)
  2. `HomePageV2.tsx:71` 의 `gap-2 pb-24` → `gap-[Npx] pt-[Npx] pb-[Npx]`로 치환
  3. `CharacterSection.tsx:22` 루트 `pt-4` → 피그마 상단 px, 추가로 `pb-[Npx]` 적용
  4. `CharacterSection.tsx:37` 캐릭터 `-mt-3` 제거 또는 디자인 수치로 교체, `mt-[Npx]`로 캐릭터 ↔ 뱃지 간격 분리
  5. 캐릭터 사이즈도 피그마 스펙과 비교 (`w-[120px] h-[180px]` 검토)
- **검증 방법**: DevTools BoundingBox vs 피그마 Inspect px 비교, 스크린샷 비교
- **리스크/주의**: `CharacterSection`은 `HomePage.tsx`(레거시)에서도 재사용될 수 있어 양쪽 페이지 영향 확인

---

### F-05 · 실시간 기록 — 그래프 배경 + 감정 뱃지

- **영향 범위**
  - `apps/web/src/shared/ui/common/Card/EmotionCard.tsx` (record 도메인 공용)
  - `apps/web/src/entities/record/ui/TeamsEmotionStat.tsx`
- **현재 상태**
  - `EmotionCard.tsx:88` → `const trackColor = 'var(--color-brand-neutral-white)'` (트랙 흰색)
  - `EmotionCard.tsx:39` → 뱃지 배경 `bg-brand-red-disabled / bg-brand-green-disabled`, 텍스트 `text-brand-red-hover / text-brand-green-hover` (피그마 hex와 토큰 불일치 가능)
- **해결 단계**
  1. `trackColor` → 회색 토큰(`var(--color-usage-background-strong)`)으로 교체. 토큰 부재 시 `tailwind.config`/`tokens`에 회색 추가
  2. 디자인 토큰에서 `#A4D4AA/#3F8F46/#F3B3B8/#E63946` 매칭 alias 확인 → 없으면 컴포넌트 내 `bg-[#A4D4AA] text-[#3F8F46]`, `bg-[#F3B3B8] text-[#E63946]` 하드코딩으로 임시 대응
  3. 동일 컬러 사용처(`TeamsEmotionStat`, `RecordMainPage`)에 일관성 검토
- **검증 방법**: Storybook `EmotionCard.stories`, 라이브 페이지에서 joy/angry 우세 케이스 캡처 → 피그마 비교
- **리스크/주의**: 토큰 변경 시 다른 화면 영향 → **최소 변경은 컴포넌트 내부 hex 적용**, 토큰화는 별도 PR 권장

---

### F-06 · 실시간 기록 — 숫자 단위 / 표시 / 카메라

- **영향 범위**
  - 단위: `apps/web/src/shared/ui/common/Button/EmotionButton.tsx:138`, `apps/web/src/shared/ui/common/Card/EmotionCard.tsx:148,175,179`
  - 카운트: `apps/web/src/features/record/ui/RecordCameraButton.tsx`, `useRecordImages.ts`
  - 데이터 흐름: `useMyTeamLiveRecord.ts:61` → `recordingData.imageList` → `RecordCameraButton.initialImages` → `useRecordingImages.addImage`
- **현재 상태**
  - `EmotionButton.tsx:138` → `{Math.round(percent)}%` (단위 `%`)
  - `RecordCameraButton.tsx:92-105` → 버튼 `bg-usage-background-default text-white`, 카운트 뱃지 `bg-brand-primary-default text-[10px] rounded-full px-[4px] py-[1px]` — **텍스트 컬러 미지정으로 부모 `text-white` 상속 → 밝은 배경에서 숫자 안 보임 (미표시 원인 추정)**
  - 카운트 자체는 `useRecordingImages.images.length` 로 연결되어 있으나 `useEffect([initializeImages])`가 `initialImages` 변경 때마다 재실행 → 동일 이미지 중복 add 가능성 존재
- **해결 단계**
  1. `EmotionButton.tsx:138` `%` → `번` (`{Math.round(percent)}번`). `EmotionCard.tsx:148,175,179`도 동일 단위 적용 여부 PM 확인
  2. `RecordCameraButton.tsx:95` 버튼 배경을 피그마 회색 토큰(`bg-usage-background-strong`)으로, `text-white` → `text-usage-text-default`
  3. 카운트 뱃지에 명시 텍스트 컬러 추가: `text-brand-neutral-white` 등 대비색 → **흰 배경 위 흰 글자 문제 해결**
  4. `initializeImages` 안정성 강화: `initialImages` 변경 시 1회만 동기화하도록 createdAt set 가드 추가
  5. 실데이터 검증: DevTools에서 `images` state 증가 확인 → 미증가 시 `useWebViewBridgeListener` → `uploadImage` 응답 / `addImage` 호출 추적
- **검증 방법**
  - `%` → `번` 진입 시 표시 확인
  - WebView 카메라로 1~3장 업로드 후 뱃지 숫자 증가 확인
  - 카메라 버튼 배경 회색 + 피그마 비교 스크린샷
- **리스크/주의**
  - `EmotionCard`는 `RecordMainPage`, `CommunityPage`, `FriendDetailPage`, `FriendPhotoBottomSheet` 등에서 공유 → 단위 변경 전 PM 컨펌 필수
  - `useRecordingImages`는 컴포넌트 unmount 시 state 초기화 → 재진입 시 imageList 재시드 동작 확인

---

### F-07 · 경기 일정 UI 5건

- **영향 범위**
  - `apps/web/src/pages/home/ui/HomePage.tsx` (페이지 루트 래퍼)
  - `apps/web/src/features/calendar/ui/CalendarWeekContent.tsx`
  - `apps/web/src/features/calendar/ui/CalendarWeekCarousel.tsx`
  - `apps/web/src/features/calendar/ui/CalendarWeekButton.tsx`
  - `apps/web/src/shared/ui/common/Card/HomeCard/HomeCardDetailInfo.tsx` (시간 출력 L26)
  - `apps/web/src/features/match/ui/MatchSection.tsx` (안내 문구 L27)
- **현재 상태**
  1. `HomePage.tsx:67-78` → `AppScreen` 하위 별도 배경 컨테이너 없음. 시스템 토큰 `--color-usage-background-default: #ffffff`
  2. `CalendarWeekContent.tsx:16-19` → `getWeekDates`가 `startOfWeek(date, { weekStartsOn: 0 })`로 일요일 시작 7칸 → 오늘이 좌측에 치우침
  3. `CalendarWeekButton.tsx:22-46` → `isActive`에 `text-brand-primary-default`만, 밑줄 없음
  4. `HomeCardDetailInfo.tsx:26` → `경기시작 {dateTime}` 그대로. mock(`mocks/data/match.ts:11`)에서 `'18:30:00'` 포맷
  5. `MatchSection.tsx:27` → `['오늘의 경기를 선택하고', '감정을 공유해보세요']`
- **해결 단계**
  1. **배경색**: `HomePage.tsx` `<DateProvider>` 또는 `<div>` 래퍼(L44)에 `bg-[#EEEEEE]` 추가 (페이지 한정 격리). CalendarHeader 자체는 흰색 유지하려면 헤더 컨테이너에 `bg-white` 명시
  2. **날짜 중앙 정렬**: `CalendarWeekContent`의 `getWeekDates`를 `addDays(date, i - 3)` (i=0..6)으로 변경해 기준일을 index 3(중앙)에 배치. `CalendarWeekCarousel`의 `differenceInWeeks` 산식은 그대로 두는 게 변경 최소화
  3. **선택 밑줄**: `CalendarWeekButton.tsx` 날짜 숫자 `<span>` (L35-46)에 `isActive && 'underline underline-offset-4 decoration-2 decoration-brand-primary-default'` 또는 하단 `<div className="h-0.5 w-4 bg-brand-primary-default mt-0.5" />` 추가
  4. **시간 포맷**: `HomeCardDetailInfo.tsx`에서 `dateTime?.split(':').slice(0, 2).join(':')`로 절단 (백엔드가 `HH:MM`으로 바뀌어도 안전)
  5. **문구**: `MatchSection.tsx:27` `'공유해보세요'` → `'기록해보세요'`
- **검증 방법**
  - `/match-schedule` 진입 → 캐러셀 스와이프 시 선택일이 항상 가운데 칸 위치, 밑줄 동작 확인
  - 라이트/다크 모드 토글로 `#EEEEEE` 영역 확인
  - mock `'18:30:00'` → `"경기시작 18:30"` 렌더 확인
  - `pnpm --filter web typecheck && pnpm --filter web lint` 통과
- **리스크/주의**
  - 중앙 정렬 변경 시 요일 헤더가 셀별로 달라짐 → `weekday: 'short'`가 셀마다 출력되므로 OK
  - `scrollIntoView`/`transform`은 grid 균등 분할이 깨져 부적합
  - `--color-usage-background-default` 전역 토큰 변경은 영향 큼 → 페이지 컨테이너 임시 클래스로 격리 권장

---

## ✅ 커뮤니티

### F-08 · KBO 순위 — 바텀시트 높이 + 감정 뱃지 색상

- **영향 범위**: `apps/web/src/pages/community/ui/KBORankBottomSheet.tsx`
- **현재 상태**
  - `KBORankBottomSheet.tsx:61` → `contentClassName="h-[80vh] gap-6 ..."` 고정 80vh, 작은 디바이스에서 9위까지만 노출
  - `BADGE_STYLES` (L15–19) → 토큰 클래스(`bg-brand-red-subtle` 등) 사용
  - L101 → 모든 행이 `<RankBadge tone="none" />` 하드코딩
- **해결 단계**
  1. 시트 높이를 콘텐츠 기반 자동(`max-h-[90vh]` + 내부 `h-fit`)로 전환하거나 최소 `h-[88vh]`로 조정. 내부 `flex-1 overflow-y-auto`(L68) 유지로 4.7" 기기 fallback
  2. `BADGE_STYLES` hex 갱신:
     - `positive`: `bg-[#CEF7D1] text-[#3F8F46]`
     - `negative`: `bg-[#FFE5E6] text-[#E63946]`
     - `none`: `bg-[#E0E0E0] text-[#616161]`
  3. 디자인 토큰이 동일 hex라면 토큰 유지가 FSD/디자인 시스템상 더 적절 → 토큰 정의(`shared/styles` 또는 tailwind config) 확인 후 토큰 값 조정 우선 검토
- **검증 방법**: iPhone SE(375×667), iPhone 14(390×844) 뷰포트에서 10위 끝까지 노출, 라이트/다크 모두 hex 시각 검증
- **리스크/주의**: 고정 vh 키우면 작은 기기 핸들바 잘릴 수 있음 → `BottomSheetModal.Root` safe-area 확인. 토큰 변경 시 `FriendPhotoBottomSheet` 등 다른 화면 파급

---

### F-09 · 친구 추가 바텀시트 키보드 자동 활성화

- **영향 범위**: `apps/web/src/pages/community/ui/AddFriendBottomSheet.tsx`, `apps/web/src/pages/community/ui/CommunityPage.tsx`
- **현재 상태**
  - `AddFriendBottomSheet.tsx:57–61` → `requestAnimationFrame` 안에서 `inputRef.current?.focus()`
  - RN 환경은 `onEntered`(L82) 콜백에서 포커스
  - `autoFocus={!isRNEnvironment}` (L122)
- **핵심 원인**
  - **iOS Safari/PWA에서는 `focus()`가 사용자 제스처(`click`/`touchend`) 콜스택 안에서만 키보드를 띄움**
  - 현재 코드는 `useEffect` → `requestAnimationFrame` 비동기 경로 → 제스처 컨텍스트가 끊겨 키보드가 안 뜸
  - `CommunityPage.tsx:115–118` 의 `setIsAddFriendBottomSheetOpen(true)` 클릭 핸들러와 분리됨
- **해결 단계**
  1. **dummy-input 패턴 도입**: 트리거 버튼 `onClick`에서 동기적으로 hidden input에 focus → 시트 마운트 후 실제 input으로 옮김
  2. (대안) 단순 개선안: `requestAnimationFrame` 제거하고 `onEntered` 콜백 시점(웹/RN 공통)으로 통일 → iOS Safari에서 여전히 막힐 수 있음
  3. RN webview는 네이티브 측 `keyboardDisplayRequiresUserAction={false}` 설정 필요 → **네이티브 팀 조율 필수**
- **검증 방법**: iOS Safari(실기기), iOS 인앱 WebView, Android Chrome에서 ‘+ 친구추가’ 탭 시 키보드 즉시 표시. `keyboardInset` 보정 동작 확인
- **리스크/주의**
  - iOS Safari 보안 제약상 비동기 focus 무시
  - dummy-input 패턴은 스크린리더 영향 검토 필요
  - RN `keyboardDisplayRequiresUserAction` 변경은 네이티브 빌드 동반

---

### F-10 · ‘친구 추가하기’ 버튼 무반응

- **영향 범위**
  - `apps/web/src/pages/community/ui/CommunityEmptyState.tsx`
  - `apps/web/src/pages/community/ui/CommunityPage.tsx:127–129`
- **현재 상태**
  - `CommunityPage.tsx:128` → `onExploreFriends={() => push('FriendRequest', {})}`
  - 빈 상태 버튼 라벨 `CommunityEmptyState.tsx:32` → ‘친구 탐색하기’
  - **요구사항(‘친구 추가하기’ 클릭 시 F-09 시트 표시)과 라벨/동작 모두 불일치**
- **해결 단계**
  1. PM 확정 — 빈 상태 버튼 라벨을 ‘친구 추가하기’로 통일할지, 추가/탐색 두 버튼 분리할지 결정
  2. `CommunityPage.tsx`에서 `onExploreFriends` 핸들러를 `() => setIsAddFriendBottomSheetOpen(true)`로 교체 (F-09 시트 호출)
  3. 라벨 변경 시 `CommunityEmptyState` 버튼 텍스트 동기화. props 시그니처 `onExploreFriends` → `onAddFriend` 리네이밍 권장 (슬라이스 내부 변경)
  4. 기존 `FriendRequest` 라우트 진입 경로는 별도 엔트리(예: ‘친구 요청 보기’)로 분리 또는 보류
- **검증 방법**: 친구가 0명일 때 버튼 탭 → `AddFriendBottomSheet` 오픈, F-09 키보드 동작도 동시 작동
- **리스크/주의**: F-09와 같은 트리거 경로 공유 → iOS 키보드 제약 동일 적용. `FriendRequest` 진입 경로 사라지지 않는지 확인

---

### F-11 · 친구 카드 클릭 비활성화

- **영향 범위**
  - `apps/web/src/pages/community/ui/CommunityFriendGrid.tsx`
  - 라우트 정의 `apps/web/src/app/routes/stackflow.ts:61,86` (수정 불요)
- **현재 상태**: `CommunityFriendGrid.tsx:65–67` → `onClick={() => push('FriendDetail', {}, { animate: true })}`
- **해결 단계**
  1. `CommunityFriendCard`의 `<button>`을 `<div>` 또는 `<button disabled>`로 변경, `onClick`/`useFlow` 임포트 제거
  2. 시각 변화 없도록 button 스타일 유지
  3. 라우트 자체는 유지 (추후 재활성 대비), `stackflow.ts` 수정 불필요
  4. 접근성: `role`/`aria-disabled` 부여
- **검증 방법**: 친구 카드 탭 → 라우트 미진입, 콘솔 에러 없음, 시각 상태 동일
- **리스크/주의**: 임시 비활성이므로 향후 복원 위해 push 호출은 주석보다 git history 의존이 깔끔. `useFlow` import 미제거 시 lint 경고

---

## ✅ 마이페이지

### F-12 · 마이페이지 nav바 + 문의하기 2건

- **영향 범위**
  - `apps/web/src/pages/mypage/ui/MyPage.tsx`
  - `apps/web/src/widgets/otherListList/OtherLinkList.tsx`
- **현재 상태**
  - `MyPage.tsx:23-28` → `backButton`이 이미 `BackArrow` 아이콘으로 선언되어 있으나, F-01의 `height:'44px'`로 시각적 누락 가능
  - `OtherLinkList.tsx:9-26` → `BallogInstagramList`, `개인정보 처리방침`, `서비스 이용약관` 3개만 존재. **‘문의하기’ 항목 없음**
- **해결 단계**
  1. F-01에서 appBar 높이를 48px로 통일하면 `backButton` 정상 노출됨. 필요 시 `BackArrow` 색상/사이즈 토큰 점검 (`MyPage.tsx:25`)
  2. `OtherLinkList.tsx`에 `List type="arrow"` 컴포넌트로 ‘문의하기’ 항목 추가. `onClick`에서 `window.location.href = 'mailto:<볼로그 구글 계정>'` 또는 `<a href="mailto:...">` 래퍼
  3. 메일 주소 상수화: `apps/web/src/shared/config/contact.ts`에 `BALLOG_SUPPORT_EMAIL` 상수 추가 후 import
  4. 항목 순서는 디자인 기준에 맞춰 `BallogInstagramList` → 문의하기 → 약관 순으로 배치 검토
- **검증 방법**
  - 마이페이지 진입 시 좌상단 `←` 클릭으로 `pop()` 동작
  - ‘문의하기’ 클릭 시 모바일/데스크톱에서 기본 메일 클라이언트가 수신자 자동 채워진 채로 열림
- **리스크/주의**
  - iOS Safari `mailto:` 동작 차이, 메일 앱 미설치 환경 fallback
  - **구글 계정 이메일은 PM 확정값 필요** (추측 금지)

---

## 🗂️ 작업 추천 순서

1. **F-01** (공통 nav바 통일) → F-12 backButton 가시화의 선행 조건
2. **F-02 / F-03** (로그인) — 독립적, 병렬 가능
3. **F-04 / F-05 / F-06** (홈+실시간) — 피그마 수치 확보 후 묶음 작업
4. **F-07** (경기 일정) — 캘린더 컴포넌트 단독 변경
5. **F-08 / F-11** (커뮤니티 단순 변경) — 빠른 처리
6. **F-09 / F-10** (커뮤니티 친구추가) — iOS 키보드 제약 검증 동반, 페어로 처리
7. **F-12** (마이페이지) — F-01 완료 후 검증

---

## 🚨 사전 확인 필요 사항 (PM/디자인)

| 항목 | 확인 대상 |
| --- | --- |
| F-01 | 피그마 nav바 정확한 px |
| F-02-A | 로그인 전용 그린 로고 SVG 존재 여부 / 정확한 크기 |
| F-02-C | 다크모드에서도 애플 버튼 라이트와 동일 색상이 의도인지 |
| F-04 | 캐릭터 섹션 상하 여백 px |
| F-05 | 그래프 회색 트랙의 정확한 hex (또는 토큰명) |
| F-06 | `EmotionCard` 모든 호출처에서 `%` → `번` 변경 의도인지 |
| F-08 | 시트 높이 작은 디바이스(SE) 대응 가이드 |
| F-09 | RN `keyboardDisplayRequiresUserAction` 변경 가능 여부 (네이티브 팀) |
| F-10 | 빈 상태 버튼 라벨 (‘친구 추가하기’ vs ‘친구 탐색하기’) 및 `FriendRequest` 진입 경로 |
| F-12 | 볼로그 공식 지원 메일 주소 |

---

# E.O.D
