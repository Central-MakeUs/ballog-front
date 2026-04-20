import { api } from '@/shared/lib/ky'

import type {
  AcceptFriendRequestDTO,
  FriendActionResponseDTO,
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
  RejectFriendRequestDTO,
  RequestFriendRequestDTO,
} from '../model/friend.type'

export const friendGet = {
  getFriends: async (): Promise<FriendListResponseDTO> => {
    const response = await api.get('friend').json<FriendListResponseDTO>()
    return response
  },
  getReceivedRequests: async (): Promise<FriendRequestListResponseDTO> => {
    const response = await api
      .get('friend/request/list')
      .json<FriendRequestListResponseDTO>()
    return response
  },
}

export const friendPost = {
  requestFriend: async ({
    nickname,
  }: RequestFriendRequestDTO): Promise<FriendActionResponseDTO> => {
    const response = await api
      .post('friend/request', { json: { nickname } })
      .json<FriendActionResponseDTO>()
    return response
  },
  acceptFriend: async ({
    requesterId,
  }: AcceptFriendRequestDTO): Promise<FriendActionResponseDTO> => {
    const response = await api
      .post('friend/accept', { json: { requesterId } })
      .json<FriendActionResponseDTO>()
    return response
  },
  rejectFriend: async ({
    requesterId,
  }: RejectFriendRequestDTO): Promise<FriendActionResponseDTO> => {
    const response = await api
      .post('friend/reject', { json: { requesterId } })
      .json<FriendActionResponseDTO>()
    return response
  },
}
