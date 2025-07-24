import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { recordGet } from '@/entities/record/api/record-get'

import { RecordDetailPage } from '../ui/RecordDetailPage'

describe.skip('RecordDetailPage', () => {
  it('should render', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)
  })

  it('삭제 버튼을 클릭하면 삭제 확인 모달이 렌더링된다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    user.click(screen.getByTestId('delete-button'))

    expect(
      screen.getByText('삭제된 기록은 복구할 수 없습니다.'),
    ).toBeInTheDocument()
  })

  it('삭제 확인 모달에서 취소 버튼을 클릭하면 삭제 확인 모달이 닫힌다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    user.click(screen.getByTestId('delete-button'))

    user.click(screen.getByRole('button', { name: '취소' }))

    expect(
      screen.queryByText('삭제된 기록은 복구할 수 없습니다.'),
    ).not.toBeInTheDocument()
  })

  it('삭제 확인 모달에서 삭제 버튼을 클릭하면 직관 기록이 삭제된 후 직관 기록 메인 페이지에서 toast가 렌더링된다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    user.click(screen.getByTestId('delete-button'))

    user.click(screen.getByTestId('delete-confirm-button'))

    expect(screen.getByTestId('toast')).toHaveTextContent(
      '직관로그 삭제가 완료되었습니다!',
    )
  })

  it('공유하기 버튼을 클릭하면 바텀시트가 렌더링된다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    user.click(screen.getByTestId('share-button'))

    expect(screen.getByTestId('bottom-sheet')).toBeInTheDocument()
  })

  it('바텀시트에는 record의 첫번째 이미지가 표시된다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    vi.mocked(recordGet.getRecordDetail).mockResolvedValue({
      statusCode: 200,
      message: 'success',
      success: '직관 기록 상세 조회 성공',
      data: {
        matchRecordId: 1,
        matchesId: 1,
        homeTeam: 'LG_TWINS',
        awayTeam: 'KT_WIZ',
        matchDate: '2025-07-08',
        matchTime: '21:30',
        stadium: '잠실야구장',
        userId: 1,
        watchCnt: 4,
        result: 'DRAW',
        baseballTeam: 'LG_TWINS',
        positiveEmotionPercent: 0,
        negativeEmotionPercent: 0,
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
      },
    })

    expect(screen.getByAltText('record-image')).toHaveAttribute(
      'src',
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
    )
  })

  it('이미지 저장 버튼을 누르면 이미지가 저장되고 toast가 렌더링된다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    user.click(screen.getByTestId('save-image-button'))

    expect(screen.getByTestId('toast')).toHaveTextContent(
      '이미지 저장이 완료되었습니다!',
    )
  })

  it('공유하기 버튼을 누르면 toast가 렌더링 되고 공유 링크가 복사된다.', () => {
    render(<RecordDetailPage params={{ matchRecordId: '1' }} />)

    const user = userEvent.setup()

    user.click(screen.getByTestId('share-button'))

    expect(screen.getByTestId('toast')).toHaveTextContent(
      '공유 링크가 복사되었습니다!',
    )
  })
})
