import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { NickNameForm } from '@/features/auth/ui/NickNameForm'
import userEvent from '@testing-library/user-event'

describe('NickNameForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('NickNameForm 렌더링', () => {
    render(<NickNameForm onSubmit={mockOnSubmit} error={null} />)
    expect(screen.getByText('닉네임을 입력해주세요.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('닉네임')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '완료' })).toBeDisabled()
  })
  it('NickNameForm input에 닉네임을 입력하면 submit button이 활성화된다.', async () => {
    const user = userEvent.setup()
    // Given
    render(<NickNameForm onSubmit={mockOnSubmit} error={null} />)

    const input = screen.getByPlaceholderText('닉네임')
    const submitButton = screen.getByRole('button', { name: '완료' })

    // When
    expect(submitButton).toBeDisabled()

    await user.type(input, '테스트')

    // Then
    expect(submitButton).toBeEnabled()
  })
  it('submit button을 누르면 onSubmit이 호출된다.', async () => {
    // Given
    const user = userEvent.setup()
    render(<NickNameForm onSubmit={mockOnSubmit} error={null} />)

    const input = screen.getByPlaceholderText('닉네임')
    const submitButton = screen.getByRole('button', { name: '완료' })

    // When
    await user.type(input, '테스트')

    await user.click(submitButton)

    // Then
    expect(mockOnSubmit).toHaveBeenCalledWith({ nickname: '테스트' })
  })
  it('만약 1~10자 사이의 닉네임이 아니라면 ErrorMessage가 표시된다.', async () => {
    // Given
    const user = userEvent.setup()
    render(<NickNameForm onSubmit={mockOnSubmit} error={null} />)

    const input = screen.getByPlaceholderText('닉네임')
    const submitButton = screen.getByRole('button', { name: '완료' })

    // When
    await user.type(input, '12345678901')

    await user.click(submitButton)

    // Then
    await waitFor(() => {
      expect(
        screen.getByText('1자~10자까지 입력 가능합니다.'),
      ).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
  it('특수문자가 들어가면 에러 메세지가 표시된다.', async () => {
    // Given
    const user = userEvent.setup()
    render(<NickNameForm onSubmit={mockOnSubmit} error={null} />)

    const input = screen.getByPlaceholderText('닉네임')
    const submitButton = screen.getByRole('button', { name: '완료' })

    // When
    await user.type(input, '테스트@')

    await user.click(submitButton)

    // Then
    await waitFor(() => {
      expect(
        screen.getByText('한글, 영문, 숫자만 입력 가능합니다.'),
      ).toBeInTheDocument()
    })

    // onSubmit이 호출되지 않아야 함
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
