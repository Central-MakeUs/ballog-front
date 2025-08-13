import type React from 'react'

interface OnBoardSlideProps {
  image: React.ReactNode
  title: string
  subTitle: string
}

export const OnBoardSlide = ({ image, title, subTitle }: OnBoardSlideProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full px-6 flex items-center mb-6">{image}</div>

      <div className="px-6">
        <h2 className="body-lg-bold mb-2.5">{title}</h2>

        <p className="mt-2 text-sm text-brand-neutral-30 whitespace-pre-line">
          {subTitle}
        </p>
      </div>
    </div>
  )
}
