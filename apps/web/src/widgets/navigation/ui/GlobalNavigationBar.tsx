import React, { useState } from 'react'

import HomeIcon from '@/assets/home.svg?react'
import { useFlow } from '@/shared/lib/stackflow'
import { cn } from '@/shared/lib/classnames'
import { GNBButton } from '@/shared/ui/common'

type ActivityType = 'Home' | 'LiveRecord' | 'My'

interface NavItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  activity: ActivityType
}
const NAV_ITEMS: NavItem[] = [
  {
    label: '홈',
    icon: HomeIcon,
    activity: 'Home',
  },
  {
    label: '직관로그',
    icon: HomeIcon,
    activity: 'LiveRecord',
  },
  {
    label: '마이페이지',
    icon: HomeIcon,
    activity: 'My',
  },
]

export const GlobalNavigationBar = () => {
  const { replace } = useFlow()
  const [currentActivity, setCurrentActivity] = useState<ActivityType>('Home')

  const handleNavigation = (activity: ActivityType) => {
    setCurrentActivity(activity)

    switch (activity) {
      case 'Home':
        replace('Home', {}, { animate: false })
        break
      // TODO : 여기 LiveRecord 아니고 직관로그 와야 함
      case 'LiveRecord':
        replace('LiveRecord', {}, { animate: false })
        break
      case 'My':
        replace('My', {}, { animate: false })
        break
    }
  }

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'w-full bg-[#2C2C2C] flex justify-around items-center',
        'rounded-t-xl border-[#3C3C3C]',
        'pt-2 pb-6',
      )}
    >
      {NAV_ITEMS.map(({ label, icon, activity }) => {
        const isActive = currentActivity === activity

        return (
          <GNBButton
            key={activity}
            active={isActive}
            icon={icon}
            onClick={() => handleNavigation(activity)}
          >
            {label}
          </GNBButton>
        )
      })}
    </nav>
  )
}
