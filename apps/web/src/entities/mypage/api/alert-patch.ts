import { api } from '@/shared/lib/ky'
import type {
  Alert,
  AlertResponseDTO,
} from '@/entities/mypage/model/alert.type'

export const alertPatch = {
  patchAlert: async ({
    startAlert,
    inGameAlert,
  }: Alert): Promise<AlertResponseDTO> => {
    const response = await api
      .patch(`mypage/alert`, { json: { startAlert, inGameAlert } })
      .json<AlertResponseDTO>()
    return response
  },
}
