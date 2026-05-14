import { AngryEmotionNoShadow, JoyEmotionNoShadow } from '@ballog/asset/icons'
import type { ComponentProps } from 'react'
import { Pie, PieChart } from 'recharts'

import { cn } from '@/shared/lib/classnames'

export interface EmotionPieChartData {
  name: '화나요' | '기뻐요'
  value: number
}

export interface ActiveEmotionCardProps extends ComponentProps<'div'> {
  data: EmotionPieChartData[]
  showBadgeBg?: boolean
}

const EmotionBadge = ({
  emotion,
  showBadgeBg = false,
  className,
}: {
  emotion: '화나요' | '기뻐요'
  showBadgeBg?: boolean
  className?: string
}) => {
  const isAngry = emotion === '화나요'
  const emotionIcon = {
    화나요: <AngryEmotionNoShadow className="w-5 h-5" />,
    기뻐요: <JoyEmotionNoShadow className="w-5 h-5" />,
  }

  return (
    <div
      className={cn(
        'flex flex-row justify-center items-center gap-1',
        showBadgeBg && 'py-1 px-2 w-full rounded-md',
        showBadgeBg && (isAngry ? 'bg-brand-red-disabled' : 'bg-brand-green-disabled'),
        className,
      )}
    >
      {emotionIcon[emotion]}
      <span
        className={cn(
          'body-sm-bold',
          showBadgeBg
            ? isAngry ? 'text-brand-red-hover' : 'text-brand-green-hover'
            : 'text-brand-neutral-70',
        )}
      >
        {emotion}
      </span>
    </div>
  )
}

export const Active = ({ data, showBadgeBg = false, className, ...rest }: ActiveEmotionCardProps) => {
  const chartData = data

  const angryValue = chartData.find((d) => d.name === '화나요')!.value
  const joyValue = chartData.find((d) => d.name === '기뻐요')!.value

  const centerEmotion = angryValue >= joyValue ? '화나요' : '기뻐요'
  const centerRate = centerEmotion === '화나요' ? angryValue : joyValue

  const progressColor =
    centerEmotion === '화나요'
      ? 'var(--color-brand-red-hover)'
      : 'var(--color-brand-green-hover)'
  const trackColor = 'var(--color-brand-neutral-white)'

  const startAngle = angryValue <= 50 ? 90 : 0
  const endAngle = angryValue <= 50 ? 450 : 360

  const dominantOnly = [
    { name: 'progress', value: centerRate, fill: progressColor },
    { name: 'rest', value: 100 - centerRate, fill: 'transparent' },
  ]

  return (
    <div
      className={cn(
        'relative flex flex-col p-4',
        'w-full',
        'h-full',
        'justify-center items-center',
        'rounded-xlarge',
        'bg-usage-background-subtle',
        className,
      )}
      {...rest}
    >
      <div className="relative flex items-center justify-center mb-4">
        <PieChart width={104} height={104}>
          {/* 중앙 원 */}
          <Pie
            data={[{ value: 100, fill: 'var(--color-brand-neutral-white)' }]}
            dataKey="value"
            innerRadius={0}
            outerRadius={35}
            stroke="none"
            isAnimationActive={false}
          />
          {/* 회색 트랙 */}
          <Pie
            data={[{ value: 100, fill: trackColor }]}
            dataKey="value"
            innerRadius={35}
            outerRadius={52}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke="none"
            isAnimationActive={false}
          />
          {/* 우세 아크만 */}
          <Pie
            data={dominantOnly}
            dataKey="value"
            innerRadius={40}
            outerRadius={52}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke="none"
            isAnimationActive={false}
          />
        </PieChart>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none body-sm-bold text-usage-text-default">
          <div className="text-[23px] text-color-brand-neutral-white">
            {centerRate}%
          </div>
        </div>
      </div>

      <div className="mx-4">
        <EmotionBadge emotion={centerEmotion} showBadgeBg={showBadgeBg} />
      </div>
    </div>
  )
}

export default Active
