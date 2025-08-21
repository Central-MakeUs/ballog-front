import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import JoyEmotion from '@/assets/joyEmotion.svg?react'
import AngryEmotion from '@/assets/angryEmotion.svg?react'

interface RecordLogProgressProps extends ComponentProps<'div'> {
  positiveEmotionPercent: number
  negativeEmotionPercent: number
}

/**
 * ProgressBar - 감정 비율을 시각적으로 표현하는 프로그레스 바 컴포넌트
 *
 * 좌우 양끝에 감정 아이콘과 퍼센트를 표시하고,
 * 가운데 바는 해당 감정 비율만큼 채워지는 형태로 렌더링됩니다.
 *
 * - 퍼센트 값은 positiveEmotionPercent, negativeEmotionPercent로 전달됩니다.
 * - 바 색상 및 방향은 positiveEmotionPercent, negativeEmotionPercent에 따라 동적으로 변경됩니다.
 *
 * @props
 * @param {number} positiveEmotionPercent - 긍정 감정의 퍼센트 (0~100)
 * @param {number} negativeEmotionPercent - 부정 감정의 퍼센트 (0~100)
 *
 * @example
 * <ProgressBar positiveEmotionPercent={75} negativeEmotionPercent={25} />
 */

const EmotionIconWithPercent = ({
  emotion,
  percent,
}: {
  emotion: 'joy' | 'angry'
  percent: number
}) => {
  return (
    <div className="flex flex-col items-center">
      {emotion === 'joy' ? (
        <JoyEmotion className="w-8 h-8" />
      ) : (
        <AngryEmotion className="w-8 h-8" />
      )}
      <span className="body-sm-bold text-usage-text-default text-center">
        {percent}%
      </span>
    </div>
  )
}

export const ProgressBar = ({
  positiveEmotionPercent,
  negativeEmotionPercent,
  className,
  ...rest
}: RecordLogProgressProps) => {
  const progressStyle = { width: `${positiveEmotionPercent}%` }

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
        <EmotionIconWithPercent
          emotion="joy"
          percent={Math.round(positiveEmotionPercent)}
        />
      </div>
      <div
        className={cn(
          'relative w-full h-4 rounded-full overflow-hidden',
          'bg-brand-red-default',
        )}
      >
        <div
          className={cn(
            'absolute top-0 h-full',
            'transition-all duration-1000', // 멋진 효과
            'bg-brand-green-default',
            'left-0',
          )}
          style={progressStyle}
        />
      </div>

      <div
        className={cn('flex flex-col', 'body-sm-bold text-usage-text-default')}
      >
        <EmotionIconWithPercent
          emotion="angry"
          percent={Math.round(negativeEmotionPercent)}
        />
      </div>
    </div>
  )
}
