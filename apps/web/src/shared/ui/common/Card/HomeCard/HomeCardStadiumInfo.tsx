import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { type StadiumKey, getStadiumInfo } from '@/shared/constants/stadium'

interface HomeCardStadiumInfoProps extends ComponentProps<'div'> {
  stadium: StadiumKey
}

export const HomeCardStadiumInfo = ({
  stadium,
  className,
  ...rest
}: HomeCardStadiumInfoProps) => {
  const { stadiumName, StadiumImage } = getStadiumInfo(stadium)

  return (
    <div
      className={cn('flex flex-col items-center w-full gap-1 pt-4 pb-6', className)}
      data-name="img-wrapper"
      {...rest}
    >
      <StadiumImage />
      <p className="body-sm-light">{stadiumName}</p>
    </div>
  )
}
