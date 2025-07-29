import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import JoyEmotion from '@/assets/joyEmotion.svg?react'
import AngryEmotion from '@/assets/angryEmotion.svg?react'

interface RecordLogProgressProps extends ComponentProps<'div'> {
  emotion: 'joy' | 'angry'
  emotionPercent: number
}

/**
 * ProgressBar - 감정 비율을 시각적으로 표현하는 프로그레스 바 컴포넌트
 *
 * joy, angry 중 하나의 감정이 dominant한 상태를 전달받아
 * 좌우 양끝에 감정 아이콘과 퍼센트를 표시하고,
 * 가운데 바는 해당 감정 비율만큼 채워지는 형태로 렌더링됩니다.
 *
 * - 퍼센트 값은 emotionPercent로 전달되며, 나머지 감정은 100 - percent로 계산됩니다.
 * - 바 색상 및 방향은 감정 종류(emotion)에 따라 동적으로 변경됩니다.
 *
 * @props
 * @param {'joy' | 'angry'} emotion - 주 감정 (bar 색상, 방향 결정)
 * @param {number} emotionPercent - 해당 감정의 퍼센트 (0~100)
 *
 * @example
 * <ProgressBar emotion="joy" emotionPercent={75} />
 */

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
        'w-full',
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
