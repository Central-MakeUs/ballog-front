import { useQuery } from '@tanstack/react-query'
import { createQueryKeys } from '@lukemorales/query-key-factory'

import { rankGet } from './rank.api'

export const rankQueries = createQueryKeys('rank', {
  teams: () => ({
    queryKey: ['teams'],
    queryFn: () => rankGet.getTeamRanks(),
  }),
})

export const useTeamRanksQuery = () => useQuery(rankQueries.teams())
