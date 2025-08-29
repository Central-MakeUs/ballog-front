import { AppScreen } from '@stackflow/plugin-basic-ui'
import { toast } from 'sonner'

import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BackArrow } from '@/assets/BackArrow'
import { NickNameForm } from '@/features/auth/ui'
import { useUpdateMyInfoMutation } from '@/entities/auth/hooks/useUpdateMyInfoMutation'
import { useSessionContext } from '@/app/Provider/contexts/sessionContext'
import { useFlow } from '@/app/routes/stackflow'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'

const ChangeNickNamePage = () => {
  const { pop } = useFlow()
  const { user, setUser } = useSessionContext()
  const { mutate } = useUpdateMyInfoMutation()

  const handleSubmit = (data: { nickname: string }) => {
    if (!user) return
    mutate(
      {
        nickname: data.nickname,
        baseballTeam: user.baseballTeam ?? '응원팀 없음',
      },
      {
        onSuccess: () => {
          pop()
          toast('닉네임 변경이 완료되었습니다!')
          setUser({ ...user, nickname: data.nickname })
        },
      },
    )
  }

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
      <AppLayout>
        <div className="flex flex-col items-center justify-center w-full h-full gap-20">
          <NickNameForm
            nickname={user?.nickname ?? ''}
            onSubmit={handleSubmit}
            isLoading={false}
            error={null}
          />
        </div>
      </AppLayout>
    </AppScreen>
  )
}

export default ChangeNickNamePage
