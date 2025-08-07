import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'

import { alertGet } from './alert-get'

export const alertQueryKeys = createQueryKeys('alert', {
  setting: () => ({
    queryKey: ['setting'],
    queryFn: () => alertGet.getAlert(),
  }),
})

export const useAlertSettingQuery = () => {
  return useQuery(alertQueryKeys.setting())
}
