import { BottomSheet } from '@stackflow/plugin-basic-ui'

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
      className={`flex items-center justify-center rounded-full px-2 py-1 body-sm-bold ${BADGE_STYLES[tone]}`}
    >
      {label}
    </div>
  )
}

export const KBORankBottomSheet = ({
  open,
  onOpenChange,
}: KBORankBottomSheetProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <BottomSheet
        onOutsideClick={(event) => {
          event.preventDefault()
          onOpenChange(false)
        }}
      >
        <BottomSheetModal.Root
          open={open}
          onOpenChange={onOpenChange}
          contentClassName="gap-6 light:bg-brand-neutral-white px-4 pt-4 pb-10"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-1 rounded-full bg-brand-neutral-30" />

            <div className="flex flex-col items-center w-full gap-3 text-center">
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
                  className={`grid grid-cols-[3.25rem_1fr_auto] items-center px-4 py-3 ${
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
        </BottomSheetModal.Root>
      </BottomSheet>
    </div>
  )
}

export default KBORankBottomSheet
