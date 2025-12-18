import AngryEmotion from '@/assets/angryEmotion.svg?react'
import JoyEmotion from '@/assets/joyEmotion.svg?react'

import { type EmotionGroup } from '../../model/record.type'

interface ClickCountProps {
  emotionGroupList: EmotionGroup[]
}

export const ClickCount = ({ emotionGroupList }: ClickCountProps) => {
  const negativeClickCount = emotionGroupList.filter(
    (group) => group.emotionType === 'NEGATIVE',
  ).length
  const positiveClickCount = emotionGroupList.filter(
    (group) => group.emotionType === 'POSITIVE',
  ).length
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <span className="body-sm-medium text-usage-text-subtle">클릭 횟수</span>
        <div className="flex items-center gap-2">
          <AngryEmotion className="w-5 h-5" />
          <span className="body-sm-medium text-usage-text-subtle">
            {negativeClickCount}
          </span>
          <JoyEmotion className="w-5 h-5" />
          <span className="body-sm-medium text-usage-text-subtle">
            {positiveClickCount}
          </span>
        </div>
      </div>
    </div>
  )
}
