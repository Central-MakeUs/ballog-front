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
    <article className="flex h-44 flex-col items-center gap-1 overflow-hidden rounded-large bg-usage-background-default px-2 py-4">
      <div
        className={cn(
          'flex items-center justify-center gap-1 rounded-full px-2 py-1',
          style.badge,
        )}
      >
        <span className={cn('body-sm-medium', style.team)}>{team}</span>
        <span className={cn('body-sm-bold', style.emotion)}>{emotion}</span>
      </div>
      <div className="flex h-22 items-center justify-center">
        <CommunityFriendMascot tone={tone} />
      </div>
      <p className="body-sm-medium w-full truncate text-center text-usage-text-default">
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
