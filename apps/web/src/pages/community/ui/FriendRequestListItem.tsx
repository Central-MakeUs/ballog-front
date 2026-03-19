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
      <div className="flex min-w-0 flex-1 items-center gap-4 pr-3">
        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-neutral-black bg-brand-neutral-white">
          <AngryEmotionNoShadow className="size-8" />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-1">
          <p className="body-md-bold truncate text-usage-text-default">{name}</p>
          <div className="rounded-full bg-brand-red-subtle px-3 py-1">
            <span className="body-sm-bold text-brand-red-default">
              {emotionLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-20 px-4"
          onClick={onRequest}
        >
          친구요청
        </Button>
        <button
          type="button"
          aria-label={`${name} 추천 숨기기`}
          className="flex size-7 items-center justify-center body-md-medium text-usage-text-default"
          onClick={onDismiss}
        >
          X
        </button>
      </div>
    </article>
  )
}

export default FriendRequestListItem
