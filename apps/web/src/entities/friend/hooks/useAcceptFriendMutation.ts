import { useMutation, useQueryClient } from '@tanstack/react-query'

import { friendPost, friendQueries } from '../api'

export const useAcceptFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: friendPost.acceptFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendQueries.list().queryKey })
      queryClient.invalidateQueries({
        queryKey: friendQueries.receivedRequests().queryKey,
      })
    },
  })
}
