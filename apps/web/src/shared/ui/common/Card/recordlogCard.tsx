interface RecordCardWithRecord {
  hasRecord: true
  homeTeam: string
  awayTeam: string
  stadium: string
  date: string
  matchesResult: 'win' | 'lose' | 'draw'
}

interface RecordCardNoRecord {
  hasRecord: false
}

type RecordLogCardProps = RecordCardWithRecord | RecordCardNoRecord

const RecordLogCard = (props: RecordLogCardProps) => {
  if (!props.hasRecord) {
    return renderNoRecord()
  }
  return renderWithRecord(props)
}

const renderWithRecord = (props: RecordCardWithRecord) => {
  const { homeTeam, awayTeam, stadium, date, matchesResult } = props
  
  return (
    <div
      className="flex flex-col w-[328px] relative"
      style={{
        borderRadius: 'var(--radius-large)',
        background: 'var(--color-usage-background-subtle)',
      }}
    >
      <div className="flex justify-between items-start">
        <div className="p-6">
          <div
            className="body-lg-bold"
            style={{ color: 'var(--color-usage-text-default)' }}
          >
            {homeTeam} <span className="mx-2">vs</span> {awayTeam}
          </div>
          <div
            className="body-sm-light"
            style={{ color: 'var(--color-usage-text-subtle)' }}
          >
            {stadium} <span className="mx-2">|</span> {date}
          </div>
        </div>
        <div
          className="absolute top-4 right-4 px-3 py-1 caption-md-medium"
          style={{
            background:
              matchesResult === 'win'
                ? 'var(--color-brand-green-subtle)'
                : matchesResult === 'lose'
                  ? 'var(--color-brand-red-subtle)'
                  : 'var(--color-brand-secondary-subtle)',
            color:
              matchesResult === 'win'
                ? 'var(--color-brand-green-default)'
                : matchesResult === 'lose'
                  ? 'var(--color-brand-red-default)'
                  : 'var(--color-brand-neutral-70)',
            borderRadius: 'var(--radius-large)',
          }}
        >
          {matchesResult}
        </div>
      </div>
      <div
        className="text-center py-3 body-sm-medium"
        style={{
          borderTop: 'var(--color-usage-background-strong) 1px solid',
          color: 'var(--color-usage-text-default)',
        }}
      >
        경기 결과 보러가기
      </div>
    </div>
  )
}

const renderNoRecord = () => {
  return (
    <div
      className="flex flex-col w-[328px] relative"
      style={{
        borderRadius: 'var(--radius-large)',
        background: 'var(--color-usage-background-subtle)',
      }}
    >
      <div
        className="text-center w-full body-lg-bold py-10"
        style={{ color: 'var(--color-brand-neutral-white)' }}
      >
        <div className="body-lg-bold">아직 직관 기록이 없어요!</div>
        <div
          className="body-sm-light py-4"
          style={{ color: 'var(--color-usage-text-subtle)' }}
        >
          직관 중인 경기를 선택하고
          <br />
          실시간으로 감정을 기록해 보세요.
        </div>
        <div className="flex justify-center w-full">
          <button
            className="px-6 py-3 body-sm-medium"
            style={{
              borderRadius: 'var(--radius-large)',
              backgroundColor: 'var(--color-brand-secondary-default)',
              color: 'var(--color-brand-neutral-white)',
            }}
          >
            첫 직관 기록하기
          </button>
        </div>
      </div>
    </div>
  )
}

export { RecordLogCard }
