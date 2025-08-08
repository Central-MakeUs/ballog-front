import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'

import {
  ImageContextRender,
  EmptyImageContextRender,
} from '@/test/ImageContextWrapper'

import { ImageTimeLine } from '../ui/ImageTimeLine'

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe('ImageTimeLine', () => {
  it('should render', () => {
    ImageContextRender(<ImageTimeLine matchRecordId={1} />)
  })

  it('전달받은 images를 Image 컴포넌트로 렌더링한다.', () => {
    ImageContextRender(<ImageTimeLine matchRecordId={1} />)

    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('만약 images가 없으면 Empty 컴포넌트가 렌더링된다.', () => {
    EmptyImageContextRender(<ImageTimeLine matchRecordId={1} />) // ← 빈 배열로 테스트

    expect(
      screen.getByRole('heading', { level: 3, name: '등록된 사진이 없어요!' }),
    ).toBeInTheDocument()
  })
})
