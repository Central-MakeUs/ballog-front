import type { ReactNode } from 'react'
import React, { createContext, useContext, useState, useMemo } from 'react'

interface EmotionVoteContextType {
  joyPercent: number
  angryPercent: number
  setEmotionPercent: (joy: number, angry: number) => void
}

const EmotionVoteContext = createContext<EmotionVoteContextType | undefined>(
  undefined,
)
/**
 *
 * @EmotionVoteContext
 * 감정 정보(카운트, 퍼센테이지 등)을 전역에서 공유하기 위한 context
 *
 * - joyCount, angryCount: 각 감정 선택 수
 * - joyPercent, angryPercent: 전체 비율
 * - setJoyCount, setAngryCount: 상태 업데이트 함수
 *
 */
export const EmotionVoteProvider = ({
  children,
  initialJoyPercent = 50,
  initialAngryPercent = 50,
}: {
  children: ReactNode
  initialJoyPercent?: number
  initialAngryPercent?: number
}) => {
  const [joyPercent, setJoyPercent] = useState(initialJoyPercent)
  const [angryPercent, setAngryPercent] = useState(initialAngryPercent)

  const setEmotionPercent = (joy: number, angry: number) => {
    setJoyPercent(joy)
    setAngryPercent(angry)
  }

  const value = useMemo(
    () => ({
      joyPercent,
      angryPercent,
      setEmotionPercent,
    }),
    [joyPercent, angryPercent],
  )

  return (
    <EmotionVoteContext.Provider value={value}>
      {children}
    </EmotionVoteContext.Provider>
  )
}

export const useEmotionVote = () => {
  const ctx = useContext(EmotionVoteContext)
  if (!ctx) throw new Error('EmotionVoteProvider must be used')
  return ctx
}
