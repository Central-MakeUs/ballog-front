import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/shared/lib/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'

export const ChangeTeamSelectPage = () => {
  const { pop } = useFlow()

  const handleSubmit = (team: string) => {
    console.log('선택된 팀:', team)
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
