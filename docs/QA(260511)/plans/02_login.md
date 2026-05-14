# [작업 2] 로그인/회원가입

| 항목 | 내용 |
| --- | --- |
| 담당 범위 | F-02 (3건), F-03 |
| 우선순위 | 🟡 Medium |
| 선행 조건 | 없음 |
| 원문 | [QA(260511).md](../QA(260511).md) |

---

## F-02 · 로그인 화면 3건 (라이트 모드)

### F-02-A · 로고 색상/크기

| | 내용 |
| --- | --- |
| AS IS | 색상·크기 불일치 |
| TO BE | 초록색 로고, 피그마와 동일한 크기 |

#### 영향 범위
- `apps/web/src/assets/BallogAppBar.tsx`
- `apps/web/src/pages/auth/ui/LoginPage.tsx`
- (가능 시) `@ballog/asset` 그린 로고 variant

#### 현재 상태
- `BallogAppBar.tsx:14` → `theme === 'dark' ? WhiteBallogLogo : ColoredBallogLogo`
- `BallogAppBar.tsx:16` → `cn('h-16 w-auto', className)` 고정 64px
- `LoginPage.tsx:13` → `appBar.height: '48px'` 인데 로고 `h-16`(64px) → **컨테이너 초과**
- `ColoredBallogLogo.tsx:3` → 텍스트 `fill="#212121"`(검정), 심볼만 `#36C1B3` → “초록색 로고” 요구와 불일치

#### 해결 단계
1. 피그마에서 로그인 AppBar 로고 색상 토큰(`brand-primary-*`)·크기 px 확보
2. `@ballog/asset`에 로그인 전용 그린 로고 variant 존재 여부 확인 → 없으면 SVG 요청 또는 `ColoredBallogLogo` 텍스트 fill 토큰 교체
3. `LoginPage.tsx`에서 `BallogAppBar`에 피그마 스펙 `className`(예: `h-6 w-auto`) 전달, 또는 로그인 전용 로고로 분리
4. `appBar.height`를 로고 크기에 맞춰 재조정

#### 리스크/주의
- `BallogAppBar`는 home/mypage 등 공용 사용 중 → **로그인 전용 variant 분리 권장**, props로 size override 도 가능
- **사전 확인: 디자인 — 로그인 전용 그린 로고 SVG 존재 여부 / 정확한 크기**

---

### F-02-B · 카카오 버튼 텍스트 색상

| | 내용 |
| --- | --- |
| AS IS | 다크모드 기준 색상 |
| TO BE | `#212121` (검정) |

#### 영향 범위
- `apps/web/src/pages/auth/ui/SocialButton.tsx`

#### 현재 상태
- `SocialButton.tsx:25` → `text-usage-text-inverse` (다크모드 분기에 따라 검정/흰색 전환)

#### 해결 단계
1. `text-usage-text-inverse` → `text-brand-neutral-90` (=`#212121`) 또는 `text-[#212121]` 하드코딩
2. 카카오 아이콘은 이미 `fill="#212121"` 고정 → 수정 불필요

#### 검증
- 라이트/다크 모두 텍스트 `#212121` 확인

---

### F-02-C · 애플 버튼 색상

| | 내용 |
| --- | --- |
| AS IS | 다크모드 기준 색상 |
| TO BE | 버튼 배경 `#212121`, 로고·텍스트 `#FFFFFF` |

#### 영향 범위
- `apps/web/src/pages/auth/ui/SocialButton.tsx`

#### 현재 상태
- `SocialButton.tsx:54-56`
  ```
  'bg-brand-neutral-5 ... text-brand-neutral-90',
  'dark:bg-brand-neutral-90 dark:text-brand-neutral-5',
  ```
- 라이트 모드는 `#fafafa` 배경 + `#212121` 텍스트. QA 요구는 라이트도 다크 스타일

#### 해결 단계
1. 다크 분기 제거 → `bg-brand-neutral-90 text-brand-neutral-white` 단일 적용
2. `active:` 상태도 `bg-brand-neutral-90/80` 통일
3. `Apple.tsx`는 `fill="currentColor"` → 부모 `text-*` 적용됨, 별도 수정 불필요

#### 리스크/주의
- 다크모드에서도 동일 색상이 됨 → **사전 확인: 디자인 — 다크모드에서도 라이트와 동일이 의도인지**

---

## F-03 · 이용약관 마크다운 렌더링

| | 내용 |
| --- | --- |
| AS IS | 마크다운 문법(`###`, `**`, `\|`)이 텍스트 그대로 노출됨 |
| TO BE | 마크다운 정상 렌더링 (불가 시 표라도 정상 렌더링) |

### 영향 범위
- `apps/web/src/entities/term/ui/TermContent.tsx`
- `apps/web/src/entities/term/constants/{service,privacy,marketing}.ts`
- `apps/web/package.json` (deps 추가)

### 현재 상태
- `TermContent.tsx:13,18,23` → `whitespace-pre-line break-words`로 raw 문자열만 출력
- `service.ts:7` 등 → `### **제1조 ...**`, `**굵게**`, 마크다운 표 등 문법 그대로 포함
- `package.json` dependencies → `react-markdown`/`marked`/`remark-gfm` **모두 없음**

### 해결 단계
1. `pnpm --filter web add react-markdown remark-gfm` (표 지원)
2. `TermContent.tsx`를 `<ReactMarkdown remarkPlugins={[remarkGfm]} components={{...}}>`로 교체
3. `components` prop에서 `h3`/`strong`/`table`/`th`/`td`/`li`/`a`를 Ballog 디자인 토큰(`body-md-bold`, `text-usage-text-default`, `border-brand-neutral-50`)으로 매핑
4. 기존 `whitespace-pre-line` 제거 (마크다운 파서가 줄바꿈 처리)
5. (대안) deps 추가 불가 시 → constants의 마크다운 표를 `<table>` JSX로 변환 후 type별 사전 렌더 컴포넌트로 분리

### 검증 방법
- `/term/service`, `/term/privacy`, `/term/marketing` 3개 라우트에서 `###`/`**`/`|`이 텍스트로 보이지 않고 헤딩/볼드/표로 렌더링되는지 확인
- 다크모드 가독성 회귀 확인

### 리스크/주의
- 번들 사이즈 증가 (`react-markdown` ~30KB gz)
- FSD 경계: `react-markdown` import는 `entities/term/ui/`로 한정 (shared로 끌어올리지 않기)
- 외부 링크 안전(`a` 컴포넌트에 `rel="noopener noreferrer" target="_blank"`)
- 정적 텍스트이므로 XSS 리스크 낮음

---

## 작업 체크리스트

- [ ] 디자인에서 로그인 그린 로고 SVG / 크기 컨펌
- [ ] `BallogAppBar` 로고 색상/크기 수정 또는 variant 분리
- [ ] `LoginPage.tsx` appBar height 재조정
- [ ] `SocialButton.tsx` 카카오 텍스트 색상 변경
- [ ] `SocialButton.tsx` 애플 버튼 다크 분기 제거
- [ ] `pnpm --filter web add react-markdown remark-gfm`
- [ ] `TermContent.tsx` ReactMarkdown 적용
- [ ] components prop 디자인 토큰 매핑
- [ ] 3개 약관 라우트(`service/privacy/marketing`) 렌더링 검증
- [ ] `pnpm --filter web typecheck && lint` 통과
