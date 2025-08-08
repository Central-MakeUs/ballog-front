import { api } from '@/shared/lib/ky'
import type { RecordingPostResponseDTO } from '@/entities/record/model/recording.type'

type RecordResult = 'WIN' | 'LOSS' | 'DRAW' | null

export const recordingPost = {
  postRecording: async (
    result: RecordResult,
    matchRecordId: number,
  ): Promise<RecordingPostResponseDTO> => {
    const response = await api
      .patch(`record`, { json: { result, matchRecordId } })
      .json<RecordingPostResponseDTO>()

    return response
  },
}
