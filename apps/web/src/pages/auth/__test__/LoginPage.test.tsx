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

    expect(mockPush).toHaveBeenCalledWith('TeamSelect')
  })
})
