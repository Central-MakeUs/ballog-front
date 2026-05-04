import { useState } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { AngryEmotionCharacter, KebobMenu } from '@ballog/asset/icons'
import { toast } from 'sonner'
import { EmptyState } from '@ballog/asset/icons'

import { BackArrow } from '@/assets/BackArrow'

import { FriendPhotoBottomSheet } from './FriendPhotoBottomSheet'
import { ReportBottomSheet } from './ReportBottomSheet'

const FRIEND_GALLERY_IMAGE = '/mockImg.png'

const FRIEND_GALLERY_PHOTOS = Array.from({ length: 9 }, (_, index) => ({
  id: `friend-gallery-photo-${index + 1}`,
  src: FRIEND_GALLERY_IMAGE,
}))

const FriendDetailEmptyState = () => {
  return (
    <section className="flex flex-col items-center w-full gap-4 px-4 py-20">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex flex-col items-center justify-center w-full pt-2 text-center">
          <p className="body-lg-bold text-usage-text-default">
            아직 기록한 경기가 없어요
          </p>
          <p className="body-sm-light text-brand-neutral-80">
            오늘 경기부터 감정을 남겨보세요.
          </p>
        </div>
        <EmptyState width={83} height={114} className="my-2" />
      </div>

      <button
        type="button"
        className="flex items-center justify-center h-10 px-3 rounded-large bg-brand-secondary-default body-md-medium text-brand-neutral-white"
        onClick={() => toast('준비중입니다.')}
      >
        오늘 경기 보기
      </button>
    </section>
  )
}

export const FriendDetailPage = () => {
  const [hasRecordedGames] = useState(() => Math.random() >= 0.5)
  const [selectedPhotoSrc, setSelectedPhotoSrc] = useState<string | null>(null)
  const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useState(false)

  return (
    <AppScreen
      appBar={{
        backgroundColor: 'var(--color-usage-appbar-default)',
        backButton: {
          renderIcon: () => (
            <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
          ),
        },
        renderRight: () => (
          <button
            type="button"
            aria-label="더보기"
            className="flex items-center justify-center size-12"
            onClick={() => {
              setIsReportBottomSheetOpen(true)
            }}
          >
            <KebobMenu className="text-white size-6 light:text-brand-neutral-60" />
          </button>
        ),
        height: '48px',
      }}
      preventSwipeBack={true}
    >
      <div className="flex flex-col w-full h-full light:bg-brand-neutral-10">
        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          <main className="flex flex-col pb-8">
            <section className="flex items-center gap-4 px-4 pt-6">
              <div className="flex items-center justify-center px-2 py-4 shrink-0">
                <AngryEmotionCharacter className="size-22" />
              </div>

              <div className="flex flex-col items-start flex-1 min-w-0 gap-2">
                <div className="flex flex-col items-start">
                  <p className="text-brand-neutral-40 body-md-medium light:text-brand-neutral-80">
                    롯데 자이언츠
                  </p>
                  <h1 className="text-white heading-md-bold light:text-brand-neutral-black">
                    볼로그님
                  </h1>
                </div>

                <div className="px-2 py-1 rounded-full bg-brand-red-subtle">
                  <span className="body-sm-bold text-brand-red-default">
                    화나요 70%
                  </span>
                </div>
              </div>
            </section>

            {hasRecordedGames ? (
              <section className="px-4 pt-8">
                <div className="grid grid-cols-3 gap-2.5">
                  {FRIEND_GALLERY_PHOTOS.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      aria-label="사진 자세히 보기"
                      className="relative h-[174px] overflow-hidden rounded-large bg-brand-neutral-white"
                      onClick={() => {
                        setSelectedPhotoSrc(photo.src)
                      }}
                    >
                      <img
                        src={photo.src}
                        alt=""
                        className="absolute left-[-77.71%] top-[-53.95%] h-[157.54%] w-[255.41%] max-w-none"
                      />
                    </button>
                  ))}
                </div>
              </section>
            ) : (
              <FriendDetailEmptyState />
            )}
          </main>
        </div>
      </div>
      <FriendPhotoBottomSheet
        open={selectedPhotoSrc !== null}
        photoSrc={selectedPhotoSrc}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPhotoSrc(null)
          }
        }}
      />
      <ReportBottomSheet
        open={isReportBottomSheetOpen}
        onOpenChange={setIsReportBottomSheetOpen}
      />
    </AppScreen>
  )
}

export default FriendDetailPage
