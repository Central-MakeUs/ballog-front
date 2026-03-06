import { api } from '@/shared/lib/ky'
import type { RecordPatchResult } from '@/entities/record/model/record.type'
import type {
  RecordingPatchResponseDTO,
  RecordingPostResponseDTO,
  RecordingResponseDTO,
} from '@/entities/record/model/recording.type'

export const recordingGet = {
  getRecording: async (matchId: number): Promise<RecordingResponseDTO> => {
    const response = await api
      .get(`record/${matchId}/match`, { retry: 0 })
      .json<RecordingResponseDTO>()

    return response
  },
}

export const recordingPost = {
  postRecording: async (
    matchesId: number,
  ): Promise<RecordingPostResponseDTO> => {
    const response = await api
      .post('record', { json: { matchesId } })
      .json<RecordingPostResponseDTO>()

    return response
  },
}

export const recordingPatch = {
  patchRecording: async (
    result: RecordPatchResult,
    matchRecordId: number,
  ): Promise<RecordingPatchResponseDTO> => {
    const response = await api
      .patch(`record/${matchRecordId}/result`, { json: { result } })
      .json<RecordingPatchResponseDTO>()

    return response
  },
}
