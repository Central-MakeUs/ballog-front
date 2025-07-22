import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { emotionHandlers } from './handlers/emotionHandlers'
import { meHandlers } from './handlers/meHandlers'

export const handlers = [
  ...authHandlers,
  ...matchHandlers,
  ...emotionHandlers,
  ...meHandlers,
]
