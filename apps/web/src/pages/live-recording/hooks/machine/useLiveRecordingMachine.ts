import { useSyncExternalStore, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  createLiveRecordingMachine,
  type EmotionType,
  type MachineSnapshot,
} from '@ballog/live-recording-machine'

import { useLiveRecordContext } from '@/pages/live-recording/contexts/LiveRecordContext'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'

import { LiveRecordRuntime } from './LiveRecordRuntime'
import { createLiveRecordCommandExecutor } from './createLiveRecordCommandExecutor'

interface UseLiveRecordingMachineOptions {
  maxRetry?: number
  onTerminate?: () => void
}

/**
 * LiveRecording FSM을 관리하는 핵심 React Hook
 *
 * Runtime을 생성하고, useSyncExternalStore로 FSM 상태를 구독합니다.
 * 모든 비즈니스 로직은 FSM Command를 통해 실행됩니다.
 */
export const useLiveRecordingMachine = (
  options: UseLiveRecordingMachineOptions = {},
) => {
  const { maxRetry = 3, onTerminate } = options
  const { matchId } = useLiveRecordContext()
  const queryClient = useQueryClient()
  const { setEmotionPercent } = useEmotionVote()
  const [runtime] = useState<LiveRecordRuntime>(() => {
    return new LiveRecordRuntime({
      machine: createLiveRecordingMachine({ maxRetry }),
      executeCommand: async () => [],
    })
  })

  // Command Executor 생성
  const commandExecutor = useMemo(
    () =>
      createLiveRecordCommandExecutor({
        matchId,
        queryClient,
        getMatchRecordId: runtime.getMatchRecordId,
        setMatchRecordId: runtime.setMatchRecordId,
        setEmotionPercent,
        onTerminate,
      }),
    [matchId, queryClient, setEmotionPercent, onTerminate],
  )

  // Machine과 Executor를 업데이트하고 INIT 이벤트 발송
  useEffect(() => {
    runtime.reset({
      machine: createLiveRecordingMachine({ maxRetry }),
      executeCommand: commandExecutor,
    })

    runtime.send({ type: 'INIT' })
  }, [commandExecutor, maxRetry])

  // FSM 상태 구독 — MachineSnapshot을 직접 반환
  const snapshot: MachineSnapshot = useSyncExternalStore(
    runtime.subscribe,
    runtime.getSnapshot,
  )

  // 3초 폴링 — recording 상태일 때만 동작
  useEffect(() => {
    if (snapshot.state !== 'recording') return

    const intervalId = setInterval(() => {
      runtime.send({ type: 'POLL_TICK_3S' })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [snapshot.state, runtime])

  return {
    snapshot,

    dispatchEmotionClick: (emotion: EmotionType) => {
      runtime.send({ type: 'EMOTION_CLICK', emotion })
    },

    send: runtime.send,

    isLoading: snapshot.state === 'new',
    isTerminated: snapshot.state === 'terminate',
  }
}
