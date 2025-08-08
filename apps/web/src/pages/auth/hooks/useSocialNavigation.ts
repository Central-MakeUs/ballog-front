import { useFlow } from '@/shared/lib/stackflow'
import { useStack } from '@/shared/hooks/stackflow/useStack'

export const useSocialNavigation = () => {
  const { push, replace } = useFlow()
  const { popAll } = useStack()

  const handleSignupSuccess = () => {
    push('TermAgree', {})
  }

  const handleLoginSuccess = () => {
    popAll()
    replace('Home', {})
  }

  return {
    handleSignupSuccess,
    handleLoginSuccess,
  }
}
