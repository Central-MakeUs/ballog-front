import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'

import { recordGet } from '@/entities/record/api/record-get'
import { render } from '@/test/QueryWrapper'

import { RecordMainPage } from '../ui/RecordMainPage'

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({
    push: vi.fn(),
  }),
  actions: {
    getStack: vi.fn().mockReturnValue({
      activities: [
        {
          name: 'Record',
        },
        {
          name: 'Home',
        },
      ],
    }),
  },
  activities: {
    Home: vi.fn(),
    Record: vi.fn(),
    // 필요한 다른 activities들도 추가
  },
  Stack: vi.fn(),
  useStepFlow: vi.fn(),
}))

vi.mock('@/entities/record/api/record-get', () => ({
  recordGet: {
    getRecord: vi.fn(),
  },
}))

describe('RecordMainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render', () => {
    render(<RecordMainPage />)
  })

  it('직관 기록이 없으면 Empty 컴포넌트가 렌더링된다.', () => {
    vi.mocked(recordGet.getRecord).mockResolvedValue({
      status: 200,
      message: 'success',
      data: {
        totalCount: 0,
        winRate: 0,
        positiveEmotionPercent: 0,
        negativeEmotionPercent: 0,
        records: [],
      },
      success: '오늘 경기 일정 조회 성공',
    })

    render(<RecordMainPage />)

    waitFor(() =>
      expect(screen.getByText('아직 직관 기록이 없어요!')).toBeInTheDocument(),
    )
  })

  it('직관 기록이 있으면 RecordList 컴포넌트가 렌더링된다.', () => {
    vi.mocked(recordGet.getRecord).mockResolvedValue({
      status: 200,
      message: 'success',
      data: {
        totalCount: 1,
        winRate: 0,
        positiveEmotionPercent: 0,
        negativeEmotionPercent: 0,
        records: [
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
        ],
      },
      success: '오늘 경기 일정 조회 성공',
    })

    render(<RecordMainPage />)

    waitFor(() => expect(screen.getByText('KT 위즈')).toBeInTheDocument())
  })

  it('에러 발생 시 toast메세지와 함께 empty 컴포넌트가 렌더링된다.', () => {
    render(<RecordMainPage />)

    vi.mocked(recordGet.getRecord).mockRejectedValue({
      message: 'fail',
      status: 408,
      error: '해당 직관기록을 찾을 수 없습니다.',
      code: 'RECORD001',
    })

    waitFor(() => {
      expect(screen.getByText('아직 직관 기록이 없어요!')).toBeInTheDocument()
      expect(screen.getByTestId('toast')).toHaveTextContent(
        '해당 직관기록을 찾을 수 없습니다.',
      )
    })
  })
})
