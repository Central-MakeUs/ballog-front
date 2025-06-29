import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'

import HomePage from '@/pages/homePage'
import LiveRecordPage from '@/pages/liveRecordPage'
import LoginPage from '@/pages/login/loginPage'
import TeamSelectPage from '@/pages/login/teamSelectPage'

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,

  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino', // cupertino | android 두가지 옵션 있음
    }),
    historySyncPlugin({
      routes: {
        Home: '/',
        LiveRecord: '/live-record',
        Login: '/login',
        TeamSelect: "/team-select",
      },
      fallbackActivity: () => 'Home',
    }),
  ],

  activities: {
    Home: HomePage,
    LiveRecord: LiveRecordPage,
    Login: LoginPage,
    TeamSelect: TeamSelectPage
    
  },
})
