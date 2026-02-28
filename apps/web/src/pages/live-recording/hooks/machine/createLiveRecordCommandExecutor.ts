import {
  type Command,
  type LiveRecordingEvent,
} from '@ballog/live-recording-machine'

import {
  createRecordingCommand,
  doTerminateCommand,
  fetchOrCreateRecordingCommand,
  scheduleRetryCommand,
  startUpdateFromClickCommand,
  startUpdateFromPollCommand,
  type LiveRecordCommandContext,
} from './_commands'

interface CreateLiveRecordCommandExecutorParams
  extends LiveRecordCommandContext {}

export const createLiveRecordCommandExecutor = ({
  matchId,
  queryClient,
  getMatchRecordId,
  setMatchRecordId,
  setEmotionPercent,
  onTerminate,
}: CreateLiveRecordCommandExecutorParams) => {
  const context: LiveRecordCommandContext = {
    matchId,
    queryClient,
    getMatchRecordId,
    setMatchRecordId,
    setEmotionPercent,
    onTerminate,
  }

  return async (command: Command): Promise<LiveRecordingEvent[]> => {
    switch (command.type) {
      case 'START_UPDATE_FROM_CLICK': {
        return startUpdateFromClickCommand(command, context)
      }

      case 'START_UPDATE_FROM_POLL': {
        return startUpdateFromPollCommand(command, context)
      }

      case 'SCHEDULE_RETRY':
        return scheduleRetryCommand(command, context)

      case 'DO_TERMINATE':
        return doTerminateCommand(command, context)

      case 'FETCH_OR_CREATE_RECORDING': {
        return fetchOrCreateRecordingCommand(command, context)
      }

      case 'CREATE_RECORDING': {
        return createRecordingCommand(command, context)
      }

      default:
        return []
    }
  }
}
