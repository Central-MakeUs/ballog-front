import { actions } from '@/shared/lib/stackflow'

export const useStack = () => {
  const stack = actions.getStack()
  const stackSize = stack.activities.length

  const popAll = () => {
    for (let i = 0; i < stackSize; i++) {
      actions.pop()
    }
  }

  return { stack, popAll, stackSize }
}
