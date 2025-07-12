import { useState } from 'react'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/common'

type TeamSelectionFormProps = {
  onSubmit: (team: TeamKey) => void
}

export const TeamSelectionForm = ({ onSubmit }: TeamSelectionFormProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamKey | null>(null)

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
            return (
              <Button
                key={key}
                size="lg"
                variant={isSelected ? 'primary' : 'secondary'}
                state={isSelected ? 'subtle' : undefined} // 선택 시만 subtle, 아니면 기본
                className={`self-stretch row-start-${row} col-start-${col} flex-1 h-full`}
                onClick={() => handleSelect(key as TeamKey)}
              >
                {value}
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
        className={cn('w-full sticky bottom-10')}
      >
        시작하기
      </Button>
    </div>
  )
}
