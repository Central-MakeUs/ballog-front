import { groupBy, pipe } from 'remeda'

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
  )

  // 시간대별로 emotion Type 선정
  const parseData = Object.entries(groupedData).map((item) => {
    const positiveData = item[1].find((data) => data.emotionType === 'POSITIVE')
    const negativeData = item[1].find((data) => data.emotionType === 'NEGATIVE')

    const positiveCount = positiveData?.count ?? 0
    const negativeCount = negativeData?.count ?? 0
    const totalCount = positiveCount + negativeCount

    // positive 수가 negative 초과 시
    if (positiveCount > negativeCount) {
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
