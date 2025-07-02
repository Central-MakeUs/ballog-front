import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Header } from '@/widget/header'
import { Banner } from '@/entities/auth/ui/Banner'
import { KakaoButton, AppleButton } from '@/features/auth'

const LoginPage = () => {
  return (
    <AppScreen>
      <Header
        logo={<img src={WhiteBallogLogo} alt="ballog" className="h-6" />}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <Banner />
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <KakaoButton />
          <AppleButton />
        </div>
      </div>
    </AppScreen>
  )
}

export default LoginPage
