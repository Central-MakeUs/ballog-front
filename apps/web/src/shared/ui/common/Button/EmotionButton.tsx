import type { ComponentProps, ReactNode } from 'react'
import { IconButton } from './IconButton'
import { cn } from '@/shared/lib/utils'

// TODO: 실제 감정별 SVG 아이콘으로 교체 필요
export const JoyIcon = () => (
  <span
    role="img"
    aria-label="기뻐요"
    className="flex items-center justify-center size-10"
  >
    🤩
  </span>
)

export const AngryIcon = () => (
  <span
    role="img"
    aria-label="화나요"
    className="flex items-center justify-center size-10"
  >
    🤬
  </span>
)

interface EmotionButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  emotionType?: 'joy' | 'angry'
}

/**
 *
 * @example
 * <EmotionButton
 * className={`origin-bottom ${emotion === 'joy' ? 'scale-110 transition-transform duration-150' : 'scale-90'}`}
 * onClick={() => setEmotion('joy')}
 * >
 * 기뻐요
 * </EmotionButton>
 * <EmotionButton
 * className={`origin-bottom ${emotion === 'angry' ? 'scale-110 transition-transform duration-150' : 'scale-90'}`}
 * onClick={() => setEmotion('angry')}
 * >
 *  화나요
 * </EmotionButton>
 * @returns
 */
export const EmotionButton = ({
  emotionType = 'joy',
  className,
  ...props
}: EmotionButtonProps) => {
  const label = emotionType === 'joy' ? '기뻐요' : '화나요'
  return (
    <button
      className={cn(
        'bg-usage-background-strong flex flex-col',
        'items-center justify-end rounded-xlarge px-4 py-6 shadow-medium',
        'active:bg-usage-background-strong/80',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center w-full gap-4 min-w-31">
        <IconButton className="size-20 mx-auto" state={emotionType} />
        <span className="body-sm-light text-usage-text-subtle">{label}</span>
      </div>
    </button>
  )
}

export default EmotionButton
