import { http, HttpResponse, delay } from 'msw'

import { user } from '@/mocks/data/user'
import { mockAlert } from '@/mocks/data/alert'
import type { SignupRequestDTO } from '@/entities/auth/model/auth.type'
import type {
  Alert,
  AlertResponseDTO,
} from '@/entities/mypage/model/alert.type'

const ME_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/mypage`

export const userHandlers = [
  http.get(`${ME_API_PREFIX}/user`, async () => {
    await delay(user.delay)

    return HttpResponse.json({
      message: 'Success',
      status: 200,
      data: user.data,
    })
  }),

  http.patch<never, SignupRequestDTO>(
    `${ME_API_PREFIX}/user`,
    async ({ request }) => {
      const { nickname, baseballTeam } = await request.json()

      if (!nickname || !baseballTeam) {
        return HttpResponse.json(
          {
            message: 'fail',
            status: 400,
            success: '닉네임 또는 팀 누락',
            data: null,
          },
          { status: 400 },
        )
      }

      return HttpResponse.json({
        message: 'success',
        status: 200,
        success: '요청 성공',
        data: '회원 정보 수정 완료',
      })
    },
  ),

  http.get(`${ME_API_PREFIX}/alert`, async () => {
    await delay(100)

    return HttpResponse.json({
      message: 'Success',
      status: 200,
      data: mockAlert.data,
    })
  }),

  http.patch<never, Alert>(`${ME_API_PREFIX}/alert`, async ({ request }) => {
    const body = await request.json()

    const { startAlert, inGameAlert } = body

    mockAlert.data = {
      startAlert:
        typeof startAlert === 'boolean'
          ? startAlert
          : mockAlert.data.startAlert,
      inGameAlert:
        typeof inGameAlert === 'boolean'
          ? inGameAlert
          : mockAlert.data.inGameAlert,
    }

    const response: AlertResponseDTO = {
      message: 'Success',
      status: 200,
      success: '알림 설정 성공',
      data: mockAlert.data,
    }

    return HttpResponse.json(response)
  }),
]
