import { useMutation } from '@tanstack/react-query'

import { authPatch, authGet } from '@/entities/auth/api'
import { useMeContext } from '@/shared/contexts/meContext'

export const useUpdateMyInfoMutation = () => {
  const { setMe } = useMeContext()

  return useMutation({
    mutationFn: authPatch.updateUserInfo,
    onSuccess: async () => {
      const updated = await authGet.me()
      setMe(updated.data)
    },
  })
}
