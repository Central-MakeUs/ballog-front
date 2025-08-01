import { AppScreen } from '@stackflow/plugin-basic-ui'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/shared/lib/stackflow'
import type { TeamKey } from '@/shared/constants/teams'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BackArrow } from '@/assets/BackArrow'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'

const TeamSelectPage = () => {
  const { push } = useFlow()

  const handleTeamSelect = (selectedTeam: TeamKey) => {
    push('Nickname', { selectedTeam })
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
      preventSwipeBack={true}
    >
      <AppLayout className="h-full">
        <TeamSelectionForm onSubmit={handleTeamSelect} />
      </AppLayout>
    </AppScreen>
  )
}

export default TeamSelectPage
