import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/test/QueryWrapper'
import { NickNameForm } from '@/features/auth/ui/NickNameForm'
import { useNickNameForm } from '@/shared/hooks/auth/useNickNameForm'

// useNickNameForm 훅 모킹
vi.mock('@/shared/hooks/auth/useNickNameForm', () => ({
  useNickNameForm: vi.fn(() => ({
    nickname: '',
    setNickname: vi.fn(),
    errors: [],
    validateNickname: vi.fn(() => true),
  })),
}))

describe('NickNameForm', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const mockOnSubmit = vi.fn()

  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false,
    error: null,
  }

  it('닉네임 입력 필드와 완료 버튼이 렌더링된다', () => {
    render(<NickNameForm {...defaultProps} />)

    expect(screen.getByText('닉네임을 입력해주세요.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/닉네임/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument()
  })

  it('닉네임이 비어있으면 완료 버튼이 비활성화된다', () => {
    render(<NickNameForm {...defaultProps} />)

    const button = screen.getByRole('button', { name: '완료' })
    expect(button).toBeDisabled()
  })

  it('로딩 중일 때 버튼 텍스트가 변경되고 비활성화된다', () => {
    render(<NickNameForm {...defaultProps} isLoading={true} />)

    const button = screen.getByRole('button', { name: '처리중...' })
    expect(button).toBeDisabled()
  })

  it('에러가 있을 때 에러 메시지가 표시된다', () => {
    const error = {
      errorData: {
        code: 409,
        error: '이미 사용 중인 닉네임입니다.',
        status: 409,
        message: '이미 사용 중인 닉네임입니다.',
      },
    }

    render(<NickNameForm {...defaultProps} error={error as any} />)

    expect(screen.getByText('이미 사용 중인 닉네임입니다.')).toBeInTheDocument()
  })

  it('닉네임이 있는 상태에서 완료 버튼 클릭 시 onSubmit이 호출된다', () => {
    // useNickNameForm 의 함수를 모킹
    vi.mocked(useNickNameForm).mockImplementation(() => ({
      nickname: 'testNickname',
      setNickname: vi.fn(),
      errors: [],
      validateNickname: vi.fn(() => true),
    }))

    render(<NickNameForm {...defaultProps} />)

    // button의 비활성화 확인
    const button = screen.getByRole('button', { name: '완료' })
    expect(button).not.toBeDisabled()

    // 버튼 클릭
    fireEvent.click(button)

    // onSubmit이 호출되었는지 확인
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith({
      nickname: 'testNickname',
    })
  })
})
