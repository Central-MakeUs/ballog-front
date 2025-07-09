import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { AngryIcon, JoyIcon } from './EmotionButton'

interface IconButtonProps extends ComponentProps<'div'> {
  state: 'angry' | 'joy'
}

export const IconButton = ({ className, state, ...props }: IconButtonProps) => {
  return (
    <div
      className={cn(
        'bg-usage-background-subtle rounded-full flex items-center justify-center',
        'active:bg-usage-background-subtle/80',
        'min-w-16 min-h-16',
        className,
      )}
      {...props}
    >
      {state === 'joy' ? <JoyIcon /> : <AngryIcon />}
    </div>
  )
}
