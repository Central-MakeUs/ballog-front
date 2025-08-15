import { Pie, PieChart } from 'recharts'
import type { ComponentProps } from 'react'

import AngryEmotion from '@/assets/angryEmotion.svg?react'
import JoyEmotion from '@/assets/joyEmotion.svg?react'
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

  const madValue = chartData.find((d) => d.name === '화나요')!.value
  const happyValue = chartData.find((d) => d.name === '기뻐요')!.value

  const centerEmotion = madValue <= happyValue ? '기뻐요' : '화나요'
  const centerRate = centerEmotion === '기뻐요' ? happyValue : madValue

  const startAngle = madValue <= 50 ? 90 : 0
  const endAngle = madValue <= 50 ? 450 : 360

  return (
    <div
      className={cn(
        'relative flex flex-col',
        'w-full',
        'h-full',
        'justify-center items-center',
        'rounded-xlarge',
        'bg-usage-background-subtle',
        className,
      )}
      {...rest}
    >
      <div className="relative flex justify-center items-center py-10 min-w-30 min-h-30">
        <PieChart width={104} height={104}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={35}
            outerRadius={52}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke="none"
          />
        </PieChart>

        <div
          className="
          absolute inset-0
          flex flex-col items-center justify-center
          body-sm-bold text-brand-neutral-white
          pointer-events-none
        "
        >
          <div>{centerEmotion}</div>
          <div>{centerRate}%</div>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <AngryEmotion className="w-8 h-8" />
      </div>
      <div className="absolute bottom-4 right-4">
        <JoyEmotion className="w-8 h-8" />
      </div>
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
    <div
      className="
        flex items-center justify-center
        w-full h-full
        rounded-full bg-usage-background-strong"
    >
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
