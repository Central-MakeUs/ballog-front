import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useEffect } from 'react'
import { WhiteBallogLogo } from '@ballog/asset/icons'

import { Button } from '@/shared/ui/common'
import { useStack } from '@/shared/hooks/stackflow/useStack'
import { useFlow } from '@/app/routes/stackflow'

import { OnBoardingCarousel } from './OnBoardCarousel'

const OnBoardingPage = () => {
  const { popAll } = useStack()
  const { replace } = useFlow()

  useEffect(() => {
    localStorage.setItem('onBoarding', 'true')
  }, [])

  return (
    <AppScreen appBar={{ title: <WhiteBallogLogo /> }}>
      <div className="flex flex-col justify-between h-full pt-18.5 px-4">
        <OnBoardingCarousel />

        <Button
          className="mb-10"
          size="lg"
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
