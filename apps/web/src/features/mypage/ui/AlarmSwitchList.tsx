import { List } from '@/shared/ui/common/List/List'
import {
  useAlertSettingQuery,
  useAlertSettingMutation,
} from '@/entities/mypage/api/alert.queries'

export const AlarmToggleList = () => {
  const { data, isLoading } = useAlertSettingQuery()
  const { mutate } = useAlertSettingMutation()

  if (isLoading || !data) return null

  const { startAlert, inGameAlert } = data.data

  // const { startAlert, inGameAlert, toggleMatchStart, toggleInGame } =
  //   useAlarmContext()

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
