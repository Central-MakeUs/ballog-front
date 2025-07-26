import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ImageContextProvider } from '@/features/record/hooks'

import { ImageTimeLine } from '../ui/ImageTimeLine'

const images = [
  {
    imageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/a5ca9d7f-3514-41b7-9554-cf0de905e48a.png',
    createdAt: '2025-07-13T14:09:51.386663',
  },
  {
    imageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
    createdAt: '2025-07-13T14:09:51.386663',
  },
]

const ImageContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageContextProvider initialImages={images}>
      {children}
    </ImageContextProvider>
  )
}

const customRender = (ui: React.ReactNode) =>
  render(ui, { wrapper: ImageContextWrapper })

describe.skip('ImageTimeLine', () => {
  it('should render', () => {
    customRender(<ImageTimeLine recordId={1} />)
  })

  it('전달받은 images를 Image 컴포넌트로 렌더링한다.', () => {
    customRender(<ImageTimeLine recordId={1} />)

    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('만약 images가 없으면 Empty 컴포넌트가 렌더링된다.', () => {
    customRender(<ImageTimeLine recordId={1} />)

    expect(
      screen.getByRole('heading', { level: 3, name: '등록된 사진이 없어요!' }),
    ).toBeInTheDocument()
  })
})
