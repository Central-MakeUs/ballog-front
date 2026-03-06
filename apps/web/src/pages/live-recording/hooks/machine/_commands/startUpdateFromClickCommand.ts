import { emotionPost } from '@/entities/record'
import { emotions } from '@/entities/record/api/emotion.queries'
import { matches } from '@/entities/match/api/match.queries'

import type { CommandHandler } from './types'

export const startUpdateFromClickCommand: CommandHandler<
  'START_UPDATE_FROM_CLICK'
> = async (command, context) => {
  const targetMatchRecordId = context.getMatchRecordId()

  if (!targetMatchRecordId) {
    return [{ type: 'UPDATE_FAIL' }]
  }

  try {
    const [response, matchListData] = await Promise.all([
      emotionPost.postEmotionRecord(targetMatchRecordId, command.emotion),
      context.queryClient
        .fetchQuery({ ...matches.today(), staleTime: 30_000 })
        .catch(() => null),
    ])

    const { positivePercent, negativePercent } = response.data
    context.setEmotionPercent(positivePercent, negativePercent)

    context.queryClient.invalidateQueries({
      queryKey: emotions.record(targetMatchRecordId).queryKey,
    })

    const currentMatch = matchListData?.data?.find(
      (m) => m.matchesId === context.matchId,
    )
    const gameEnded =
      currentMatch?.status === 'COMPLETED' ||
      currentMatch?.status === 'CANCELED'

    return [
      {
        type: 'UPDATE_SUCCESS',
        gameEnded: gameEnded ?? false,
        timeExpired: false,
      },
    ]
  } catch {
    return [{ type: 'UPDATE_FAIL' }]
  }
}
