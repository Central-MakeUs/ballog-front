import { useState } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { AngryEmotionCharacter, KebobMenu } from '@ballog/asset/icons'

import { BackArrow } from '@/assets/BackArrow'

import { FriendPhotoBottomSheet } from './FriendPhotoBottomSheet'

const FRIEND_GALLERY_IMAGE =
  'https://www.figma.com/api/mcp/asset/51183d4e-e8cf-4582-a42f-6981d41a49ba'
const EMPTY_SHADOW_IMAGE =
  'https://www.figma.com/api/mcp/asset/06502ef9-c6b5-41b6-81c2-edffd17bf4fc'
const EMPTY_BALL_IMAGE =
  'https://www.figma.com/api/mcp/asset/cd0141bf-6ba8-4305-8f1b-27adf0c076a3'
const EMPTY_BALL_MASK_IMAGE =
  'https://www.figma.com/api/mcp/asset/14018a82-cfd0-4c2c-a0c7-ec23e0a6c8be'
const EMPTY_BALL_TEXTURE_IMAGE =
  'https://www.figma.com/api/mcp/asset/5524e6ea-5e04-4ef9-ba86-e3b14154bbef'
const EMPTY_BUBBLE_IMAGE =
  'https://www.figma.com/api/mcp/asset/6f5644ba-f7c4-44ba-a90f-faaefe56d8cc'
const EMPTY_EXCLAMATION_IMAGE =
  'https://www.figma.com/api/mcp/asset/288fd3ad-0174-4d4e-82e3-6954f40ccf52'

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

        <div className="flex items-center justify-center w-full py-2">
          <div className="relative h-[114px] w-[83px]">
            <img
              alt=""
              aria-hidden="true"
              src={EMPTY_SHADOW_IMAGE}
              className="absolute bottom-0 left-0 h-7 w-[83px]"
            />
            <div className="absolute left-[17px] top-[52px] h-[54px] w-[49px]">
              <img
                alt=""
                aria-hidden="true"
                src={EMPTY_BALL_IMAGE}
                className="absolute top-0 left-0 size-12"
              />
              <div
                className="absolute -left-[0.5px] -top-1 h-[53.401px] w-[48.971px]"
                style={{
                  WebkitMaskImage: `url('${EMPTY_BALL_MASK_IMAGE}')`,
                  WebkitMaskPosition: '0.491px 4.017px',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: '47.995px 47.995px',
                  maskImage: `url('${EMPTY_BALL_MASK_IMAGE}')`,
                  maskPosition: '0.491px 4.017px',
                  maskRepeat: 'no-repeat',
                  maskSize: '47.995px 47.995px',
                }}
              >
                <img
                  alt=""
                  aria-hidden="true"
                  src={EMPTY_BALL_TEXTURE_IMAGE}
                  className="size-full"
                />
              </div>
            </div>
            <img
              alt=""
              aria-hidden="true"
              src={EMPTY_BUBBLE_IMAGE}
              className="absolute left-[24.64px] top-0 h-[40.913px] w-[37.215px]"
            />
            <img
              alt=""
              aria-hidden="true"
              src={EMPTY_EXCLAMATION_IMAGE}
              className="absolute left-[40.61px] top-[6.8px] h-[21.194px] w-[5.227px]"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center justify-center h-10 px-3 rounded-large bg-brand-secondary-default body-md-medium text-brand-neutral-white"
        onClick={() => {}}
      >
        오늘 경기 보기
      </button>
    </section>
  )
}

export const FriendDetailPage = () => {
  const [hasRecordedGames] = useState(() => Math.random() >= 0.5)
  const [selectedPhotoSrc, setSelectedPhotoSrc] = useState<string | null>(null)

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
            onClick={() => {}}
          >
            <KebobMenu className="text-white size-6 light:text-brand-neutral-60" />
          </button>
        ),
        height: '48px',
      }}
      preventSwipeBack={true}
    >
      <div className="flex flex-col w-full h-full light:bg-brand-neutral-10">
        <div className="flex-1 overflow-y-auto">
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
    </AppScreen>
  )
}

export default FriendDetailPage
