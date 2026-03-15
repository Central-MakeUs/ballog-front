export type EmotionType = 'POSITIVE' | 'NEGATIVE'

// 상태 모델
export type LiveRecordingStatus =
  | 'new'
  | 'recording'
  | 'updating'
  | 'error'
  | 'terminate'

// 이벤트 모델
export type LiveRecordingEvent =
  | { type: 'INIT' }
  | { type: 'RECORDING_FOUND' }
  | { type: 'RECORDING_NOT_FOUND' }
  | { type: 'CREATE_SUCCESS' }
  | { type: 'CREATE_FAIL' }
  | { type: 'EMOTION_CLICK'; emotion: EmotionType }
  | { type: 'POLL_TICK_3S' }
  | { type: 'UPDATE_SUCCESS'; gameEnded: boolean; timeExpired: boolean }
  | { type: 'UPDATE_FAIL' }
  | { type: 'TIME_EXPIRED' }
  | { type: 'GAME_ENDED' }
  | { type: 'RETRY' }
  | { type: 'RETRY_EXHAUSTED' }

// 명령 모델
export type Command =
  | { type: 'FETCH_OR_CREATE_RECORDING' }
  | { type: 'CREATE_RECORDING' }
  | { type: 'START_UPDATE_FROM_CLICK'; emotion: EmotionType }
  | { type: 'START_UPDATE_FROM_POLL' }
  | { type: 'SCHEDULE_RETRY'; retryCount: number }
  | { type: 'DO_TERMINATE' }

// 상태 스냅샷 모델
export interface MachineSnapshot {
  state: LiveRecordingStatus
  isUpdating: boolean
  retryCount: number
  maxRetry: number
  lastEmotionIntent: EmotionType | null
  terminationRequested: boolean
}
