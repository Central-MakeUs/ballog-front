import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

import { useLiveRecordingMachine } from '../hooks/machine/useLiveRecordingMachine'

interface UseLiveRecordingMachineOptions {
  maxRetry?: number
  onTerminate?: () => void
}

// Context 타입 정의
type LiveRecordingMachineContextType = ReturnType<
  typeof useLiveRecordingMachine
>

const LiveRecordingMachineContext = createContext<
  LiveRecordingMachineContextType | undefined
>(undefined)

interface LiveRecordingMachineProviderProps {
  children: ReactNode
  options?: UseLiveRecordingMachineOptions
}

/**
 * LiveRecordingMachine Provider
 *
 * FSM을 컴포넌트 트리에 제공하며,
 * 하위 컴포넌트들은 이 Context를 구독합니다.
 *
 * @example
 * <LiveRecordingMachineProvider>
 *   <MyComponent />
 * </LiveRecordingMachineProvider>
 */
export const LiveRecordingMachineProvider = ({
  children,
  options,
}: LiveRecordingMachineProviderProps) => {
  const machine = useLiveRecordingMachine(options)

  return (
    <LiveRecordingMachineContext.Provider value={machine}>
      {children}
    </LiveRecordingMachineContext.Provider>
  )
}

/**
 * LiveRecordingMachine Context Hook
 *
 * FSM 상태와 액션에 접근합니다.
 * Provider 내부에서만 사용 가능합니다.
 */
export const useLiveRecordingMachineContext =
  (): LiveRecordingMachineContextType => {
    const ctx = useContext(LiveRecordingMachineContext)
    if (!ctx) {
      throw new Error(
        'useLiveRecordingMachineContext must be used within LiveRecordingMachineProvider',
      )
    }
    return ctx
  }
