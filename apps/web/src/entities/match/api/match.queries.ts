import { createQueryKeys } from '@lukemorales/query-key-factory'

import { matchGet } from './match-get'

export const matches = createQueryKeys('matches', {
  today: () => ({
    queryKey: ['today'],
    queryFn: matchGet.getTodayMatches,
  }),
  bySelectedDate: (selectedDate: string) => ({
    queryKey: ['matches', selectedDate],
    queryFn: () => matchGet.getMatchByDate(selectedDate),
  }),
})
