import {
  type Command,
  type LiveRecordingEvent,
  type MachineSnapshot,
  createLiveRecordingMachine,
} from '@ballog/live-recording-machine'

export type CommandExecutor = (
  command: Command,
) => Promise<LiveRecordingEvent[]>

interface LiveRecordRuntimeParams {
  machine: ReturnType<typeof createLiveRecordingMachine>
  executeCommand: CommandExecutor
}

/**
 * Live Recording FSM Runtime
 *
 * FSM에 이벤트를 보내고, 반환된 Command를 실행하고,
 * Command 결과로 나온 이벤트를 다시 FSM에 전달하는 루프를 관리합니다.
 *
 * 커맨드는 큐에 의해 관리됩니다.
 *
 * React에서는 useSyncExternalStore(subscribe, getSnapshot)으로 구독합니다.
 */
export class LiveRecordRuntime {
  private machine: ReturnType<typeof createLiveRecordingMachine>
  private executeCommand: CommandExecutor
  private matchRecordId?: number

  // 이벤트 큐 (동시성 안전)
  private eventQueue: LiveRecordingEvent[] = []
  private processing = false

  // 구독
  private listeners = new Set<() => void>()
  private cachedSnapshot: MachineSnapshot | null = null

  public constructor({ machine, executeCommand }: LiveRecordRuntimeParams) {
    this.machine = machine
    this.executeCommand = executeCommand
  }

  // ── Public API ──────────────────────────────────────────

  /**
   * FSM에 이벤트를 보냅니다.
   * 이벤트 큐에 넣고 순차적으로 처리합니다.
   */
  public send = (event: LiveRecordingEvent): void => {
    if (this.eventQueue.length > 50) {
      return
    }

    this.eventQueue.push(event)
    void this.processQueue()
  }

  /**
   * useSyncExternalStore의 subscribe 인자로 사용합니다.
   */
  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  /**
   * useSyncExternalStore의 getSnapshot 인자로 사용합니다.
   * MachineSnapshot을 직접 반환하며, 내용이 같으면 이전 참조를 유지합니다.
   */
  public getSnapshot = (): MachineSnapshot => {
    const next = this.machine.snapshot()

    if (this.cachedSnapshot && this.shallowEqual(this.cachedSnapshot, next)) {
      return this.cachedSnapshot
    }

    this.cachedSnapshot = next
    return next
  }

  /**
   * Runtime을 새 machine/executor로 재설정합니다.
   */
  public reset({ machine, executeCommand }: LiveRecordRuntimeParams): void {
    this.machine = machine
    this.executeCommand = executeCommand
    this.eventQueue = []
    this.processing = false
    this.cachedSnapshot = null
    this.notify()
  }

  public setMatchRecordId = (id: number | undefined): void => {
    this.matchRecordId = id
  }

  public getMatchRecordId = (): number | undefined => this.matchRecordId

  // ── Private ─────────────────────────────────────────────

  private async processQueue(): Promise<void> {
    if (this.processing) {
      return
    }

    this.processing = true

    try {
      while (this.eventQueue.length > 0) {
        const event = this.eventQueue.shift()

        if (!event) {
          continue
        }

        // FSM에 이벤트 전달 → Command[] 반환
        const commands = this.machine.dispatch(event)
        this.notify()

        // Command 순차 실행 → 새 이벤트 큐에 추가
        for (const command of commands) {
          try {
            const nextEvents = await this.executeCommand(command)
            this.eventQueue.push(...nextEvents)
          } catch {
            // Command 실행 실패는 무시 (FSM이 에러 상태로 전환)
          }
        }
      }
    } finally {
      this.processing = false
      this.notify()
    }
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener()
    }
  }

  private shallowEqual(a: MachineSnapshot, b: MachineSnapshot): boolean {
    return (
      a.state === b.state &&
      a.isUpdating === b.isUpdating &&
      a.retryCount === b.retryCount &&
      a.maxRetry === b.maxRetry &&
      a.lastEmotionIntent === b.lastEmotionIntent &&
      a.terminationRequested === b.terminationRequested
    )
  }
}
