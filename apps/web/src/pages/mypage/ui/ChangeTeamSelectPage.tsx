import { AppScreen } from '@stackflow/plugin-basic-ui'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/shared/lib/stackflow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import type { TeamKey } from '@/shared/constants/teams'

const ChangeTeamSelectPage = () => {
  const { pop } = useFlow()

  const handleSubmit = (selectedTeam: TeamKey) => {
    console.log('선택된 팀:', selectedTeam)
    pop()
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
