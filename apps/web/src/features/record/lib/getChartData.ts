import { groupBy, mapValues, pipe } from 'remeda'

import {
  type EmotionGroup,
  type EmotionType,
} from '@/entities/record/model/record.type'
import { formatTime } from '@/shared/lib/date'

interface ChartData {
  time: string
  percent: number
  emotionType: EmotionType
}

export const getChartData = (emotionGroupList: EmotionGroup[]): ChartData[] => {
  // 시간대별로 그룹화
  const groupedData = pipe(
    emotionGroupList,
    groupBy((data) => formatTime(data.groupStart)),
    mapValues((timeGroup) => {
      const emotionTimeGroup = timeGroup.reduce(
        (acc, item) => {
          acc[item.emotionType] = {
            ...acc[item.emotionType],
            count: acc[item.emotionType].count + item.count,
          }
          return acc
        },
        {
          POSITIVE: {
            groupStart: '',
            emotionType: 'POSITIVE',
            count: 0,
          },
          NEGATIVE: {
            groupStart: '',
            emotionType: 'NEGATIVE',
            count: 0,
          },
        } as Record<EmotionType, EmotionGroup>,
      )

      return emotionTimeGroup
    }),
  )

  // 시간대별로 emotion Type 선정
  const parseData = Object.entries(groupedData).map((item) => {
    const positiveCount = item[1].POSITIVE.count
    const negativeCount = item[1].NEGATIVE.count

    const totalCount = positiveCount + negativeCount

    // positive 수가 negative 초과 시
    if (positiveCount >= negativeCount) {
      return {
        time: item[0],
        percent: parseFloat(((positiveCount / totalCount) * 100).toFixed(0)),
        emotionType: 'POSITIVE' as const,
      }
    }

    // negative 수가 positive 이상 시
    return {
      time: item[0],
      percent: parseFloat(
        (100 - (negativeCount / totalCount) * 100).toFixed(0),
      ),
      emotionType: 'NEGATIVE' as const,
    }
  })
  return parseData
}
