import { useRef, useState } from 'react'

import { AUTH_MESSAGES } from '@/shared/ui/constants/messages'
import { useNickNameForm } from '@/shared/hooks/auth/useNickNameForm'
import type { ExtendedKyHttpError } from '@/types/api/common'
import { ErrorMessageFactory } from '@/features/auth/ui'
import { Button } from '@/shared/ui/common'
import { cn } from '@/shared/lib/classnames'

interface NickNameFormProps {
  nickname?: string
  onSubmit: (data: { nickname: string }) => void
  isLoading?: boolean
  error: ExtendedKyHttpError | null
}

export const NickNameForm = ({
  nickname: initialNickname,
  onSubmit,
  isLoading,
  error,
}: NickNameFormProps) => {
  const { nickname, setNickname, errors, validateNickname } = useNickNameForm(
    initialNickname ?? '',
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const [triedSubmit, setTriedSubmit] = useState(false)

  const handleSubmit = () => {
    setTriedSubmit(true)
    if (!validateNickname(nickname)) {
      inputRef.current?.focus()
      return
    }
    onSubmit({ nickname })
  }

  const isFormValid = Boolean(nickname.trim()) && errors.length === 0
  const showInvalid = triedSubmit && !isFormValid

  return (
    <div className="flex flex-col items-center justify-between w-full h-full px-4">
      <div className="flex flex-col items-center w-full gap-8">
        <p className="mt-8 body-lg-bold text-usage-text-default">
          닉네임을 입력해주세요.
        </p>

        <div className="flex flex-col items-center w-full gap-2">
          <input
            ref={inputRef}
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={AUTH_MESSAGES.nickname.placeholder}
            aria-invalid={showInvalid}
            className={cn(
              'w-full py-3 px-4 rounded-lg body-lg-bold bg-gray-700 text-usage-text-default light:bg-usage-background-strong text-center mb-4 placeholder-gray-400',
              'focus:outline-none border-none transition-colors',
              showInvalid
                ? 'border-0 focus:ring-1 focus:ring-brand-red-default focus:ring-offset-0'
                : 'border-0 focus:ring-1 focus:ring-brand-secondary-default focus:ring-offset-0',
            )}
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
        disabled={!isFormValid || isLoading}
        className="fixed bottom-10 left-4 right-4 text-brand-neutral-white"
      >
        {isLoading ? '처리중...' : '완료'}
      </Button>
    </div>
  )
}
