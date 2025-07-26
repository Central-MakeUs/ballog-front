import React from 'react'

import { ImageContextProvider } from '@/features/record/hooks'

import { render } from './QueryWrapper'

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

// 이미지가 있는 경우의 Wrapper
export const ImageContextWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ImageContextProvider initialImages={images}>
      {children}
    </ImageContextProvider>
  )
}

// 이미지가 없는 경우의 Wrapper
export const EmptyImageContextWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ImageContextProvider initialImages={[]}>{children}</ImageContextProvider>
  )
}

export const ImageContextRender = (ui: React.ReactNode) =>
  render(ui, { wrapper: ImageContextWrapper })

export const EmptyImageContextRender = (ui: React.ReactNode) =>
  render(ui, { wrapper: EmptyImageContextWrapper })
