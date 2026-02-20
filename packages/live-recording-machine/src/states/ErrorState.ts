import { State } from '../state'
import type { Command, LiveRecordingEvent } from '../types'

import { TerminateState } from './TerminateState'
import { UpdatingState } from './UpdatingState'

export class ErrorState extends State {
  public readonly name = 'error' as const

  public handle(event: LiveRecordingEvent): Command[] {
    switch (event.type) {
      case 'RETRY': {
        if (this.context.getRetryCount() >= this.context.getMaxRetry()) {
          this.context.transitionTo(new TerminateState())
          return this.terminateOnce()
        }

        this.context.setUpdating(true)
        this.context.transitionTo(new UpdatingState())

        const intent = this.context.getLastEmotionIntent()
        if (intent) {
          this.context.setLastEmotionIntent(null)
          return [{ type: 'START_UPDATE_FROM_CLICK', emotion: intent }]
        }

        return [{ type: 'START_UPDATE_FROM_POLL' }]
      }

      case 'RETRY_EXHAUSTED':
      case 'TIME_EXPIRED':
      case 'GAME_ENDED':
        this.context.setUpdating(false)
        this.context.transitionTo(new TerminateState())
        return this.terminateOnce()

      default:
        return []
    }
  }
}
