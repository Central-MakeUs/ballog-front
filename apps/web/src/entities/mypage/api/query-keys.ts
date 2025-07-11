import { createQueryKeys } from '@lukemorales/query-key-factory'
import { mypage } from './mypage-get'

// 예시용 쿼리키 생성
// useQuery(queryKeys.checkNickname.checkNickname('닉네임'))
// 이렇게 사용
export const queryKeys = createQueryKeys('mypage', {
  getMypage: () => ({
    queryKey: ['getMypage'],
    queryFn: () => mypage.getMypage(),
  }),
})
