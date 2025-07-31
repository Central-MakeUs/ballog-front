import { api } from '@/shared/lib/ky'
import type { RecordingPatchResponseDTO } from '@/entities/record/model/recording.type'

type RecordResult = 'WIN' | 'LOSE' | 'DRAW'

export const recordingPatch = {
  patchRecording: async (
    result: RecordResult,
    matchRecordId: number,
  ): Promise<RecordingPatchResponseDTO> => {
    const response = await api
      .patch(`record/${matchRecordId}/result`, { json: { result } })
      .json<RecordingPatchResponseDTO>()

    return response
  },
}
