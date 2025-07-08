import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface WithRecordProps extends ComponentProps<'div'> {
  homeTeam: string
  awayTeam: string
  stadium: string
  date: string
  matchesResult: 'win' | 'lose' | 'draw'
}

interface NoRecorcProps extends ComponentProps<'div'> {}

/**
 * RecordLogCard
 *
 *
 * 컴포넌트 구성:
 * - `RecordLogCard.WithRecord`: 직관 기록이 있을 경우, 경기 정보와 결과 배지를 표시합니다.
 * - `RecordLogCard.NoRecord`: 직관 기록이 없을 경우, 안내 메시지와 버튼을 표시합니다.
 *
 * @example 기록이 있는 상태
 * ```tsx
 * <RecordLogCard.WithRecord
 *   homeTeam="LG 트윈스"
 *   awayTeam="SSG 랜더스"
 *   stadium="잠실야구장"
 *   date="2025.07.09 (수) 오후 6:30"
 *   matchesResult="win"
 * />
 * ```
 *
 * @example 기록이 없는 상태
 * ```tsx
 * <RecordLogCard.NoRecord />
 * ```
 */
const WithRecord = ({
  homeTeam,
  awayTeam,
  stadium,
  date,
  matchesResult,
  className,
  ...rest
}: WithRecordProps) => {
  const badgeColor = {
    win: 'bg-brand-green-subtle text-brand-green-default',
    lose: 'bg-brand-red-subtle text-brand-red-default',
    draw: 'bg-brand-secondary-subtle text-brand-neutral-70',
  }[matchesResult]

  const badgeText = {
    win: '승리',
    lose: '패배',
    draw: '무승부',
  }[matchesResult]

  return (
    <div
      className={cn(
        'flex flex-col w-[328px] relative rounded-large bg-usage-background-subtle',
        className,
      )}
      {...rest}
    >
      <div className="flex justify-between items-start">
        <div className="relative p-6">
          <p className="body-lg-bold text-usage-text-default">
            {homeTeam} <span className="mx-2">vs</span> {awayTeam}
          </p>
          <p className="body-sm-light text-usage-text-subtle">
            {stadium} <span className="mx-2">|</span> {date}
          </p>
        </div>
        <div
          className={`
            absolute top-4 right-4
            px-3 py-1
            caption-md-medium rounded-large
            ${badgeColor}
          `}
        >
          {badgeText}
        </div>
      </div>
      <div className="text-center py-3 body-sm-medium border-t border-usage-background-strong text-usage-text-default">
        경기 결과 보러가기
      </div>
    </div>
  )
}

const NoRecord = ({ className, ...rest }: NoRecorcProps) => {
  return (
    <div
      className={cn(
        'flex flex-col w-[328px] relative rounded-large bg-usage-background-subtle',
        className,
      )}
      {...rest}
    >
      <div className="text-center w-full body-lg-bold py-10 text-brand-neutral-white">
        <div className="body-lg-bold">아직 직관 기록이 없어요!</div>
        <p className="body-sm-light py-4 text-usage-text-subtle">
          직관 중인 경기를 선택하고
          <br />
          실시간으로 감정을 기록해 보세요.
        </p>
        <div className="flex justify-center w-full">
          <button className="px-6 py-3 body-sm-medium rounded-large bg-brand-secondary-default text-brand-neutral-white">
            첫 직관 기록하기
          </button>
        </div>
      </div>
    </div>
  )
}

export const RecordLogCard = {
  WithRecord,
  NoRecord,
}
