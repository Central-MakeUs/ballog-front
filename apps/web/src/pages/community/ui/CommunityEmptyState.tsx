import { ComunityEmpty } from '@ballog/asset/icons'

import { Button } from '@/shared/ui/common'

interface CommunityEmptyStateProps {
  onExploreFriends: () => void
}

export const CommunityEmptyState = ({
  onExploreFriends,
}: CommunityEmptyStateProps) => {
  return (
    <section className="flex flex-col items-center w-full gap-4 px-4 py-20">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex flex-col items-center justify-center w-full pt-2 text-center">
          <p className="body-lg-bold text-usage-text-default">
            아직 등록된 친구가 없어요.
          </p>
          <p className="body-sm-light text-brand-neutral-80">
            친구를 찾아 추가해 보세요.
          </p>
        </div>

        <div className="flex items-center justify-center w-full py-2">
          <ComunityEmpty className="w-[83px] h-[114px]" />
        </div>
      </div>

      <Button
        state={'default'}
        size={'default'}
        onClick={onExploreFriends}
        className="flex items-center justify-center h-10 px-3 rounded-large bg-brand-neutral-80 body-md-medium text-brand-neutral-white"
      >
        친구 추가하기
      </Button>
    </section>
  )
}

export default CommunityEmptyState
