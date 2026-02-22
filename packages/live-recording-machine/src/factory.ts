import {
  LiveRecordingContext,
  type LiveRecordingMachineOptions,
} from './context'
import { NewState } from './states/NewState'

export const createLiveRecordingMachine = (
  options?: LiveRecordingMachineOptions,
): LiveRecordingContext => {
  return new LiveRecordingContext(new NewState(), options)
}
