import { AppScreen } from '@stackflow/plugin-basic-ui'
import { AngryEmotion, KebobMenu } from '@ballog/asset/icons'

import { BackArrow } from '@/assets/BackArrow'

const FRIEND_GALLERY_IMAGE =
  'https://www.figma.com/api/mcp/asset/51183d4e-e8cf-4582-a42f-6981d41a49ba'

const FRIEND_GALLERY_PHOTOS = Array.from({ length: 9 }, (_, index) => ({
  id: `friend-gallery-photo-${index + 1}`,
  src: FRIEND_GALLERY_IMAGE,
}))

export const FriendDetailPage = () => {
  return (
    <AppScreen
      appBar={{
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
                <AngryEmotion className="size-22" />
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

            <section className="px-4 pt-8">
              <div className="grid grid-cols-3 gap-2.5">
                {FRIEND_GALLERY_PHOTOS.map((photo) => (
                  <article
                    key={photo.id}
                    className="relative h-[174px] overflow-hidden rounded-large bg-brand-neutral-white"
                  >
                    <img
                      src={photo.src}
                      alt=""
                      className="absolute left-[-77.71%] top-[-53.95%] h-[157.54%] w-[255.41%] max-w-none"
                    />
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </AppScreen>
  )
}

export default FriendDetailPage
