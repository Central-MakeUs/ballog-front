import { cn } from '@/shared/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/shared/ui/common/dialog'

interface ModalButton {
  label: string
  onClick: () => void
}

interface BottomSheetModalProps {
  heading?: string
  body?: string
  hasImg?: string
  dismissible?: boolean
  buttons?: {
    layout: 'horizontal' | 'vertical'
    items: ModalButton[]
  }
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const BottomSheetModal = (props: BottomSheetModalProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        className="w-full max-w-[466px] text-white rounded-t-[16px] rounded-b-none animate-slide-up p-8"
        style={{
          backgroundColor: 'var(--color-usage-background-strong)',
          border: 'none',
        }}
        onInteractOutside={(e) => {
          if (!props.dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!props.dismissible) e.preventDefault()
        }}
      >
        <DialogHeader className="text-white mb-0">
          <div className="flex flex-col space-y-2 items-center mb-0">
            {props.heading && (
              <DialogTitle className="text-center body-lg-bold --color-usage-text-default pb-1">
                {props.heading}
              </DialogTitle>
            )}
            {props.body && (
              <DialogDescription className="text-center body-sm-medium --color-usage-text-default pb-2">
                {props.body}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        {props.hasImg && (
          <div className="mx-auto w-full h-full max-h-[536px] mb-2">
            <img
              src={props.hasImg}
              alt="모달 이미지"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        {renderButtons(props.buttons, 'bottomSheet')}
      </DialogContent>
    </Dialog>
  )
}

export { BottomSheetModal }

function renderButtons(
  buttons: BottomSheetModalProps['buttons'],
  type: 'bottomSheet',
) {
  if (!buttons || !buttons.items.length) return null

  return (
    <div
      className={cn(
        'flex gap-4 w-full pb-8',
        buttons.layout === 'vertical' ? 'flex-col' : 'flex-row',
      )}
    >
      {buttons.items.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="body-md-medium flex-1 py-3 rounded-[12px]"
          style={{
            backgroundColor:
              idx === 0
                ? 'var(--color-brand-secondary-subtle)'
                : 'var(--color-brand-primary-default)',
            color:
              idx === 0
                ? 'var(--color-brand-neutral-70)'
                : 'var(--color-brand-neutral-white)',
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
