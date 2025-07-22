import { AppScreen } from '@stackflow/plugin-basic-ui'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { BallogLogo } from '@/assets/BallogLogo'
import { BackArrow } from '@/assets/BackArrow'
import { NickNameForm } from '@/features/auth/ui'

const ChangeNickNamePage = () => {
  const handleSubmit = (data: { nickname: string }) => {
    console.log('변경할 닉네임:', data.nickname)
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
        <div className="flex flex-col items-center justify-center w-full h-full px-4 gap-20">
          <NickNameForm
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