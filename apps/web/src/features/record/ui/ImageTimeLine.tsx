import type { Image } from '@/entities/record/model/record.type'
import { RecordLogCard } from '@/entities/record/ui/RecordLogCard'
import { formatTime } from '@/shared/lib/date'
import { Button, LazyImage } from '@/shared/ui/common'
import { SectionHeader } from '@/shared/ui/common'
import { ScrollArea, ScrollBar } from '@/shared/ui/common/scroll-area'
import { useImagePicker } from '@/shared/hooks/image/useImagePicker'

const ImageItem = ({ image }: { image: Image }) => {
  return (
    <div className="flex-shrink-0 flex flex-col gap-2 w-32">
      <div className="h-50 w-full rounded-lg overflow-hidden">
        <LazyImage
          src={image.imageUrl}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="body-sm-medium text-usage-text-subtle text-center">
        {formatTime(image.createdAt)}
      </div>
    </div>
  )
}

export const ImageTimeLineContent = ({ images }: { images: Image[] }) => {
  if (images.length === 0) {
    return (
      <RecordLogCard.Root className="min-h-50 flex justify-center items-center mx-4">
        <div className="flex flex-col gap-4">
          <div className="body-lg-bold text-brand-neutral-white text-center">
            등록된 사진이 없어요!
          </div>
          <div className="body-sm-light text-usage-text-subtle text-center">
            사진을 추가해
            <br />
            나만의 직관 기록을 완성해보세요.
          </div>
        </div>
      </RecordLogCard.Root>
    )
  }

  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex gap-4 pb-8 px-4">
        {images.map((image) => (
          <ImageItem key={image.imageUrl} image={image} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className=" mx-4" forceMount />
    </ScrollArea>
  )
}

export const ImageTimeLine = ({
  images: initialImages,
}: {
  images: Image[]
}) => {
  const { images, requestImagePick } = useImagePicker({ initialImages })

  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      <SectionHeader
        title="사진 타임라인"
        rightContent={
          <Button variant="secondary" size="sm" onClick={requestImagePick}>
            사진 추가
          </Button>
        }
        className="px-4"
      />
      <div className="pt-4">
        <ImageTimeLineContent images={images} />
      </div>
    </div>
  )
}
