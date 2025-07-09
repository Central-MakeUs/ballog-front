import ky from 'ky'
import type { KyHttpError, ExtendedKyHttpError } from '@/types/api/common'

// 에러 인터셉터
// 에러 body 가 json 인 경우 에러 메시지 추출
const errorInterceptor = async (
  error: KyHttpError,
): Promise<ExtendedKyHttpError> => {
  const responseData = await error.response.json()
  return {
    ...error,
    errorData: responseData,
  }
}

// ky instance 생성
export const api = ky.create({
  prefixUrl: (import.meta.env.VITE_PUBLIC_API_URL || '') + 'api/v1',
  timeout: 10000,
  retry: 2,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 추가
  },
  hooks: {
    afterResponse: [
      async (_, __, response) => {
        // 리프레시 토큰 처리 로직 필요
        if (response.status === 401) {
          window.location.href = '/login'
        }
        return response
      },
    ],
    beforeError: [errorInterceptor],
  },
})
