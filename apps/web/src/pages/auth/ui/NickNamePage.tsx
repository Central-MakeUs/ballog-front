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
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import { authGet } from '@/entities/auth/api'
import { useFlow } from '@/shared/lib/stackflow'

interface NickNamePageProps {
  selectedTeam: string | null
}

const NickNamePage = ({ params }: { params: NickNamePageProps }) => {
  const { push } = useFlow()
  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation<SignupResponseDTO, ExtendedKyHttpError, SignupRequestDTO>({
    mutationFn: authPost.signup,

    onSuccess: async (data) => {
      try {
        const user = await authGet.me()
        console.log(user)
        console.log("onSuccess 수행완로")
      } catch (error) {
        console.log(error)
      }
      if (data.statusCode === 200) {
        push('Home', {}, { animate: false })
      }
    },
  })

  return (
    <AppScreen
      appBar={{
        title: <BallogLogo />,
        backButton: {
          renderIcon: () => <BackArrow />,
        },
        height: '48px',
      }}
      preventSwipeBack={true}
    >
      <AppLayout>
        <div className="flex flex-col items-center justify-center w-full h-full px-4 gap-20">
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
        </div>
      </AppLayout>
    </AppScreen>
  )
}

export default NickNamePage
