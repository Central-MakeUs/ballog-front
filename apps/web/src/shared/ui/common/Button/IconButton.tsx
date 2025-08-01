import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

import { AngryIcon, JoyIcon } from './EmotionButton'

interface IconButtonProps extends ComponentProps<'div'> {
  state: 'angry' | 'joy'
}

/**
 * IconButton
 *
 * 컴포넌트 구성:
 * - 감정 상태에 따라 아이콘 변경
 * - 클릭 시 효과 추가
 *
 * 사용 예시:
 * <IconButton state="joy" />
 * <IconButton state="angry" />
 * @param state 감정 상태
 * @returns
 */

export const IconButton = ({ className, state, ...props }: IconButtonProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
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
