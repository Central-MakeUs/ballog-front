import { actions } from '@/app/routes/stackflow'

export const useStack = () => {
  const stack = actions.getStack()
  const stackSize = stack.activities.length

  const popAll = () => {
    const current = actions.getStack().activities.length
    if (current > 1) actions.pop(current - 1)
  }

  return { stack, popAll, stackSize }
}
