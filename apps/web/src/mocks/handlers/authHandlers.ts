import { http, HttpResponse, delay } from 'msw'

import type {
  SignupRequestDTO,
  SignupResponseDTO,
  SocialLoginResponseDTO,
  LogoutResponseDTO,
} from '@/entities/auth/model/auth.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { auth } from '@/mocks/data/auth'

const AUTH_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth`

export const authHandlers = [
  http.post<never, SignupRequestDTO, ApiErrorMessage | SignupResponseDTO>(
    `${AUTH_API_PREFIX}/signup`,
    async ({ request }) => {
      const { baseballTeam, nickname } = await request.json()
      const accessToken = request.headers.get('Authorization')

      // 존재하는 닉네임 목록
      const existingNicknames = auth.signup.existingNicknames

      // 네트워크 지연 효과 추가
      await new Promise((resolve) => setTimeout(resolve, auth.signup.delay))

      if (!baseballTeam || !nickname || !accessToken) {
        return HttpResponse.json<ApiErrorMessage>(
          {
            error: '필수 정보가 누락되었습니다.',
            message: 'fail',
            status: 400,
            code: 'INVALID_INPUT',
          },
          { status: 400 },
        )
      }

      if (nickname.length < 2 || nickname.length > 10) {
        return HttpResponse.json<ApiErrorMessage>(
          {
            error: '닉네임은 2자 이상 10자 이하여야 합니다.',
            message: 'fail',
            status: 400,
            code: 'INVALID_INPUT',
          },
          { status: 400 },
        )
      }

      if (existingNicknames.includes(nickname)) {
        return HttpResponse.json<ApiErrorMessage>(
          {
            error: '이미 사용 중인 닉네임입니다.',
            message: 'fail',
            status: 409,
            code: 'DUPLICATE_NICKNAME',
          },
          { status: 409 },
        )
      }

      return HttpResponse.json<SignupResponseDTO>(
        {
          data: '회원가입이 완료되었습니다.',
          status: 200,
          message: 'Success',
          success: '회원가입이 완료되었습니다.',
        },
        { status: 200 },
      )
    },
  ),
  http.post<never, never, ApiErrorMessage | SocialLoginResponseDTO>(
    `${AUTH_API_PREFIX}/login/kakao`,
    ({ request }) => {
      const Authorization = request.headers.get('Authorization')
      const XRefreshToken = request.headers.get('X-Refresh-Token')

      if (!Authorization || !XRefreshToken) {
        return HttpResponse.json<ApiErrorMessage>(
          {
            error: 'Authorization 헤더가 누락되었습니다.',
            message: 'fail',
            status: 401,
            code: 'INVALID_INPUT',
          },
          { status: 401 },
        )
      }

      delay(3000)

      return HttpResponse.json<SocialLoginResponseDTO>(
        {
          message: 'success',
          status: 200,
          success: '회원가입 성공',
          data: {
            accessToken:
              'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzUxNjExNDE2fQ.oW_1TxkcKF6Qm_N2AOgvs0ngZibmkGz5e2IXd66Y2iU',
            refreshToken:
              'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJ1c2VySWQiOjEsImlhdCI6MTc1MTUyNTAxNiwiZXhwIjoxNzUyMTI5ODE2fQ.B9k7zOgL0Gw8AZ9QuLLm9Sneww8xTrtC8CKdJW9-hRA',
          },
        },
        { status: 200 },
      )
    },
  ),
  http.post<never, never, ApiErrorMessage | LogoutResponseDTO>(
    `${AUTH_API_PREFIX}/logout`,
    ({ request }) => {
      const Authorization = request.headers.get('Authorization')

      if (!Authorization) {
        return HttpResponse.json<ApiErrorMessage>(
          {
            error: 'Authorization 헤더가 누락되었습니다.',
            message: 'fail',
            status: 401,
            code: 'INVALID_INPUT',
          },
          { status: 401 },
        )
      }

      delay(3000)

      return HttpResponse.json<LogoutResponseDTO>(
        {
          message: 'success',
          status: 200,
          success: '로그아웃 성공',
          data: '로그아웃 성공',
        },
        { status: 200 },
      )
    },
  ),
]
