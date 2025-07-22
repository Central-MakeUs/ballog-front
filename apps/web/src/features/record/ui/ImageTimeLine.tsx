import type { Image } from '@/entities/record/model/record.type'

export const ImageTimeLine = ({ images }: { images: Image[] }) => {
  if (images.length === 0) {
    return (
      <div>
        <h3>등록된 사진이 없어요!</h3>
      </div>
    )
  }

  return (
    <div>
      {images.map((image) => (
        <img key={image.imageUrl} src={image.imageUrl} alt="image" />
      ))}
    </div>
  )
}
