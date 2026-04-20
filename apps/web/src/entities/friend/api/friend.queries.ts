import { createQueryKeys } from '@lukemorales/query-key-factory'

import { friendGet } from './friend.api'

export const friendQueries = createQueryKeys('friend', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => friendGet.getFriends(),
  }),
  receivedRequests: () => ({
    queryKey: ['receivedRequests'],
    queryFn: () => friendGet.getReceivedRequests(),
  }),
})
