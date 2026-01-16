import { useEffect } from 'react'

import { useFlow } from '@/app/routes/stackflow'
import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'
import { useStack } from '@/shared/hooks/stackflow/useStack'

export const useCheckSignupFinished = () => {
  const { replace } = useFlow()
  const { popAll } = useStack()
  const { user } = useUserQuery()

  useEffect(() => {
    if (user && (!user.nickname || !user.baseballTeam)) {
      popAll()
      replace('TermAgree', {}, { animate: false })
    }
  }, [user, replace, popAll])
}
