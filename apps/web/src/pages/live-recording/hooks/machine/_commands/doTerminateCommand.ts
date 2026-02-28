import type { CommandHandler } from './types'

export const doTerminateCommand: CommandHandler<'DO_TERMINATE'> = async (
  _command,
  context,
) => {
  context.onTerminate?.()
  return []
}
