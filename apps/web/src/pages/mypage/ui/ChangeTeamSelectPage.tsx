import { AppScreen } from '@stackflow/plugin-basic-ui'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/shared/lib/stackflow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import type { TeamKey } from '@/shared/constants/teams'
import { useUpdateMyInfoMutation } from '@/shared/hooks/auth/useUpdateMyInfoMutation'
import { useMeContext } from '@/shared/contexts/meContext'

const ChangeTeamSelectPage = () => {
  const { pop } = useFlow()
  const { me } = useMeContext()

  const { mutate } = useUpdateMyInfoMutation()

  const handleSubmit = (selectedTeam: TeamKey) => {
    if (!me) return
    mutate(
      { baseballTeam: selectedTeam, nickname: me.nickname },
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
