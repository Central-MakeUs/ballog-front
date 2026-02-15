import { useMutation } from '@tanstack/react-query'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useQueryClient } from '@tanstack/react-query'

import { authPost, authGet } from '@/entities/auth/api'
import type {
  SignupRequestDTO,
  SignupResponseDTO,
} from '@/entities/auth/model/auth.type'
import { NickNameForm } from '@/features/auth/ui'
import { type ExtendedKyHttpError } from '@/types/api/common'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BackArrow } from '@/assets/BackArrow'
import { useFlow } from '@/app/routes/stackflow'
import { useStack } from '@/shared/hooks/stackflow/useStack'
import { type TeamKey } from '@/shared/constants/teams'
import { authQueries } from '@/entities/auth/api/auth.queries'
import BallogAppBar from '@/assets/BallogAppBar'

interface NickNamePageProps {
  params: {
    selectedTeam: TeamKey
    serviceAgree: boolean
    marketingAgree: boolean
    privacyAgree: boolean
  }
}

const NickNamePage = ({ params }: NickNamePageProps) => {
  const { replace } = useFlow()
  const { popAll } = useStack()
  const queryClient = useQueryClient()
  const userQueryOptions = authQueries.getUser()

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation<SignupResponseDTO, ExtendedKyHttpError, SignupRequestDTO>({
    mutationFn: authPost.signup,

    onSuccess: async (data) => {
      if (data.status === 200) {
        const user = await authGet.getUser()
        queryClient.setQueryData(userQueryOptions.queryKey, user)
        popAll()
        replace('Home', {}, { animate: false })
      }
    },
  })

  return (
    <AppScreen
      appBar={{
        title: <BallogAppBar />,
        backButton: {
          renderIcon: () => (
            <BackArrow className="text-brand-neutral-70 dark:text-brand-neutral-white" />
          ),
        },
        height: '48px',
      }}
      preventSwipeBack={true}
    >
      <AppLayout className="h-full">
        <NickNameForm
          onSubmit={(data) => {
            signup({
              nickname: data.nickname,
              baseballTeam: params.selectedTeam,
              termAgree: {
                privacyAgree: params.privacyAgree,
                serviceAgree: params.serviceAgree,
                marketingAgree: params.marketingAgree,
              },
            })
          }}
          isLoading={isLoading}
          error={error}
        />
      </AppLayout>
    </AppScreen>
  )
}

export default NickNamePage
