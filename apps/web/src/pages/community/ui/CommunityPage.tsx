import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Notification } from '@ballog/asset/icons'
import { AngryEmotion, GrayInfoIcon, JoyEmotion } from '@ballog/asset/icons'

import RightArrow from '@/assets/RightArrow'
import { GlobalNavigationBar } from '@/widgets/navigation'
import BallogAppBar from '@/assets/BallogAppBar'

interface FriendCard {
  nickname: string
  team: string
  emotion: string
  tone: 'negative' | 'positive' | 'neutral'
}

const HERO_STAT = {
  team: '롯데 자이언츠',
  rank: '1위',
  label: '현재 순위',
  emotion: '화나요',
  value: '70%',
}

const FRIEND_CARDS: FriendCard[] = [
  { team: '롯데', emotion: '짜증나', nickname: '볼로그', tone: 'negative' },
  { team: '롯데', emotion: '행복해', nickname: '볼로그그그', tone: 'positive' },
  {
    team: 'SGG',
    emotion: '무덤덤',
    nickname: '볼로그그그...',
    tone: 'neutral',
  },
  { team: '롯데', emotion: '짜증나', nickname: '볼로그', tone: 'negative' },
  { team: '롯데', emotion: '행복해', nickname: '볼로그그그', tone: 'positive' },
  {
    team: 'SGG',
    emotion: '무덤덤',
    nickname: '볼로그그그...',
    tone: 'neutral',
  },
  { team: '롯데', emotion: '짜증나', nickname: '볼로그', tone: 'negative' },
  { team: '롯데', emotion: '행복해', nickname: '볼로그그그', tone: 'positive' },
  {
    team: 'SGG',
    emotion: '무덤덤',
    nickname: '볼로그그그...',
    tone: 'neutral',
  },
]

const EMOTION_STYLES = {
  negative: {
    badge: 'bg-brand-red-subtle',
    team: 'text-usage-text-subtle',
    emotion: 'text-brand-red-default',
    iconClassName: 'text-brand-red-hover',
  },
  positive: {
    badge: 'bg-brand-green-subtle',
    team: 'text-usage-text-subtle',
    emotion: 'text-brand-green-pressed',
    iconClassName: 'text-brand-green-default',
  },
  neutral: {
    badge: 'bg-brand-neutral-20',
    team: 'text-usage-text-subtle',
    emotion: 'text-brand-neutral-80',
    iconClassName: 'text-brand-neutral-40',
  },
} as const

const CommunityMascot = ({ tone }: { tone: FriendCard['tone'] }) => {
  const className = `size-18 ${
    tone === 'neutral' ? 'grayscale opacity-80' : ''
  } ${EMOTION_STYLES[tone].iconClassName}`

  if (tone === 'negative') {
    return <AngryEmotion className={className} />
  }

  return <JoyEmotion className={className} />
}

const FriendEmotionCard = ({ nickname, team, emotion, tone }: FriendCard) => {
  const style = EMOTION_STYLES[tone]

  return (
    <article className="flex flex-col items-center gap-1 px-2 py-4 overflow-hidden h-44 rounded-large bg-usage-background-default">
      <div
        className={`flex items-center justify-center gap-1 rounded-full px-2 py-1 ${style.badge}`}
      >
        <span className={`body-sm-medium ${style.team}`}>{team}</span>
        <span className={`body-sm-bold ${style.emotion}`}>{emotion}</span>
      </div>
      <div className="flex items-center justify-center h-22">
        <CommunityMascot tone={tone} />
      </div>
      <p className="w-full text-center truncate body-sm-medium text-usage-text-default">
        {nickname}
      </p>
    </article>
  )
}

export const CommunityPageHeader = () => {
  return (
    <header>
      <div className="flex items-center justify-between pl-5 pr-2 h-14">
        <button
          type="button"
          className="flex items-center text-white body-md-medium light:text-brand-neutral-70"
        >
          볼로그님
          <RightArrow className="text-white size-6 light:text-brand-neutral-70" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-12 h-12"
        >
          <Notification className="size-6" />
        </button>
      </div>
    </header>
  )
}

export const CommunityPage = () => {
  return (
    <AppScreen>
      <CommunityPageHeader />
      <div className="relative w-full pb-32light:bg-brand-neutral-10">
        <main>
          <section className="flex items-center justify-between px-8 pt-3.5">
            <div className="flex flex-col justify-between flex-1 h-22">
              <div>
                <h1 className="heading-md-bold light:text-brand-neutral-black">
                  {HERO_STAT.team}
                </h1>
                <div className="mt-0.5 flex items-center gap-1">
                  <span className="body-lg-bold text-brand-primary-pressed">
                    {HERO_STAT.rank}
                  </span>
                  <span className="body-md-medium light:text-brand-neutral-80">
                    {HERO_STAT.label}
                  </span>
                  <GrayInfoIcon className="size-5" />
                </div>
              </div>

              <button
                type="button"
                className="flex items-center body-sm-medium text-brand-neutral-60"
              >
                전체 리그 순위
                <RightArrow className="size-5 text-brand-neutral-60" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xlarge">
              <AngryEmotion className="size-22 text-brand-red-hover" />
              <div className="px-2 py-1 rounded-full bg-brand-red-subtle">
                <span className="body-sm-bold text-brand-red-default">
                  {HERO_STAT.emotion} {HERO_STAT.value}
                </span>
              </div>
            </div>
          </section>

          <section className="pt-6">
            <div className="flex items-center justify-between px-4">
              <h2 className="body-md-medium text-usage-text-default">
                친구 00 명
              </h2>
              <button
                type="button"
                className="text-white body-md-bold light:text-brand-neutral-80"
              >
                + 친구추가
              </button>
            </div>

            <div className="grid grid-cols-3 gap-x-[10px] gap-y-4 px-4 pb-8 pt-4">
              {FRIEND_CARDS.map((card, index) => (
                <FriendEmotionCard
                  key={`${card.nickname}-${card.emotion}-${index}`}
                  {...card}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <GlobalNavigationBar />
    </AppScreen>
  )
}

export default CommunityPage
