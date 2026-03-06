import { createQueryKeys } from '@lukemorales/query-key-factory'

import { authGet } from './auth.api'

export const authQueries = createQueryKeys('auth', {
  getUser: () => ({
    queryKey: ['getUser'],
    queryFn: () => authGet.getUser(),
  }),
})
