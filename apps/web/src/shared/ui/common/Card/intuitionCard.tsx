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
