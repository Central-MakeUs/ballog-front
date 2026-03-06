import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authPatch } from '../api'
import { authQueries } from '../api'

export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient()
  const userQueryOptions = authQueries.getUser()

  return useMutation({
    mutationFn: authPatch.patchUserInfo,
    onSuccess: (updated) => {
      queryClient.setQueryData(userQueryOptions.queryKey, updated)
    },
  })
}

export const useUpdateMyTeamMutation = () => {
  const queryClient = useQueryClient()
  const userQueryOptions = authQueries.getUser()

  return useMutation({
    mutationFn: authPatch.patchUserTeam,
    onSuccess: (updated) => {
      queryClient.setQueryData(userQueryOptions.queryKey, updated)
    },
  })
}
