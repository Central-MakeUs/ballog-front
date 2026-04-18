import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ExtendedKyHttpError } from '@/types/api/common'

import { friendPost, friendQueries } from '../api'
import type {
  FriendActionResponseDTO,
  RequestFriendRequestDTO,
} from '../model/friend.type'

export const useRequestFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FriendActionResponseDTO,
    ExtendedKyHttpError,
    RequestFriendRequestDTO
  >({
    mutationFn: friendPost.requestFriend,
    onSuccess: () => {
      toast.success('친구 요청을 보냈어요!')
      // 역방향 PENDING 요청이 있으면 서버가 자동 수락하므로 친구 목록을 갱신
      queryClient.invalidateQueries({ queryKey: friendQueries.list().queryKey })
    },
    onError: (error) => {
      toast.error(error.errorData?.error ?? '친구 요청에 실패했어요.')
    },
  })
}
