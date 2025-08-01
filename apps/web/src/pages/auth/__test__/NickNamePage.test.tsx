import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '@/test/QueryWrapper'
import { authPost, authGet } from '@/entities/auth'
import NickNamePage from '@/pages/auth/ui/NickNamePage'
import type {
  SignupResponseDTO,
  UserResponseDTO,
} from '@/entities/auth/model/auth.type'
import type { UserType } from '@/entities/auth/model/auth.type'

const mockSetUser = vi.fn()

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/entities/auth/api', () => ({
  authPost: {
    signup: vi.fn(),
  },
  authGet: {
    getUser: vi.fn(),
  },
}))

vi.mock('@/shared/contexts/sessionContext', async () => {
  const actual = await vi.importActual<
    typeof import('@/shared/contexts/sessionContext')
  >('@/shared/contexts/sessionContext')

  return {
    ...actual,
    useSessionContext: () => ({
      setUser: mockSetUser,
    }),
  }
})

describe.skip('NickNamePage', () => {
  it('should render', () => {
    render(<NickNamePage params={{ selectedTeam: null }} />)
  })

  it('중복된 닉네임 "김영천" 입력 시 에러 메시지가 표시된다.', async () => {
    // Given
    const user = userEvent.setup()

    vi.mocked(authPost.signup).mockRejectedValueOnce({
      errorData: {
        error: '이미 사용 중인 닉네임입니다.',
      },
    })

    render(<NickNamePage params={{ selectedTeam: 'DOOSAN_BEARS' }} />)

    const input = screen.getByPlaceholderText('닉네임')

    // When - input에 김영천 입력 후 완료 버튼 클릭
    await user.type(input, '김영천')
    await user.click(screen.getByRole('button', { name: '완료' }))

    // Then - 그러면 msw에서 설정한 중복된 닉네임이니, 에러 메시지가 표시된다.
    await waitFor(
      () => {
        expect(
          screen.getByText('이미 사용 중인 닉네임입니다.'),
        ).toBeInTheDocument()
      },
      {
        timeout: 7000,
      },
    )
  })

  it('에러가 없다면 닉네임 입력 후 완료 버튼을 누르면 닉네임 저장 요청이 발생한다.', async () => {
    // Given
    render(<NickNamePage params={{ selectedTeam: 'DOOSAN_BEARS' }} />)

    const input = screen.getByPlaceholderText('닉네임')
    const submitButton = screen.getByRole('button', { name: '완료' })
    const user = userEvent.setup()

    // When - input에 유효한닉네임임 입력 후 완료 버튼 클릭
    await user.type(input, '유효한닉네임임')
    await user.click(submitButton)

    // Then - 그러면 홈 페이지로 이동한다.
    await waitFor(
      () => {
        expect(window.location.pathname).toBe('/')
      },
      { timeout: 5000 },
    )
  })

  it('회원가입 성공 시 getUser로 사용자 정보를 받아 setUser에 저장한다', async () => {
    const user = userEvent.setup()

    // Given: signup API, getUser API mock
    const mockUserData: UserType = {
      userId: 1,
      email: 'test@example.com',
      nickname: '유효한닉네임임',
      baseballTeam: 'DOOSAN_BEARS',
      isNewUser: true,
      role: 'USER',
    }

    const mockSignupResponse: SignupResponseDTO = {
      success: '회원 정보 조회 성공',
      status: 200,
      message: '성공',
      data: 'signup successful',
    }

    const mockUserResponse: UserResponseDTO = {
      message: 'success',
      status: 200,
      success: '회원 정보 조회 성공',
      data: mockUserData,
    } as UserResponseDTO

    vi.mocked(authPost.signup).mockResolvedValueOnce(mockSignupResponse)
    vi.mocked(authGet.getUser).mockResolvedValueOnce(mockUserResponse)

    render(<NickNamePage params={{ selectedTeam: 'DOOSAN_BEARS' }} />)

    const input = screen.getByPlaceholderText('닉네임')
    const submitButton = screen.getByRole('button', { name: '완료' })

    await user.type(input, '유효한닉네임임')
    await user.click(submitButton)

    // Then: getUser → setUser 호출 확인
    await waitFor(() => {
      expect(authGet.getUser).toHaveBeenCalled()
      expect(mockSetUser).toHaveBeenCalledWith(mockUserData)
    })
  })
})
