import { useState } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { AngryEmotionCharacter, NoEmotionCharacter } from '@ballog/asset/icons'

import { useFlow } from '@/app/routes/stackflow'
import RightArrow from '@/assets/RightArrow'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { HomeHeaderV2 } from '@/widgets/header/ui/HomeHeaderV2'
import { useUserQuery } from '@/entities/auth/hooks'
import { useFriendsQuery } from '@/entities/friend'
import { SHORT_TEAM_NAMES } from '@/shared/constants/teams'

import { AddFriendBottomSheet } from './AddFriendBottomSheet'
import {
  CommunityFriendGrid,
  type CommunityFriendCardData,
} from './CommunityFriendGrid'
import { CommunityEmptyState } from './CommunityEmptyState'
import { CommunityRankTooltipPopover } from './CommunityRankTooltipPopover'
import { KBORankBottomSheet } from './KBORankBottomSheet'

const HERO_STAT = {
  team: '롯데 자이언츠',
  rank: '1위',
  label: '현재 순위',
}

export const CommunityPage = () => {
  const { user } = useUserQuery()
  const { replace, push } = useFlow()
  const { data: friendsData } = useFriendsQuery()
  const [isKBORankBottomSheetOpen, setIsKBORankBottomSheetOpen] =
    useState(false)
  const [isAddFriendBottomSheetOpen, setIsAddFriendBottomSheetOpen] =
    useState(false)

  const friends = friendsData?.data ?? []
  const hasFriends = friends.length > 0
  const EMOTION_MAP = {
    POSITIVE: { label: '행복해', tone: 'positive' },
    NEGATIVE: { label: '짜증나', tone: 'negative' },
    NEUTRAL: { label: '무덤덤', tone: 'neutral' },
  } as const

  const friendCards: CommunityFriendCardData[] = friends.map((friend) => ({
    userId: friend.userId,
    nickname: friend.nickname,
    team: SHORT_TEAM_NAMES[friend.baseballTeam],
    emotion: EMOTION_MAP[friend.emotion].label,
    tone: EMOTION_MAP[friend.emotion].tone,
  }))

  const nickname = user?.nickname ?? '볼로그'
  const heroEmotionLabel = hasFriends ? '화나요 70%' : '감정없음'
  const heroEmotionBadgeClassName = hasFriends
    ? 'bg-brand-red-subtle text-brand-red-default'
    : 'bg-brand-neutral-20 text-brand-neutral-80'
  return (
    <AppScreen>
      <div className="flex flex-col w-full h-full light:bg-brand-neutral-10">
        <HomeHeaderV2
          nickname={nickname}
          onProfileClick={() => replace('My', {}, { animate: false })}
        />
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
          <div className="relative w-full pb-32 light:bg-brand-neutral-10">
            <main>
              <section className="flex items-center justify-between px-8 pt-3.5">
                <div className="flex flex-col justify-between flex-1 h-22">
                  <div>
                    <h1 className="text-white heading-md-bold light:text-brand-neutral-black">
                      {HERO_STAT.team}
                    </h1>
                    <div className="mt-0.5 flex items-center gap-1">
                      <span className="body-lg-bold text-brand-primary-pressed">
                        {HERO_STAT.rank}
                      </span>
                      <span className="text-white body-md-medium light:text-brand-neutral-80">
                        {HERO_STAT.label}
                      </span>
                      <CommunityRankTooltipPopover />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex items-center body-sm-medium text-brand-neutral-60"
                    onClick={() => {
                      setIsAddFriendBottomSheetOpen(false)
                      setIsKBORankBottomSheetOpen(true)
                    }}
                  >
                    전체 리그 순위
                    <RightArrow className="size-5 text-brand-neutral-60" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xlarge">
                  {hasFriends ? (
                    <AngryEmotionCharacter className="size-22" />
                  ) : (
                    <NoEmotionCharacter className="size-22" />
                  )}
                  <div
                    className={`rounded-full px-2 py-1 ${heroEmotionBadgeClassName}`}
                  >
                    <span className="body-sm-bold">{heroEmotionLabel}</span>
                  </div>
                </div>
              </section>

              {hasFriends ? (
                <section className="pt-6">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="body-md-medium text-usage-text-default">
                      친구 {friends.length}명
                    </h2>
                    <button
                      type="button"
                      className="text-white body-md-bold light:text-brand-neutral-80"
                      onClick={() => {
                        setIsKBORankBottomSheetOpen(false)
                        setIsAddFriendBottomSheetOpen(true)
                      }}
                    >
                      + 친구추가
                    </button>
                  </div>

                  <CommunityFriendGrid cards={friendCards} />
                </section>
              ) : (
                <CommunityEmptyState
                  onExploreFriends={() => push('FriendRequest', {})}
                />
              )}
            </main>
          </div>
        </div>

        <GlobalNavigationBar />
        <KBORankBottomSheet
          open={isKBORankBottomSheetOpen}
          onOpenChange={setIsKBORankBottomSheetOpen}
        />
        <AddFriendBottomSheet
          open={isAddFriendBottomSheetOpen}
          onOpenChange={setIsAddFriendBottomSheetOpen}
        />
      </div>
    </AppScreen>
  )
}

export default CommunityPage
