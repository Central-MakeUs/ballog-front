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
import { useSessionContext } from '@/shared/contexts/sessionContext'

interface NickNamePageProps {
  selectedTeam: string | null
}

const NickNamePage = ({ params }: { params: NickNamePageProps }) => {
  const { replace, pop } = useFlow()
  const { setUser } = useSessionContext()

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
        // 이전 팀 선택 페이지 pop
        pop()
        // 로그인 페이지 pop
        pop()
        // 홈 페이지로 이동
        replace('Home', {}, { animate: false })
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
