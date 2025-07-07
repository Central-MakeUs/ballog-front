import { cn } from '@/shared/lib/utils'
import SampleImage from '@/assets/whiteBallogLogo.svg'
import '@/shared/ui/global.css'

interface HomeCardProps {
  homeTeam: string
  awayTeam: string
  stadium: string
  dateTime: string
  state?: 'default' | 'disabled'
}

const HomeCard = ({
  homeTeam,
  awayTeam,
  stadium,
  dateTime,
  state = 'default',
}: HomeCardProps) => {
  const isDisabled = state === 'disabled'

  return (
    <>
      {isDisabled ? (
        disabledCard()
      ) : (
        <div
          className="flex flex-col items-center w-[200px] overflow-hidden"
          style={{
            borderRadius: 'var(--radius-medium)',
          }}
        >
          {/* 상단 팀 정보 */}
          <div
            className="py-12 px-4 flex flex-col items-center w-full"
            style={{ backgroundColor: 'var(--color-usage-background-subtle)' }}
          >
            <div
              className="body-lg-bold"
              style={{ color: 'var(--color-brand-primary-default)' }}
            >
              {homeTeam}
            </div>
            <div
              className="body-lg-medium"
              style={{ color: 'var(--color-usage-text-default)' }}
            >
              vs
            </div>
            <div
              className="body-lg-bold"
              style={{ color: 'var(--color-brand-primary-default)' }}
            >
              {awayTeam}
            </div>
          </div>

          {/* 하단 경기장 / 시간 */}
          <div
            className="bg-gray-100 text-center pt-4 pb-6 w-full"
            style={{
              backgroundColor: 'var(--color-usage-background-inverses)',
            }}
          >
            <div className="mb-2 body-sm-medium">{stadium}</div>
            <div className="body-sm-light">{dateTime}</div>
          </div>
        </div>
      )}
    </>
  )
}

function disabledCard() {
  return (
    <div
      className="flex flex-col items-center w-[200px] h-[324px] overflow-hidden"
      style={{
        borderRadius: 'var(--radius-medium)',
      }}
    >
      <div className="w-10 h-10 w-full bg-gray-500 rounded-md flex items-center justify-center">
        <span role="img" aria-label="disabled-icon">
          <SampleImage />
        </span>
        <button
          className="px-4 py-1 text-xs rounded-full"
          style={{
            backgroundColor: 'var(--color-brand-primary-default)',
            color: 'white',
          }}
        >
          Button
        </button>
      </div>
    </div>
  )
}

export { HomeCard }
