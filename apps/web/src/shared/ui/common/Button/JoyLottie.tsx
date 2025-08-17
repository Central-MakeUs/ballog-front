import { forwardRef } from 'react'
import Lottie, {
  type LottieRefCurrentProps,
  type LottieRef,
} from 'lottie-react'

import joyAnimation from '@/assets/lottie/joy.json'
import { cn } from '@/shared/lib/classnames'

interface JoyLottieProps {
  className?: string
  size?: number
  lottieRef: LottieRef
}

export const JoyLottie = forwardRef<LottieRefCurrentProps, JoyLottieProps>(
  ({ className, size = 72, lottieRef }: JoyLottieProps) => {
    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={joyAnimation}
        loop={false}
        autoplay={false}
        className={cn(className)}
        style={{ width: size, height: size }}
      />
    )
  },
)
JoyLottie.displayName = 'JoyLottie'
