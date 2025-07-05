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

interface ModalProps {
  type: 'overlay' | 'bottomSheet'
  heading?: string
  buttons?: {
    layout: 'horizontal' | 'vertical'
    items: ModalButton[]
  }
  dismissible?: boolean
  body?: string
  hasImg?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// 버튼 그룹 컴포넌트
const ModalButtons = ({
  buttons,
  type,
}: {
  buttons: ModalProps['buttons']
  type: ModalProps['type']
}) => {
  if (!buttons || !buttons.items || buttons.items.length === 0) {
    return null
  }

  // 오버레이 타입일 때 - 구분선 스타일
  if (type === 'overlay') {
    // 가로 버튼
    if (buttons.layout === 'horizontal') {
      return (
        <div className="flex w-full">
          {buttons.items.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={cn(
                'flex-1 py-2.5 text-center',
                idx < buttons.items.length - 1 && 'border-r',
                idx === buttons.items.length - 1
                  ? 'body-md-bold'
                  : 'body-md-medium',
              )}
              style={{
                borderTop:
                  idx <= buttons.items.length - 1
                    ? '0.333px solid var(--color-brand-neutral-50)'
                    : undefined,
                borderRight:
                  idx < buttons.items.length - 1
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

    // 세로 버튼
    if (buttons.layout === 'vertical') {
      return (
        <div className="flex flex-col w-full">
          {buttons.items.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={cn('w-full py-2.5 text-center', 'body-md-medium')}
              style={{
                borderTop: '0.333px solid var(--color-brand-neutral-50)',
                color:
                  idx === buttons.items.length - 1
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
  }

  // 바텀시트 타입일 때 - 둥근 버튼 스타일
  // 바텀시트
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
          className={cn('body-md-medium', 'flex-1 py-3 rounded-[12px]')}
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

// 메인 Modal 컴포넌트
function Modal({
  type,
  heading,
  body,
  hasImg,
  dismissible = true,
  buttons,
  open,
  onOpenChange,
}: ModalProps) {
  const isBottomSheet = type === 'bottomSheet'

  const contentStyles = {
    overlay: cn(
      'w-[270px] rounded-[16px]',
      'px-0 pb-0 pt-4',
      'flex flex-col gap-y-4',
    ),
    bottomSheet: cn(
      'w-full max-w-[466px] text-white rounded-t-[16px] rounded-b-none',
      'animate-slide-up',
      'p-8',
    ),
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          contentStyles[type],
          'pb-0 mb-0',
          !dismissible && '[&>button]:hidden',
        )}
        style={{
          border: 'none',
          backgroundColor:
            type === 'overlay'
              ? 'var(--color-usage-background-inverse)'
              : 'var(--color-usage-background-strong)',
        }}
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault()
        }}
      >
        {/* 오버레이일 때 이미지 */}
        {!isBottomSheet && hasImg && (
          <div className={cn('mx-auto', 'w-[123px] h-[123px]')}>
            <img
              src={hasImg}
              alt="모달 이미지"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* 헤더 섹션 */}
        <DialogHeader className={cn(isBottomSheet && 'text-white', 'mb-0')}>
          <div className="flex flex-col space-y-2 items-center mb-0">
            {heading && (
              <DialogTitle
                className={cn(
                  'text-center body-lg-bold',
                  isBottomSheet
                    ? '--color-usage-text-default pb-1'
                    : '--color-usage-text-inverse',
                )}
              >
                {heading}
              </DialogTitle>
            )}

            {body && (
              <DialogDescription
                className={cn(
                  'text-center body-sm-medium mb-0',
                  isBottomSheet
                    ? '--color-usage-text-default pb-2'
                    : '--color-usage-text-inverse',
                  type === 'overlay' && hasImg && 'pb-8',
                )}
              >
                {body}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        {/* 바텀시트일 때 이미지 */}
        {isBottomSheet && hasImg && (
          <div className={cn('mx-auto', 'w-full h-full max-h-[536px]', 'mb-2')}>
            <img
              src={hasImg}
              alt="모달 이미지"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        {/* 버튼 섹션 */}
        <ModalButtons buttons={buttons} type={type} />
      </DialogContent>
    </Dialog>
  )
}

export { Modal }
