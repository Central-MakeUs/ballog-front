import React, { Suspense, lazy, useEffect } from 'react'
import { stackflow, type ActivityComponentType } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'

import HomePageV2 from '@/pages/home/ui/HomePageV2'
import { withAuth } from '@/shared/hoc/Auth'

const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
const stackflowTheme: 'cupertino' | 'android' = /Android/i.test(ua) ? 'android' : 'cupertino'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>
type Importer = () => Promise<{ default: AnyComponent }>

const lazyActivity = (importer: Importer): ActivityComponentType => {
  const Lazy = lazy(importer)
  const Activity: ActivityComponentType = (props) =>
    React.createElement(
      Suspense,
      { fallback: null },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.createElement(Lazy, props as any),
    )
  return Activity
}

const lazyAuthActivity = (importer: Importer): ActivityComponentType =>
  lazyActivity(() => importer().then((m) => ({ default: withAuth(m.default) })))

const WrappedHome = withAuth(HomePageV2)

const HomeForwarder: ActivityComponentType = () =>
  React.createElement(HomeWithOnboarding)

export const { Stack, useFlow, useStepFlow, actions, activities } = stackflow({
  transitionDuration: 350,

  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: stackflowTheme,
      backgroundColor: 'var(--color-usage-background-default)',
      rootClassName:
        'w-full min-h-screen max-w-[512px] mx-auto flex flex-col items-center justify-center relative',
    }),

    historySyncPlugin({
      routes: {
        Home: '/',
        Community: '/community',
        MatchSchedule: '/match-schedule',
        LiveRecord: '/live-record/:matchId',
        Login: '/login',
        TeamSelect: '/team-select',
        Nickname: '/nickname',
        My: '/mypage',
        FriendDetail: '/community/friend-detail',
        FriendRequest: '/community/friend-request',
        Alerm: '/alerm',
        ChangeTeamSelect: '/change-team-select',
        ChangeNickName: '/change-nickname',
        Record: '/record',
        RecordDetail: '/record/:matchRecordId',
        ShareBottomSheet: '/share-bottom-sheet',
        TermAgree: '/term-agree',
        Term: '/term',
        OnBoarding: '/onboarding',
      },
      fallbackActivity: () => 'Home',
    }),
  ],

  activities: {
    Home: HomeForwarder,
    Community: lazyAuthActivity(() => import('@/pages/community/ui/CommunityPage')),
    MatchSchedule: lazyAuthActivity(() => import('@/pages/home/ui/HomePage')),
    LiveRecord: lazyAuthActivity(() => import('@/pages/live-recording/ui/LiveRecordPage')),
    Login: lazyActivity(() => import('@/pages/auth/ui/LoginPage')),
    TeamSelect: lazyActivity(() => import('@/pages/auth/ui/TeamSelectPage')),
    Nickname: lazyActivity(() => import('@/pages/auth/ui/NickNamePage')),
    My: lazyAuthActivity(() => import('@/pages/mypage/ui/MyPage')),
    FriendDetail: lazyAuthActivity(() => import('@/pages/friend/ui/FriendDetailPage')),
    FriendRequest: lazyAuthActivity(() => import('@/pages/friend/ui/FriendRequestPage')),
    Alerm: lazyAuthActivity(() => import('@/pages/alerm/ui/AlermPage')),
    ChangeTeamSelect: lazyAuthActivity(() => import('@/pages/mypage/ui/ChangeTeamSelectPage')),
    ChangeNickName: lazyAuthActivity(() => import('@/pages/mypage/ui/ChangeNickNamePage')),
    Record: lazyAuthActivity(() => import('@/pages/record/ui/RecordMainPage')),
    RecordDetail: lazyAuthActivity(() => import('@/pages/record/ui/RecordDetailPage')),
    ShareBottomSheet: lazyActivity(() => import('@/pages/record/ui/ShareBottomSheet')),
    TermAgree: lazyActivity(() => import('@/pages/auth/ui/TermAgreePage')),
    Term: lazyActivity(() => import('@/pages/term/ui/TermPage')),
    OnBoarding: lazyActivity(() => import('@/pages/onBoarding/ui/OnBoardingPage')),
  },
  initialActivity: () => 'Home',
})

const HomeWithOnboarding: ActivityComponentType = () => {
  const { replace } = useFlow()
  useEffect(() => {
    try {
      const seen = !!localStorage.getItem('onBoarding')
      if (!seen) replace('OnBoarding', {}, { animate: false })
    } catch {}
  }, [replace])
  return React.createElement(WrappedHome)
}
