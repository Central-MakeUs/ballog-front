import { useMutation } from '@tanstack/react-query'

import { authPatch, authGet } from '../api'

import { useSessionContext } from './useSessionContext'

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
