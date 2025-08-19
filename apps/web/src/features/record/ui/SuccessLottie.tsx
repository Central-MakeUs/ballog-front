import Lottie from 'lottie-react'

import successAnimation from '@/assets/lottie/success.json'
import { cn } from '@/shared/lib/classnames'

interface SuccessLottieProps {
  className?: string
  onComplete?: () => void
}

export const SuccessLottie = ({
  className,
  onComplete,
}: SuccessLottieProps) => {
  return (
    <Lottie
      animationData={successAnimation}
      loop={false}
      autoplay
      className={cn(className)}
      onComplete={onComplete}
    />
  )
}
