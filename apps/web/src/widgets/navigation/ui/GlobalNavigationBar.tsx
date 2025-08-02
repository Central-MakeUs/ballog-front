import { useState, useEffect, type ComponentType } from 'react'

import HomeIcon from '@/assets/home.svg?react'
import { useFlow, activities, actions } from '@/shared/lib/stackflow'
import { cn } from '@/shared/lib/classnames'
import { GNBButton } from '@/shared/ui/common'

type ActivityType = keyof typeof activities

interface NavItem {
  label: string
  icon: ComponentType<{ className?: string }>
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
    activity: 'Record',
  },
  {
    label: '마이페이지',
    icon: HomeIcon,
    activity: 'My',
  },
]

// 타입 가드 함수
const isValidActivityType = (
  activityName: string,
): activityName is ActivityType => {
  return Object.keys(activities).includes(activityName)
}

export const GlobalNavigationBar = () => {
  const { replace } = useFlow()
  const [currentActivity, setCurrentActivity] = useState<ActivityType>('Home')

  useEffect(() => {
    const currentActivities = actions.getStack().activities
    const currentActivityName =
      currentActivities[currentActivities.length - 1].name

    if (currentActivityName && isValidActivityType(currentActivityName)) {
      setCurrentActivity(currentActivityName)
    }
  }, [actions])

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
            onClick={() => replace(activity, {}, { animate: false })}
          >
            {label}
          </GNBButton>
        )
      })}
    </nav>
  )
}
