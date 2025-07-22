import { useQuery } from '@tanstack/react-query'
import { authGet } from '@/entities/auth/api'

export const useMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: authGet.me,
  })
}
