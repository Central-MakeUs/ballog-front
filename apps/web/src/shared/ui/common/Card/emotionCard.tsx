import MadEmotion from '@/assets/madEmotion.svg?react'
import HappyEmotion from '@/assets/happyEmotion.svg?react'
import { Pie, PieChart } from 'recharts'

interface ActiveEmotionCardProps {
  emotion: '화나요' | '기뻐요'
  rate: number
}

interface DisabledEmotionCardProps {}

const Active = ({ emotion, rate }: ActiveEmotionCardProps) => {
  const chartData = [
    {
      name: '화나요',
      value: emotion === '화나요' ? rate : 100 - rate,
      fill: 'var(--color-brand-red-hover)',
    },
    {
      name: '좋아요',
      value: emotion === '기뻐요' ? rate : 100 - rate,
      fill: 'var(--color-brand-green-hover)',
    },
  ]

  const madValue = chartData.find((d) => d.name === '화나요')!.value
  const happyValue = chartData.find((d) => d.name === '좋아요')!.value

  const centerEmotion = madValue >= happyValue ? '화나요' : '기뻐요'
  const centerRate = centerEmotion === '화나요' ? madValue : happyValue

  const startAngle = madValue <= 50 ? 90 : 0
  const endAngle = madValue <= 50 ? 450 : 360

  return (
    <div
      className="
      relative flex flex-col
      w-full max-w-[156px]
      h-full max-h-[184px]
      justify-center items-center
      rounded-xlarge
      bg-usage-background-subtle"
    >
      <div className="relative py-10">
        
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
        <MadEmotion className="w-8 h-8" />
      </div>
      <div className="absolute bottom-4 right-4">
        <HappyEmotion className="w-8 h-8" />
      </div>
    </div>
  )
}

const Disabled = ({}: DisabledEmotionCardProps) => (
  <div
    className="
      flex flex-col items-center justify-center
      w-full max-w-[156px] h-full max-h-[150px]
      px-4 py-4
      rounded-xlarge bg-usage-background-subtle"
  >
    <div
      className="
        flex items-center justify-center
        w-full h-full
        rounded-full bg-usage-background-strong"
    >
      <div className="flex items-center gap-4 mt-4.25 text-brand-neutral-white">
        <div className="flex flex-col items-center">
          <MadEmotion className="w-8 h-8" />
          <p className="body-sm-bold">- %</p>
        </div>
        <div className="flex flex-col items-center">
          <HappyEmotion className="w-8 h-8" />
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
