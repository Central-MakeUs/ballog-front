import { createQueryKeys } from '@lukemorales/query-key-factory'

import { mypage } from './mypage.api'

export const mypageQueryKeys = createQueryKeys('mypage', {
  getMypage: () => ({
    queryKey: ['getMypage'],
    queryFn: () => mypage.getMypage(),
  }),
})
