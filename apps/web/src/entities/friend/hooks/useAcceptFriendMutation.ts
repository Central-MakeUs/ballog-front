import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ExtendedKyHttpError } from '@/types/api/common'

import { friendPost, friendQueries } from '../api'
import type {
  AcceptFriendRequestDTO,
  FriendActionResponseDTO,
} from '../model/friend.type'

export const useAcceptFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FriendActionResponseDTO,
    ExtendedKyHttpError,
    AcceptFriendRequestDTO
  >({
    mutationFn: friendPost.acceptFriend,
    onSuccess: () => {
      toast.success('친구 요청을 수락했어요!')
      queryClient.invalidateQueries({ queryKey: friendQueries.list().queryKey })
      queryClient.invalidateQueries({
        queryKey: friendQueries.receivedRequests().queryKey,
      })
    },
    onError: (error) => {
      toast.error(error.errorData?.error ?? '친구 요청 수락에 실패했어요.')
    },
  })
}
