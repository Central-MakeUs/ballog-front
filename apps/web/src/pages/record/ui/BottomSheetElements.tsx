import type { ComponentType } from 'react'

import type { RecordDetailResponse } from '@/entities/record/model/record.type'
import { Chip } from '@/shared/ui/common/Chip/Chip'
import JoyEmotion from '@/assets/joyEmotionNoShadow.svg?react'
import AngryEmotion from '@/assets/angryEmotionNoShadow.svg?react'
import { cn } from '@/shared/lib/classnames'

type Result = NonNullable<RecordDetailResponse['result']>

/**
 * 공유용 바텀시트에 다는 경기 결과 Chip 과 Emotion 을 매핑, 렌더링 하는 로직
 */

// Chip 매핑
export const RESULT_CHIP_MAP: Record<
  Result,
  { variant: 'red' | 'green' | 'secondary'; label: string }
> = {
  LOSE: { variant: 'red', label: '패배' },
  WIN: { variant: 'green', label: '승리' },
  DRAW: { variant: 'secondary', label: '무승부' },
}

// Emotion 매핑
const RESULT_EMOTION_MAP: Record<'WIN' | 'LOSE', ComponentType> = {
  WIN: JoyEmotion,
  LOSE: AngryEmotion,
}

export function ResultChip({
  result,
  className,
}: {
  result: RecordDetailResponse['result']
  className?: string
}) {
  if (!result) return null
  const chip = RESULT_CHIP_MAP[result as Result]
  if (!chip) return null
  return (
    <div className={cn('absolute', className)}>
      <Chip variant={chip.variant} state="default">
        {chip.label}
      </Chip>
    </div>
  )
}

export function ResultEmotion({
  result,
  className,
}: {
  result: RecordDetailResponse['result']
  className?: string
}) {
  if (!result) return null
  const Emotion = RESULT_EMOTION_MAP[result as keyof typeof RESULT_EMOTION_MAP]
  if (!Emotion) return null
  return (
    <div className={cn('absolute', className)}>
      <Emotion />
    </div>
  )
}
