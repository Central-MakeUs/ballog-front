import type { State } from './state'
import type {
  Command,
  EmotionType,
  LiveRecordingEvent,
  MachineSnapshot,
} from './types'

export interface LiveRecordingMachineOptions {
  maxRetry?: number
}

export class LiveRecordingContext {
  private state!: State
  private isUpdating = false
  private retryCount = 0
  private readonly maxRetry: number
  private lastEmotionIntent: EmotionType | null = null
  private terminationRequested = false

  constructor(initialState: State, options?: LiveRecordingMachineOptions) {
    this.maxRetry = options?.maxRetry ?? 3
    this.transitionTo(initialState)
  }

  public transitionTo(state: State): void {
    this.state = state
    this.state.setContext(this)
  }

  public dispatch(event: LiveRecordingEvent): Command[] {
    return this.state.handle(event)
  }

  public snapshot(): MachineSnapshot {
    return {
      state: this.state.name,
      isUpdating: this.isUpdating,
      retryCount: this.retryCount,
      maxRetry: this.maxRetry,
      lastEmotionIntent: this.lastEmotionIntent,
      terminationRequested: this.terminationRequested,
    }
  }

  public getStateName(): MachineSnapshot['state'] {
    return this.state.name
  }

  public setUpdating(next: boolean): void {
    this.isUpdating = next
  }

  public getUpdating(): boolean {
    return this.isUpdating
  }

  public setLastEmotionIntent(intent: EmotionType | null): void {
    this.lastEmotionIntent = intent
  }

  public getLastEmotionIntent(): EmotionType | null {
    return this.lastEmotionIntent
  }

  public incrementRetryCount(): void {
    this.retryCount += 1
  }

  public resetRetryCount(): void {
    this.retryCount = 0
  }

  public getRetryCount(): number {
    return this.retryCount
  }

  public getMaxRetry(): number {
    return this.maxRetry
  }

  public requestTerminate(): void {
    this.terminationRequested = true
  }

  public isTerminateRequested(): boolean {
    return this.terminationRequested
  }
}
