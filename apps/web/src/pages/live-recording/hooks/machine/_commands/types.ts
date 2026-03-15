import type { QueryClient } from '@tanstack/react-query'
import type {
  Command,
  LiveRecordingEvent,
} from '@ballog/live-recording-machine'

export interface LiveRecordCommandContext {
  matchId: number
  queryClient: QueryClient
  getMatchRecordId: () => number | undefined
  setMatchRecordId: (matchRecordId: number) => void
  setEmotionPercent: (positivePercent: number, negativePercent: number) => void
  onTerminate?: () => void
}

export type CommandHandler<T extends Command['type']> = (
  command: Extract<Command, { type: T }>,
  context: LiveRecordCommandContext,
) => Promise<LiveRecordingEvent[]>
