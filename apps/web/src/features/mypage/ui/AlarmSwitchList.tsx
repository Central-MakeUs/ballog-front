import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'

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

  const [localStartAlert, setLocalStartAlert] = useState<boolean | null>(null)
  const [localInGameAlert, setLocalInGameAlert] = useState<boolean | null>(null)

  const timerRef = useRef<number | null>(null)

  const scheduleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      setLocalStartAlert(null)
      setLocalInGameAlert(null)
      timerRef.current = null
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Alert) => alertPatch.patchAlert(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(alertQueryKeys.setting().queryKey, data)
      scheduleReset()
    },
    onError: () => {
      scheduleReset()
      toast.error('설정을 변경하는데 실패했습니다.')
    },
  })
  if (isLoading || !data) return null

  const { startAlert, inGameAlert } = data.data

  const displayStartAlert = localStartAlert ?? startAlert
  const displayInGameAlert = localInGameAlert ?? inGameAlert

  const handleToggleMatchStart = () => {
    const next = !displayStartAlert
    setLocalStartAlert(next)
    mutate({ startAlert: next, inGameAlert: displayInGameAlert })
  }

  const handleToggleInGame = () => {
    const next = !displayInGameAlert
    setLocalInGameAlert(next)
    mutate({ startAlert: displayStartAlert, inGameAlert: next })
  }

  return (
    <div className="space-y-4 mb-6">
      <p className="body-sm-bold text-brand-neutral-white">알람 설정</p>
      <List
        type="switch"
        disabled={isPending}
        value={displayStartAlert}
        onToggle={handleToggleMatchStart}
      >
        경기 시작 알림 받기
      </List>
      <List
        type="switch"
        disabled={isPending}
        value={displayInGameAlert}
        onToggle={handleToggleInGame}
      >
        경기 중 알림 받기
      </List>
    </div>
  )
}
