import { createQueryKeys } from '@lukemorales/query-key-factory'

import { recordingGet } from './recording.api'

export const recording = createQueryKeys('recording', {
  getRecording: (matchId: number) => ({
    queryKey: ['getRecording', matchId],
    queryFn: () => recordingGet.getRecording(matchId),
  }),
})
