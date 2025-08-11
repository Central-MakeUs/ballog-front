import { http, HttpResponse, delay } from 'msw'

import { user } from '@/mocks/data/user'
import { mockAlert } from '@/mocks/data/alert'
import type {
  SignupRequestDTO,
  UserResponseDTO,
  ChangeNicknameRequestDTO,
  ChangeTeamRequestDTO,
} from '@/entities/auth/model/auth.type'
import type {
  Alert,
  AlertResponseDTO,
} from '@/entities/mypage/model/alert.type'
import type { ApiErrorMessage } from '@/types/api/common'

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

  http.patch<
    never,
    ChangeNicknameRequestDTO | ChangeTeamRequestDTO,
    UserResponseDTO | ApiErrorMessage
  >(`${ME_API_PREFIX}/user`, async ({ request }) => {
    const body = (await request.json()) as Partial<
      ChangeNicknameRequestDTO & ChangeTeamRequestDTO
    >
    const { nickname, baseballTeam } = body

    // 들어온 필드만 선택적으로 업데이트
    if (nickname !== undefined) user.data.nickname = nickname
    if (baseballTeam !== undefined) user.data.baseballTeam = baseballTeam

    // 딜레이가 필요하면 추가
    // await new Promise((r) => setTimeout(r, 300))

    const res: UserResponseDTO = {
      message: 'success',
      status: 200,
      data: {
        userId: user.data.userId,
        email: user.data.email,
        nickname: user.data.nickname,
        baseballTeam: user.data.baseballTeam,
        isNewUser: false,
        role: 'USER',
      },
    }

    return HttpResponse.json(res, { status: 200 })
  }),

  http.get(`${ME_API_PREFIX}/alert`, async () => {
    await delay(100)

    return HttpResponse.json({
      message: 'Success',
      status: 200,
      data: mockAlert.data,
    })
  }),

  http.patch<never, Alert>(`${ME_API_PREFIX}/alertㅅ`, async ({ request }) => {
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
