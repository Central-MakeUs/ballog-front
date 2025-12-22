import { createQueryKeys } from '@lukemorales/query-key-factory'

import { recordGet } from './record-get'

export const queryKeys = createQueryKeys('record', {
  getRecord: () => ({
    queryKey: ['getRecord'],
    queryFn: () => recordGet.getRecord(),
  }),
  getRecordDetail: (recordId: number) => ({
    queryKey: ['getRecordDetail', recordId],
    queryFn: () => recordGet.getRecordDetail(recordId),
  }),
  getEmotionStats: (matchId: number) => ({
    queryKey: ['getEmotionStats', matchId],
    queryFn: () => recordGet.getRecordEmotionStats(matchId),
  }),
})
