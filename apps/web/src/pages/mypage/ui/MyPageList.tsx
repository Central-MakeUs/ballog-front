import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import { useFlow } from '@stackflow/react/future'
import RightArrow from '@/assets/rightArrow.svg?react'

interface MyPageButtonProps extends ComponentProps<'button'> {
  className?: string
}

export const ChangeTeamList = ({ className, ...rest }: MyPageButtonProps) => {
  const { push } = useFlow()

  return (
    <span
      className={cn('body-sm-medium items-center text-brand-neutral-white')}
    >
      응원 팀 변경
    </span>
  )
}
