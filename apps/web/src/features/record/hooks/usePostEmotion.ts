import { useMutation, useQueryClient } from '@tanstack/react-query'

import { emotionPost } from '@/entities/record/api/emotion-post'
import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'
import { emotions } from '@/entities/record/api/emotion.queries'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'

interface PostEmotionProps {
  recordId: number
  emotionType: 'POSITIVE' | 'NEGATIVE'
}

export const usePostEmotion = () => {
  const queryClient = useQueryClient()
  const { setEmotionPercent } = useEmotionVote()

  return useMutation<EmotionResponseDTO, Error, PostEmotionProps>({
    mutationFn: ({ recordId, emotionType }) => {
      return emotionPost.postEmotionRecord(recordId, emotionType)
    },
    onSuccess: (data, variables) => {
      const { positivePercent, negativePercent } = data.data
      setEmotionPercent(positivePercent, negativePercent)

      queryClient.invalidateQueries({
        queryKey: emotions.record(variables.recordId).queryKey,
      })
    },
  })
}
