import { AUTH_MESSAGES } from '@/shared/ui/constants/messages'
import { useNickNameForm } from '@/shared/hooks/auth/useNickNameForm'
import type { ExtendedKyHttpError } from '@/types/api/common'
import { ErrorMessageFactory } from '@/features/auth/ui'
import { Button } from '@/shared/ui/common'

type NickNameFormProps = {
  onSubmit: (data: { nickname: string }) => void
  isLoading?: boolean
  error: ExtendedKyHttpError | null
}

export const NickNameForm = ({
  onSubmit,
  isLoading,
  error,
}: NickNameFormProps) => {
  const { nickname, setNickname, errors, validateNickname } = useNickNameForm()

  const handleSubmit = () => {
    if (!validateNickname(nickname)) return
    onSubmit({ nickname })
  }

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className="flex flex-col items-center w-full gap-8">
        <p className="body-lg-bold mt-8">닉네임을 입력해주세요.</p>

        <div className="flex flex-col items-center w-full gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={AUTH_MESSAGES.nickname.placeholder}
            className="w-full py-3 px-4 rounded-lg bg-gray-700 text-white mb-4 placeholder-gray-400"
          />

          {/* 에러 메시지 노출 */}
          <ErrorMessageFactory errors={errors} error={error} />
        </div>

        <p className="body-sm-medium text-brand-neutral-50">
          한글, 영문, 숫자 1~10자까지 입력할 수 있어요.
        </p>
      </div>

      <Button
        size="lg"
        variant="primary"
        onClick={handleSubmit}
        disabled={!nickname?.trim() || isLoading}
        className={`w-full sticky bottom-10`}
      >
        {isLoading ? '처리중...' : '완료'}
      </Button>
    </div>
  )
}
