import { AppScreen } from '@stackflow/plugin-basic-ui'
import { toast } from 'sonner'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/app/routes/stackflow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BackArrow } from '@/assets/BackArrow'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { useUpdateMyTeamMutation } from '@/entities/auth/hooks/useUpdateMyInfoMutation'
import { useSessionContext } from '@/shared/contexts/sessionContext'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'

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
          toast('응원 팀 변경이 완료되었습니다!')
          setUser({ ...user, baseballTeam: selectedTeam })
        },
      },
    )
  }

  const isTeamKey = (value: string): value is TeamKey => {
    return value in TEAMS
  }
  return (
    <AppScreen
      appBar={{
        title: <WhiteBallogLogo />,
        height: '48px',
        backButton: {
          renderIcon: () => <BackArrow />,
        },
      }}
    >
      <AppLayout>
        <TeamSelectionForm
          baseBallTeam={
            user?.baseballTeam && isTeamKey(user.baseballTeam)
              ? user.baseballTeam
              : undefined
          }
          onSubmit={handleSubmit}
          isSignUpFlow={isSignUpFlow}
        />
      </AppLayout>
    </AppScreen>
  )
}

export default ChangeTeamSelectPage
