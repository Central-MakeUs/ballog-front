export const calculateGradientColor = (start: string, end: string, percent: number) => {
  const hexToRgb = (hex: string) =>
    hex
      .replace('#', '')
      .match(/.{2}/g)!
      .map((x) => parseInt(x, 16))

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')

  const p = (percent - 50) / 50 // 0~1로 정규화

  const [r1, g1, b1] = hexToRgb(start)
  const [r2, g2, b2] = hexToRgb(end)

  const r = Math.round(r1 + (r2 - r1) * p)
  const g = Math.round(g1 + (g2 - g1) * p)
  const b = Math.round(b1 + (b2 - b1) * p)

  return rgbToHex(r, g, b)
}
