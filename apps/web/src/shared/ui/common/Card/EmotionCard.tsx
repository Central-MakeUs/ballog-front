import { AngryEmotionNoShadow, JoyEmotionNoShadow } from '@ballog/asset/icons'
import { Suspense, lazy, type ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

import type { ActiveEmotionCardProps } from './EmotionCardActiveImpl'

interface DisabledEmotionCardProps extends ComponentProps<'div'> {}

const ActiveImpl = lazy(() => import('./EmotionCardActiveImpl'))

const ActivePlaceholder = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'relative flex flex-col p-4',
      'w-full',
      'h-full',
      'justify-center items-center',
      'rounded-xlarge',
      'bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    <div className="w-[104px] h-[104px] mb-4 rounded-full bg-usage-background-strong animate-pulse" />
  </div>
)

const Active = (props: ActiveEmotionCardProps) => (
  <Suspense fallback={<ActivePlaceholder className={props.className} />}>
    <ActiveImpl {...props} />
  </Suspense>
)

/**
 * EmotionCard
 *
 *
 * 컴포넌트 구성:
 * - `EmotionCard.Active`: 감정이 기록된 상태. 원형 차트를 통해 비율과 감정 상태를 표시합니다.
 *   recharts 청크는 lazy-load됩니다.
 * - `EmotionCard.Disabled`: 감정이 기록되지 않은 상태. 기본 아이콘과 안내 메시지를 보여줍니다.
 */
const Disabled = ({ className, ...rest }: DisabledEmotionCardProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'min-w-[156px] h-full',
      'px-4 py-4',
      'rounded-xlarge bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    <div className="flex items-center justify-center w-full h-full rounded-full bg-usage-background-strong">
      <div className="flex items-center justify-center gap-4 mt-4.25 text-brand-neutral-white min-w-30 min-h-30">
        <div className="flex flex-col items-center">
          <AngryEmotionNoShadow className="w-8 h-8" />
          <p className="body-sm-bold text-usage-text-default">- %</p>
        </div>
        <div className="flex flex-col items-center">
          <JoyEmotionNoShadow className="w-8 h-8" />
          <p className="body-sm-bold text-usage-text-default">- %</p>
        </div>
      </div>
    </div>
  </div>
)

export const EmotionCard = {
  Active,
  Disabled,
}
