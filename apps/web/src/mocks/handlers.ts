import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { emotionHandlers } from './handlers/emotionHandlers'
import { userHandlers } from './handlers/userHandlers'

export const handlers = [
  ...authHandlers,
  ...matchHandlers,
  ...emotionHandlers,
  ...userHandlers,
]
