import { useState } from 'react'

import { TEAM_ICONS, TEAMS, type TeamKey } from '@/shared/constants/teams'
import { Button } from '@/shared/ui/common'

interface TeamSelectionFormProps {
  baseBallTeam?: TeamKey
  onSubmit: (team: TeamKey) => void
  isSignUpFlow?: boolean
}

export const TeamSelectionForm = ({
  baseBallTeam,
  onSubmit,
  isSignUpFlow,
}: TeamSelectionFormProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamKey | null>(
    baseBallTeam ?? null,
  )

  const handleSelect = (team: TeamKey) => {
    setSelectedTeam(team)
  }

  const handleSubmit = () => {
    if (!selectedTeam) return
    onSubmit(selectedTeam)
  }

  return (
    <div className="flex flex-col items-center w-full h-full px-4">
      <div className="flex flex-col items-center w-full gap-8">
        <p className="body-lg-bold mt-8">응원하는 팀을 선택해주세요</p>

        <div className="grid grid-cols-2 grid-rows-6 gap-x-4 gap-y-4 w-full mb-8 h-[488px]">
          {Object.entries(TEAMS).map(([key, value], idx) => {
            // 2열이므로, 행(row)은 idx/2+1, 열(col)은 (idx%2)+1
            const row = Math.floor(idx / 2) + 1
            const col = (idx % 2) + 1
            const isSelected = selectedTeam === key // 선택 여부 확인
            const Icon = TEAM_ICONS[key as TeamKey]
            return (
              <Button
                key={key}
                size="lg"
                variant="secondary"
                state={isSelected ? 'pressed' : undefined} // 선택 시만 subtle, 아니면 기본
                className={`self-stretch row-start-${row} col-start-${col} flex-1 h-full gap-0`}
                onClick={() => handleSelect(key as TeamKey)}
              >
                {Icon && <Icon className="size-6 mr-1 -ml-2" />} {value}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="flex-grow" />
      <Button
        size="lg"
        variant="primary"
        disabled={!selectedTeam}
        onClick={handleSubmit}
        className="fixed bottom-10 left-4 right-4"
      >
        {isSignUpFlow ? '다음' : '완료'}
      </Button>
    </div>
  )
}
