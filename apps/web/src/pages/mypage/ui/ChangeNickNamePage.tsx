import { AppScreen } from '@stackflow/plugin-basic-ui'
import { toast } from 'sonner'

import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import { NickNameForm } from '@/features/auth/ui'
import { useUpdateMyInfoMutation } from '@/shared/hooks/auth/useUpdateMyInfoMutation'
import { useSessionContext } from '@/shared/contexts/sessionContext'
import { useFlow } from '@/shared/lib/stackflow'

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
          toast("닉네임 변경이 완료되었습니다!")
          setUser({ ...user, nickname: data.nickname })
        },
      },
    )
  }

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
