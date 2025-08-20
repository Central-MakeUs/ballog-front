import { useRef, type MouseEventHandler, type ComponentProps } from 'react'
import type { LottieRefCurrentProps } from 'lottie-react'

import { cn } from '@/shared/lib/classnames'

import { EmotionLottie } from './EmotionLottie'
import { IconButton } from './IconButton'

// TODO: 실제 감정별 SVG 아이콘으로 교체 필요
export const JoyIcon = () => {
  const joyRef = useRef<LottieRefCurrentProps>(null)

  const handleClick = () => {
    joyRef.current?.stop()
    joyRef.current?.goToAndPlay(0, true)
  }

  return (
    <span
      role="img"
      aria-label="화나요"
      className="flex items-center justify-center size-18"
      onClick={handleClick}
    >
      <EmotionLottie emotion='joy' lottieRef={joyRef} className="w-full h-full" />
    </span>
  )
}

export const AngryIcon = () => {
  const angryRef = useRef<LottieRefCurrentProps>(null)

  const handleClick = () => {
    angryRef.current?.stop()
    angryRef.current?.goToAndPlay(0, true)
  }

  return (
    <span
      role="img"
      aria-label="화나요"
      className="flex items-center justify-center size-18"
      onClick={handleClick}
    >
      <EmotionLottie emotion='angry' lottieRef={angryRef} className="w-full h-full" />
    </span>
  )
}

interface EmotionButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  emotionType?: 'joy' | 'angry'
  scale: number
  percent: number
}

const getButtonScale = (scale: number): string => {
  if (scale === 0.7) return 'scale-70'
  else if (scale === 0.8) return 'scale-80'
  else if (scale === 0.9) return 'scale-90'
  else return 'scale-100'
}

const getHeightClass = (scale: number): string => {
  if (scale === 0.7) return 'h-29.5'
  else if (scale === 0.8) return 'h-33.5'
  else if (scale === 0.9) return 'h-38'
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
  percent,
  onClick,
  ...props
}: EmotionButtonProps) => {
  const label = emotionType === 'joy' ? '기뻐요' : '화나요'

  const joyRef = useRef<import('lottie-react').LottieRefCurrentProps>(null)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (emotionType === 'joy') {
      joyRef.current?.stop()
      joyRef.current?.goToAndPlay(0, true)
    }
    onClick?.(e)
  }

  return (
    <div
      className={cn(
        getHeightClass(scale),
        'bg-usage-background-strong flex flex-col shadow-medium',
        'items-center  justify-end rounded-xlarge w-full',
        'has-[button:active]:bg-brand-secondary-pressed',
        className,
      )}
    >
      <button
        className={cn(
          'bg-transparent flex flex-col',
          'items-center justify-end rounded-xlarge w-full px-4 py-4',
          className,
          getButtonScale(scale),
        )}
        type="button"
        onClick={handleClick}
        {...props}
      >
        <div className={cn('flex flex-col items-center justify-center w-full')}>
          <IconButton className={cn('size-20 mx-auto')} state={emotionType} />
          <span className={cn('body-sm-light text-usage-text-subtle  mt-1')}>
            {label}
          </span>
          <span className="heading-md-bold text-usage-text-default">
            {Math.round(percent)}%
          </span>
        </div>
      </button>
    </div>
  )
}
