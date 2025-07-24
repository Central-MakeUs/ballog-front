import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { recordHandlers } from './handlers/recordHandler'
import { imageHandlers } from './handlers/imageHandler'

export const handlers = [
  ...authHandlers,
  ...matchHandlers,
  ...recordHandlers,
  ...imageHandlers,
]
