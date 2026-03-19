import { AngryEmotion, JoyEmotion } from '@ballog/asset/icons'

import { cn } from '@/shared/lib/classnames'

export interface CommunityFriendCardData {
  nickname: string
  team: string
  emotion: string
  tone: 'negative' | 'positive' | 'neutral'
}

const EMOTION_STYLES = {
  negative: {
    badge: 'bg-brand-red-subtle',
    team: 'text-usage-text-subtle',
    emotion: 'text-brand-red-default',
  },
  positive: {
    badge: 'bg-brand-green-subtle',
    team: 'text-usage-text-subtle',
    emotion: 'text-brand-green-pressed',
  },
  neutral: {
    badge: 'bg-brand-neutral-20',
    team: 'text-usage-text-subtle',
    emotion: 'text-brand-neutral-80',
  },
} as const

const CommunityFriendMascot = ({
  tone,
}: {
  tone: CommunityFriendCardData['tone']
}) => {
  if (tone === 'negative') {
    return <AngryEmotion className="size-18" />
  }

  return (
    <JoyEmotion
      className={cn('size-18', tone === 'neutral' && 'grayscale opacity-80')}
    />
  )
}

const CommunityFriendCard = ({
  nickname,
  team,
  emotion,
  tone,
}: CommunityFriendCardData) => {
  const style = EMOTION_STYLES[tone]

  return (
    <article className="flex flex-col items-center gap-1 px-2 py-4 overflow-hidden h-44 rounded-large bg-usage-background-default">
      <div
        className={cn(
          'flex items-center justify-center gap-1 rounded-full px-2 py-1',
          style.badge,
        )}
      >
        <span className={cn('body-sm-medium dark:text-brand-neutral-60 light:text-usage-text-subtle', style.team)}>{team}</span>
        <span className={cn('body-sm-bold', style.emotion)}>{emotion}</span>
      </div>
      <div className="flex items-center justify-center h-22">
        <CommunityFriendMascot tone={tone} />
      </div>
      <p className="w-full text-center truncate body-sm-medium text-usage-text-default light:text-brand-neutral-60">
        {nickname}
      </p>
    </article>
  )
}

interface CommunityFriendGridProps {
  cards: CommunityFriendCardData[]
}

export const CommunityFriendGrid = ({ cards }: CommunityFriendGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-2.5 gap-y-4 px-4 pb-8 pt-4">
      {cards.map((card, index) => (
        <CommunityFriendCard
          key={`${card.nickname}-${card.emotion}-${index}`}
          {...card}
        />
      ))}
    </div>
  )
}

export default CommunityFriendGrid
