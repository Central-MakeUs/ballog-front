import { createQueryKeys } from '@lukemorales/query-key-factory'

import { emotionGet } from './emotion-get'

export const emotions = createQueryKeys('emotion', {
  record: (matchRecordId: number) => ({
    queryKey: ['record', matchRecordId],
    queryFn: () => emotionGet.getEmotionRecord(matchRecordId),
  }),
})
