import { useMutation, useQueryClient } from '@tanstack/react-query'

import { friendPost, friendQueries } from '../api'

export const useRequestFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: friendPost.requestFriend,
    // 역방향 PENDING 요청이 있으면 서버가 자동 수락하므로 친구 목록을 갱신
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendQueries.list().queryKey })
    },
  })
}
