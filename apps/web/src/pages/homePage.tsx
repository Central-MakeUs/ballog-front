import { Button } from '@/components/ui/button'
import GlobalNavigationBar from '@/components/common/globalNavigationBar'
import Header from '@/components/common/Header'
import BallogLogo from '@/assets/ballogLogo.svg'
import GameCardCarousel from '@/features/game/components/gameCardCarousel'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <Header logo={<img src={BallogLogo} alt="ballog" className="h-6" />} />
      <h2 className="text-center mt-15 mb-8 text-xl font-bold">
        오늘 경기 선택하고 감정 기록하기
      </h2>
      <GameCardCarousel />
      <GlobalNavigationBar />
      <div className="flex justify-center mt-10">
        <p className="text-center">
          위의 경기 중 하나를 선택하고
          <br />
          실시간으로 감정을 기록해보세요
        </p>
      </div>
      <div className="flex justify-center mt-10">
        <Button className="w-30 h-10">
          <Link to="/live-record">기록 시작하기</Link>
        </Button>
      </div>
    </>
  )
}

export default HomePage
