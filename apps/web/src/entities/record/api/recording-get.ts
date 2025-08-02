import { api } from '@/shared/lib/ky'
import type { RecordingResponseDTO } from '@/entities/record/model/recording.type'

export const recordingGet = {
  getRecording: async (matchId: number): Promise<RecordingResponseDTO> => {
    const response = await api
      .get(`record/${matchId}/match`)
      .json<RecordingResponseDTO>()

    return response
  },
}
