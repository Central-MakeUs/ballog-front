import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '@/test/QueryWrapper'

import NickNamePage from '../ui/NickNamePage'

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({
    push: vi.fn(),
  }),
}))

describe('NickNamePage', () => {
  it('should render', () => {
    render(<NickNamePage params={{ selectedTeam: null }} />)
  })

  it('중복된 닉네임 "김영천" 입력 시 에러 메시지가 표시된다.', async () => {
    // Given
    const user = userEvent.setup()
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
        timeout: 5000,
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
})
