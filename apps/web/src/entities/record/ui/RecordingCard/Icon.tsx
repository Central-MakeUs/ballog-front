import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { Profile } from '@/shared/ui/common/Profile/Profile'

interface IconProps extends ComponentProps<'div'> {
  state: boolean
  onClick?: () => void
}

export const Icon = ({ state, className, ...rest }: IconProps) => {
  return (
    <div className={cn('cursor-pointer', className)} {...rest}>
      {/* <IconComponent onClick={handleClick} /> */}
      <Profile border={state} />
    </div>
  )
}
