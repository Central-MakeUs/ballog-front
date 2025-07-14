import { cn } from '@/shared/lib/utils'
import type { ComponentProps } from 'react'
import { EmotionButton } from '@/shared/ui/common'
import { useState } from 'react'
import { ProgressBar } from '@/shared/ui/common/ProgressBar/ProgressBar'

interface EmotionVoteWidgetProps extends ComponentProps<'div'> {}

export const EmotionVoteWidget = ({
  className,
  ...rest
}: EmotionVoteWidgetProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<
    'joy' | 'angry' | null
  >(null)

  const [joyCount, setJoyCount] = useState<number>(0)
  const [angryCount, setAngryCount] = useState<number>(0)

  const total = joyCount + angryCount

  const joyPercent = total > 0 ? Math.round((joyCount / total) * 100) : 50
  const angryPercent = 100 - joyPercent
  const dominant = joyPercent >= angryPercent ? 'joy' : 'angry'

  return (
    <div
      className={cn(
        'flex flex-row w-full h-full gap-4',
        selectedEmotion === 'joy' ? 'translate-x-2' : '-translate-x-2',
        className,
      )}
      {...rest}
    >
      <EmotionButton
        emotionType="joy"
        onClick={() => {
          setSelectedEmotion('joy'), setJoyCount((prev) => prev + 1)
        }}
        className={cn(
          'origin-bottom transition-transform duration-150',
          selectedEmotion === null
            ? 'scale-100'
            : selectedEmotion === 'joy'
              ? 'scale-110'
              : 'scale-90',
        )}
      >
        기뻐요
      </EmotionButton>
      <EmotionButton
        emotionType="angry"
        onClick={() => {
          setSelectedEmotion('angry'), setAngryCount((prev) => prev + 1)
        }}
        className={cn(
          'origin-bottom transition-transform duration-150',
          selectedEmotion === null
            ? 'scale-100'
            : selectedEmotion === 'angry'
              ? 'scale-110'
              : 'scale-90',
        )}
      >
        화나요
      </EmotionButton>
      <ProgressBar
        emotion={dominant}
        emotionPercent={dominant === 'joy' ? joyPercent : angryPercent}
      />
    </div>
  )
}
