import { http, HttpResponse } from 'msw'

import type {
  SignupRequestDTO,
  SignupResponseDTO,
} from '@/entities/auth/model/auth.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { auth } from '@/mocks/data/auth'

const AUTH_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth`

export const authHandlers = [
  http.post<never, SignupRequestDTO, ApiErrorMessage | SignupResponseDTO>(
    `${AUTH_API_PREFIX}/signup`,
    async ({ request }) => {
      const { baseballTeam, nickname } = await request.json()

      // 존재하는 닉네임 목록
      const existingNicknames = auth.signup.existingNicknames

      // 네트워크 지연 효과 추가
      await new Promise((resolve) => setTimeout(resolve, auth.signup.delay))

      if (!baseballTeam || !nickname) {
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
          statusCode: 200,
          message: 'Success',
          success: '회원가입이 완료되었습니다.',
        },
        { status: 200 },
      )
    },
  ),
]
