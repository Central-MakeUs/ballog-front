import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'

import HomePage from '@/pages/home/ui/HomePage'
import CommunityPage from '@/pages/community/ui/CommunityPage'
import LiveRecordPage from '@/pages/live-recording/ui/LiveRecordPage'
import LoginPage from '@/pages/auth/ui/LoginPage'
import TeamSelectPage from '@/pages/auth/ui/TeamSelectPage'
import NickNamePage from '@/pages/auth/ui/NickNamePage'
import MyPage from '@/pages/mypage/ui/MyPage'
import ChangeTeamSelectPage from '@/pages/mypage/ui/ChangeTeamSelectPage'
import ChangeNickNamePage from '@/pages/mypage/ui/ChangeNickNamePage'
import RecordMainPage from '@/pages/record/ui/RecordMainPage'
import RecordDetailPage from '@/pages/record/ui/RecordDetailPage'
import ShareBottomSheet from '@/pages/record/ui/ShareBottomSheet'
import TermAgreePage from '@/pages/auth/ui/TermAgreePage'
import TermPage from '@/pages/term/ui/TermPage'
import OnBoardingPage from '@/pages/onBoarding/ui/OnBoardingPage'
import { withAuth } from '@/shared/hoc/Auth'

// 온보딩 페이지 처리 로직
try {
  const isOnboardingSeen = !!localStorage.getItem('onBoarding')
  const isRootPath = location.pathname === '/'
  if (!isOnboardingSeen && isRootPath) {
    history.replaceState(null, '', '/onboarding')
  }
} catch {
  // 로컬스토리지 접근 불가시 무시
}

export const { Stack, useFlow, useStepFlow, actions, activities } = stackflow({
  transitionDuration: 350,

  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino', // cupertino | android 두가지 옵션 있음
      // className 시 title 잔상 문제로 변수 사용
      backgroundColor: 'var(--color-usage-background-default)',
      rootClassName:
        'w-full min-h-screen max-w-[512px] mx-auto flex flex-col items-center justify-center relative',
    }),

    historySyncPlugin({
      routes: {
        Home: '/',
        Community: '/community',
        LiveRecord: '/live-record/:matchId', // 라이브 녹화
        Login: '/login',
        TeamSelect: '/team-select',
        Nickname: '/nickname',
        My: '/mypage',
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
    Home: withAuth(HomePage),
    Community: withAuth(CommunityPage),
    LiveRecord: withAuth(LiveRecordPage),
    Login: LoginPage,
    TeamSelect: TeamSelectPage,
    Nickname: NickNamePage,
    My: withAuth(MyPage),
    ChangeTeamSelect: withAuth(ChangeTeamSelectPage),
    ChangeNickName: withAuth(ChangeNickNamePage),
    Record: withAuth(RecordMainPage),
    RecordDetail: withAuth(RecordDetailPage),
    ShareBottomSheet,
    TermAgree: TermAgreePage,
    Term: TermPage,
    OnBoarding: OnBoardingPage,
  },
  initialActivity: () => 'Home',
})
