import { api } from '@/shared/lib/ky'
import type { RecordingPostResponseDTO } from '@/entities/record/model/recording.type'

export const recordingPost = {
  postRecording: async (matchId: number): Promise<RecordingPostResponseDTO> => {
    const response = await api
      .post('record', {
        json: { matchesId: matchId, result: 'WIN' },
      })
      .json<RecordingPostResponseDTO>()

    return response
  },
}
