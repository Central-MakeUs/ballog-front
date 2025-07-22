import { useState } from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { EmotionButton } from '@/shared/ui/common'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'
import type { EmotionType } from '@/entities/record/model/emotion.type'

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
  const [selectedEmotion, setSelectedEmotion] = useState<
    'joy' | 'angry' | null
  >(null)

  const { joyPercent, angryPercent } = useEmotionVote()

  const dominant = joyPercent >= angryPercent ? 'joy' : 'angry'

  return (
    <div className={cn('flex flex-col w-full h-full', className)} {...rest}>
      <div
        className={cn(
          'flex flex-row w-full h-full gap-4',
          'items-end',
          selectedEmotion === null
            ? 'translate-0'
            : selectedEmotion === 'joy'
              ? 'translate-x-2'
              : '-translate-x-2',
        )}
      >
        <EmotionButton
          emotionType="joy"
          onClick={() => {
            setSelectedEmotion('joy')
            onEmotionSubmit?.('POSITIVE')
          }}
          className={cn(
            'origin-bottom transition-transform duration-150',
            selectedEmotion === null
              ? 'scale-100 mt-0'
              : selectedEmotion === 'joy'
                ? 'scale-110 mt-4'
                : 'scale-90 ',
          )}
        >
          기뻐요
        </EmotionButton>
        <EmotionButton
          emotionType="angry"
          onClick={() => {
            setSelectedEmotion('angry')
            onEmotionSubmit?.('NEGATIVE')
          }}
          className={cn(
            'origin-bottom transition-transform duration-150',
            selectedEmotion === null
              ? 'scale-100 mt-0'
              : selectedEmotion === 'angry'
                ? 'scale-110 mt-4'
                : 'scale-90 ',
          )}
        >
          화나요
        </EmotionButton>
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
