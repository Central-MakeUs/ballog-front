import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'

import { render } from '@/test/QueryWrapper'
import { recordGet } from '@/entities/record/api/record-get'
import type { RecordResult } from '@/entities/record/model/record.type'
import type { TeamKey } from '@/shared/constants/teams'
import { recordDelete } from '@/entities/record/api/record-delete'
import { emotionGroupList } from '@/mocks/data/record'
import type { StadiumKey } from '@/shared/constants/stadium'

import { RecordDetailPage } from '../ui/RecordDetailPage'

const mockPush = vi.fn()
const mockReplace = vi.fn()

vi.mock('@/shared/lib/stackflow', () => ({
  useFlow: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}))

// 실제 toast 함수 모킹
// 테스트 시 const mockToast = vi.mocked(toast) 로 사용
// toast함수 모킹
vi.mock('sonner', () => ({
  toast: vi.fn(),
}))

vi.mock('@/entities/record/api/record-get', () => ({
  recordGet: {
    getRecordDetail: vi.fn(),
  },
}))

vi.mock('@/entities/record/api/record-delete', () => ({
  recordDelete: {
    deleteRecord: vi.fn(),
  },
}))

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

const mockRecordData = {
  status: 200,
  message: 'success',
  success: '관람 기록 상세 조회 성공',
  data: {
    matchRecordId: 1,
    matchesId: 1,
    homeTeam: 'LG_TWINS' as TeamKey,
    awayTeam: 'KT_WIZ' as TeamKey,
    matchDate: '2025-07-08',
    matchTime: '21:30',
    stadium: 'JAMSIL' as StadiumKey,
    userId: 1,
    watchCnt: 4,
    result: 'DRAW' as RecordResult,
    baseballTeam: 'LG_TWINS' as TeamKey,
    positiveEmotionPercent: 60,
    negativeEmotionPercent: 40,
    defaultImageUrl: null,
    imageList: [
      {
        imageUrl:
          'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
        createdAt: '2025-07-13T14:09:51.386663',
      },
      {
        imageUrl:
          'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/a5ca9d7f-3514-41b7-9554-cf0de905e48a.png',
        createdAt: '2025-07-13T14:09:51.386663',
      },
    ],
    emotionGroupList,
  },
}

describe('RecordDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // 기본적으로 성공적인 응답으로 설정
    vi.mocked(recordGet.getRecordDetail).mockResolvedValue(mockRecordData)
  })

  it('should render', async () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    // 로딩 완료 후 제목 확인
    await waitFor(() => {
      expect(screen.getByText('기록 상세보기')).toBeInTheDocument()
    })
  })

  it('삭제 버튼을 클릭하면 삭제 확인 모달이 렌더링된다.', async () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    expect(screen.getByTestId('delete-button')).toBeInTheDocument()

    await user.click(screen.getByTestId('delete-button'))

    await waitFor(() => {
      expect(
        screen.getByText('삭제된 기록은 복구할 수 없습니다.'),
      ).toBeInTheDocument()
    })
  })

  it('삭제 확인 모달에서 취소 버튼을 클릭하면 삭제 확인 모달이 닫힌다.', async () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    expect(screen.getByTestId('delete-button')).toBeInTheDocument()

    await user.click(screen.getByTestId('delete-button'))

    await user.click(screen.getByRole('button', { name: '취소' }))

    await waitFor(() => {
      expect(
        screen.queryByText('삭제된 기록은 복구할 수 없습니다.'),
      ).not.toBeInTheDocument()
    })
  })

  it('삭제 확인 모달에서 삭제 버튼을 클릭하면 관람 기록이 삭제된 후 관람 기록 메인 페이지에서 toast가 렌더링된다.', async () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    vi.mocked(recordDelete.deleteRecord).mockResolvedValue({
      status: 200,
      message: 'success',
      success: '관람 기록 삭제 성공',
      data: null,
    })

    const user = userEvent.setup()

    await waitFor(() => {
      expect(screen.getByTestId('delete-button')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('delete-button'))

    expect(screen.getByText('확인')).toBeInTheDocument()

    await user.click(screen.getByText('확인'))

    // 비동기 작업 완료 대기
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('관람로그 삭제가 완료되었습니다!')
      expect(mockReplace).toHaveBeenCalledWith('Record', {}, { animate: false })
    })
  })

  it('공유하기 버튼을 클릭하면 바텀시트가 렌더링된다.', async () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    expect(screen.getByTestId('share-button')).toBeInTheDocument()

    user.click(screen.getByTestId('share-button'))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('ShareBottomSheet', {
        imageUrl:
          'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
      })
    })
  })
})
