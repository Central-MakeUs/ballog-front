import { PieChart, Pie } from 'recharts'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

type Props = ComponentProps<'div'> & {
  centerRate: number
  progressColor: string
  trackColor?: string
  startAngle: number
  endAngle: number
  size?: number
  trackOuter: number
  progressInner: number
  progressOuter: number
  centerTitle?: string
}

export const EmotionDonutChart = ({
  centerRate,
  progressColor,
  trackColor = 'var(--color-usage-background-strong)',
  startAngle,
  endAngle,
  size = 104,
  trackOuter,
  progressInner,
  progressOuter,
  centerTitle,
  className,
  ...rest
}: Props) => {
  const dominantOnly = [
    { name: 'progress', value: centerRate, fill: progressColor },
    { name: 'rest', value: 100 - centerRate, fill: 'transparent' },
  ]

  return (
    <div
      className={cn('relative flex justify-center items-center', className)}
      {...rest}
    >
      <PieChart width={size} height={size}>
        {/* 중앙 원 */}
        <Pie
          data={[{ value: 100, fill: trackColor }]}
          dataKey="value"
          innerRadius={0}
          outerRadius={trackOuter}
          stroke="none"
          isAnimationActive={false}
        />
        {/* 우세 아크만 */}
        <Pie
          data={dominantOnly}
          dataKey="value"
          innerRadius={progressInner}
          outerRadius={progressOuter}
          startAngle={startAngle}
          endAngle={endAngle}
          stroke="none"
          isAnimationActive={false}
        />
      </PieChart>

      {centerTitle && (
        <div className="body-sm-bold text-brand-neutral-white mb-0.5">
          {centerTitle}
        </div>
      )}

      <div
        className="
          absolute inset-0
          flex flex-col items-center justify-center
          body-sm-bold text-brand-neutral-white
          pointer-events-none
        "
      >
        <div className="text-[23px]">{centerRate}%</div>
      </div>
    </div>
  )
}
