import { List } from '@/shared/ui/common/List/List'
import { useAlarmContext } from '@/features/auth/contexts/alarmContext'

export const AlarmToggleList = () => {
  const { startAlert, inGameAlert, toggleMatchStart, toggleInGame } =
    useAlarmContext()

  const handleToggleMatchStart = () => {
    toggleMatchStart()
  }

  const handleToggleInGame = () => {
    toggleInGame()
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
