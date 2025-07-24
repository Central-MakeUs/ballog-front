import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '@/test/QueryWrapper'
import LoginPage from '@/pages/auth/ui/LoginPage'

// stackflow 의 라우터 mocking
const mockPush = vi.fn()

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({ push: mockPush }),
}))

describe('LoginPage', () => {
  it('카카오 버튼이 렌더링된다.', () => {
    render(<LoginPage params={{}} />)

    const kakaoButton = screen.getByRole('button', { name: /카카오/i })
    expect(kakaoButton).toBeInTheDocument()
  })

  it('카카오 버튼 클릭 시 라우팅이 발생한다.', async () => {
    const user = userEvent.setup()
    render(<LoginPage params={{}} />)

    const kakaoButton = screen.getByRole('button', {
      name: /카카오/i,
    })

    await user.click(kakaoButton)

    it.skip('카카오 로그인 실패 시 에러 메시지를 보여준다', async () => {
      // Given: 카카오 로그인 실패를 가정한 mock
      // (아직 login 함수가 없거나 실패 로직이 미구현일 수 있으므로 skip 처리)

      // vi.mock('@/shared/lib/kakaoBridge', () => ({
      //   login: () => Promise.reject(new Error('로그인 실패')),
      // }))

      // When
      render(<LoginPage params={{}} />)
      await user.click(screen.getByRole('button', { name: /카카오/i }))

      // Then
      // expect(await screen.findByText('로그인에 실패했습니다')).toBeInTheDocument()
    })

    expect(mockPush).toHaveBeenCalledWith('TeamSelect', { selectedTeam: null })
  })
})
