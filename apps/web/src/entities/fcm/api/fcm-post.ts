import { api } from '@/shared/lib/ky'
import type { FcmPostResponseDTO } from '@/entities/fcm/model/fcm.type'

export const fcmPost = {
  postFcmToken: async (token: string): Promise<FcmPostResponseDTO> => {
    const response = await api
      .post(`fcm/register-token`, { json: { token } })
      .json<FcmPostResponseDTO>()
    return response
  },
}
