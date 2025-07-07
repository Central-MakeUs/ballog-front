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

// 나중에 이미지, 버튼 넣기
const disabledCard = () => {
  return (
    <div
      className="flex flex-col items-center w-[200px] h-[324px] overflow-hidden"
      style={{
        borderRadius: 'var(--radius-medium)',
      }}
    >
      <div
        className=" flex flex-col items-center justify-center w-full h-full py-12 px-4"
        style={{ backgroundColor: 'var(--color-usage-background-subtle)' }}
      >
        <span role="img" aria-label="disabled-icon">
          <SampleImage />
        </span>
        <button>Button</button>
      </div>
    </div>
  )
}

export { HomeCard }
