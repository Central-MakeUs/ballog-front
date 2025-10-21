import { toZonedTime } from 'date-fns-tz'

import { TIME_ZONE } from '@/shared/constants/time'

export const formatDate = (date: Date) => {
  const zonedTime = toZonedTime(date, TIME_ZONE)
  zonedTime.setHours(0, 0, 0, 0)
  return zonedTime
}
