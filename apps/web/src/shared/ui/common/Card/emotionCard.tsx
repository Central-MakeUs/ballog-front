import MadEmotion from '@/assets/madEmotion.svg?react'
import HappyEmotion from '@/assets/happyEmotion.svg?react'
import { Pie, PieChart } from 'recharts'

interface ActiveEmotionCardProps {
  state: 'active'
  emotion: string
  rate: number
}

interface DisabledEmotionCardProps {
  state: 'disabled'
}

type EmotionCardProps = ActiveEmotionCardProps | DisabledEmotionCardProps

const EmotionCard = (props: EmotionCardProps) => {
  switch (props.state) {
    case 'disabled':
      return renderDisabled()
    case 'active':
      return renderActive(props)
    default:
      const _exhaustive: never = props
      return _exhaustive
  }
}

const renderActive = (props: ActiveEmotionCardProps) => {
  const { emotion, rate } = props

  const chartData = [
    {
      name: '화나요',
      value: emotion === '화나요' ? rate : 100 - rate,
      fill: 'var(--color-brand-red-hover)',
    },
    {
      name: '좋아요',
      value: emotion === '좋아요' ? rate : 100 - rate,
      fill: 'var(--color-brand-green-hover)',
    },
  ]

  const madValue = chartData.find((d) => d.name === '화나요')!.value
  const happyValue = chartData.find((d) => d.name === '좋아요')!.value

  const centerEmotion =
    madValue > happyValue
      ? '화나요'
      : madValue < happyValue
        ? '좋아요'
        : '화나요'

  const centerRate = centerEmotion === '화나요' ? madValue : happyValue

  let startAngle = 0
  let endAngle = 0

  if (madValue <= 50) {
    startAngle = 90
    endAngle = 450
  } else {
    startAngle = 0
    endAngle = 360
  }

  return (
    <div
      className="relative flex flex-col w-[156px] h-[184px] justify-center items-center flex-shrink-0"
      style={{
        borderRadius: 'var(--radius-xlarge)',
        background: 'var(--color-usage-background-subtle)',
      }}
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
          className="body-sm-bold absolute inset-0 flex flex-col items-center justify-center"
          style={{
            pointerEvents: 'none',
            color: 'var(--color-brand-neutral-white)',
          }}
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

const renderDisabled = () => {
  return (
    <div
      className="flex w-[156px] min-h-[150px] flex-col justify-center items-center flex-shrink-0"
      style={{
        borderRadius: 'var(--radius-xlarge)',
        background: 'var(--color-usage-background-subtle)',
      }}
    >
      <div
        className="flex justify-center items-center rounded-full"
        style={{
          width: '122px',
          height: '122px',
          backgroundColor: 'var(--color-usage-background-strong, #2A2A2A)',
        }}
      >
        <div
          className="flex items-center gap-4 mt-[5px]"
          style={{ color: 'var(--color-brand-neutral-white)' }}
        >
          <div className="flex flex-col items-center">
            <MadEmotion />
            <div className="body-sm-bold">- %</div>
          </div>
          <div className="flex flex-col items-center">
            <HappyEmotion />
            <div className="body-sm-bold">- %</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { EmotionCard }
