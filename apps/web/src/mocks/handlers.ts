import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'

export const handlers = [...authHandlers, ...matchHandlers]
