import { SectionHeader } from '@/shared/ui/common'
import { ProgressBar } from '@/shared/ui/common/ProgressBar/ProgressBar'
import { type EmotionGroup } from '@/entities/record/model/record.type'
import { EmotionLinearChart } from '@/entities/record/ui/EmotionLinearChart'
import { getChartData } from '@/features/record/lib/getChartData'

export const EmotionTimeLine = ({
  positiveEmotionPercent,
  negativeEmotionPercent,
  emotionGroupList,
}: {
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  emotionGroupList: EmotionGroup[]
}) => {
  const chartData = getChartData(emotionGroupList)

  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      <SectionHeader title="감정 타임라인" className="px-4" />
      <div className="flex justify-center px-4">
        <ProgressBar
          positiveEmotionPercent={positiveEmotionPercent}
          negativeEmotionPercent={negativeEmotionPercent}
        />
      </div>
      <div className="inline-block overflow-x-auto ">
        <EmotionLinearChart ChartData={chartData} />
      </div>
    </div>
  )
}
