import RecordingCardWithNoImage from '@/assets/recordingCardIconWithNoImage.svg?react'
import RecordingCardWithImage from '@/assets/recordingCardIconWithImage.svg?react'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import { createWebBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

interface IconProps extends ComponentProps<'div'> {
  state: 'default' | 'active'
  onClick?: () => void
}

export const Icon = ({ state, className, ...rest }: IconProps) => {
  const bridge = createWebBridge()
  const handleClick = () => {
    console.log('click')
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  const IconComponent =
    state === 'default' ? RecordingCardWithNoImage : RecordingCardWithImage

  return (
    <div className={cn('cursor-pointer', className)} {...rest}>
      <IconComponent onClick={handleClick} />
    </div>
  )
}
