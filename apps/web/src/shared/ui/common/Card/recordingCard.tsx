import RecordingCardWithNoImage from '@/assets/recordingCardIconWithNoImage.svg'
import RecordingCardWithImage from '@/assets/recordingCardIconWithImage.svg'

/**
 * RecordingCard
 * 
 * 직관 경기 정보를 표시하는 카드 컴포넌트.
 * 현재 직관 상태에 따라 아이콘이 달라지고, 경기 정보(팀, 경기장, 일시)를 보여줌.
 * 
 * @param props - RecordingCardProps
 * @param props.state - 카드 상태 ('default' | 'active')
 *   - 'default': 직관 경기 선택 전 상태 (회색 아이콘 표시)
 *   - 'active': 직관 중인 경기 상태 (활성화된 아이콘 표시)
 * @param props.homeTeam - 홈 팀 이름
 * @param props.awayTeam - 원정 팀 이름
 * @param props.stadium - 경기장 이름
 * @param props.date - 경기 일시
 * 
 * @returns RecordingCard UI 요소
 */

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
