import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'

import { FriendRequestNotice } from './FriendRequestNotice'

export const AlermPage = () => {
  return (
    <AppScreen
      appBar={{
        title: (
          <span className="text-usage-text-default body-md-bold">알림함</span>
        ),
        backButton: {
          renderIcon: () => (
            <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
          ),
        },
        height: '48px',
      }}
    >
      <div className="flex flex-col w-full px-4">
        <FriendRequestNotice />
      </div>
    </AppScreen>
  )
}

export default AlermPage
