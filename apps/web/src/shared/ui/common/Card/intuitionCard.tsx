import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface ActiveIntuitionCardProps extends ComponentProps<'div'> {
  matchCount: number
  winRate: number
}

interface DisabledIntuitionCardProps extends ComponentProps<'div'> {}

/**
 * IntuitionCard
 *
 *
 * 컴포넌트 구성:
 * - `IntuitionCard.Active`: 기록된 직관 횟수와 승률 정보를 표시하는 활성 카드입니다.
 * - `IntuitionCard.Disabled`: 아직 직관 기록이 없을 때 보여주는 비활성 카드입니다.
 *
 * @example 활성 상태
 * ```tsx
 * <IntuitionCard.Active matchCount={5} winRate={75} />
 * ```
 *
 * @example 비활성 상태
 * ```tsx
 * <IntuitionCard.Disabled />
 * ```
 */

const Active = ({
  matchCount,
  winRate,
  className,
  ...rest
}: ActiveIntuitionCardProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'min-w-[156px] h-full',
      'px-4 py-6',
      'rounded-xlarge bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    <div className="text-center min-w-30 min-h-30">
      <div className="body-md-medium mb-2">관람</div>
      <div className="heading-md-bold">
        {matchCount} <span className="body-md-bold">회</span>
      </div>
      <div className="body-sm-medium mt-4 mb-2">승률</div>
      <div className="heading-md-bold">{parseInt(winRate.toString())}%</div>
    </div>
  </div>
)

const Disabled = ({ className, ...rest }: DisabledIntuitionCardProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'min-w-[156px] h-full',
      'px-4 py-6',
      'rounded-xlarge bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    <div className="text-center">
      <div className="body-md-medium mb-2">관람</div>
      <div className="body-md-bold">- 회</div>
    </div>
  </div>
)

export const IntuitionCard = { Active, Disabled }
