import type { ActivityComponentType } from '@stackflow/react'
import { AppScreen } from '@stackflow/plugin-basic-ui'

import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { Banner } from '@/entities/auth/ui/Banner'
import BallogAppBar from '@/assets/BallogAppBar'

import { KakaoButton, AppleButton } from './SocialButton'

const LoginPage: ActivityComponentType = () => {
  return (
    <AppScreen
      appBar={{
        title: <BallogAppBar aria-label="ballog" />,
        height: '48px',
      }}
    >
      <AppLayout className="h-full">
        <div className="flex flex-col items-center justify-center w-full h-full px-4 gap-20">
          <Banner />
          <div className="flex flex-col gap-4 w-full">
            <KakaoButton className="h-13" />
            <AppleButton className="h-13" />
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  )
}

export default LoginPage
