import { AppScreen } from '@stackflow/plugin-basic-ui'
import { KebobMenu } from '@ballog/asset/icons'

import { BackArrow } from '@/assets/BackArrow'

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
      <div className="flex items-center justify-center w-full h-full px-4 bg-usage-background-default">
        <p className="body-md-medium text-usage-text-subtle">
          친구 상세 페이지가 여기에 표시됩니다.
        </p>
      </div>
    </AppScreen>
  )
}

export default FriendDetailPage
