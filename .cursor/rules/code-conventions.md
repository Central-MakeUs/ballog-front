# 코드 컨벤션 (Code Conventions)

## Import 순서 및 구조

Import 문은 다음 순서로 작성하며, 각 그룹 사이에 빈 줄을 추가합니다:

1. **외부 라이브러리** (Third-party libraries)
   - 예: `@stackflow`, `react`, `next` 등

2. **내부 자산** (Internal assets)
   - 예: `@/assets/BackArrow`

3. **공유 UI 및 유틸리티** (Shared UI and utilities)
   - 예: `@/shared/ui/layout`, `@/shared/ui/common`

4. **엔티티** (Entities)
   - 예: `@/entities/record/ui`

5. **피처** (Features)
   - UI 컴포넌트: `@/features/[feature]/ui`
   - 훅: `@/features/[feature]/hooks`

```typescript
// ✅ 올바른 예시
import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { Loading } from '@/shared/ui/common'
import { RecordLogCard } from '@/entities/record/ui/RecordLogCard'
import { ImageTimeLine } from '@/features/record/ui/ImageTimeLine'
```

## 컴포넌트 작성 규칙

### 1. 컴포넌트 선언

- `export const` 형식으로 함수형 컴포넌트를 선언합니다
- Props는 인라인으로 타입을 지정하거나, 복잡한 경우 별도 타입으로 분리합니다
- 컴포넌트 이름은 **PascalCase**를 사용합니다

```typescript
// ✅ 올바른 예시
export const RecordDetailPage = ({
  params,
}: {
  params: { matchRecordId: string }
}) => {
  // ...
}
```

### 2. Export 패턴

**페이지 컴포넌트** (`pages/` 폴더 내):
- Named export와 default export를 함께 사용합니다
- 파일 마지막에 default export를 추가합니다

```typescript
// ✅ 올바른 예시 (페이지 컴포넌트)
export const RecordDetailPage = ({ params }) => {
  // ...
}

export default RecordDetailPage
```

**일반 컴포넌트** (피처, 엔티티, 공유 컴포넌트):
- Named export만 사용합니다
- default export를 사용하지 않습니다

```typescript
// ✅ 올바른 예시 (일반 컴포넌트)
export const ImageTimeLine = ({ matchRecordId }) => {
  // ...
}

// ❌ 잘못된 예시
export default ImageTimeLine // default export 사용하지 않음
```

## 변수 및 상수 네이밍

### 1. 네이밍 규칙

- **변수/함수**: camelCase
- **컴포넌트**: PascalCase
- **상수**: UPPER_SNAKE_CASE (필요한 경우)
- **훅**: `use` prefix 사용

```typescript
// ✅ 올바른 예시
const matchRecordIdParam = Number(params.matchRecordId)
const { recordDetail, isLoading } = useGetRecordDetail({ matchRecordId })
```

### 2. 구조 분해 할당 (Destructuring)

- 객체에서 필요한 값을 추출할 때 구조 분해 할당을 사용합니다
- 가독성을 위해 여러 줄로 나눕니다

```typescript
// ✅ 올바른 예시
const {
  matchRecordId,
  homeTeam,
  awayTeam,
  stadium,
  matchDate,
  result,
  positiveEmotionPercent,
  negativeEmotionPercent,
  emotionGroupList,
  imageList,
} = recordDetail
```

## 조건부 렌더링 및 조기 반환 (Early Return)

### 1. 로딩 상태 처리

- 로딩 중일 때는 조기 반환으로 처리합니다

```typescript
// ✅ 올바른 예시
if (isLoading) {
  return <Loading text="관람 기록을 불러오는 중..." />
}
```

### 2. 데이터 검증

- 데이터가 없을 때는 조기 반환으로 null 또는 대체 UI를 반환합니다

```typescript
// ✅ 올바른 예시
if (!recordDetail) return null
```

### 3. 조건부 렌더링

- JSX 내에서 조건부 렌더링 시 `&&` 연산자를 사용합니다
- 조건을 명확히 표현하고 주석을 추가합니다

```typescript
// ✅ 올바른 예시
{/* 응원 팀 감정분포 */}
{isUserSupportingTeam && (
  <EmotionTimeLine
    positiveEmotionPercent={positiveEmotionPercent}
    negativeEmotionPercent={negativeEmotionPercent}
    emotionGroupList={emotionGroupList}
  />
)}
```

## JSX 작성 규칙

### 1. 컴포넌트 속성 (Props)

- 속성이 많을 경우 여러 줄로 나눕니다
- 각 속성은 개별 줄에 작성합니다

```typescript
// ✅ 올바른 예시
<RecordLogCard.Info
  homeTeam={homeTeam}
  awayTeam={awayTeam}
  stadium={stadium}
  date={matchDate}
  result={result}
/>
```

### 2. 복합 컴포넌트 패턴 (Compound Component Pattern)

- 관련 컴포넌트들은 네임스페이스 패턴을 사용합니다
- `.Root`, `.Info` 등의 서브 컴포넌트로 구성합니다

```typescript
// ✅ 올바른 예시
<RecordLogCard.Root key={matchRecordId}>
  <RecordLogCard.Info
    homeTeam={homeTeam}
    awayTeam={awayTeam}
  />
</RecordLogCard.Root>
```

### 3. Context Provider

- 관련 기능은 Context Provider로 감쌉니다
- Provider의 초기값은 명확히 전달합니다

```typescript
// ✅ 올바른 예시
<ImageContextProvider initialImages={imageList}>
  <AppLayout>
    {/* content */}
  </AppLayout>
</ImageContextProvider>
```

## Tailwind CSS 스타일링

### 1. 클래스 네이밍

- Tailwind 유틸리티 클래스를 우선 사용합니다
- 다크 모드는 `dark:` prefix를 사용합니다
- 라이트 모드는 `light:` prefix를 사용합니다
- 커스텀 타이포그래피 클래스는 `body-*` 형식을 사용합니다

```typescript
// ✅ 올바른 예시
<span className="text-usage-text-default body-md-bold">
  기록 상세보기
</span>

<BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
```

### 2. 레이아웃 클래스

- 레이아웃 관련 클래스는 최상위 div에 작성합니다
- 간격, 패딩은 Tailwind 유틸리티를 사용합니다

```typescript
// ✅ 올바른 예시
<div className="w-full px-4 pt-4">
  {/* content */}
</div>
```

## 주석 작성 규칙

### 1. JSX 주석

- JSX 내에서는 `{/* */}` 형식을 사용합니다
- 섹션을 구분하는 주석을 작성합니다

```typescript
// ✅ 올바른 예시
{/* 응원 팀 감정분포 */}
{isUserSupportingTeam && (
  <EmotionTimeLine />
)}

{/* 사진 타임라인 */}
<ImageTimeLine />
```

### 2. 일반 주석

- 코드 로직 설명이 필요한 경우 `//` 주석을 사용합니다

```typescript
// ✅ 올바른 예시
// 데이터가 없을 때
if (!recordDetail) return null
```

## AppBar 및 네비게이션

### 1. AppScreen 설정

- `@stackflow/plugin-basic-ui`의 `AppScreen`을 사용합니다
- appBar 설정은 명확히 작성합니다

```typescript
// ✅ 올바른 예시
<AppScreen
  appBar={{
    title: (
      <span className="text-usage-text-default body-md-bold">
        기록 상세보기
      </span>
    ),
    backButton: {
      renderIcon: () => (
        <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
      ),
    },
  }}
>
  {/* content */}
</AppScreen>
```

## 데이터 변환 및 처리

### 1. 타입 변환

- 명시적인 타입 변환을 사용합니다
- 변환된 값은 의미 있는 변수명으로 저장합니다

```typescript
// ✅ 올바른 예시
const matchRecordIdParam = Number(params.matchRecordId)
```

### 2. 커스텀 훅 사용

- 데이터 fetching은 커스텀 훅으로 분리합니다
- 필요한 값만 구조 분해 할당으로 추출합니다

```typescript
// ✅ 올바른 예시
const { recordDetail, isLoading, isUserSupportingTeam } = useGetRecordDetail({
  matchRecordId: matchRecordIdParam,
})
```

## 파일 및 폴더 구조

### 1. FSD (Feature-Sliced Design) 준수

- 페이지 컴포넌트: `pages/[feature]/ui/`
- 피처 컴포넌트: `features/[feature]/ui/`
- 피처 훅: `features/[feature]/hooks/`
- 엔티티 컴포넌트: `entities/[entity]/ui/`
- 공유 컴포넌트: `shared/ui/[category]/`

### 2. 파일 네이밍

- 컴포넌트 파일: PascalCase (예: `RecordDetailPage.tsx`)
- 유틸리티 파일: camelCase (예: `formatDate.ts`)
- 훅 파일: camelCase with `use` prefix (예: `useGetRecordDetail.ts`)

## 정리

이 컨벤션은 프로젝트의 일관성과 가독성을 유지하기 위한 기준입니다. 
새로운 코드를 작성할 때는 이 규칙을 따르며, 기존 코드를 리팩토링할 때도 이 가이드를 참고하세요.
