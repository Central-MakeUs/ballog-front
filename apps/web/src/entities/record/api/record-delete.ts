import { api } from '@/shared/lib/ky'

import type { RecordDeleteResponseDTO } from '../model/record.type'

export const recordDelete = {
  deleteRecord: async (recordId: number): Promise<RecordDeleteResponseDTO> => {
    const response = await api
      .delete(`record/${recordId}`)
      .json<RecordDeleteResponseDTO>()
    return response
  },
}
