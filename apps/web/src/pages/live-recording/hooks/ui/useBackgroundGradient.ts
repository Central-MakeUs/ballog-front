import type { CSSProperties } from 'react'

import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'
import { calculateGradientColor } from '@/pages/live-recording/utils/calculateGradientColor'

type GradientDirection = 'to top' | 'to bottom'

interface UseBackgroundGradientOptions {
  direction?: GradientDirection
}

/**
 * 감정 기반 배경색 그라데이션을 계산하는 hook
 *
 * @param options - 그라데이션 방향 등 옵션
 * @returns 배경색, 스타일 객체
 */
export const useBackgroundGradient = (
  options?: UseBackgroundGradientOptions,
) => {
  const { joyPercent, angryPercent } = useEmotionVote()
  const direction = options?.direction ?? 'to top'

  let bgColor: string | undefined = undefined

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('joy', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('angry', angryPercent)
  }

  const gradientStyle: CSSProperties = bgColor
    ? {
        background: `linear-gradient(${direction}, ${bgColor}, var(--color-usage-background-subtle) 50%)`,
      }
    : {}

  return {
    bgColor,
    gradientStyle,
    joyPercent,
    angryPercent,
  }
}
