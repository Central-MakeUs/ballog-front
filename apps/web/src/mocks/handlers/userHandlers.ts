import { http, HttpResponse, delay } from 'msw'

import { user } from '@/mocks/data/user'
import type { SignupRequestDTO } from '@/entities/auth/model/auth.type'

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
]
