interface ActiveIntuitionCardProps {
  matchCount: number
  winRate: number
}

interface DisabledIntuitionCardProps {}

const Active = ({ matchCount, winRate }: ActiveIntuitionCardProps) => (
  <div
    className="
    flex w-full max-w-[156px] h-full max-h-[184px] px-4 py-6
    justify-center items-center text-center
    rounded-xlarge bg-usage-background-subtle text-brand-neutral-white"
  >
    <div>
      <div className="body-md-medium mb-2">직관</div>
      <div className="heading-md-bold">
        {matchCount} <span className="body-md-bold">회</span>
      </div>
      <div className="body-sm-medium mt-4 mb-2">승률</div>
      <div className="heading-md-bold">{winRate}%</div>
    </div>
  </div>
)

const Disabled = ({}: DisabledIntuitionCardProps) => (
  <div
    className=" 
    flex w-[156px] h-full max-h-[184px] px-4 py-6
    justify-center items-center text-center flex-shrink-0
    rounded-xlarge bg-usage-background-subtle text-brand-neutral-white"
  >
    <div className="text-center">
      <div className="body-md-medium mb-2">직관</div>
      <div className="body-md-bold">- 회</div>
    </div>
  </div>
)

export const IntuitionCard = { Active, Disabled }
