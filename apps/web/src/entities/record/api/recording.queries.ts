import { createQueryKeys } from '@lukemorales/query-key-factory'
import { emotionPost } from './emotion-post'

export const recording = createQueryKeys('emotion', {
  record: () => ({
    queryKey: ['record'],
    queryFn: emotionPost.postEmotionRecord,
  }),
})
