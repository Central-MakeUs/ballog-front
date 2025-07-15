import type { ReactNode } from 'react'
import React, { createContext, useContext, useState, useMemo } from 'react'

interface EmotionVoteContextType {
  joyCount: number
  angryCount: number
  total: number
  setJoyCount: React.Dispatch<React.SetStateAction<number>>
  setAngryCount: React.Dispatch<React.SetStateAction<number>>
  joyPercent: number
  angryPercent: number
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
export const EmotionVoteProvider = ({ children }: { children: ReactNode }) => {
  const [joyCount, setJoyCount] = useState<number>(0)
  const [angryCount, setAngryCount] = useState<number>(0)

  const total = joyCount + angryCount

  const joyPercent = total > 0 ? Math.round((joyCount / total) * 100) : 50
  const angryPercent = 100 - joyPercent

  const value = useMemo(
    () => ({
      joyCount,
      angryCount,
      total,
      setJoyCount,
      setAngryCount,
      joyPercent,
      angryPercent,
    }),
    [joyCount, angryCount],
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
