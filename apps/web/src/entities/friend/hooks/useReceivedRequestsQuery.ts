import { useQuery } from '@tanstack/react-query'

import { friendQueries } from '../api'

export const useReceivedRequestsQuery = () => {
  return useQuery(friendQueries.receivedRequests())
}
