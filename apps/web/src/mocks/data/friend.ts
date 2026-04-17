import type {
  FriendItem,
  FriendRequestItem,
} from '@/entities/friend/model/friend.type'

export const friendList: { data: FriendItem[]; delay: number } = {
  data: [
    { userId: 1, nickname: '영희', baseballTeam: 'LG_TWINS' },
    { userId: 2, nickname: '철수', baseballTeam: 'DOOSAN_BEARS' },
    { userId: 3, nickname: '수빈', baseballTeam: 'KIA_TIGERS' },
    { userId: 4, nickname: '지민', baseballTeam: 'HANWHA_EAGLES' },
    { userId: 5, nickname: '하늘', baseballTeam: 'SSG_LANDERS' },
  ],
  delay: 600,
}

export const friendRequestList: {
  data: FriendRequestItem[]
  delay: number
} = {
  data: [
    { requesterId: 101, nickname: '민준' },
    { requesterId: 102, nickname: '서연' },
    { requesterId: 103, nickname: '지후' },
  ],
  delay: 600,
}
