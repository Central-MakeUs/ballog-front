import { createQueryKeys } from '@lukemorales/query-key-factory'
import { emotionGet } from './emotion-get'

export const emotions = createQueryKeys('emotion', {
  record: (recordId: number) => ({
    queryKey: ['record', recordId],
    queryFn: emotionGet.getEmotionRecord(recordId),
  }),
})
