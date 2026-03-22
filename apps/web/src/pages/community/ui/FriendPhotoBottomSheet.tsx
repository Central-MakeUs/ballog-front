import { useEffect, useState } from 'react'
import { BottomSheet } from '@stackflow/plugin-basic-ui'
import { AngryEmotionCharacter } from '@ballog/asset/icons'
import { toast } from 'sonner'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import { cn } from '@/shared/lib/classnames'

interface FriendPhotoBottomSheetProps {
  open: boolean
  photoSrc: string | null
  onOpenChange: (open: boolean) => void
}

const PHOTO_REACTIONS = ['😂', '🔥', '🥲', '😍'] as const

export const FriendPhotoBottomSheet = ({
  open,
  photoSrc,
  onOpenChange,
}: FriendPhotoBottomSheetProps) => {
  const [activeReaction, setActiveReaction] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setActiveReaction(null)
    }
  }, [open, photoSrc])

  if (!open || !photoSrc) return null

  return (
    <div className="fixed inset-0 z-[80]">
      <BottomSheet
        onOutsideClick={(event) => {
          event.preventDefault()
          onOpenChange(false)
        }}
      >
        <BottomSheetModal.Root
          open={open}
          onOpenChange={onOpenChange}
          contentClassName="gap-4 rounded-t-[16px] light:bg-brand-neutral-white px-4 pt-4 pb-10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-1 rounded-full bg-brand-neutral-30" />

            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center flex-1 min-w-0 gap-4">
                <AngryEmotionCharacter className="size-12 shrink-0" />

                <div className="flex flex-col items-start min-w-0">
                  <p className="text-white body-md-bold light:text-brand-neutral-black">
                    Ballog
                  </p>
                  <p className="body-sm-medium text-brand-neutral-70">
                    2026년 1월 5일
                  </p>
                </div>
              </div>

              <div className="px-2 py-1 rounded-full shrink-0 bg-brand-red-subtle">
                <span className="body-sm-bold text-brand-red-default">
                  화나요 70%
                </span>
              </div>
            </div>

            <div className="relative aspect-[300/400] w-full overflow-hidden rounded-medium bg-brand-neutral-80">
              <img
                src={photoSrc}
                alt=""
                className="absolute left-[-77.71%] top-[-53.95%] h-[157.54%] w-[255.41%] max-w-none"
              />
            </div>

            <div className="flex items-start justify-center w-full gap-6">
              {PHOTO_REACTIONS.map((reaction) => (
                <button
                  key={reaction}
                  type="button"
                  className={cn(
                    'flex size-14 items-center justify-center rounded-large border light:bg-brand-neutral-white',
                    activeReaction === reaction
                      ? 'border-brand-primary-default bg-brand-primary-subtle'
                      : 'light:border-brand-neutral-30',
                  )}
                  onClick={() => {
                    setActiveReaction(reaction)
                    toast('반응 보내기 완료!', {
                      id: 'friend-photo-reaction',
                    })
                  }}
                >
                  <span className="text-[32px] leading-none">{reaction}</span>
                </button>
              ))}
            </div>
          </div>
        </BottomSheetModal.Root>
      </BottomSheet>
    </div>
  )
}

export default FriendPhotoBottomSheet
