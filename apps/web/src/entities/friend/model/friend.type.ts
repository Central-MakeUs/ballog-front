import type { ApiResponse } from '@/types/api/common'
import type { TeamKey } from '@/shared/constants/teams'

export interface RequestFriendRequestDTO {
  nickname: string
}

export interface AcceptFriendRequestDTO {
  requesterId: number
}

export interface RejectFriendRequestDTO {
  requesterId: number
}

export interface FriendRequestItem {
  requesterId: number
  nickname: string
}

export interface FriendItem {
  userId: number
  nickname: string
  baseballTeam: TeamKey
}

export type FriendActionResponseDTO = ApiResponse<null>
export type FriendListResponseDTO = ApiResponse<FriendItem[]>
export type FriendRequestListResponseDTO = ApiResponse<FriendRequestItem[]>
