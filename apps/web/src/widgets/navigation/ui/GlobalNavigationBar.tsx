import { useState, useEffect, type ComponentType } from 'react'
import { CommunityGNB } from '@ballog/asset/icons'

import HomeGNB from '@/assets/HomeGNB'
import RecordGNB from '@/assets/RecordGNB'
import { useFlow, activities, actions } from '@/app/routes/stackflow'
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
    label: '커뮤니티',
    icon: CommunityGNB,
    activity: 'Community',
  },
  {
    label: '홈',
    icon: HomeGNB,
    activity: 'Home',
  },
  {
    label: '관람로그',
    icon: RecordGNB,
    activity: 'Record',
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
        'w-full bg-usage-background-subtle light:bg-usage-background-default flex justify-around items-center',
        'rounded-t-xl border-t light:border-brand-neutral-20 dark:border-none',
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
