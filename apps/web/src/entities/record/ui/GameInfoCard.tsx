import type { ComponentProps } from 'react'

import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { TEAMS } from '@/shared/constants/teams'
import { STADIUM } from '@/shared/constants/stadium'
import { cn } from '@/shared/lib/classnames'

interface GameInfoCardProps extends ComponentProps<'div'> {
  recordingData: RecordingResponse
}

export const GameInfoCard = ({
  recordingData,
  className,
  ...rest
}: GameInfoCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center gap-2 w-fit flex-shrink-0',
        className,
      )}
      {...rest}
    >
      <div className="body-md-medium text-usage-text-default">
        {TEAMS[recordingData.homeTeam]} <span className="mx-1">vs</span>{' '}
        {TEAMS[recordingData.awayTeam]}
      </div>
      <div className="body-sm-light text-usage-text-subtle">
        {STADIUM[recordingData.stadium]} <span className="mx-1">|</span>{' '}
        {recordingData.matchDate}
      </div>
    </div>
  )
}
