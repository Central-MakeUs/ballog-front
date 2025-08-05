import { useMutation } from '@tanstack/react-query'
import { AppScreen } from '@stackflow/plugin-basic-ui'

import { authPost } from '@/entities/auth/api'
import type {
  SignupRequestDTO,
  SignupResponseDTO,
} from '@/entities/auth/model/auth.type'
import { NickNameForm } from '@/features/auth/ui'
import { type ExtendedKyHttpError } from '@/types/api/common'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BackArrow } from '@/assets/BackArrow'
import { authGet } from '@/entities/auth/api'
import { useFlow } from '@/shared/lib/stackflow'
import { useSessionContext } from '@/shared/contexts/sessionContext'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { useStack } from '@/shared/hooks/stackflow/useStack'

interface NickNamePageProps {
  selectedTeam: string | null
}

const NickNamePage = ({ params }: { params: NickNamePageProps }) => {
  const { replace } = useFlow()
  const { setUser } = useSessionContext()
  const { popAll } = useStack()

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation<SignupResponseDTO, ExtendedKyHttpError, SignupRequestDTO>({
    mutationFn: authPost.signup,

    onSuccess: async (data) => {
      const user = await authGet.getUser()
      setUser(user.data)
      if (data.status === 200) {
        popAll()
        replace('Home', {}, { animate: false })
      }
    },
  })

  return (
    <AppScreen
      appBar={{
        title: <WhiteBallogLogo />,
        backButton: {
          renderIcon: () => <BackArrow />,
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
              baseballTeam: params.selectedTeam!,
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
