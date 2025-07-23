import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'

import HomePage from '@/pages/home/ui/HomePage'
import LiveRecordPage from '@/pages/live-recording/ui/LiveRecordPage'
import LoginPage from '@/pages/auth/ui/LoginPage'
import TeamSelectPage from '@/pages/auth/ui/TeamSelectPage'
import NickNamePage from '@/pages/auth/ui/NickNamePage'
import RecordMainPage from '@/pages/record/ui/RecordMainPage'
import RecordDetailPage from '@/pages/record/ui/RecordDetailPage'

export const { Stack, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,

  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino', // cupertino | android 두가지 옵션 있음
      backgroundColor: 'bg-usage-background-default',
      rootClassName:
        'w-full min-h-screen max-w-[512px] mx-auto flex flex-col items-center justify-center relative',
    }),

    historySyncPlugin({
      routes: {
        Home: '/',
        LiveRecord: '/live-record',
        Login: '/login',
        TeamSelect: '/team-select',
        Nickname: '/nickname',
        Record: '/record',
        RecordDetail: '/record/:matchRecordId',
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
    Record: RecordMainPage,
    RecordDetail: RecordDetailPage,
  },
  initialActivity: () => 'Home',
})
