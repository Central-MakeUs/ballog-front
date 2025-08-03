import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  Alert,
} from '@/entities/mypage/model/alert.type'

import { alertPatch } from './alert-patch'
import { alertGet } from './alert-get'

export const alertQueryKeys = createQueryKeys('alert', {
  setting: () => ({
    queryKey: ['setting'],
    queryFn: () => alertGet.getAlert(),
  }),
})

export const useAlertSettingMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Alert) => alertPatch.patchAlert(payload),
    onSuccess: (data) => {
      // 서버 응답으로 캐시 갱신
      queryClient.setQueryData(alertQueryKeys.setting().queryKey, data)
    },
  })
}

export const useAlertSettingQuery = () => {
  return useQuery(alertQueryKeys.setting())
}
