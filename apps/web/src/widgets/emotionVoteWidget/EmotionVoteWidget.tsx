import { useState } from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { EmotionButton } from '@/shared/ui/common'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'
import type { EmotionType } from '@/entities/record/model/emotion.type'

import { getScale } from './utils/getScale'
import { getGridRatio } from './utils/getGridRatio'

interface EmotionVoteWidgetProps extends ComponentProps<'div'> {
  emotions?: EmotionType
  onEmotionSubmit?: (emotionType: 'POSITIVE' | 'NEGATIVE') => void
}

export const EmotionVoteWidget = ({
  emotions,
  onEmotionSubmit,
  className,
  ...rest
}: EmotionVoteWidgetProps) => {
  const [, setSelectedEmotion] = useState<'joy' | 'angry' | null>(null)

  const { joyPercent, angryPercent } = useEmotionVote()

  const dominant = joyPercent >= angryPercent ? 'joy' : 'angry'

  return (
    <div className={cn('flex flex-col w-full h-full', className)} {...rest}>
      <div
        className={cn(
          'grid w-full h-full gap-4',
          'items-end',
          'transition-all duration-300',
        )}
        style={{
          gridTemplateColumns: getGridRatio(joyPercent, angryPercent),
        }}
      >
        <div
          className={cn('flex justify-center items-end min-w-0 w-full h-full')}
        >
          <EmotionButton
            emotionType="joy"
            onClick={() => {
              setSelectedEmotion('joy')
              onEmotionSubmit?.('POSITIVE')
            }}
            scale={getScale(joyPercent)}
            className="transition-all duration-300 origin-bottom w-full"
          >
            기뻐요
          </EmotionButton>
        </div>

        <div className={cn('flex justify-center items-end min-w-0 w-full')}>
          <EmotionButton
            emotionType="angry"
            onClick={() => {
              setSelectedEmotion('angry')
              onEmotionSubmit?.('NEGATIVE')
            }}
            scale={getScale(angryPercent)}
            className="transition-all duration-300 origin-bottom w-full"
          >
            화나요
          </EmotionButton>
        </div>
      </div>

      <div className="relative w-full h-4 mt-6 mb-2 bg-usage-background-strong rounded-full overflow-hidden">
        <div
          className={cn(
            'absolute top-0 h-full transition-all duration-1000',
            dominant === 'joy'
              ? 'left-0 bg-brand-green-default'
              : 'right-0 bg-brand-red-default',
          )}
          style={{
            width: `${dominant === 'joy' ? joyPercent : angryPercent}%`,
          }}
        />
      </div>
      <div
        className={cn(
          'heading-lg-bold text-usage-text-default',
          'flex justify-between',
        )}
      >
        <span>{joyPercent}%</span>
        <span>{angryPercent}%</span>
      </div>
    </div>
  )
}
