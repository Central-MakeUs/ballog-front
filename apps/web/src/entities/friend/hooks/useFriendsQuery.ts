import { useQuery } from '@tanstack/react-query'

import { friendQueries } from '../api'

export const useFriendsQuery = () => {
  return useQuery(friendQueries.list())
}
