import { State } from '../state'
import type { Command, LiveRecordingEvent } from '../types'

import { ErrorState } from './ErrorState'
import { RecordingState } from './RecordingState'
import { TerminateState } from './TerminateState'

export class UpdatingState extends State {
  public readonly name = 'updating' as const

  public handle(event: LiveRecordingEvent): Command[] {
    switch (event.type) {
      case 'UPDATE_SUCCESS': {
        this.context.setUpdating(false)
        this.context.resetRetryCount()

        if (event.gameEnded || event.timeExpired) {
          this.context.transitionTo(new TerminateState())
          return this.terminateOnce()
        }

        this.context.transitionTo(new RecordingState())

        const intent = this.context.getLastEmotionIntent()
        this.context.setLastEmotionIntent(null)

        if (!intent) {
          return []
        }

        this.context.setUpdating(true)
        this.context.transitionTo(new UpdatingState())
        return [{ type: 'START_UPDATE_FROM_CLICK', emotion: intent }]
      }

      case 'UPDATE_FAIL':
        this.context.setUpdating(false)
        this.context.incrementRetryCount()
        this.context.transitionTo(new ErrorState())
        return [
          {
            type: 'SCHEDULE_RETRY',
            retryCount: this.context.getRetryCount(),
          },
        ]

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
