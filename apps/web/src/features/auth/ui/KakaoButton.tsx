import { useFlow } from '@/shared/lib/stackflow'

export const KakaoButton = () => {
  const { push } = useFlow()

  return (
    <button
      onClick={() => {
        push('TeamSelect', {
          selectedTeam: null,
        })
      }}
      className="bg-gray-700 text-white rounded-lg py-3"
    >
      카카오로 시작하기
    </button>
  )
}
