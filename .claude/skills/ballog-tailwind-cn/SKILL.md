---
name: ballog-tailwind-cn
description: Ballog 프로젝트의 Tailwind + cn() 사용 규칙. 조건부 클래스 가독성, twMerge 충돌 회피, 반복 유틸 추출 기준. className을 작성하거나 리뷰할 때 참조.
---

# Ballog Tailwind + cn 가이드

## cn 위치

```ts
import { cn } from '@/shared/lib/classnames'
```

`clsx` + `tailwind-merge` 래퍼. 조건부 클래스와 Tailwind 충돌 해결을 동시에 처리한다.

## 사용 원칙

### 1. 긴 className은 줄바꿈으로 분해

❌ 한 줄에 몰아넣기

```tsx
<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-50">
```

✅ 관심사별로 줄바꿈

```tsx
<div
  className={cn(
    'flex items-center gap-2',
    'px-4 py-2 rounded-lg',
    'bg-white text-gray-900',
    'hover:bg-gray-50',
  )}
>
```

### 2. 조건부 클래스는 bool 인자

✅

```tsx
className={cn(
  'rounded-full px-3 py-1',
  isActive && 'bg-primary text-white',
  disabled && 'opacity-50 pointer-events-none',
)}
```

❌ `cn` 없이 템플릿 리터럴

```tsx
className={`${base} ${isActive ? 'bg-primary' : ''}`}
```

### 3. 동일 variant 반복은 맵 상수로

같은 prop → className 매핑이 2번 이상 등장하면 모듈 상단 상수로 분리.

```tsx
const sizeStyle = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
} as const

<button className={cn('rounded-lg', sizeStyle[size])}>
```

### 4. twMerge 충돌 — 뒤가 이긴다

```tsx
cn('px-4', isLarge && 'px-8') // isLarge면 px-8만 남음
```

외부에서 받은 `className` prop은 **항상 마지막**에 둬서 오버라이드 가능하게.

```tsx
<div className={cn('base-styles', className)} />
```

## 리뷰 플래그

- 🔴 외부 `className` prop을 `cn` 왼쪽에 배치 (override 불가)
- 🟡 6줄 이상 연속된 className 문자열 → 줄바꿈 분해
- 🟡 템플릿 리터럴로 조건부 클래스 → `cn` 전환
- 🟡 동일 variant 매핑이 2회 이상 → 상수 추출
- 🟢 의미 단위(layout/spacing/color/state) 무시하고 섞인 순서
