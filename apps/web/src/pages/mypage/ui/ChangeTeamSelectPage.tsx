import { AppScreen } from '@stackflow/plugin-basic-ui'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/shared/lib/stackflow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import type { TeamKey } from '@/shared/constants/teams'
import { useUpdateMyTeamMutation } from '@/shared/hooks/auth/useUpdateMyInfoMutation'
import { useSessionContext } from '@/shared/contexts/sessionContext'

const isSignUpFlow = false

const ChangeTeamSelectPage = () => {
  const { pop } = useFlow()
  const { user, setUser } = useSessionContext()

  const { mutate } = useUpdateMyTeamMutation()

  const handleSubmit = (selectedTeam: TeamKey) => {
    if (!user) return
    mutate(
      { baseballTeam: selectedTeam },
      {
        onSuccess: () => {
          pop()
          setUser({ ...user, baseballTeam: selectedTeam })
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
        <TeamSelectionForm onSubmit={handleSubmit} isSignUpFlow={isSignUpFlow} />
      </AppLayout>
    </AppScreen>
  )
}

export default ChangeTeamSelectPage
