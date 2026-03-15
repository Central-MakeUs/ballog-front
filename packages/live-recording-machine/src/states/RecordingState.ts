import { State } from '../state'
import type { Command, LiveRecordingEvent } from '../types'

import { TerminateState } from './TerminateState'
import { UpdatingState } from './UpdatingState'

export class RecordingState extends State {
  public readonly name = 'recording' as const

  public handle(event: LiveRecordingEvent): Command[] {
    switch (event.type) {
      case 'EMOTION_CLICK':
        if (this.context.getUpdating()) {
          this.context.enqueueEmotionIntent(event.emotion)
          return []
        }

        this.context.setUpdating(true)
        this.context.transitionTo(new UpdatingState())
        return [{ type: 'START_UPDATE_FROM_CLICK', emotion: event.emotion }]

      case 'POLL_TICK_3S':
        if (this.context.getUpdating()) {
          return []
        }

        this.context.setUpdating(true)
        this.context.transitionTo(new UpdatingState())
        return [{ type: 'START_UPDATE_FROM_POLL' }]

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
