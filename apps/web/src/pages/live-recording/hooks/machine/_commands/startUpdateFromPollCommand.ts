import { emotionGet } from '@/entities/record'
import { matches } from '@/entities/match/api/match.queries'

import type { CommandHandler } from './types'

export const startUpdateFromPollCommand: CommandHandler<
  'START_UPDATE_FROM_POLL'
> = async (_command, context) => {
  const targetMatchRecordId = context.getMatchRecordId()

  if (!targetMatchRecordId) {
    return [{ type: 'UPDATE_FAIL' }]
  }

  try {
    const [emotionResponse, matchListData] = await Promise.all([
      emotionGet.getEmotionRecord(targetMatchRecordId),
      context.queryClient
        .fetchQuery({ ...matches.today(), staleTime: 30_000 })
        .catch(() => null),
    ])

    const { positivePercent, negativePercent } = emotionResponse.data
    context.setEmotionPercent(positivePercent, negativePercent)

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
