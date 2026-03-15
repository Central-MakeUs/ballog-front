import { State } from '../state'
import type { Command, LiveRecordingEvent } from '../types'

export class TerminateState extends State {
  public readonly name = 'terminate' as const

  public handle(_event: LiveRecordingEvent): Command[] {
    return []
  }
}
