import { api } from '@/shared/lib/ky'

import type { WithDrawResponseDTO } from '../model/auth.type'

export const authDelete = {
  deleteUser: async (): Promise<WithDrawResponseDTO> => {
    const response = await api
      .delete('auth/withdraw')
      .json<WithDrawResponseDTO>()

    return response
  },
}
