import { Button } from '@/components/ui/button'
import GlobalNavigationBar from '@/components/common/globalNavigationBar'
import Header from '@/components/common/Header'
import BallogLogo from '@/assets/ballogLogo.svg'
import GameCard from '@/features/game/components/gameCard'
import GameCardCarousel from '@/features/game/components/gameCardCarousel'

const HomePage = () => {
  return (
    <>
      <Header logo={<img src={BallogLogo} alt="ballog" className="h-6 " />} />
      <GameCardCarousel />
      <GlobalNavigationBar />
    </>
  )
}

export default HomePage
