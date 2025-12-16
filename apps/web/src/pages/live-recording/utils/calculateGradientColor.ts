export const colorMap = {
  joy: [
    'var(--color-emotion-joy-50)', // 50~59
    'var(--color-emotion-joy-60)', // 60~69
    'var(--color-emotion-joy-70)', // 70~79
    'var(--color-emotion-joy-80)', // 80~89
    'var(--color-emotion-joy-90)', // 90~99
    'var(--color-emotion-joy-100)', // 100
  ],
  angry: [
    'var(--color-emotion-angry-50)', // 50~59
    'var(--color-emotion-angry-60)', // 60~69
    'var(--color-emotion-angry-70)', // 70~79
    'var(--color-emotion-angry-80)', // 80~89
    'var(--color-emotion-angry-90)', // 90~99
    'var(--color-emotion-angry-100)', // 100
  ],
}

export const calculateGradientColor = (
  emotion: 'joy' | 'angry',
  percent: number,
) => {
  const step = (() => {
    if (percent === 100) return 5
    if (percent >= 90) return 4
    if (percent >= 80) return 3
    if (percent >= 70) return 2
    if (percent >= 60) return 1
    return 0
  })()

  return colorMap[emotion][step]
}
