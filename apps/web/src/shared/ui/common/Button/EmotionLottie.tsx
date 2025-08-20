import React from 'react'
import Lottie, {
  type LottieRefCurrentProps,
  type LottieRef,
} from 'lottie-react'

import joyAnimation from '@/assets/lottie/joy.json'
import angryAnimation from '@/assets/lottie/angry.json'
import { cn } from '@/shared/lib/classnames'

type LottieCtlRef = LottieRef | React.RefObject<LottieRefCurrentProps>

interface EmotionLottieProps {
  emotion: 'joy' | 'angry'
  className?: string
  size?: number
  lottieRef: LottieCtlRef
}

const animations = {
  joy: joyAnimation,
  angry: angryAnimation,
} as const

export const EmotionLottie = ({
  emotion,
  className,
  size,
  lottieRef,
}: EmotionLottieProps) => {
  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animations[emotion]}
      loop={false}
      autoplay={false}
      className={cn(className)}
      style={{ width: size, height: size }}
    />
  )
}
EmotionLottie.displayName = 'EmotionLottie'
