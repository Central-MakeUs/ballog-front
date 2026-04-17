import { useMutation, useQueryClient } from '@tanstack/react-query'

import { friendPost, friendQueries } from '../api'

export const useRejectFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: friendPost.rejectFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: friendQueries.receivedRequests().queryKey,
      })
    },
  })
}
