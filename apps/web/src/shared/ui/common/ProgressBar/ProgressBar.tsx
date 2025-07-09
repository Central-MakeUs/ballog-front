import { cn } from '@/shared/lib/utils'
import type { ComponentProps } from 'react'
import JoyEmotion from '@/assets/joyEmotion.svg?react'
import AngryEmotion from '@/assets/angryEmotion.svg?react'

interface RecordLogProgressProps extends ComponentProps<'div'> {
  emotion: 'joy' | 'angry'
  emotionPercent: number
}

export const ProgressBar = ({
  emotion,
  emotionPercent,
  className,
  ...rest
}: RecordLogProgressProps) => {
  const reversePercent = 100 - emotionPercent
  const barColor =
    emotion === 'joy' ? 'bg-brand-green-default' : 'bg-brand-red-default'
  const progressStyle = { width: `${emotionPercent}%` }

  return (
    <div
      className={cn(
        'flex flex-row justify-center items-center gap-4',
        'w-full max-w-90',
        className,
      )}
      {...rest}
    >
      <div
        className={cn('flex flex-col', 'body-sm-bold text-usage-text-default')}
      >
        <JoyEmotion className="w-8 h-8" />
        <span>{emotion === 'joy' ? emotionPercent : reversePercent}%</span>
      </div>
      <div className="relative w-full h-4 bg-usage-background-strong rounded-full overflow-hidden">
        <div
          className={cn(
            'absolute top-0 h-full',
            'transition-all duration-1000', // 멋진 효과
            barColor,
            emotion === 'joy' ? 'left-0' : 'right-0',
          )}
          style={progressStyle}
        />
      </div>

      <div
        className={cn('flex flex-col', 'body-sm-bold text-usage-text-default')}
      >
        <AngryEmotion className="w-8 h-8" />
        <span>{emotion === 'angry' ? emotionPercent : reversePercent}%</span>
      </div>
    </div>
  )
}
