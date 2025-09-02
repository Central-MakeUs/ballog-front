import { useMutation } from '@tanstack/react-query'

import { authPatch, authGet } from '@/entities/auth/api'
import { useSessionContext } from '@/app/Provider/contexts/sessionContext'

export const useUpdateMyInfoMutation = () => {
  const { setUser } = useSessionContext()

  return useMutation({
    mutationFn: authPatch.patchUserInfo,
    onSuccess: async () => {
      const updated = await authGet.getUser()
      setUser(updated.data)
    },
  })
}

export const useUpdateMyTeamMutation = () => {
  const { setUser } = useSessionContext()

  return useMutation({
    mutationFn: authPatch.patchUserTeam,
    onSuccess: async () => {
      const updated = await authGet.getUser()
      setUser(updated.data)
    },
  })
}
