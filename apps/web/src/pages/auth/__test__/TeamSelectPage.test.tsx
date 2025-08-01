import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '@/test/QueryWrapper'
import TeamSelectPage from '@/pages/auth/ui/TeamSelectPage'

const mockPush = vi.fn()

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({ push: mockPush }),
}))

describe('TeamSelectPage', () => {
  it('팀을 정하면 닉네임 페이지로 이동한다', async () => {
    const user = userEvent.setup()

    render(<TeamSelectPage />)

    // 두산 누른다 가정
    const doosanButton = screen.getByRole('button', { name: /두산 베어스/i })
    await user.click(doosanButton)

    const submitButton = screen.getByRole('button', { name: /시작하기/i })
    await user.click(submitButton)

    expect(mockPush).toHaveBeenCalledWith('Nickname', {
      selectedTeam: 'DOOSAN_BEARS',
    })
  })

  it('팀을 선택하지 않으면 시작하기 버튼이 비활성화 상태여야 한다', () => {
    render(<TeamSelectPage />)

    const submitButton = screen.getByRole('button', { name: /시작하기/i })
    expect(submitButton).toBeDisabled()
  })
})
