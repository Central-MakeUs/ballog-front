import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import { rankQueries } from '@/entities/match/api'
import { SHORT_TEAM_NAMES } from '@/shared/constants/teams'

type RankTone = 'negative' | 'positive' | 'none'

interface KBORankBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const BADGE_STYLES: Record<RankTone, string> = {
  negative: 'bg-brand-red-subtle text-brand-red-default',
  positive: 'bg-brand-green-subtle text-brand-green-pressed',
  none: 'bg-brand-neutral-20 text-brand-neutral-70',
}

const RankBadge = ({ tone, label }: { tone: RankTone; label: string }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full px-2 py-1 body-sm-bold w-[85px] ${BADGE_STYLES[tone]}`}
    >
      {label}
    </div>
  )
}

export const KBORankBottomSheet = ({
  open,
  onOpenChange,
}: KBORankBottomSheetProps) => {
  const [shouldRenderContent, setShouldRenderContent] = useState(open)
  const { data: ranks = [] } = useQuery(rankQueries.teams())

  const updatedAtDisplay = ranks[0]?.updatedAt.slice(0, 10) ?? '----.--.--'

  useEffect(() => {
    if (open) {
      setShouldRenderContent(true)
    }
  }, [open])

  if (!shouldRenderContent) return null

  return (
    <BottomSheetModal.PortalBottomSheet
      open={open}
      onOutsideClick={() => {
        onOpenChange(false)
      }}
      onExited={() => {
        setShouldRenderContent(false)
      }}
    >
      <BottomSheetModal.Root
        open={shouldRenderContent}
        onOpenChange={onOpenChange}
        contentClassName="h-[80vh] gap-6 light:bg-brand-neutral-white px-4 pt-4 pb-10"
      >
        <div className="flex h-full w-full flex-col overflow-hidden">
          <div className="flex justify-center shrink-0">
            <div className="w-12 h-1 mb-2 rounded-full bg-brand-neutral-30" />
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hidden pt-4 pb-4">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center w-full gap-3 text-center shrink-0">
                <h2 className="text-white heading-md-bold light:text-brand-neutral-90">
                  KBO 순위
                </h2>
                <p className="text-white body-md-medium light:text-brand-neutral-90">
                  {updatedAtDisplay} 기준
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-xlarge bg-brand-neutral-10">
                {ranks.map((item, index) => (
                  <div
                    key={item.teamCode}
                    className={`grid grid-cols-[auto_auto_auto] justify-center items-center gap-4 px-4 py-3 ${
                      index !== ranks.length - 1
                        ? 'border-b border-brand-neutral-30'
                        : ''
                    }`}
                  >
                    <span
                      className={`body-lg-bold text-center ${
                        item.rank <= 5
                          ? 'text-brand-primary-pressed'
                          : 'text-brand-neutral-80'
                      }`}
                    >
                      {item.rank}위
                    </span>
                    <span className="body-lg-medium text-brand-neutral-90">
                      {SHORT_TEAM_NAMES[item.teamCode]}
                    </span>
                    <RankBadge tone="none" label="감정없음" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BottomSheetModal.Root>
    </BottomSheetModal.PortalBottomSheet>
  )
}

export default KBORankBottomSheet
