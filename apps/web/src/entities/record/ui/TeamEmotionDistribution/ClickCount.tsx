import { AngryEmotion, JoyEmotion } from '@ballog/asset/icons'

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
    <div className="w-full flex p-4 items-center justify-center rounded-xl bg-usage-background-subtle">
      <div className="flex items-center justify-between w-full">
        <span className="body-sm-medium text-usage-text-subtle">
          내 감정 참여 횟수
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <AngryEmotion className="w-6 h-6" />
            <span className="body-sm-bold text-usage-text-subtle">
              {negativeClickCount} 번
            </span>
          </div>
          <div className="flex items-center gap-1">
            <JoyEmotion className="w-6 h-6" />
            <span className="body-sm-bold text-usage-text-subtle">
              {positiveClickCount} 번
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
