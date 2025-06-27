import { Button } from '@/components/ui/button'
import GlobalNavigationBar from '@/components/common/GlobalNavigationBar'

const HomePage = () => {
  return (
    <>
      <h1 className="text-2xl bg-red-100">홈페이지</h1>
      <Button>버튼</Button>
      <GlobalNavigationBar />
    </>
  )
}

export default HomePage
