import { useState } from 'react'

type EmotionType = 'happy' | 'angry'

interface EmotionCounts {
  happy: number
  angry: number
}

const EmotionRecorder = () => {
  const [counts, setCounts] = useState<EmotionCounts>({
    happy: 0,
    angry: 0,
  })

  // 클릭 핸들러
  const handleClick = (emotion: EmotionType) => {
    setCounts((prev) => ({
      ...prev,
      [emotion]: prev[emotion] + 1,
    }))
  }

  const total = counts.happy + counts.angry
  const happyPercent =
    total === 0 ? 0 : Math.round((counts.happy / total) * 100)
  const angryPercent =
    total === 0 ? 0 : Math.round((counts.angry / total) * 100)

  return (
    <div className="flex flex-col items-center gap-5 p-8">
      <h2 className="font-bold text-lg">지금의 감정 기록하기</h2>
      <div className="flex gap-10">
        <button
          onClick={() => handleClick('happy')}
          className="flex flex-col items-center"
        >
          <span className="text-4xl">🤩</span>
          <span className="text-sm text-gray-600">기뻐요</span>
          <span className="font-bold text-lg">{happyPercent}%</span>
        </button>
        <button
          onClick={() => handleClick('angry')}
          className="flex flex-col items-center"
        >
          <span className="text-4xl">😡</span>
          <span className="text-sm text-gray-600">화나요</span>
          <span className="font-bold text-lg">{angryPercent}%</span>
        </button>
      </div>

      {/* 퍼센트 바 */}
    <div className="w-full max-w-xs h-3 bg-gray-100 rounded-full overflow-hidden mt-4 relative">
        <div
          className="absolute top-0 left-0 h-full bg-gray-300"
          style={{ width: `${happyPercent}%` }}
        ></div>
        <div
          className="absolute top-0 right-0 h-full bg-gray-600"
          style={{ width: `${angryPercent}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500">
        클릭 한 번으로 나의 순간을 담아보세요
      </p>
    </div>
  )
}

export default EmotionRecorder
