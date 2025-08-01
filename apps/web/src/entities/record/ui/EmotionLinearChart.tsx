import { useEffect, useRef } from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  ReferenceLine,
  Line,
  CartesianGrid,
} from 'recharts'

import { type ChartConfig, ChartContainer } from '@/shared/ui/common/chart'
import JoyEmotion from '@/assets/joyEmotion.svg?react'
import AngryEmotion from '@/assets/angryEmotion.svg?react'
import { type EmotionType } from '@/entities/record/model/record.type'

interface ChartData {
  time: string
  percent: number
  emotionType: EmotionType
}

const chartConfig = {
  count: {
    label: '감정 수',
    color: 'var(--color-brand-primary-default)',
  },
} satisfies ChartConfig

// 미친 recharts 라이브러리
// props에 any 타입으로 되어있음
const CustomizedDot = (props: unknown) => {
  if (
    typeof props !== 'object' ||
    props === null ||
    !('cx' in props) ||
    !('cy' in props) ||
    !('value' in props) ||
    typeof props.cx !== 'number' ||
    typeof props.cy !== 'number' ||
    typeof props.value !== 'number'
  ) {
    return null
  }
  const { cx, cy, value } = props

  if (value < 50) {
    return (
      <g>
        <text
          x={cx}
          y={cy - 20}
          textAnchor="middle"
          className="text-xs fill-usage-text-default"
          fontSize="12"
        >
          {100 - value}%
        </text>
        <AngryEmotion x={cx - 9} y={cy - 9} height={18} width={18} />
      </g>
    )
  }

  return (
    <g>
      <text
        x={cx}
        y={cy - 20}
        textAnchor="middle"
        className="text-xs fill-usage-text-default"
        fontSize="12"
      >
        {value}%
      </text>
      <JoyEmotion x={cx - 9} y={cy - 9} height={18} width={18} />
    </g>
  )
}

export const EmotionLinearChart = ({
  ChartData,
}: {
  ChartData: ChartData[]
}) => {
  const dataCount = ChartData.length
  const chartRef = useRef<HTMLDivElement>(null)

  // 데이터 개수에 따른 차트 너비 계산
  // 8개 이하면 100%, 8개 초과면 데이터 개수에 비례해서 너비 증가
  const getChartWidth = () => {
    if (dataCount <= 8) {
      return 'calc(100%)'
    }
    // 기본 너비 + 추가 데이터 개수당 80px씩 추가
    const additionalWidth = (dataCount - 8) * 80
    return `calc(100% + ${additionalWidth}px)`
  }

  useEffect(() => {
    if (!chartRef.current) return

    // MutationObserver로 recharts DOM 변경 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // recharts가 렌더링된 후 rect 찾기
          const rectElement = chartRef.current?.querySelector(
            '.recharts-cartesian-grid-bg',
          )
          if (rectElement) {
            rectElement.setAttribute('rx', '12')
            rectElement.setAttribute('ry', '12')
            observer.disconnect() // 한 번 적용 후 observer 정리
          }
        }
      })
    })

    // chartRef 하위의 모든 변경사항 관찰
    observer.observe(chartRef.current, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [dataCount])

  return (
    <ChartContainer
      className="overflow-x-auto overflow-y-hidden h-60 rounded-lg"
      config={chartConfig}
      ref={chartRef}
      style={{ width: getChartWidth() }}
    >
      <LineChart
        accessibilityLayer
        data={ChartData}
        barCategoryGap={4}
        margin={{}}
        style={{
          padding: '0 12px',
        }}
      >
        <defs>
          <pattern
            id="chartBg"
            patternUnits="userSpaceOnUse"
            width="100%"
            height="100%"
          >
            <rect
              fill="#252525"
              rx="12"
              ry="12"
              x={0}
              y={0}
              width="100%"
              height="100%"
            />
          </pattern>
        </defs>

        <CartesianGrid
          vertical={false}
          horizontal={false}
          fill="url(#chartBg)"
          style={{
            borderRadius: '12px',
          }}
        />

        <ReferenceLine y={25} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine y={50} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine y={75} stroke="#e5e7eb" strokeDasharray="0" />

        <XAxis
          className="body-sm-light"
          dataKey="time"
          axisLine={false}
          interval={1}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          tickMargin={12}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[25, 50, 75]}
          tickCount={3}
          axisLine={false}
          tickLine={false}
          width={0}
          type="number"
        />

        <Line
          dataKey="percent"
          type="natural"
          stroke="var(--color-count)"
          strokeWidth={2}
          dot={<CustomizedDot />}
          points={[
            { value: 25, x: 0, y: 25 },
            { value: 50, x: 0, y: 50 },
            { value: 75, x: 0, y: 75 },
            { value: 100, x: 0, y: 100 },
          ]}
        />
      </LineChart>
    </ChartContainer>
  )
}
