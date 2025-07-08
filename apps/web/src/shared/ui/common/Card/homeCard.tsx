import SampleImage from '@/assets/whiteBallogLogo.svg?react'

interface DefaultHomeCardProps {
  homeTeam: string
  awayTeam: string
  stadium: string
  dateTime: string
}

interface DisabledHomeCardProps {}

export const Default = ({
  homeTeam,
  awayTeam,
  stadium,
  dateTime,
}: DefaultHomeCardProps) => (
  <div
    className="
    flex flex-col items-center w-full max-w-[200px] overflow-hidden rounded-medium
  "
  >
    <div
      className="
      flex flex-col items-center w-full px-4 py-12
      bg-usage-background-subtle text-brand-primary-default
    "
    >
      <div>{homeTeam}</div>
      <div className="body-lg-medium text-usage-text-default">vs</div>
      <div>{awayTeam}</div>
    </div>

    <div
      className="
      w-full text-center pt-4 pb-6
      bg-usage-background-inverses
    "
    >
      <div className="mb-2 body-sm-medium">{stadium}</div>
      <div className="body-sm-light">{dateTime}</div>
    </div>
  </div>
)

export const Disabled = ({}: DisabledHomeCardProps) => (
  <div className="flex flex-col items-center w-full max-w-[200px] h-full max-h-[324px] overflow-hidden rounded-medium">
    <div className="flex flex-col items-center justify-center w-full h-full py-12 px-4 bg-usage-background-subtle">
      <SampleImage />
      <button>Button</button>
    </div>
  </div>
)

export const HomeCard = {
  Default,
  Disabled,
}
