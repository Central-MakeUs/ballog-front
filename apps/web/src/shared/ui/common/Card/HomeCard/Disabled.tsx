import type { ReactNode } from 'react'
import type { ComponentProps } from 'react'

import MatchEmpty from '@/assets/matchEmpty.svg?react'
import { cn } from '@/shared/lib/classnames'

interface DisabledProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export const Disabled = ({ children, className, ...rest }: DisabledProps) => {
  return (
    <div
      className={cn(
        'flex flex-col bg-brand-neutral-30 min-w-50 w-full p-4',
        'rounded-md w-full items-center justify-center',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col items-center justify-center text-center body-sm-light text-usage-text-inverse light:text-usage-text-default">
          <span className="pt-2">다음 경기를 기대하며,</span>
          <span className="pb-4">지난 기록을 돌아볼까요?</span>
          <MatchEmpty className="w-full mb-2 h-28.5" />
        </div>

        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  )
}
