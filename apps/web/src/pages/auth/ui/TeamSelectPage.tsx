import { TeamSelectionForm } from '@/features/auth/ui/TeamSelectForm'
import { useFlow } from '@/shared/lib/stackflow'
import type { TeamKey } from '@/shared/constants/teams'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'

const TeamSelectPage = () => {
  const { push } = useFlow()

  const handleTeamSelect = (selectedTeam: TeamKey) => {
    // push('Nickname', { selectedTeam })
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
      preventSwipeBack={true}
    >
      <AppLayout>
        <TeamSelectionForm onSubmit={handleTeamSelect} />
      </AppLayout>
    </AppScreen>
  )
}

export default TeamSelectPage
