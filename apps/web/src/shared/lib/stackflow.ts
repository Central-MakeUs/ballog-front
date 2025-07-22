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
import { ChangeTeamSelectPage } from '@/pages/mypage/ui/ChangeTeamSelectPage'

export const { Stack, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,

  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino', // cupertino | android 두가지 옵션 있음
      backgroundColor: 'bg-usage-background-default',
    }),

    historySyncPlugin({
      routes: {
        Home: '/',
        LiveRecord: '/live-record/:recordId',
        Login: '/login',
        TeamSelect: '/team-select',
        Nickname: '/nickname',
        My: '/mypage',
        ChangeTeamSelect: "/change-team-select"
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
  },
  initialActivity: () => 'Home',
})
