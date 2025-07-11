import { useState } from 'react'
import { AUTH_CONFIG } from '@/shared/ui/constants/config'
import { AUTH_MESSAGES } from '@/shared/ui/constants/messages'

export const useNickNameForm = () => {
  const [nickname, setNickname] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const validateNickname = (value: string) => {
    const newErrors: string[] = []

    // 글자 수 제한
    if (
      !value.length ||
      value.length < AUTH_CONFIG.nickname.minLength ||
      value.length > AUTH_CONFIG.nickname.maxLength
    ) {
      newErrors.push(AUTH_MESSAGES.nickname.lengthRule)
    }

    // 한글, 영문, 숫자만 입력 가능
    if (!AUTH_CONFIG.nickname.regex.test(value)) {
      newErrors.push(AUTH_MESSAGES.nickname.regexRule)
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  return {
    nickname,
    setNickname,
    errors,
    validateNickname,
  }
}
