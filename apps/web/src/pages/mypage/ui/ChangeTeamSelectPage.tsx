import { AppScreen } from '@stackflow/plugin-basic-ui'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/shared/lib/stackflow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import type { TeamKey } from '@/shared/constants/teams'
import { useUpdateMyInfoMutation } from '@/shared/hooks/auth/useUpdateMyInfoMutation'
import { useSessionContext } from '@/shared/contexts/sessionContext'

const ChangeTeamSelectPage = () => {
  const { pop } = useFlow()
  const { user } = useSessionContext()

  const { mutate } = useUpdateMyInfoMutation()

  const handleSubmit = (selectedTeam: TeamKey) => {
    if (!user) return
    mutate(
      { baseballTeam: selectedTeam, nickname: user.nickname },
      {
        onSuccess: () => {
          pop()
        },
      },
    )
  }

  return (
    <AppScreen
      appBar={{
        title: <BallogLogo />,
        height: '48px',
        backButton: {
          renderIcon: () => <BackArrow />,
        },
      }}
    >
      <AppLayout>
        <TeamSelectionForm onSubmit={handleSubmit} />
      </AppLayout>
    </AppScreen>
  )
}

export default ChangeTeamSelectPage
