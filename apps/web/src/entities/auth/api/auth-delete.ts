import { api } from '@/shared/lib/ky'

import type { WithDrawResponseDTO } from '../model/auth.type'

export const authDelete = {
  deleteUser: async (accessToken: string): Promise<WithDrawResponseDTO> => {
    const response = await api
      .delete('auth/withdraw', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .json<WithDrawResponseDTO>()

    return response
  },
}
