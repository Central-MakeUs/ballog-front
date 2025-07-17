import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'

interface HomeCardMatchInfoProps extends ComponentProps<'div'> {
  homeTeam?: TeamKey
  awayTeam?: TeamKey
}

export const HomeCardMatchInfo = ({
  homeTeam = 'LOTTE_GIANTS',
  awayTeam = 'KT_WIZ',
  className,
  ...rest
}: HomeCardMatchInfoProps) => {
  return (
    <div
      className={cn('bg-brand-neutral-90 relative shrink-0 w-full', className)}
      data-name="img-wrapper"
      {...rest}
    >
      <div className="flex flex-row items-center justify-center overflow-clip relative w-full">
        <div className="box-border flex flex-row gap-2.5 items-center justify-center px-4 py-12 relative w-full">
          <div
            className="flex flex-col grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
            data-name="text-group"
          >
            <div
              className="flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0"
              data-name="text"
            >
              <div className="body-lg-bold text-brand-primary-default text-center whitespace-nowrap">
                {TEAMS[homeTeam as TeamKey]}
              </div>
            </div>
            <div
              className="flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0"
              data-name="text"
            >
              <div className="body-lg-medium text-brand-neutral-white text-center w-full">
                vs
              </div>
            </div>
            <div
              className="flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0"
              data-name="text"
            >
              <div className="body-lg-bold text-brand-primary-default text-center whitespace-nowrap">
                {TEAMS[awayTeam as TeamKey]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
