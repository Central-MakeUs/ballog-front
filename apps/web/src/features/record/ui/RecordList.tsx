import type { Record } from '@/entities/record/model/record.type'
import { RecordLogCard } from '@/entities/record/ui'
import { Button } from '@/shared/ui/common'
import { useFlow } from '@/shared/lib/stackflow'

export const RecordList = ({ records }: { records: Record[] }) => {
  const { push } = useFlow()

  if (!records || records.length === 0) {
    return (
      <RecordLogCard.Empty>
        <Button className="rounded-large px-6 bg-brand-secondary-default">
          첫 직관 기록하기
        </Button>
      </RecordLogCard.Empty>
    )
  }

  return (
    <div className="w-full flex-col flex justify-center align-center gap-4">
      {records.map((record) => (
        <RecordLogCard.Root key={record.matchRecordId}>
          <RecordLogCard.Info
            homeTeam={record.homeTeam}
            awayTeam={record.awayTeam}
            stadium={'잠실야구장'}
            date={record.matchDate}
          />
          <RecordLogCard.Badge result={record.result ?? 'DRAW'} />
          <RecordLogCard.Footer
            onClick={() =>
              push('RecordDetail', { matchRecordId: record.matchRecordId })
            }
          >
            경기 결과 보러가기
          </RecordLogCard.Footer>
        </RecordLogCard.Root>
      ))}
    </div>
  )
}
