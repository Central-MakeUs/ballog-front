import { State } from '../state'
import type { Command, LiveRecordingEvent } from '../types'

import { ErrorState } from './ErrorState'
import { RecordingState } from './RecordingState'
import { TerminateState } from './TerminateState'

export class NewState extends State {
  public readonly name = 'new' as const

  public handle(event: LiveRecordingEvent): Command[] {
    switch (event.type) {
      case 'INIT':
        return [{ type: 'FETCH_OR_CREATE_RECORDING' }]

      case 'RECORDING_FOUND':
      case 'CREATE_SUCCESS':
        this.context.resetRetryCount()
        this.context.transitionTo(new RecordingState())
        return []

      case 'RECORDING_NOT_FOUND':
        return [{ type: 'CREATE_RECORDING' }]

      case 'CREATE_FAIL':
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
        this.context.transitionTo(new TerminateState())
        return this.terminateOnce()

      default:
        return []
    }
  }
}
