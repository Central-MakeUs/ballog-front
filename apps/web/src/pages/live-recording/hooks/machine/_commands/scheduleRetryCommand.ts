import type { CommandHandler } from './types'

export const scheduleRetryCommand: CommandHandler<
  'SCHEDULE_RETRY'
> = async () => [{ type: 'RETRY' }]
