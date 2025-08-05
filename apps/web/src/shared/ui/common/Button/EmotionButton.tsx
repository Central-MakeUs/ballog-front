import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import JoyEmotion from '@/assets/joyEmotion.svg?react'
import AngryEmotion from '@/assets/angryEmotion.svg?react'

import { IconButton } from './IconButton'

// TODO: 실제 감정별 SVG 아이콘으로 교체 필요
export const JoyIcon = () => (
  <span
    role="img"
    aria-label="기뻐요"
    className="flex items-center justify-center size-18"
  >
    <JoyEmotion className="w-full h-full" />
  </span>
)

export const AngryIcon = () => (
  <span
    role="img"
    aria-label="화나요"
    className="flex items-center justify-center size-18"
  >
    <AngryEmotion className="w-full h-full" />
  </span>
)

interface EmotionButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  emotionType?: 'joy' | 'angry'
  scale: number
}

const getButtonScale = (scale: number): string => {
  if (scale === 0.7) return 'scale-70'
  else if (scale === 0.8) return 'scale-80'
  else if (scale === 0.9) return 'scale-90'
  else return 'scale-100'
}

const getHeightClass = (scale: number): string => {
  if (scale === 0.7) return 'h-29'
  else if (scale === 0.8) return 'h-33'
  else if (scale === 0.9) return 'h-37'
  else return 'h-40.5'
}

/**
 *
 * @example
 * <EmotionButton
 *  className={`origin-bottom ${emotion === 'joy' ? 'scale-110 transition-transform duration-150' : 'scale-90'}`}
 *  onClick={() => setEmotion('joy')}
 * >
 *  기뻐요
 * </EmotionButton>
 * <EmotionButton
 *  className={`origin-bottom ${emotion === 'angry' ? 'scale-110 transition-transform duration-150' : 'scale-90'}`}
 *  onClick={() => setEmotion('angry')}
 * >
 *  화나요
 * </EmotionButton>
 * @returns
 */
export const EmotionButton = ({
  emotionType = 'joy',
  className,
  scale,
  ...props
}: EmotionButtonProps) => {
  const label = emotionType === 'joy' ? '기뻐요' : '화나요'

  return (
    <div
      className={cn(
        getHeightClass(scale),
        'bg-usage-background-strong flex flex-col shadow-medium',
        'items-center  justify-end rounded-xlarge w-full',
        'active:bg-usage-background-strong/80',
        className,
      )}
    >
      <button
        className={cn(
          'bg-usage-background-strong flex flex-col',
          'items-center justify-end rounded-xlarge w-full px-4 py-6',
          className,
          getButtonScale(scale),
        )}
        type="button"
        {...props}
      >
        <div
          className={cn(
            'flex flex-col items-center justify-center w-full gap-4',
          )}
        >
          <IconButton className={cn('size-20 mx-auto')} state={emotionType} />
          <span className={cn('body-sm-light text-usage-text-subtle')}>
            {label}
          </span>
        </div>
      </button>
    </div>
  )
}
