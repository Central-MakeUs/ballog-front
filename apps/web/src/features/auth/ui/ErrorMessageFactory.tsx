import type { ExtendedKyHttpError } from '@/types/api/common'
import { ErrorMessage } from '@/entities/auth/ui/ErrorMessage'

export const ErrorMessageFactory = ({
  errors,
  error,
}: {
  errors: string[]
  error: ExtendedKyHttpError | unknown
}) => {
  if (errors.length > 0) {
    return <ErrorMessage error={errors[0]} />
  }

  if (error && typeof error === 'object' && 'errorData' in error) {
    const kyError = error as ExtendedKyHttpError
    return <ErrorMessage error={kyError.errorData?.error || 'unknown'} />
  }

  if (error) {
    return <ErrorMessage error={'알 수 없는 에러가 발생했습니다.'} />
  }
}
