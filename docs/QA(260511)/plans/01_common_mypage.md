# [작업 1] 공통 nav바 + 마이페이지

| 항목 | 내용 |
| --- | --- |
| 담당 범위 | F-01, F-12 |
| 우선순위 | F-01 🔴 High → F-12 🟡 Medium |
| 선행 조건 | 없음 (다른 작업의 선행 조건임) |
| 원문 | [QA(260511).md](../QA(260511).md) |

> **주의**: F-01과 F-12는 모두 `MyPage.tsx`를 만지므로 **반드시 같은 에이전트가 순서대로 처리**합니다.
> F-01 → F-12 순서로 작업하세요 (F-01 후에 backButton이 시각적으로 노출됨).

---

## F-01 · 상단 nav바 높이 조정

- **AS IS**: nav바 높이가 피그마 디자인보다 낮게 구현됨
- **TO BE**: 피그마 디자인 기준 높이에 맞게 조정

### 영향 범위
- `apps/web/src/widgets/header/ui/Header.tsx`
- `apps/web/src/widgets/header/ui/HomeHeaderV2.tsx`
- `apps/web/src/pages/mypage/ui/MyPage.tsx` (appBar height 불일치 — F-12와 연관)
- 그 외 `appBar` 사용처 전수 (페이지마다 height 값 혼재)

### 현재 상태
- `Header.tsx:19` → `h-14 flex items-center ...` (56px)
- `HomeHeaderV2.tsx:17` → `... h-14 shrink-0` (56px)
- 다른 페이지 stackflow `appBar.height: '48px'` (예: `LoginPage.tsx:15`, `AlermPage.tsx:19`)
- `MyPage.tsx:29`만 `'44px'`로 불일치 → F-12 “버튼 없음” 시각 누락 원인일 가능성

### 해결 단계
1. 피그마 디자인에서 상단 nav바 정확한 픽셀 값 확인 (기준 캡처 필요)
2. `Header.tsx`, `HomeHeaderV2.tsx`의 `h-14` 토큰을 피그마 기준(예: `h-12`=48px)으로 변경
3. stackflow `appBar.height` 값을 피그마 기준으로 통일 (혼재된 `44px`/`48px`을 단일 값으로)
4. `appBar` 사용처 전수 확인: `grep -rn "appBar" apps/web/src`로 모두 찾아 `height` 키 일괄 동기화

### 검증 방법
- 홈/마이/기록/친구 등 모든 라우트에서 DevTools로 헤더 픽셀 측정 → 피그마와 일치
- iOS notch(safe-area-inset) 환경 회귀 확인
- 라이트/다크 모드 모두 확인

### 리스크/주의
- `Header.tsx`는 공통 컴포넌트로 모든 파생 페이지 레이아웃에 영향
- `MyPage.tsx:32` `pb-27.5` 등 헤더 높이에 맞춰진 하단 패딩 재검토 필요
- 사전 확인: **PM/디자인 — 피그마 nav바 정확한 px**

---

## F-12 · 마이페이지 nav바 + 문의하기 추가

| 항목 | AS IS | TO BE |
| --- | --- | --- |
| 상단 nav바 좌측 | 버튼 없음 | 뒤로가기(`←`) 버튼 추가 |
| 기타 메뉴 | '문의하기' 항목 없음 | '문의하기' 추가 → 클릭 시 볼로그 구글 계정 이메일 작성 페이지로 외부 이동 |

### 영향 범위
- `apps/web/src/pages/mypage/ui/MyPage.tsx`
- `apps/web/src/widgets/otherListList/OtherLinkList.tsx`
- (신규) `apps/web/src/shared/config/contact.ts` 또는 유사 위치에 메일 상수

### 현재 상태
- `MyPage.tsx:23-28` → `backButton`이 이미 `BackArrow` 아이콘으로 선언됨. 단 F-01의 `height:'44px'` 때문에 시각적 누락 가능
- `OtherLinkList.tsx:9-26` → `BallogInstagramList`, `개인정보 처리방침`, `서비스 이용약관` 3개만 존재. **‘문의하기’ 없음**

### 해결 단계
1. **선행**: F-01 완료로 appBar 높이를 48px로 통일하면 `backButton` 정상 노출. 필요 시 `BackArrow` 색상/사이즈 토큰 점검 (`MyPage.tsx:25`)
2. `OtherLinkList.tsx`에 `List type="arrow"` 컴포넌트로 ‘문의하기’ 항목 추가
   - onClick: `window.location.href = 'mailto:<볼로그 구글 계정>'`
   - 또는 `<a href="mailto:...">` 래퍼 사용
3. 메일 주소 상수화: `apps/web/src/shared/config/contact.ts`에 `BALLOG_SUPPORT_EMAIL` 상수 추가 후 import (FSD 경계: `shared`)
4. 항목 순서는 디자인 기준에 맞춰 `BallogInstagramList` → 문의하기 → 약관 순으로 배치 검토

### 검증 방법
- 마이페이지 진입 시 좌상단 `←` 클릭으로 `pop()` 동작 확인
- ‘문의하기’ 클릭 시 모바일/데스크톱에서 기본 메일 클라이언트가 수신자 자동 채워진 채로 열림
- iOS Safari에서 `mailto:` 동작 확인

### 리스크/주의
- iOS Safari `mailto:` 동작 차이, 메일 앱 미설치 환경 fallback
- **사전 확인: PM — 볼로그 공식 지원 메일 주소** (추측 금지)

---

## 작업 체크리스트

- [ ] 피그마 nav바 px 확인
- [ ] `Header.tsx` 높이 수정
- [ ] `HomeHeaderV2.tsx` 높이 수정
- [ ] 모든 페이지 `appBar.height` 통일
- [ ] `MyPage.tsx` appBar 높이 정상화 → backButton 노출 확인
- [ ] PM에서 지원 메일 주소 컨펌
- [ ] `shared/config/contact.ts` 상수 추가
- [ ] `OtherLinkList.tsx`에 ‘문의하기’ 항목 추가
- [ ] `pnpm --filter web typecheck && lint` 통과
- [ ] 모든 페이지 헤더 높이 회귀 테스트
