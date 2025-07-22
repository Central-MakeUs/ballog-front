import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ImageTimeLine } from '../ui/ImageTimeLine'

describe.skip('ImageTimeLine', () => {
  it('should render', () => {
    render(<ImageTimeLine />)
  })

  it('전달받은 images를 Image 컴포넌트로 렌더링한다.', () => {
    const images = [
      {
        id: 1,
        url: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        url: 'https://via.placeholder.com/150',
      },
    ]
    render(<ImageTimeLine images={images} />)

    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('만약 images가 없으면 Empty 컴포넌트가 렌더링된다.', () => {
    render(<ImageTimeLine images={[]} />)

    expect(
      screen.getByRole('heading', { level: 3, name: '등록된 사진이 없어요!' }),
    ).toBeInTheDocument()
  })
})
