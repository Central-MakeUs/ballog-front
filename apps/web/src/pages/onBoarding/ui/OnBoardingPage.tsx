import { AppScreen } from '@stackflow/plugin-basic-ui'

import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { Button } from '@/shared/ui/common'
import { useStack } from '@/shared/hooks/stackflow/useStack'
import { useFlow } from '@/shared/lib/stackflow'

import { OnBoardingCarousel } from './OnBoardCarousel'

const OnBoardingPage = () => {
  const { popAll } = useStack()
  const { replace } = useFlow()

  return (
    <AppScreen appBar={{ title: <WhiteBallogLogo /> }}>
      <div className="flex flex-col justify-between h-full pt-18.5 px-4">
        <OnBoardingCarousel />

        <Button
          className="mb-10"
          onClick={() => {
            popAll()
            replace('Login', {})
          }}
        >
          시작하기
        </Button>
      </div>
    </AppScreen>
  )
}

export default OnBoardingPage
