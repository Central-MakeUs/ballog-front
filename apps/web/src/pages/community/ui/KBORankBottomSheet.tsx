import { useEffect, useState } from 'react'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'

type RankTone = 'negative' | 'positive' | 'none'

interface KBORankBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface RankItem {
  rank: number
  team: string
  tone: RankTone
  label: string
}

const KBO_RANK_ITEMS: RankItem[] = [
  { rank: 1, team: '롯데', tone: 'negative', label: '화나요 70%' },
  { rank: 2, team: '키움', tone: 'positive', label: '기뻐요 70%' },
  { rank: 3, team: 'SSG', tone: 'negative', label: '화나요 70%' },
  { rank: 4, team: 'SSG', tone: 'positive', label: '기뻐요 70%' },
  { rank: 5, team: 'SSG', tone: 'none', label: '감정없음' },
  { rank: 6, team: 'SSG', tone: 'negative', label: '화나요 70%' },
  { rank: 7, team: 'SSG', tone: 'positive', label: '기뻐요 70%' },
  { rank: 8, team: 'SSG', tone: 'negative', label: '화나요 70%' },
  { rank: 9, team: 'SSG', tone: 'negative', label: '화나요 70%' },
  { rank: 10, team: 'SSG', tone: 'negative', label: '화나요 70%' },
]

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
                  2000.00.00 기준
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-xlarge bg-brand-neutral-10">
                {KBO_RANK_ITEMS.map((item, index) => (
                  <div
                    key={`${item.rank}-${item.team}`}
                    className={`grid grid-cols-[auto_auto_auto] justify-center items-center gap-4 px-4 py-3 ${
                      index !== KBO_RANK_ITEMS.length - 1
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
                      {item.team}
                    </span>
                    <RankBadge tone={item.tone} label={item.label} />
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
