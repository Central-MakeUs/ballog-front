interface OnBoardSlideProps {
  image: string
  title: string
  subTitle: string
}

export const OnBoardSlide = ({ image, title, subTitle }: OnBoardSlideProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full px-6 flex items-center mb-6">
        <img src={image} className="w-full h-auto object-contain" />
      </div>

      <div className="px-6">
        <h2 className="body-lg-bold mb-2.5">{title}</h2>

        <p className="mt-2 text-sm text-brand-neutral-30 whitespace-pre-line">
          {subTitle}
        </p>
      </div>
    </div>
  )
}
