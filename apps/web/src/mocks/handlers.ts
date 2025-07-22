import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { emotionHandlers } from './handlers/emotionHandlers'

export const handlers = [...authHandlers,  ...matchHandlers, ...emotionHandlers]

