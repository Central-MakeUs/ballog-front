import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Record } from '@/entities/record/model/record.type'

import { RecordList } from '../ui/RecordList'

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

describe.skip('RecordList', () => {
  it('should render', () => {
    render(<RecordList records={[]} />)
  })

  it('전달받은 records를 RecordCard 컴포넌트로 렌더링한다.', () => {
    render(<RecordList records={records} />)

    expect(screen.getByText('KT 위즈')).toBeInTheDocument()
  })

  it('RecordCard 컴포넌트를 클릭하면 직관 기록 상세 페이지로 이동한다.', () => {
    const user = userEvent.setup()

    user.click(screen.getByText('KT 위즈'))

    const path = window.location.pathname

    expect(path).toBe('/record/5')
  })
})
