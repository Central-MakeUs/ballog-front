import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '@/test/QueryWrapper'
import LoginPage from '@/pages/auth/ui/LoginPage'

// stackflow 의 라우터 mocking
const mockPush = vi.fn()
const mockReplace = vi.fn()

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({ push: mockPush, replace: mockReplace }),
}))

// authPost API 모킹
const mockKakaoLogin = vi.fn()
const mockAppleLogin = vi.fn()

vi.mock('@/entities/auth/api/auth-post', () => ({
  authPost: {
    kakaoLogin: () => mockKakaoLogin,
    appleLogin: () => mockAppleLogin,
  },
}))

const mockHandleLogin = vi.fn()

vi.mock('@/pages/auth/hooks/useSocialLoginFlow', () => ({
  useSocialLoginFlow: vi.fn(() => ({
    handleLogin: mockHandleLogin,
    isPending: false,
  })),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('카카오 버튼이 렌더링된다.', () => {
    render(<LoginPage params={{}} />)

    const kakaoButton = screen.getByRole('button', { name: /카카오/i })
    expect(kakaoButton).toBeInTheDocument()
  })

  it('카카오 버튼 클릭 시 handleLogin이 호출된다.', async () => {
    const user = userEvent.setup()
    render(<LoginPage params={{}} />)

    const kakaoButton = screen.getByRole('button', {
      name: /카카오/i,
    })

    await user.click(kakaoButton)
    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalled()
    })
  })

  it('애플 버튼이 iOS 환경에서만 렌더링된다.', () => {
    // iOS 환경 모킹
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true,
    })

    render(<LoginPage params={{}} />)

    const appleButton = screen.getByRole('button', { name: /애플/i })
    expect(appleButton).toBeInTheDocument()
  })

  it('애플 버튼이 iOS 환경이 아닐 때 렌더링되지 않는다.', () => {
    // 데스크톱 환경 모킹
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      configurable: true,
    })

    render(<LoginPage params={{}} />)

    const appleButton = screen.queryByRole('button', { name: /애플/i })
    expect(appleButton).not.toBeInTheDocument()
  })
})
