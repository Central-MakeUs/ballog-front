import { Area, AreaChart, CartesianGrid } from 'recharts'

import { SectionHeader } from '@/shared/ui/common'
import { ProgressBar } from '@/shared/ui/common/ProgressBar/ProgressBar'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/common/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-brand-primary-default)',
  },
} satisfies ChartConfig

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const EmotionLinearChart = () => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-brand-primary-default)"
          fillOpacity={0.4}
          stroke="var(--color-brand-primary-default)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export const EmotionTimeLine = () => {
  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      <SectionHeader title="감정 타임라인" className="px-4" />
      <div className="flex justify-center px-4">
        <ProgressBar emotion="joy" emotionPercent={80} />
      </div>
      <EmotionLinearChart />
    </div>
  )
}
