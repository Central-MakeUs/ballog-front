const colorMap = {
  joy: [
    '#212121', // 50~59
    '#102813', // 60~69
    '#1f4c24', // 70~79
    '#2e7036', // 80~89
    '#3d9447', // 90~99
    '#4EB65A', // 100
  ],
  angry: [
    '#212121', // 50~59
    '#4a090e', // 60~69
    '#770f17', // 70~79
    '#a41520', // 80~89
    '#d21a28', // 90~99
    '#e63946', // 100
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