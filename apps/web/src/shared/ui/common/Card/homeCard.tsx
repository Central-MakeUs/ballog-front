import SampleImage from '@/assets/whiteBallogLogo.svg'
import '@/shared/ui/global.css'

/**
 * HomeCard
 *
 * 홈 화면에서 경기 정보를 보여주는 카드 컴포넌트.
 *
 * @param props - HomeCardProps
 * @param props.state - 카드의 상태 ('default' | 'disabled')
 *   - 'default' 또는 undefined: 경기 정보를 표시
 *   - 'disabled': 경기 정보가 없을 때 표시
 * @param props.homeTeam - 홈 팀 이름 (state가 'default'일 때 필수)
 * @param props.awayTeam - 원정 팀 이름 (state가 'default'일 때 필수)
 * @param props.stadium - 경기장 이름 (state가 'default'일 때 필수)
 * @param props.dateTime - 경기 일시 (state가 'default'일 때 필수)
 *
 * @returns 홈 카드 UI 요소
 */

interface DefaultCardProps {
  state?: 'default'
  homeTeam: string
  awayTeam: string
  stadium: string
  dateTime: string
}

interface DisabledCardProps {
  state: 'disabled'
}

type HomeCardProps = DefaultCardProps | DisabledCardProps

const HomeCard = (props: HomeCardProps) => {
  switch (props.state) {
    case 'disabled':
      return renderDisabledCard()
    case 'default':
    case undefined:
      return renderDefaultCard(props)
    default:
      const _exhaustive: never = props
      return _exhaustive
  }
}

const renderDefaultCard = (props: DefaultCardProps) => {
  const { homeTeam, awayTeam, stadium, dateTime } = props

  return (
    <div
      className="flex flex-col items-center w-[200px] overflow-hidden"
      style={{
        borderRadius: 'var(--radius-medium)',
      }}
    >
      <div
        className="py-12 px-4 flex flex-col items-center w-full"
        style={{ backgroundColor: 'var(--color-usage-background-subtle)' }}
      >
        <div
          className="body-lg-bold"
          style={{ color: 'var(--color-brand-primary-default)' }}
        >
          {homeTeam}
        </div>
        <div
          className="body-lg-medium"
          style={{ color: 'var(--color-usage-text-default)' }}
        >
          vs
        </div>
        <div
          className="body-lg-bold"
          style={{ color: 'var(--color-brand-primary-default)' }}
        >
          {awayTeam}
        </div>
      </div>

      <div
        className="bg-gray-100 text-center pt-4 pb-6 w-full"
        style={{
          backgroundColor: 'var(--color-usage-background-inverses)',
        }}
      >
        <div className="mb-2 body-sm-medium">{stadium}</div>
        <div className="body-sm-light">{dateTime}</div>
      </div>
    </div>
  )
}

// 나중에 이미지, 버튼 넣기
const renderDisabledCard = () => {
  return (
    <div
      className="flex flex-col items-center w-[200px] h-[324px] overflow-hidden"
      style={{
        borderRadius: 'var(--radius-medium)',
      }}
    >
      <div
        className=" flex flex-col items-center justify-center w-full h-full py-12 px-4"
        style={{ backgroundColor: 'var(--color-usage-background-subtle)' }}
      >
        <span role="img" aria-label="disabled-icon">
          <SampleImage />
        </span>
        <button>Button</button>
      </div>
    </div>
  )
}

export { HomeCard }
