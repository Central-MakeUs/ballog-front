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
    badge: 'bg-[#FFE5E6]',
    team: 'text-[#757575]',
    emotion: 'text-[#F74000]',
    iconClassName: 'text-[#F75B1B]',
  },
  positive: {
    badge: 'bg-[#E8F6E9]',
    team: 'text-[#757575]',
    emotion: 'text-[#3F8F46]',
    iconClassName: 'text-[#38D430]',
  },
  neutral: {
    badge: 'bg-[#EEEEEE]',
    team: 'text-[#757575]',
    emotion: 'text-[#424242]',
    iconClassName: 'text-[#BCBCBC]',
  },
} as const

const CommunityMascot = ({ tone }: { tone: FriendCard['tone'] }) => {
  const className = `h-[72px] w-[72px] ${
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
    <article className="flex h-[174px] flex-col items-center gap-[3px] overflow-hidden rounded-[12px] bg-white px-2 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div
        className={`flex items-center justify-center gap-1 rounded-full px-2 py-1 ${style.badge}`}
      >
        <span className={`text-[14px] leading-5 font-medium ${style.team}`}>
          {team}
        </span>
        <span className={`text-[14px] leading-5 font-bold ${style.emotion}`}>
          {emotion}
        </span>
      </div>
      <div className="flex h-[88px] items-center justify-center">
        <CommunityMascot tone={tone} />
      </div>
      <p className="w-full truncate text-center text-[14px] leading-5 font-medium text-[#212121]">
        {nickname}
      </p>
    </article>
  )
}

export const CommunityPage = () => {
  return (
    <AppScreen appBar={{ title: <BallogAppBar /> }}>
      <div className="relative w-full bg-[#F5F5F5] pb-[120px]">
        <header className="px-4 pt-3">
          <div className="mt-[15px] flex h-14 items-center justify-between pl-1 pr-0.5">
            <button
              type="button"
              className="flex items-center text-[16px] leading-6 font-medium text-[#616161]"
            >
              볼로그님
              <RightArrow />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12"
            >
              <Notification />
            </button>
          </div>
        </header>

        <main>
          <section className="flex items-center justify-between px-8 pt-[14px]">
            <div className="flex h-[88px] flex-1 flex-col justify-between">
              <div>
                <h1 className="text-[24px] leading-8 font-bold text-[#030303]">
                  {HERO_STAT.team}
                </h1>
                <div className="mt-0.5 flex items-center gap-1">
                  <span className="text-[18px] leading-7 font-bold text-[#17A093]">
                    {HERO_STAT.rank}
                  </span>
                  <span className="text-[16px] leading-6 font-medium text-[#3A3A3A]">
                    {HERO_STAT.label}
                  </span>
                  <GrayInfoIcon className="h-5 w-5 text-[#9E9E9E]" />
                </div>
              </div>

              <button
                type="button"
                className="flex items-center text-[14px] leading-5 font-medium text-[#757575]"
              >
                전체 리그 순위
                <RightArrow />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-[16px] px-4 py-2">
              <AngryEmotion className="h-[88px] w-[88px] text-[#F75B1B]" />
              <div className="rounded-full bg-[#FFE5E6] px-2 py-1">
                <span className="text-[14px] leading-5 font-bold text-[#F74000]">
                  {HERO_STAT.emotion} {HERO_STAT.value}
                </span>
              </div>
            </div>
          </section>

          <section className="pt-6">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-[16px] leading-6 font-medium text-[#212121]">
                친구 00 명
              </h2>
              <button
                type="button"
                className="text-[16px] leading-6 font-bold text-[#424242]"
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
