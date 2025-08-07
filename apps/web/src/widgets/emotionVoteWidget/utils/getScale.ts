export const getScale = (percent: number) => {
  if (percent === 0) return 0.7
  if (percent <= 20) return 0.8
  if (percent <= 40) return 0.9
  return 1
}
