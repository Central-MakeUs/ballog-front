import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Record } from '@/entities/record/model/record.type'

import { RecordList } from '../ui/RecordList'

// stackflow mock
const mockPush = vi.fn()

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({
    push: mockPush,
  }),
}))

const records: Record[] = [
  {
    matchRecordId: 5,
    matchesId: 4,
    homeTeam: 'LG_TWINS',
    awayTeam: 'KT_WIZ',
    matchDate: '2025-07-08',
    matchTime: '21:30',
    userId: 1,
    watchCnt: 4,
    result: 'DRAW',
    baseballTeam: 'LG_TWINS',
  },
  {
    matchRecordId: 4,
    matchesId: 3,
    homeTeam: 'KIA_TIGERS',
    awayTeam: 'HANWHA_EAGLES',
    matchDate: '2025-07-08',
    matchTime: '10:30',
    userId: 1,
    watchCnt: 3,
    result: 'WIN',
    baseballTeam: 'LG_TWINS',
  },
  {
    matchRecordId: 3,
    matchesId: 2,
    homeTeam: 'SAMSUNG_LIONS',
    awayTeam: 'LOTTE_GIANTS',
    matchDate: '2025-07-15',
    matchTime: '19:30',
    userId: 1,
    watchCnt: 2,
    result: 'DRAW',
    baseballTeam: 'LG_TWINS',
  },
]

describe('RecordList', () => {
  it('should render', () => {
    render(<RecordList records={[]} />)
  })

  it('전달받은 records를 RecordCard 컴포넌트로 렌더링한다.', () => {
    render(<RecordList records={records} />)

    expect(screen.getByText('LG 트윈스', { exact: false })).toBeInTheDocument()
  })

  it('RecordCard 컴포넌트를 클릭하면 직관 기록 상세 페이지로 이동한다.', async () => {
    const user = userEvent.setup()

    render(<RecordList records={records} />)

    const detailButton = screen.getAllByText('경기 결과 보러가기')

    await user.click(detailButton[0])

    expect(mockPush).toHaveBeenCalledWith('RecordDetail', {
      matchRecordId: records[0].matchRecordId.toString(),
    })
  })
})
