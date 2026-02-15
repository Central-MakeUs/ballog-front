import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  emotionPost,
  emotions,
  type EmotionResponseDTO,
} from '@/entities/record'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'

interface PostEmotionProps {
  matchRecordId: number
  emotionType: 'POSITIVE' | 'NEGATIVE'
}

export const usePostEmotion = () => {
  const queryClient = useQueryClient()
  const { setEmotionPercent } = useEmotionVote()

  return useMutation<EmotionResponseDTO, Error, PostEmotionProps>({
    mutationFn: ({ matchRecordId, emotionType }) => {
      return emotionPost.postEmotionRecord(matchRecordId, emotionType)
    },
    onSuccess: (data, variables) => {
      const { positivePercent, negativePercent } = data.data
      setEmotionPercent(positivePercent, negativePercent)

      queryClient.invalidateQueries({
        queryKey: emotions.record(variables.matchRecordId).queryKey,
      })
    },
  })
}
