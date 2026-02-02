import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

interface LiveRecordContextType {
  matchId: number
}

const LiveRecordContext = createContext<LiveRecordContextType | undefined>(
  undefined,
)

/**
 * LiveRecordProvider
 * matchId를 하위 컴포넌트에서 접근할 수 있도록 공유하는 context
 * TanStack Query 캐싱과 함께 사용하여 prop drilling 없이 데이터 접근 가능
 */
export const LiveRecordProvider = ({
  children,
  matchId,
}: {
  children: ReactNode
  matchId: number
}) => {
  const value = useMemo(() => ({ matchId }), [matchId])

  return (
    <LiveRecordContext.Provider value={value}>
      {children}
    </LiveRecordContext.Provider>
  )
}

export const useLiveRecordContext = (): LiveRecordContextType => {
  const ctx = useContext(LiveRecordContext)
  if (!ctx) throw new Error('LiveRecordProvider must be used')
  return ctx
}
