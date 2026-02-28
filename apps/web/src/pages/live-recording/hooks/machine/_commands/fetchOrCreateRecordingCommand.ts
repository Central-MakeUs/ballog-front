import { recordingGet } from '@/entities/record/api/recording-get'
import { recording } from '@/entities/record/api/recording.queries'

import type { CommandHandler } from './types'

export const fetchOrCreateRecordingCommand: CommandHandler<
  'FETCH_OR_CREATE_RECORDING'
> = async (_command, context) => {
  try {
    const response = await recordingGet.getRecording(context.matchId)
    context.setMatchRecordId(response.data.matchRecordId)
    context.queryClient.setQueryData(
      recording.getRecording(context.matchId).queryKey,
      response,
    )
    return [{ type: 'RECORDING_FOUND' }]
  } catch {
    return [{ type: 'RECORDING_NOT_FOUND' }]
  }
}
