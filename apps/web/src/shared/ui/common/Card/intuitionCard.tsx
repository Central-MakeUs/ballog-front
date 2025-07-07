/**
 * IntuitionCard
 * 
 * 직관(경기 관람) 횟수와 승률을 보여주는 카드 컴포넌트.
 * 
 * @param props - IntuitionCardProps
 * @param props.state - 카드의 상태 ('active' | 'disabled')
 *   - 'active': 직관 횟수와 승률 데이터를 표시
 *   - 'disabled': 직관 데이터가 없음을 표시
 * @param props.matchCount - 직관 횟수 (state가 'active'일 때 필수)
 * @param props.winRate - 직관 경기 승률 (state가 'active'일 때 필수, 소수점 포함 가능)
 * 
 * @returns 직관 카드 UI 요소
 */

interface ActiveIntuitionCardProps {
  state: 'active'
  matchCount: number
  winRate: number
}

interface DisabledIntuitionCardProps {
  state: 'disabled'
}

type IntuitionCardProps = ActiveIntuitionCardProps | DisabledIntuitionCardProps

const IntuitionCard = (props: IntuitionCardProps) => {
  switch (props.state) {
    case 'disabled':
      return renderDisabled()
    case 'active':
      return renderActive(props)
    default:
      const _exhaustive: never = props
      return _exhaustive
  }
}

const renderActive = (props: ActiveIntuitionCardProps) => {
  const { matchCount, winRate } = props

  return (
    <div
      className="flex w-[156px] h-[184px] px-4 py-6 justify-center items-center flex-shrink-0"
      style={{
        borderRadius: 'var(--radius-xlarge)',
        background: 'var(--color-usage-background-subtle)',
        color: 'var(--color-brand-neutral-white)',
      }}
    >
      <div className="text-center">
        <div className="body-md-medium mb-2">직관</div>
        <div className="heading-md-bold">
          {matchCount} <span className="body-md-bold">회</span>
        </div>
        <div className="body-sm-medium mt-4 mb-2">승률</div>
        <div className="heading-md-bold">{winRate}%</div>
      </div>
    </div>
  )
}

const renderDisabled = () => {
  return (
    <div
      className="flex w-[156px] min-h-[150px] py-6 gap-4 justify-center items-center flex-shrink-0"
      style={{
        borderRadius: 'var(--radius-xlarge)',
        background: 'var(--color-usage-background-subtle)',
        color: 'var(--color-brand-neutral-white)',
      }}
    >
      <div className="text-center">
        <div className="body-md-medium mb-2">직관</div>
        <div className="body-md-bold">- 회</div>
      </div>
    </div>
  )
}

export { IntuitionCard }
