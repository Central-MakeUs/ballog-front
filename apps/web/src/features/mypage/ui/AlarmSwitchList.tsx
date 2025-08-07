import { useMutation, useQueryClient } from '@tanstack/react-query'

import { List } from '@/shared/ui/common/List/List'
import type { Alert } from '@/entities/mypage/model/alert.type'
import {
  alertPatch,
  useAlertSettingQuery,
  alertQueryKeys,
} from '@/entities/mypage/api'

export const AlarmToggleList = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useAlertSettingQuery()

  const { mutate } = useMutation({
    mutationFn: (payload: Alert) => alertPatch.patchAlert(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(alertQueryKeys.setting().queryKey, data)
    },
  })
  if (isLoading || !data) return null

  const { startAlert, inGameAlert } = data.data

  const handleToggleMatchStart = () => {
    mutate({ startAlert: !startAlert, inGameAlert })
  }

  const handleToggleInGame = () => {
    mutate({ startAlert, inGameAlert: !inGameAlert })
  }

  return (
    <div className="space-y-4 mb-6">
      <p className="body-sm-bold text-brand-neutral-white">알람 설정</p>
      <List type="switch" value={startAlert} onToggle={handleToggleMatchStart}>
        경기 시작 알림 받기
      </List>
      <List type="switch" value={inGameAlert} onToggle={handleToggleInGame}>
        경기 중 알림 받기
      </List>
    </div>
  )
}
