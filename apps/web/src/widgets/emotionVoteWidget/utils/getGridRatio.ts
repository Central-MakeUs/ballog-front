import { getScale } from './getScale'

export const getGridRatio = (joyPercent: number, angryPercent: number) => {
  if (joyPercent === 0 && angryPercent === 0) {
    return '1fr 1fr'
  }

  if (joyPercent > 40 && joyPercent < 60) {
    return '1fr 1fr'
  }

  const joyScale = getScale(joyPercent)
  const angryScale = getScale(angryPercent)

  if (joyPercent <= 40) {
    return `${joyScale}fr ${2 - joyScale}fr`
  } else {
    return `${2 - angryScale}fr ${angryScale}fr`
  }
}
