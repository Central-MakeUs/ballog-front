import { useEffect } from 'react'

import { useFlow } from '@/shared/lib/stackflow'
import { useSessionContext } from '@/shared/contexts/sessionContext'

export const useCheckSignupFinished = () => {
  const { replace } = useFlow()

  const { user } = useSessionContext()

  useEffect(() => {
    if (user && (!user.nickname || !user.baseballTeam)) {
      replace('TermAgree', {}, { animate: false })
    }
  }, [user, replace])
}
