import { createContext, useContext, useState, type ReactNode } from 'react'

interface AlarmContextType {
  matchStart: boolean
  inGame: boolean
  toggleMatchStart: () => void
  toggleInGame: () => void
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined)

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  const [matchStart, setMatchStart] = useState<boolean>(false) // 경기 시작 알림 받기 토글 상태
  const [inGame, setInGame] = useState<boolean>(false) // 경기 중 알림 받기 토글 상태

  const toggleMatchStart = () => setMatchStart((prev) => !prev)

  const toggleInGame = () => setInGame((prev) => !prev)

  return (
    <AlarmContext.Provider
      value={{ matchStart, inGame, toggleMatchStart, toggleInGame }}
    >
      {children}
    </AlarmContext.Provider>
  )
}

export const useAlarmContext = () => {
  const context = useContext(AlarmContext)
  if (!context) {
    throw new Error('useAlarmContext must be used within AlarmProvider')
  }
  return context
}
