import { AppScreen } from '@stackflow/plugin-basic-ui'

import { TeamSelectionForm } from '@/features/auth/ui'
import { useFlow } from '@/app/routes/stackflow'
import type { TeamKey } from '@/shared/constants/teams'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BackArrow } from '@/assets/BackArrow'
import BallogAppBar from '@/assets/BallogAppBar'

interface TeamSelectPageProps {
  params: {
    serviceAgree: boolean
    marketingAgree: boolean
    privacyAgree: boolean
  }
}

const TeamSelectPage = ({ params }: TeamSelectPageProps) => {
  const { push } = useFlow()

  const handleTeamSelect = (selectedTeam: TeamKey) => {
    push('Nickname', {
      selectedTeam,
      serviceAgree: params.serviceAgree,
      marketingAgree: params.marketingAgree,
      privacyAgree: params.privacyAgree,
    })
  }

  return (
    <AppScreen
      appBar={{
        title: <BallogAppBar />,
        height: '48px',
        backButton: {
          renderIcon: () => (
            <BackArrow className="text-brand-neutral-70 dark:text-brand-neutral-white" />
          ),
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
