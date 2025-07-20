import { authHandlers } from './handlers/authHandlers'
import { emotionHandlers } from './handlers/emotionHandlers'

export const handlers = [...authHandlers, ...emotionHandlers]
