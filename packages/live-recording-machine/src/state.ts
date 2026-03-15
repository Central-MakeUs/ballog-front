import type { LiveRecordingContext } from './context'
import type { Command, LiveRecordingEvent, LiveRecordingStatus } from './types'

export abstract class State {
  protected context!: LiveRecordingContext
  abstract readonly name: LiveRecordingStatus

  public setContext(context: LiveRecordingContext): void {
    this.context = context
  }

  public abstract handle(event: LiveRecordingEvent): Command[]

  protected terminateOnce(): Command[] {
    if (this.context.isTerminateRequested()) {
      return []
    }

    this.context.requestTerminate()
    return [{ type: 'DO_TERMINATE' }]
  }
}
