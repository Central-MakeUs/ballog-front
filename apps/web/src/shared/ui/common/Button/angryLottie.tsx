import { forwardRef } from 'react'
import Lottie, {
  type LottieRefCurrentProps,
  type LottieRef,
} from 'lottie-react'

import angryAnimation from '@/assets/lottie/angry.json'
import { cn } from '@/shared/lib/classnames'

interface AngryLottieProps {
  className?: string
  size?: number
  lottieRef: LottieRef
}

export const AngryLottie = forwardRef<LottieRefCurrentProps, AngryLottieProps>(
  ({ className, size = 72, lottieRef }: AngryLottieProps) => {
    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={angryAnimation}
        loop={false}
        autoplay={false}
        className={cn(className)}
        style={{ width: size, height: size }}
      />
    )
  },
)
AngryLottie.displayName = 'AngryLottie'
