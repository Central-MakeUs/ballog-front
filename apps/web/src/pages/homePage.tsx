import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useFlow } from '@/shared/lib/stackflow'
import { Button } from '@/shared/ui/common/Button'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { Header } from '@/widgets/header'
import DarkBallogLogo from '@/assets/darkBallogLogo.svg'
import GameCardCarousel from '@/features/game/components/gameCardCarousel'
import type { ActivityComponentType } from '@stackflow/react'

const HomePage: ActivityComponentType = () => {
  const { replace } = useFlow()

  return (
    <>
      <AppScreen>
        <Header
          logo={<img src={DarkBallogLogo} alt="ballog" className="h-6" />}
        />
        <h2 className="text-center mt-15 mb-8 text-xl font-bold">
          오늘 경기 선택하고 감정 기록하기
        </h2>

        <GameCardCarousel />

        <div className="flex justify-center mt-10">
          <p className="text-center">
            위의 경기 중 하나를 선택하고
            <br />
            실시간으로 감정을 기록해보세요
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <Button
            className="w-30 h-10"
            onClick={() => replace('LiveRecord', {})}
          >
            기록 시작하기
          </Button>
        </div>

        <GlobalNavigationBar />
      </AppScreen>
    </>
  )
}

export default HomePage
