# AGENT.md — Ballog Frontend

AI 에이전트 및 개발자를 위한 프로젝트 컨텍스트 문서입니다.
코드 작성, 리뷰, 리팩터링 전에 이 문서를 먼저 읽으세요.

---

## 1. 프로젝트 개요

**Ballog**는 야구 직관(현장 관람) 기록 앱입니다.
사용자가 경기를 직접 보면서 실시간으로 감정을 기록하고, 친구들과 감정을 공유하는 모바일 웹앱입니다.

### 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript 5.8 |
| 빌드 | Vite 6, pnpm workspace (모노레포) |
| 라우팅/내비게이션 | Stackflow (iOS Cupertino 테마) |
| 서버 상태 | TanStack Query v5 |
| 스타일 | Tailwind CSS v4, CVA, clsx |
| UI 컴포넌트 | Radix UI, shadcn/ui, Framer Motion |
| HTTP | ky |
| 날짜 | date-fns, date-fns-tz |
| 애니메이션 | Lottie React |
| 차트 | Recharts |
| 캐러셀 | Embla Carousel |
| 모킹 | MSW v2 |
| 테스트 | Vitest, Playwright, Testing Library |
| 스토리북 | Storybook 9 |

### 모노레포 패키지 구조

```
ballog-front/
├── apps/
│   └── web/                        # 메인 React 앱
└── packages/
    ├── asset/                      # SVG 아이콘, 이미지 에셋
    ├── bridge/                     # 네이티브(RN) ↔ 웹 브릿지
    ├── live-recording-machine/     # FSM 코어 라이브러리 (순수 TS)
    ├── eslint/                     # 공유 ESLint 설정
    ├── tsconfig/                   # 공유 TypeScript 설정
    └── util/                       # 공유 유틸리티
```

---

## 2. fix/build 브랜치 주요 작업 요약

이 브랜치는 `develop` 대비 다음 기능을 구현합니다.

### 2-1. 홈 V2 페이지 (`HomePageV2`)
- 기존 `HomePage`(경기 일정 중심)를 대체하는 새 홈 화면
- 감정 캐릭터(`CharacterSection`)가 현재 감정 상태(POSITIVE/NEGATIVE/없음)에 따라 변화
- 오늘의 주요 경기(`TodayMatchCard`) 표시, 로딩 중에는 스켈레톤 UI
- 현재 라우트 기준: `Home` → `HomePageV2`, `MatchSchedule` → 기존 `HomePage`

### 2-2. 커뮤니티 기능 전체 구현 (⚠️ API 미연동 — 목데이터 상태)
- 팀 순위 + 친구 감정 현황 대시보드
- 친구 목록 그리드, 빈 상태(CTA), KBO 순위 바텀시트
- 친구 추가 바텀시트 (키보드 자동 오픈, `visualViewport` 기반 키보드 인셋)
- 신고 바텀시트
- 친구 상세 페이지, 친구 요청 페이지
- 친구 프로필 사진 바텀시트

### 2-3. 라이브 레코딩 FSM 리팩터링
- `@ballog/live-recording-machine` 워크스페이스 패키지로 FSM 코어 분리
- `LiveRecordRuntime` 클래스로 이벤트 큐/구독 관리
- `useSyncExternalStore` 기반 React 구독
- Command 패턴으로 사이드이펙트(API 호출) 분리

### 2-4. 바텀시트 포탈 시스템
- `BottomSheetModal.PortalBottomSheet`: `createPortal`로 `document.body`에 마운트
- CSS transition 기반 슬라이드 업/다운 애니메이션 (300ms)
- Stackflow 레이어 z-index 충돌 해결

### 2-5. 기타
- KBO 10개 구단 상수 및 아이콘 매핑 (`TEAMS`, `SHORT_TEAM_NAMES`, `TEAM_ICONS`)
- `scrollbar-hidden` Tailwind 유틸 추가
- `.gitignore`에 AI 도구 설정 디렉터리 추가 (`.claude/`, `.omc/`)

---

## 3. 아키텍처 패턴

### 3-1. FSM (유한 상태 머신) — 라이브 레코딩

라이브 레코딩의 복잡한 상태 전이를 FSM으로 모델링합니다.

**상태 전이도:**
```
new → recording ⇄ updating → terminate
              ↓
           error → (retry or terminate)
```

**상태 목록:**

| 상태 | 의미 |
|------|------|
| `new` | 초기 로딩, 녹화 데이터 조회 중 |
| `recording` | 활성 녹화, 3초 폴링 |
| `updating` | 감정 업데이트 API 호출 중 |
| `error` | API 실패, 재시도 대기 |
| `terminate` | 경기 종료 또는 시간 만료 |

**이벤트 목록 (외부 → FSM):**

`INIT`, `RECORDING_FOUND`, `RECORDING_NOT_FOUND`, `CREATE_SUCCESS`, `CREATE_FAIL`,
`EMOTION_CLICK`, `POLL_TICK_3S`, `UPDATE_SUCCESS`, `UPDATE_FAIL`,
`TIME_EXPIRED`, `GAME_ENDED`, `RETRY`, `RETRY_EXHAUSTED`

**Command 목록 (FSM → 외부):**

`FETCH_OR_CREATE_RECORDING`, `CREATE_RECORDING`, `START_UPDATE_FROM_CLICK`,
`START_UPDATE_FROM_POLL`, `SCHEDULE_RETRY`, `DO_TERMINATE`

**파일 위치:**

```
packages/live-recording-machine/       ← 순수 TS, React 의존 없음
  src/types.ts                         ← 이벤트/커맨드/스냅샷 타입 정의
  src/context.ts                       ← LiveRecordingContext (상태 머신 코어)
  src/factory.ts                       ← createLiveRecordingMachine()
  src/states/                          ← 상태별 클래스 (State 패턴)
    NewState.ts
    RecordingState.ts
    UpdatingState.ts
    ErrorState.ts
    TerminateState.ts

apps/web/src/pages/live-recording/
  hooks/machine/LiveRecordRuntime.ts               ← 이벤트 큐 + 구독 관리
  hooks/machine/useLiveRecordingMachine.ts         ← React Hook (useSyncExternalStore)
  hooks/machine/createLiveRecordCommandExecutor.ts ← API 사이드이펙트 처리
  contexts/LiveRecordingMachineContext.tsx          ← Context Provider
```

### 3-2. Command 패턴 — FSM 사이드이펙트 분리

FSM은 순수하게 상태 전이만 담당합니다.
API 호출 등 사이드이펙트는 `Command`로 표현되어 `CommandExecutor`가 실행합니다.

```
사용자 클릭
  → runtime.send({ type: 'EMOTION_CLICK', emotion })
  → FSM: recording → updating, Command 반환 [START_UPDATE_FROM_CLICK]
  → CommandExecutor: API 호출
  → 결과 이벤트 [UPDATE_SUCCESS | UPDATE_FAIL] → runtime.send()
  → FSM 상태 전이 → React 리렌더
```

### 3-3. Portal 패턴 — 바텀시트

Stackflow 스크린 레이어 위에 바텀시트를 렌더링하기 위해 `createPortal`을 사용합니다.

```tsx
// PortalBottomSheet: document.body에 z-index 80으로 마운트
createPortal(<div className="fixed inset-0 z-[80]">...</div>, document.body)
```

**사용 방법:**
```tsx
<BottomSheetModal.PortalBottomSheet
  open={isOpen}
  onOutsideClick={() => setIsOpen(false)}
  onEntered={() => { /* 애니메이션 완료 후 콜백 */ }}
  onExited={() => { /* 언마운트 전 정리 */ }}
>
  <BottomSheetModal.Root open={isOpen} onOpenChange={setIsOpen}>
    <BottomSheetModal.Text heading="제목" body="설명" />
    <BottomSheetModal.Buttons buttons={[...]} />
  </BottomSheetModal.Root>
</BottomSheetModal.PortalBottomSheet>
```

### 3-4. Feature-Sliced Design (FSD) 계층

```
apps/web/src/
  app/        ← 앱 초기화, 라우팅 설정 (stackflow.ts)
  pages/      ← 페이지 단위 (Stackflow Activity)
  widgets/    ← 페이지 간 공유 복합 컴포넌트 (GlobalNavigationBar 등)
  features/   ← 기능 단위 (home, auth, record, match, fcm...)
  entities/   ← 도메인 모델 단위 (auth, match, record...)
  shared/     ← 공유 유틸, 공통 UI, 상수, 훅
```

---

## 4. 주요 컴포넌트 구조

### 4-1. 커뮤니티 (`apps/web/src/pages/community/ui/`)

```
CommunityPage.tsx               ← 진입점, 팀 순위 + 친구 목록
├── HomeHeaderV2                ← 공유 헤더 (닉네임, 알림, 프로필)
├── CommunityRankTooltipPopover ← 순위 정보 팝오버
├── CommunityFriendGrid         ← 친구 카드 그리드 (감정 배지)
├── CommunityEmptyState         ← 친구 없을 때 빈 상태 + CTA
├── KBORankBottomSheet          ← KBO 전체 리그 순위 (포탈)
└── AddFriendBottomSheet        ← 닉네임 검색으로 친구 추가 (포탈 + 키보드 인셋)

FriendDetailPage.tsx            ← 친구 상세 (감정 히스토리)
├── FriendPhotoBottomSheet      ← 친구 사진 뷰어 (포탈)
└── ReportBottomSheet           ← 신고 (포탈)

FriendRequestPage.tsx           ← 친구 요청 목록
└── FriendRequestListItem       ← 요청 항목 (수락/거절)
```

### 4-2. 홈 V2 (`apps/web/src/pages/home/ui/HomePageV2.tsx`)

```
HomePageV2
├── HomeHeaderV2                ← 닉네임, 알림 버튼, 프로필 이동
├── HomeContentV2
│   ├── CharacterSection        ← 감정별 캐릭터 SVG + 말풍선 + 배지
│   ├── TodayMatchCardSkeleton  ← 로딩 스켈레톤
│   ├── TodayMatchCard          ← 오늘 경기 카드 (감정 기록 버튼 포함)
│   └── NoMatchCard             ← 경기 없는 날
└── GlobalNavigationBar
```

**감정 설정 (`EMOTION_CONFIG`, `apps/web/src/features/home/constants/emotionConfig.ts`):**

| 키 | 캐릭터 | 레이블 |
|----|--------|--------|
| `none` | `NoEmotionCharacter` | 감정없음 |
| `POSITIVE` | `HappyEmotionCharacter` | 기쁨 |
| `NEGATIVE` | `AngryEmotionCharacter` | 화남 |

### 4-3. 라이브 레코딩 (`apps/web/src/pages/live-recording/`)

```
LiveRecordPage (ActivityComponentType)
└── LiveRecordProvider (matchId Context)
    └── EmotionVoteProvider (감정 퍼센트 상태)
        └── LiveRecordingMachineProvider (FSM Context)
            └── LiveRecordPageContent
                ├── Loading (state === 'new')
                ├── MyTeamContent (isMyTeam === true)
                │   ├── GameInfoCard
                │   ├── EmotionVoteWidget (Lottie 애니메이션)
                │   └── RecordCameraButton
                └── OtherTeamLiveRecordPage (isMyTeam === false)
```

> **Provider 순서가 중요합니다.** `LiveRecordingMachineProvider`는 `EmotionVoteProvider` 안에 있어야
> Command Executor에서 `setEmotionPercent`를 참조할 수 있습니다.

### 4-4. 바텀시트 컴포넌트 (`apps/web/src/shared/ui/common/BottomSheetModal/`)

| 컴포넌트 | 역할 |
|----------|------|
| `PortalBottomSheet` | `createPortal` 래퍼, 슬라이드 애니메이션, 오버레이 |
| `Root` | 바텀시트 콘텐츠 컨테이너 |
| `Text` | heading + body 텍스트 영역 |
| `Image` | 이미지 영역 |
| `Buttons` | 2-버튼 하단 액션 영역 |

---

## 5. 라우팅

Stackflow `historySyncPlugin`으로 URL과 Activity를 동기화합니다.
인증이 필요한 Activity는 `withAuth(Component)` HOC로 래핑합니다.

| Activity | URL 패턴 | 컴포넌트 |
|----------|----------|----------|
| `Home` | `/` | `HomePageV2` |
| `MatchSchedule` | `/match-schedule` | `HomePage` (기존) |
| `Community` | `/community` | `CommunityPage` |
| `FriendDetail` | `/community/friend-detail` | `FriendDetailPage` |
| `FriendRequest` | `/community/friend-request` | `FriendRequestPage` |
| `LiveRecord` | `/live-record/:matchId` | `LiveRecordPage` |
| `Record` | `/record` | `RecordMainPage` |
| `RecordDetail` | `/record/:matchRecordId` | `RecordDetailPage` |
| `My` | `/mypage` | `MyPage` |
| `Login` | `/login` | `LoginPage` |
| `OnBoarding` | `/onboarding` | `OnBoardingPage` |

---

## 6. 개발 가이드

### 6-1. 로컬 개발

```bash
# 패키지 설치 (루트에서)
pnpm install

# 개발 서버 실행
pnpm --filter web dev

# 빌드
pnpm --filter web build

# 린트
pnpm --filter web lint

# 테스트
pnpm --filter web test

# 스토리북
pnpm --filter web storybook
```

### 6-2. 코드 컨벤션

**파일 네이밍:**
- 컴포넌트: `PascalCase.tsx`
- 훅: `useCamelCase.ts`
- 상수/타입: `camelCase.ts` 또는 `camelCase.type.ts`

**컴포넌트 작성:**
- `export const ComponentName = () => {}` (named export 권장)
- 페이지 컴포넌트(Activity)만 `export default`
- Props 인터페이스는 컴포넌트 파일 상단에 선언

**Tailwind:**
- v4 사용, CSS 변수 기반 디자인 토큰 (`--color-usage-*`, `--color-brand-*`)
- 스크롤바 숨김이 필요한 컨테이너에 `scrollbar-hidden` 유틸 적용
- 라이트/다크 모드는 `light:` variant 사용

**커밋 컨벤션 (gitmoji):**
- `✨ Feat :` 새 기능
- `♻️ Refactor :` 리팩터링
- `💄 Style :` UI/스타일 변경
- `🐛 Fix :` 버그 수정
- `📝 Docs :` 문서

### 6-3. 새 바텀시트 추가 방법

1. `pages/<domain>/ui/` 에 `XxxBottomSheet.tsx` 생성
2. Stackflow 레이어 위에 띄워야 하면 `BottomSheetModal.PortalBottomSheet` 사용
3. 일반 인라인 바텀시트는 `BottomSheetModal.Root` 단독 사용
4. 키보드가 올라오는 입력 바텀시트는 `visualViewport` resize 이벤트로 `keyboardInset` 계산
   → `apps/web/src/pages/community/ui/AddFriendBottomSheet.tsx` 참고

### 6-4. 새 FSM 상태/이벤트 추가 방법

1. `packages/live-recording-machine/src/types.ts` 에 상태/이벤트/커맨드 타입 추가
2. `packages/live-recording-machine/src/states/` 에 `XxxState.ts` 클래스 생성
3. 관련 상태의 `handle()` 메서드에 전이 로직 추가
4. `apps/web/src/pages/live-recording/hooks/machine/createLiveRecordCommandExecutor.ts`
   에 새 Command 핸들러 추가

### 6-5. 구단 상수 사용

```ts
import {
  TEAMS,
  SHORT_TEAM_NAMES,
  TEAM_ICONS,
  type TeamKey,
} from '@/shared/constants/teams'

TEAMS['LOTTE_GIANTS']            // → '롯데 자이언츠'
SHORT_TEAM_NAMES['LOTTE_GIANTS'] // → '롯데'
TEAM_ICONS['LOTTE_GIANTS']       // → LotteIcon (SVG 컴포넌트 | null)
```

---

## 7. 알려진 이슈 (fix/build 브랜치 기준)

> 아래 이슈들은 이 브랜치가 develop에 머지되기 전에 해결되어야 합니다.

| 우선순위 | 위치 | 이슈 |
|----------|------|------|
| 🔴 Critical | `FriendDetailPage.tsx`, `CommunityEmptyState.tsx` | Figma MCP 임시 에셋 URL 13개 사용 — 프로덕션에서 이미지 깨짐 |
| 🔴 Critical | `CommunityPage.tsx:56`, `FriendDetailPage.tsx:107` | `Math.random()`으로 UI 상태 결정 — 매 마운트마다 랜덤 UI |
| 🔴 보안 | `apps/web/.env:3` | Kakao REST API Key가 `VITE_` 접두사로 번들에 포함됨 |
| 🟡 High | `useSocialLogin.ts:80-89` | 비RN 환경에서 가짜 토큰으로 인증 우회 경로 (DEV 환경 게이팅 필요) |
| 🟡 High | `scheduleRetryCommand.ts` | 재시도 딜레이 없음 — API 실패 시 즉시 3회 연속 호출 |
| 🟡 High | 커뮤니티 전체 | 하드코딩된 목데이터가 컴포넌트 파일 내에 위치, API 미연동 |
| 🟡 High | 커뮤니티 전체 | 클릭 핸들러가 `() => {}`로 no-op (알림, 친구 요청, 신고 등) |
| 🟠 Medium | `auth.api.ts:16,62` | URL 경로/쿼리에 사용자 입력 미인코딩 (`encodeURIComponent` 필요) |
| 🟠 Medium | `AddFriendBottomSheet` | 닉네임 입력 유효성 검사 없음 |
| 🟠 Medium | `LiveRecordRuntime.ts:128` | 커맨드 실행 실패 시 FSM에 에러 이벤트 미전달 |

---

## 8. 주의 사항

- **MSW 모킹:** `apps/web/src/mocks/` 에 핸들러가 있습니다. 개발 중 API가 없을 때 자동으로 목 데이터를 반환합니다. **프로덕션 빌드에서 MSW 서비스워커가 포함되지 않도록 반드시 확인하세요.**
- **브릿지(Bridge):** `@ballog/bridge` 패키지로 React Native 환경 감지 및 네이티브 기능을 호출합니다. `useBridge()` 훅에서 `isRNEnvironment`를 확인하세요.
- **Stackflow z-index:** AppScreen 내부 레이어와 Portal z-index 충돌에 주의합니다. `PortalBottomSheet`는 `z-[80]`을 사용합니다.
- **FSM 패키지 빌드:** `@ballog/live-recording-machine`은 `"main": "index.ts"` (소스 직접 참조)이므로 별도 빌드 단계가 없습니다.
- **온보딩 처리:** `localStorage.getItem('onBoarding')` 값이 없으면 첫 진입 시 `/onboarding`으로 리다이렉트됩니다.
- **`@ballog/asset` 아이콘:** 모든 SVG 아이콘은 이 패키지에서 import합니다. 직접 `src/assets/`에 SVG를 추가하는 것은 공유 불가 아이콘에만 허용합니다.
- **API URL:** `.env`의 `VITE_PUBLIC_API_URL`이 현재 `http://`로 설정되어 있습니다. 프로덕션 배포 전 `https://`로 변경하세요.
