import type { Record } from '@/entities/record/model/record.type'

export const RecordList = ({ records }: { records: Record[] }) => {
  return (
    <div>
      {records.map((record) => (
        <div key={record.matchRecordId}>{record.homeTeam}</div>
      ))}
    </div>
  )
}
