import { http, HttpResponse, delay } from 'msw'

import type {
  AcceptFriendRequestDTO,
  FriendActionResponseDTO,
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
  RejectFriendRequestDTO,
  RequestFriendRequestDTO,
} from '@/entities/friend/model/friend.type'
import { friendList, friendRequestList } from '@/mocks/data/friend'

const FRIEND_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/friend`

export const friendHandlers = [
  http.get(`${FRIEND_API_PREFIX}`, async () => {
    const isEmpty = Math.random() < 0.5

    await delay(friendList.delay)

    return HttpResponse.json<FriendListResponseDTO>(
      {
        data: isEmpty ? [] : friendList.data,
        status: 200,
        message: 'success',
        success: '친구 목록 조회 성공',
      },
      { status: 200 },
    )
  }),

  http.get(`${FRIEND_API_PREFIX}/request/list`, async () => {
    const isEmpty = Math.random() < 0.5

    await delay(friendRequestList.delay)

    return HttpResponse.json<FriendRequestListResponseDTO>(
      {
        data: isEmpty ? [] : friendRequestList.data,
        status: 200,
        message: 'success',
        success: '받은 친구 요청 목록 조회 성공',
      },
      { status: 200 },
    )
  }),

  http.post<never, RequestFriendRequestDTO>(
    `${FRIEND_API_PREFIX}/request`,
    async () => {
      await delay(400)

      return HttpResponse.json<FriendActionResponseDTO>(
        {
          data: null,
          status: 201,
          message: 'success',
          success: '친구 요청을 보냈어요!',
        },
        { status: 201 },
      )
    },
  ),

  http.post<never, AcceptFriendRequestDTO>(
    `${FRIEND_API_PREFIX}/accept`,
    async () => {
      await delay(400)

      return HttpResponse.json<FriendActionResponseDTO>(
        {
          data: null,
          status: 200,
          message: 'success',
          success: '친구 수락 완료',
        },
        { status: 200 },
      )
    },
  ),

  http.post<never, RejectFriendRequestDTO>(
    `${FRIEND_API_PREFIX}/reject`,
    async () => {
      await delay(400)

      return HttpResponse.json<FriendActionResponseDTO>(
        {
          data: null,
          status: 200,
          message: 'success',
          success: '친구 요청 거절 완료',
        },
        { status: 200 },
      )
    },
  ),
]
