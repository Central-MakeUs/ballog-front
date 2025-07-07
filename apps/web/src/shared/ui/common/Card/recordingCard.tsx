import RecordingCardWithNoImage from '@/assets/recordingCardIconWithNoImage.svg'
import RecordingCardWithImage from '@/assets/recordingCardIconWithImage.svg'

interface RecordingCardProps {
  state: 'default' | 'active'
  homeTeam: string
  awayTeam: string
  stadium: string
  date: string
}

const RecordingCard = ({
  state,
  homeTeam,
  awayTeam,
  stadium,
  date,
}: RecordingCardProps) => {
  const Icon =
    state === 'default' ? RecordingCardWithNoImage : RecordingCardWithImage

  return (
    <div
      className="flex w-[328px] p-4 gap-4 items-center flex-shrink-0"
      style={{
        borderRadius: 'var(--radius-xlarge)',
        background: 'var(--color-usage-background-subtle)',
      }}
    >
      <div className="relative">
        <Icon />
      </div>

      <div>
        <div
          className="body-md-bold"
          style={{ color: 'var(--color-usage-text-default)' }}
        >
          {homeTeam} <span className="mx-1">vs</span> {awayTeam}
        </div>
        <div
          className="body-sm-light"
          style={{ color: 'var(--color-usage-text-subtle)' }}
        >
          {stadium} <span className="mx-1">|</span> {date}
        </div>
      </div>
    </div>
  )
}

export { RecordingCard }
