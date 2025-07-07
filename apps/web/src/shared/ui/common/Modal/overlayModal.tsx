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

// 타입: 버튼 layout 별 props 구분
interface OverlayModalWithButtonsBase {
  heading: string
  body?: string
  dismissible?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface OverlayModalHorizontal extends OverlayModalWithButtonsBase {
  layout: 'horizontal'
  buttons: ModalButton[]
}

interface OverlayModalVertical extends OverlayModalWithButtonsBase {
  layout: 'vertical'
  buttons: ModalButton[]
}

interface OverlayModalNone extends OverlayModalWithButtonsBase {
  layout: 'none'
  imgSrc: string
  buttons?: never
}

type OverlayModalProps =
  | OverlayModalHorizontal
  | OverlayModalVertical
  | OverlayModalNone

const OverlayModal = (props: OverlayModalProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        className={cn(
          'w-[270px] px-0 pb-0 pt-4 flex flex-col',
          props.dismissible && '[&>button]:hidden',
        )}
        style={{
          backgroundColor: 'var(--color-usage-background-inverse)',
          border: 'none',

        }}
        onInteractOutside={(e) => {
          if (!props.dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!props.dismissible) e.preventDefault()
        }}
      >
        {props.layout === 'none' && props.imgSrc && (
          <div className="mx-auto w-[123px] h-[123px]">
            <img
              src={props.imgSrc}
              alt="모달 이미지"
              className="w-full h-full"
            />
          </div>
        )}

        <DialogHeader>
          <div
            className={cn(
              'flex flex-col space-y-2 text-center items-center',
              props.layout === 'none' && 'mb-4',
            )}
            style={{ color: 'var(--color-usage-text-inverse)' }}
          >
            {props.heading && (
              <DialogTitle className="body-lg-bold">
                {props.heading}
              </DialogTitle>
            )}
            {props.body && (
              <DialogDescription className="body-sm-medium">
                {props.body}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        {props.layout !== 'none' && renderButtons(props.buttons, props.layout)}
      </DialogContent>
    </Dialog>
  )
}

const renderButtons = (
  buttons: ModalButton[],
  layout: 'horizontal' | 'vertical',
) => {
  if (!buttons || buttons.length === 0) return null

  if (layout === 'horizontal') {
    return (
      <div className="flex w-full">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={cn(
              'flex-1 py-2.5 text-center',
              idx < buttons.length - 1 && 'border-r',
              idx === buttons.length - 1 ? 'body-md-bold' : 'body-md-medium',
            )}
            style={{
              borderTop: '0.333px solid var(--color-brand-neutral-50)',
              borderRight:
                idx < buttons.length - 1
                  ? '0.333px solid var(--color-brand-neutral-50)'
                  : undefined,
              color: 'var(--color-brand-primary-pressed)',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="w-full py-2.5 text-center body-md-medium"
          style={{
            borderTop: '0.333px solid var(--color-brand-neutral-50)',
            color:
              idx === buttons.length - 1
                ? 'var(--color-brand-neutral-70)'
                : 'var(--color-brand-primary-pressed)',
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}

export { OverlayModal }
