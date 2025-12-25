import { Pie, PieChart } from 'recharts'
import type { ComponentProps } from 'react'

import AngryEmotion from '@/assets/angryEmotionNoShadow.svg?react'
import JoyEmotion from '@/assets/joyEmotionNoShadow.svg?react'
import { cn } from '@/shared/lib/classnames'

interface EmotionPieChartData {
  name: '화나요' | '기뻐요'
  value: number
}

interface ActiveEmotionCardProps extends ComponentProps<'div'> {
  data: EmotionPieChartData[]
}

interface DisabledEmotionCardProps extends ComponentProps<'div'> {}

/**
 * EmotionCard
 *
 *
 * 컴포넌트 구성:
 * - `EmotionCard.Active`: 감정이 기록된 상태. 원형 차트를 통해 비율과 감정 상태를 표시합니다.
 * - `EmotionCard.Disabled`: 감정이 기록되지 않은 상태. 기본 아이콘과 안내 메시지를 보여줍니다.
 *
 * @example 활성 상태
 * ```tsx
 * <EmotionCard.Active emotion="기뻐요" rate={60} />
 * ```
 *
 * @example 비활성 상태
 * ```tsx
 * <EmotionCard.Disabled />
 * ```
 */
const Active = ({ data, className, ...rest }: ActiveEmotionCardProps) => {
  const chartData = data

  const angryValue = chartData.find((d) => d.name === '화나요')!.value
  const joyValue = chartData.find((d) => d.name === '기뻐요')!.value

  const centerEmotion = angryValue >= joyValue ? '화나요' : '기뻐요'
  const centerRate = centerEmotion === '화나요' ? angryValue : joyValue

  const progressColor =
    centerEmotion === '화나요'
      ? 'var(--color-brand-red-hover)'
      : 'var(--color-brand-green-hover)'
  const trackColor = 'var(--color-usage-background-strong)'

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
            data={[{ value: 100, fill: trackColor }]}
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

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none body-sm-bold text-brand-neutral-white">
          <div className="text-[23px]">{centerRate}%</div>
        </div>
      </div>

      {centerEmotion === '화나요' ? (
        <div
          className={cn(
            'flex flex-row justify-center items-center text-brand-red-default bg-brand-red-disabled py-1 px-2 rounded-md',
          )}
        >
          <AngryEmotion className="w-5 h-5 mr-1" />
          <span>{centerEmotion}</span>
        </div>
      ) : (
        <div
          className={cn(
            'flex flex-row justify-center items-center text-brand-green-pressed bg-brand-green-disabled py-1 px-2 rounded-md',
          )}
        >
          <JoyEmotion className="w-5 h-5 mr-1" />
          <span>{centerEmotion}</span>
        </div>
      )}
    </div>
  )
}

const Disabled = ({ className, ...rest }: DisabledEmotionCardProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'min-w-[156px] h-full',
      'px-4 py-4',
      'rounded-xlarge bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    <div className="flex items-center justify-center w-full h-full rounded-full bg-usage-background-strong">
      <div className="flex items-center justify-center gap-4 mt-4.25 text-brand-neutral-white min-w-30 min-h-30">
        <div className="flex flex-col items-center">
          <AngryEmotion className="w-8 h-8" />
          <p className="body-sm-bold">- %</p>
        </div>
        <div className="flex flex-col items-center">
          <JoyEmotion className="w-8 h-8" />
          <p className="body-sm-bold">- %</p>
        </div>
      </div>
    </div>
  </div>
)

export const EmotionCard = {
  Active,
  Disabled,
}
