import { useEffect, useState } from 'react'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import { List } from '@/shared/ui/common/List/List'

interface ReportBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReport?: () => void
}

export const ReportBottomSheet = ({
  open,
  onOpenChange,
}: ReportBottomSheetProps) => {
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
        contentClassName="gap-0 rounded-t-[16px] bg-brand-neutral-90 light:bg-brand-neutral-white px-4 pt-4 pb-8"
      >
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-center shrink-0">
            <div className="w-12 h-1 rounded-full bg-brand-neutral-30" />
          </div>

          <div className="flex flex-col w-full gap-2 pt-2">
            <List
              type="arrow"
              onClick={() => {
                onOpenChange(false)
              }}
            >
              신고하기
            </List>
            <List
              type="arrow"
              onClick={() => {
                onOpenChange(false)
              }}
            >
              친구 끊기
            </List>
          </div>
        </div>
      </BottomSheetModal.Root>
    </BottomSheetModal.PortalBottomSheet>
  )
}
