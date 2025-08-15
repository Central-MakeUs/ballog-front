import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'

interface EmptyProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export const Empty = ({ className, children, ...rest }: EmptyProps) => (
  <div
    className={cn(
      'flex flex-col w-full min-w-[328px] relative rounded-large bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    <div className="text-center w-full body-lg-bold py-10 text-brand-neutral-white">
      <div className="body-lg-bold">아직 관람 기록이 없어요!</div>
      <p className="body-sm-light py-4 text-usage-text-subtle">
        관람 중인 경기를 선택하고
        <br />
        실시간으로 감정을 기록해 보세요.
      </p>
      <div className="flex justify-center w-full">
        <div className="flex justify-center w-full">{children}</div>
      </div>
    </div>
  </div>
)
