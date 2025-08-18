import { useMemo } from 'react'

export type EmotionLabel = '화나요' | '기뻐요'
export interface EmotionPieChartData {
  name: EmotionLabel
  value: number
}

export interface EmotionChartComputed {
  angryValue: number
  joyValue: number
  centerEmotion: EmotionLabel
  centerRate: number
  progressColor: string
  trackColor: string
  startAngle: number
  endAngle: number
}

// 도넛 차트 요소들 계산하는 로직
export function calculateEmotionChart(data: EmotionPieChartData[]): EmotionChartComputed {
  const get = (label: EmotionLabel) =>
    Math.max(0, Math.min(100, data.find(d => d.name === label)?.value ?? 0))

  const angryValue = get('화나요')
  const joyValue = get('기뻐요')

  const centerEmotion: EmotionLabel = angryValue >= joyValue ? '화나요' : '기뻐요'
  const centerRate = centerEmotion === '화나요' ? angryValue : joyValue

  const progressColor =
    centerEmotion === '화나요'
      ? 'var(--color-brand-red-hover)'
      : 'var(--color-brand-green-hover)'

  const trackColor = 'var(--color-usage-background-strong)'
  const startAngle = angryValue <= 50 ? 90 : 0
  const endAngle = angryValue <= 50 ? 450 : 360

  return {
    angryValue,
    joyValue,
    centerEmotion,
    centerRate,
    progressColor,
    trackColor,
    startAngle,
    endAngle,
  }
}

export function useEmotionChart(data: EmotionPieChartData[]): EmotionChartComputed {
  return useMemo(() => calculateEmotionChart(data), [data])
}
