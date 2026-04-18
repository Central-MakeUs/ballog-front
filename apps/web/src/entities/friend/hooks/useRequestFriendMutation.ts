import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ExtendedKyHttpError } from '@/types/api/common'

import { friendPost, friendQueries } from '../api'
import type {
  FriendActionResponseDTO,
  RequestFriendRequestDTO,
} from '../model/friend.type'

const isExtendedKyHttpError = (e: unknown): e is ExtendedKyHttpError =>
  typeof e === 'object' && e !== null && 'errorData' in e

export const useRequestFriendMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FriendActionResponseDTO,
    unknown,
    RequestFriendRequestDTO
  >({
    mutationFn: friendPost.requestFriend,
    onSuccess: () => {
      toast.success('친구 요청을 보냈어요!')
      queryClient.invalidateQueries({ queryKey: friendQueries.list().queryKey })
    },
    onError: (error) => {
      const message = isExtendedKyHttpError(error)
        ? (error.errorData?.error ?? '친구 요청에 실패했어요.')
        : '친구 요청에 실패했어요.'
      toast.error(message)
    },
  })
}
