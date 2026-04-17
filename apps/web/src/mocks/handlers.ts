import { authHandlers } from './handlers/authHandlers'
import { matchHandlers } from './handlers/matchHandlers'
import { emotionHandlers } from './handlers/emotionHandlers'
import { userHandlers } from './handlers/userHandlers'
import { recordHandlers } from './handlers/recordHandler'
import { imageHandlers } from './handlers/imageHandler'
import { recordingHandlers } from './handlers/recordingHandlers'
import { friendHandlers } from './handlers/friendHandlers'

export const handlers = [
  ...authHandlers,
  ...matchHandlers,
  ...emotionHandlers,
  ...userHandlers,
  ...recordHandlers,
  ...imageHandlers,
  ...recordingHandlers,
  ...friendHandlers,
]
