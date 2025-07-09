import type { ExtendedKyHttpError } from '@/types/api/common'
import { ErrorMessage } from '@/entities/auth/ui/ErrorMessage'

export const ErrorMessageFactory = ({
  errors,
  error,
}: {
  errors: string[]
  error: ExtendedKyHttpError | null
}) => {
  if (errors.length > 0) {
    return <ErrorMessage error={errors[0]} />
  }
  if (error) {
    return <ErrorMessage error={error.errorData.error} />
  }
  return null
}
