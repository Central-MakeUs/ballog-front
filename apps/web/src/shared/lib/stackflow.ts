import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'

import HomePage from '@/pages/home/ui/HomePage'
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

export const { Stack, useFlow, useStepFlow } = stackflow({
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
        LiveRecord: '/live-record/:matchId',
        Login: '/login',
        TeamSelect: '/team-select',
        Nickname: '/nickname',
        My: '/mypage',
        ChangeTeamSelect: '/change-team-select',
        ChangeNickName: '/change-nickname',
        Record: '/record',
        RecordDetail: '/record/:matchRecordId',
        ShareBottomSheet: '/share-bottom-sheet',
      },
      fallbackActivity: () => 'Home',
    }),
  ],

  activities: {
    Home: HomePage,
    LiveRecord: LiveRecordPage,
    Login: LoginPage,
    TeamSelect: TeamSelectPage,
    Nickname: NickNamePage,
    My: MyPage,
    ChangeTeamSelect: ChangeTeamSelectPage,
    ChangeNickName: ChangeNickNamePage,
    Record: RecordMainPage,
    RecordDetail: RecordDetailPage,
    ShareBottomSheet,
  },
  initialActivity: () => 'Home',
})
