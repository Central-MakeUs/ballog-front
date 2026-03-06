import { recordingPost } from '@/entities/record'
import { recording } from '@/entities/record/api/recording.queries'

import type { CommandHandler } from './types'

export const createRecordingCommand: CommandHandler<
  'CREATE_RECORDING'
> = async (_command, context) => {
  try {
    const response = await recordingPost.postRecording(context.matchId)
    context.setMatchRecordId(response.data.matchRecordId)
    context.queryClient.invalidateQueries({
      queryKey: recording.getRecording(context.matchId).queryKey,
    })
    return [{ type: 'CREATE_SUCCESS' }]
  } catch {
    return [{ type: 'CREATE_FAIL' }]
  }
}
