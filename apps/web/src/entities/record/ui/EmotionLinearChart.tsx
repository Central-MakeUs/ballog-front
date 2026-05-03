import { Suspense, lazy } from 'react'

import type { ChartData } from './EmotionLinearChartImpl'

const Impl = lazy(() => import('./EmotionLinearChartImpl'))

const ChartPlaceholder = () => (
  <div className="relative">
    <div className="overflow-hidden h-60 rounded-lg bg-usage-background-subtle animate-pulse" />
  </div>
)

export const EmotionLinearChart = ({
  ChartData,
}: {
  ChartData: ChartData[]
}) => (
  <Suspense fallback={<ChartPlaceholder />}>
    <Impl ChartData={ChartData} />
  </Suspense>
)
