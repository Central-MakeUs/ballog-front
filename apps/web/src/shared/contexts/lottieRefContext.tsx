import React, { createContext, useContext, useRef, type RefObject } from 'react'
import type { LottieRefCurrentProps } from 'lottie-react'

type LottieRef = RefObject<LottieRefCurrentProps | null>

interface LottieRefContextValue {
  joyRef: LottieRef
  angryRef: LottieRef
}

const LottieRefContext = createContext<LottieRefContextValue | null>(null)

export const LottieRefProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const joyRef = useRef<LottieRefCurrentProps>(null)
  const angryRef = useRef<LottieRefCurrentProps>(null)

  return (
    <LottieRefContext.Provider value={{ joyRef, angryRef }}>
      {children}
    </LottieRefContext.Provider>
  )
}

export const useLottieRefs = () => {
  const ctx = useContext(LottieRefContext)
  if (!ctx)
    throw new Error('useLottieRefs must be used within LottieRefProvider')
  return ctx
}
