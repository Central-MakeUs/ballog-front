import { Button } from '@/components/ui/button'
import GlobalNavigationBar from '@/components/common/GlobalNavigationBar'
import Header from '@/components/common/Header'
import BallogLogo from '@/assets/ballogLogo.svg'

const HomePage = () => {
  return (
    <>
      <Header logo={<img src={BallogLogo} alt="ballog" className="h-6 " />} />
      <Button>버튼</Button>
      <GlobalNavigationBar />
    </>
  )
}

export default HomePage
