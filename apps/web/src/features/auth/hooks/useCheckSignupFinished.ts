import { useEffect } from 'react'

import { useFlow } from '@/app/routes/stackflow'
import { useSessionContext } from '@/entities/auth/hooks/useSessionContext'
import { useStack } from '@/shared/hooks/stackflow/useStack'

export const useCheckSignupFinished = () => {
  const { replace } = useFlow()
  const { popAll } = useStack()
  const { user } = useSessionContext()

  useEffect(() => {
    if (user && (!user.nickname || !user.baseballTeam)) {
      popAll()
      replace('TermAgree', {}, { animate: false })
    }
  }, [user, replace, popAll])
}
