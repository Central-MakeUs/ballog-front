import { createQueryKeys } from '@lukemorales/query-key-factory'

import { authGet } from './auth-get'

export const authQueries = createQueryKeys('auth', {
  getUser: () => ({
    queryKey: ['getUser'],
    queryFn: () => authGet.getUser(),
  }),
})