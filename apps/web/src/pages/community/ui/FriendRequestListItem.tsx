import { AngryEmotionNoShadow } from '@ballog/asset/icons'

import { Button } from '@/shared/ui/common/Button'

export interface FriendRequestRecommendation {
  id: string
  name: string
  emotionLabel: string
}

interface FriendRequestListItemProps extends FriendRequestRecommendation {
  onDismiss: () => void
  onRequest: () => void
}

export const FriendRequestListItem = ({
  name,
  emotionLabel,
  onDismiss,
  onRequest,
}: FriendRequestListItemProps) => {
  return (
    <article className="flex items-center justify-between py-2.5">
      <div className="flex items-center flex-1 min-w-0 gap-4 pr-3">
        <div className="flex items-center justify-center overflow-hidden border rounded-full size-11 shrink-0 border-brand-neutral-black bg-brand-neutral-white">
          <AngryEmotionNoShadow className="size-8" />
        </div>

        <div className="flex flex-col items-start min-w-0 gap-1">
          <p className="truncate body-md-bold text-usage-text-default">{name}</p>
          <div className="px-3 py-1 rounded-full bg-brand-red-subtle">
            <span className="body-sm-bold text-brand-red-default">
              {emotionLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-20 px-4 text-brand-neutral-white"
          onClick={onRequest}
        >
          친구요청
        </Button>
        <button
          type="button"
          aria-label={`${name} 추천 숨기기`}
          className="flex items-center justify-center size-7 body-md-medium text-usage-text-default"
          onClick={onDismiss}
        >
          X
        </button>
      </div>
    </article>
  )
}

export default FriendRequestListItem
