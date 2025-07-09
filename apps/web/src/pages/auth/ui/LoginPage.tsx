import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg'
import { Banner } from '@/entities/auth/ui/Banner'
import { KakaoButton, AppleButton } from '@/features/auth'
import type { ActivityComponentType } from '@stackflow/react'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { AppScreen } from '@stackflow/plugin-basic-ui'

const LoginPage: ActivityComponentType = () => {
  return (
    <AppScreen
      appBar={{
        title: <img src={WhiteBallogLogo} alt="ballog" />,
        height: '48px',
      }}
    >
      <AppLayout>
        <div className="flex flex-col items-center justify-center w-full h-full px-4 gap-20">
          <Banner />
          <div className="flex flex-col gap-4 w-full">
            <KakaoButton />
            <AppleButton />
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  )
}

export default LoginPage
