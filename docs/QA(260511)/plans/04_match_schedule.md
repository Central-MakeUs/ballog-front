# [작업 4] 경기 일정 UI 5건

| 항목 | 내용 |
| --- | --- |
| 담당 범위 | F-07 (5개 세부) |
| 우선순위 | 🟡 Medium |
| 선행 조건 | 없음 |
| 원문 | [QA(260511).md](../QA(260511).md) |

---

## F-07 · 경기 일정 UI 5건

| # | 항목 | AS IS | TO BE |
| --- | --- | --- | --- |
| 1 | 배경색 | 흰색 | `#EEEEEE` (날짜 선택바 하단 영역) |
| 2 | 날짜 정렬 | 오늘이 좌측에 위치 | 선택한 날짜(기본값: 오늘)가 탭 중앙에 위치 |
| 3 | 선택 날짜 표시 | 밑줄 없음 | 선택한 날짜 하단에 밑줄 표시 |
| 4 | 경기 시작 시간 | `HH:MM:SS` | `HH:MM` |
| 5 | 안내 문구 | "감정을 **공유**해보세요" | "감정을 **기록**해보세요" |

### 영향 범위
- `apps/web/src/pages/home/ui/HomePage.tsx` (페이지 루트 래퍼)
- `apps/web/src/features/calendar/ui/CalendarWeekContent.tsx` (주간 7일 배열 생성)
- `apps/web/src/features/calendar/ui/CalendarWeekCarousel.tsx` (주 단위 캐러셀 인덱스 계산)
- `apps/web/src/features/calendar/ui/CalendarWeekButton.tsx` (선택 강조 표시)
- `apps/web/src/shared/ui/common/Card/HomeCard/HomeCardDetailInfo.tsx` (`경기시작 {dateTime}` 출력, L26)
- `apps/web/src/features/match/ui/MatchSection.tsx` (안내 문구, L27)

### 현재 상태
1. `HomePage.tsx:67-78` → `AppScreen` 하위에 별도 배경 컨테이너 없음. 시스템 토큰 `--color-usage-background-default: #ffffff` (`global.css:94`) 사용
2. `CalendarWeekContent.tsx:16-19` → `getWeekDates`는 `startOfWeek(date, { weekStartsOn: 0 })`로 일요일부터 7칸을 채움 → **오늘이 좌측에 치우침**
3. `CalendarWeekButton.tsx:22-46` → `isActive`일 때 `text-brand-primary-default`만 적용, **밑줄 없음**
4. `HomeCardDetailInfo.tsx:26` → `경기시작 {dateTime}` 그대로 출력. `mocks/data/match.ts:11`에서 `'18:30:00'` 포맷
5. `MatchSection.tsx:27` → `['오늘의 경기를 선택하고', '감정을 공유해보세요']`

### 해결 단계

#### 1. 배경색
- `HomePage.tsx`의 `<DateProvider>` 또는 `<div>` 래퍼 (L44)에 `className="bg-[#EEEEEE]"` (또는 light/dark 토큰 분기) 추가
- CalendarHeader 자체는 흰색 유지 요구면 `CalendarHeader` 컨테이너에만 `bg-white` 명시
- **`--color-usage-background-default` 전역 토큰 변경은 영향 큼** → 페이지 컨테이너에 임시 클래스로 격리 권장

#### 2. 날짜 중앙 정렬
- `CalendarWeekContent`의 `getWeekDates`를 `addDays(date, i - 3)` (i=0..6)으로 변경해 기준일을 중앙(index 3)에 배치
- `CalendarWeekCarousel`의 `differenceInWeeks` 인덱스 산식은 그대로 두는 것이 변경량 최소
- 셀이 `text-center`로 균등 분할되므로 추가 `scrollIntoView`/`transform` 불필요

#### 3. 선택 밑줄
- `CalendarWeekButton.tsx`에서 날짜 숫자 `<span>` (L35-46)에 다음 중 하나 적용:
  - `isActive && 'underline underline-offset-4 decoration-2 decoration-brand-primary-default'`
  - 또는 하단에 `<div className="h-0.5 w-4 bg-brand-primary-default mt-0.5" />` 추가

#### 4. 시간 포맷
- `HomeCardDetailInfo.tsx`에서 `dateTime?.split(':').slice(0, 2).join(':')`로 절단
- 백엔드가 `HH:MM`으로 바뀌어도 안전
- 더 안전하게는 `match.api.ts` 응답 매퍼에서 `matchesTime` 정규화 가능 (한 곳 수정이 가장 간결 → 컴포넌트 권장)

#### 5. 문구
- `MatchSection.tsx:27` `'공유해보세요'` → `'기록해보세요'`

### 검증 방법
- `pnpm --filter web dev` → `/match-schedule` 진입
- 오늘/지난주/다음주로 캐러셀 스와이프 시 선택일이 항상 가운데 칸(index 3) 표시
- 밑줄 동작 확인
- 라이트/다크 모드 토글로 `#EEEEEE` 적용 영역(달력 하단 ~ 카드 캐러셀 사이) 확인
- mock `'18:30:00'` → `"경기시작 18:30"` 렌더 확인
- `pnpm --filter web typecheck && lint` 통과

### 리스크/주의
- 중앙 정렬 변경 시 요일 헤더 텍스트가 셀별로 달라짐 → `weekday: 'short'`가 셀마다 출력되므로 OK
- `scrollIntoView`는 카드 캐러셀 영역에 영향 줄 수 있어 비권장
- `transform: translateX`는 grid 균등 분할이 깨져 부적합
- `#EEEEEE` 하드코딩보다 토큰 사용이 이상적이나, 디자인 의도가 “경기일정 화면 한정”이면 페이지 컨테이너에 임시 클래스로 격리

---

## 작업 체크리스트

- [ ] `HomePage.tsx`에 `bg-[#EEEEEE]` 적용 (페이지 한정)
- [ ] `getWeekDates` 중심 정렬로 변경 (`addDays(date, i - 3)`)
- [ ] `CalendarWeekCarousel` 인덱스 산식 회귀 확인
- [ ] `CalendarWeekButton` isActive 밑줄 추가
- [ ] `HomeCardDetailInfo.tsx` 시간 포맷 절단
- [ ] `MatchSection.tsx` 문구 변경
- [ ] 캐러셀 스와이프 정상 동작 확인
- [ ] 라이트/다크 모드 배경색 확인
- [ ] `pnpm --filter web typecheck && lint` 통과
