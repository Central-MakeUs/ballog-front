import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ExtendedKyHttpError } from '@/types/api/common'

import { friendPost, friendQueries } from '../api'
import type {
  FriendActionResponseDTO,
  RejectFriendRequestDTO,
} from '../model/friend.type'

export const useRejectFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FriendActionResponseDTO,
    ExtendedKyHttpError,
    RejectFriendRequestDTO
  >({
    mutationFn: friendPost.rejectFriend,
    onSuccess: () => {
      toast.success('친구 요청을 삭제했어요.')
      queryClient.invalidateQueries({
        queryKey: friendQueries.receivedRequests().queryKey,
      })
    },
    onError: (error) => {
      toast.error(error.errorData?.error ?? '친구 요청 삭제에 실패했어요.')
    },
  })
}
