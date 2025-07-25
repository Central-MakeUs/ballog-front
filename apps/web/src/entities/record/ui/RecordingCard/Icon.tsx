import type { ComponentProps } from 'react'
import { createWebBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { cn } from '@/shared/lib/classnames'
import { Profile } from '@/shared/ui/common/Profile/Profile'

interface IconProps extends ComponentProps<'div'> {
  state: 'default' | 'active'
  onClick?: () => void
}

export const Icon = ({ state, className, ...rest }: IconProps) => {
  const bridge = createWebBridge()
  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  return (
    <div className={cn('cursor-pointer', className)} {...rest}>
      {/* <IconComponent onClick={handleClick} /> */}
      <Profile border={state === 'active'} onClick={handleClick} />
    </div>
  )
}
