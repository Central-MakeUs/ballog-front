import { useQuery } from '@tanstack/react-query'

import { authQueries } from '@/entities/auth/api'
import { useAccessTokenStorage } from '@/shared/hooks/auth/useAccessTokenStorage'

export const useUserQuery = () => {
  const { accessToken } = useAccessTokenStorage()
  const userQueryOptions = authQueries.getUser()

  const userQuery = useQuery({
    ...userQueryOptions,
    enabled: !!accessToken,
    retry: false,
  })

  const user = accessToken ? userQuery.data?.data ?? null : null

  return { user, userQuery }
}

