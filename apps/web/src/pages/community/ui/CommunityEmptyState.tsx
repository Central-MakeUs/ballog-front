import { ComunityEmpty } from '@ballog/asset/icons'

interface CommunityEmptyStateProps {
  onExploreFriends: () => void
}

export const CommunityEmptyState = ({
  onExploreFriends,
}: CommunityEmptyStateProps) => {
  return (
    <section className="flex w-full flex-col items-center gap-4 px-4 py-20">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center justify-center pt-2 text-center">
          <p className="body-lg-bold text-usage-text-default">
            아직 등록된 친구가 없어요.
          </p>
          <p className="body-sm-light text-brand-neutral-80">
            친구를 찾아 추가해 보세요.
          </p>
        </div>

        <div className="flex w-full items-center justify-center py-2">
          <ComunityEmpty className="w-[83px] h-[114px]" />
        </div>
      </div>

      <button
        type="button"
        onClick={onExploreFriends}
        className="flex h-10 items-center justify-center rounded-large bg-brand-secondary-default px-3 body-md-medium text-brand-neutral-white"
      >
        친구 추가하기
      </button>
    </section>
  )
}

export default CommunityEmptyState
