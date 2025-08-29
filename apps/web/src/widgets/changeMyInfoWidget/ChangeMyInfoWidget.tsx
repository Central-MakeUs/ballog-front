import { List } from '@/shared/ui/common/List/List'
import { useFlow } from '@/app/routes/stackflow'

export const ChangeMyInfoWidget = () => {
  const { push } = useFlow()

  return (
    <div className="space-y-4 mb-6">
      <List type="arrow" onClick={() => push('ChangeTeamSelect', {})}>
        응원 팀 변경
      </List>
      <List type="arrow" onClick={() => push('ChangeNickName', {})}>
        닉네임 변경
      </List>
    </div>
  )
}
