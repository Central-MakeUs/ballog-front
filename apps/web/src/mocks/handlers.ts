import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { recordHandlers } from './handlers/recordHandler'

export const handlers = [...authHandlers, ...matchHandlers, ...recordHandlers]
