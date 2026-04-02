import { SpeachBubble } from '@ballog/asset/icons'

import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'
import type { EmotionType } from '@/entities/record/model/record.type'
import { TEAMS } from '@/shared/constants/teams'
import { EMOTION_CONFIG } from '@/features/home/constants/emotionConfig'
import { Skeleton } from '@/shared/ui/common/Skeleton'

interface CharacterSectionProps {
  emotion: EmotionType | null
}

export const CharacterSection = ({ emotion }: CharacterSectionProps) => {
  const { user, userQuery } = useUserQuery()
  const config = emotion ? EMOTION_CONFIG[emotion] : EMOTION_CONFIG.none
  const { Character, label, emoji, badgeClass } = config

  const baseballTeam = user?.baseballTeam
  const teamName = baseballTeam ? TEAMS[baseballTeam] : TEAMS['NONE']

  return (
    <div className="flex flex-col items-center w-full pt-4">
      {/* Speech bubble — text centered in bubble body (top 43px), tail is bottom-right */}
      <div className="relative flex items-center justify-center">
        <SpeachBubble className="w-[138px] h-[56px]" />
        <div className="absolute top-0 left-0 right-0 h-[43px] flex items-center justify-center">
          {userQuery.isLoading ? (
            <Skeleton className="w-20 h-4 rounded-md" />
          ) : (
            <span className="body-md-medium text-brand-neutral-black whitespace-nowrap">
              {teamName} {emoji}
            </span>
          )}
        </div>
      </div>

      <Character className="w-[120px] h-[180px] -mt-3" />

      <div
        className={`flex items-center justify-center px-3 py-2 rounded-full mt-[8px] ${badgeClass}`}
      >
        <span className="body-lg-bold">{label}</span>
      </div>
    </div>
  )
}
