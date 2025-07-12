import RecordingCardWithNoImage from '@/assets/recordingCardIconWithNoImage.svg?react'
import RecordingCardWithImage from '@/assets/recordingCardIconWithImage.svg?react'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
interface IconProps extends ComponentProps<'div'> {
  state: 'default' | 'active'
  onClick?: () => void
}

export const Icon = ({ state, className, ...rest }: IconProps) => {
  const IconComponent =
    state === 'default' ? RecordingCardWithNoImage : RecordingCardWithImage

  return (
    <div className={cn('cursor-pointer', className)} {...rest}>
      <IconComponent />
    </div>
  )
}
