import { toast } from 'sonner'

import { useAuthAction } from '@/features/auth/hooks/useAuthAction'
import { useModal } from '@/shared/hooks/modal/useModal'

export const LogoutAndWithdrawButtons = () => {
  const { logout, deleteUser } = useAuthAction()
  const { openHorizontalModal } = useModal()

  const handleClickLogout = () => {
    openHorizontalModal({
      heading: '로그아웃 하시겠어요?',
      body: '지금 로그아웃 하시겠습니까?',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '로그아웃',
          onClick: async () => {
            try {
              await logout()
            } catch (e) {
              toast.error(getErrorMessage(e))
            }
          },
        },
      ],
    })
  }

  const handleClickWithdraw = () => {
    openHorizontalModal({
      heading: '정말 탈퇴하시겠어요?',
      body: '탈퇴 시 서비스 내 모든 정보가\n삭제되어 복구할 수 없습니다.',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '탈퇴',
          onClick: () => {
            deleteUser()
          },
        },
      ],
    })
  }

  return (
    <div className="flex items-center gap-4 px-4 mt-4 mb-4">
      <button
        className="flex-1 text-center text-usage-text-hover body-sm-medium"
        onClick={handleClickLogout}
      >
        로그아웃
      </button>
      <p className="body-sm-light text-usage-text-subtle">|</p>
      <button
        className="flex-1 text-center text-usage-text-hover body-sm-medium"
        onClick={handleClickWithdraw}
      >
        탈퇴하기
      </button>
    </div>
  )
}
