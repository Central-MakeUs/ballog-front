import Lottie, {
  type LottieRef,
} from 'lottie-react'

import joyAnimation from '@/assets/lottie/joy.json'
import angryAnimation from '@/assets/lottie/angry.json'
import { cn } from '@/shared/lib/classnames'


interface EmotionLottieProps {
  emotion: 'joy' | 'angry'
  className?: string
  size?: number
  lottieRef: LottieRef
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
      className={cn(className, 'pointer-events-none')}
      style={{ width: size, height: size }}
    />
  )
}
EmotionLottie.displayName = 'EmotionLottie'
