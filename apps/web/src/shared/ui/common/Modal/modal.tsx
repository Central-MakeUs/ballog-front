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
  variant?: 'primary' | 'secondary'
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
  hasSubText?: string
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
  const getBottomSheetButtonStyle = (variant?: 'primary' | 'secondary') => {
    if (variant === 'secondary') {
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }
    return 'bg-teal-500 text-white hover:bg-teal-600'
  }

  return (
    <div
      className={cn(
        'flex gap-3 w-full mt-6',
        buttons.layout === 'vertical' ? 'flex-col' : 'flex-row',
      )}
    >
      {buttons.items.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={cn(
            'flex-1 py-4 px-6 rounded-xl font-medium transition-all active:scale-95',
            getBottomSheetButtonStyle(btn.variant),
          )}
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
  hasSubText,
  hasImg,
  dismissible = true,
  buttons,
  open,
  onOpenChange,
}: ModalProps) {
  const isBottomSheet = type === 'bottomSheet'

  const contentStyles = {
    overlay: cn(
      'max-w-md rounded-2xl bg-white shadow-xl',
      'px-0 pb-0 pt-4',
      'w-[270px]',
      'flex flex-col gap-y-4'
    ),
    bottomSheet: cn(
      'max-w-full fixed bottom-0 left-0 right-0',
      'rounded-t-3xl bg-gray-900 text-white',
      'animate-slide-up min-h-[400px]',
      'p-6 pb-8',
      'sm:max-w-lg sm:mx-auto sm:mb-4 sm:rounded-3xl',
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
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault()
        }}
      >
        {/* BottomSheet 핸들 */}
        {isBottomSheet && (
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />
        )}

        {/* 이미지 */}
        {hasImg && (
          <div
            className={cn(
              'mx-auto',
              isBottomSheet ? 'w-64 h-64' : 'w-[123px] h-[123px]',
            )}
          >
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
                    ? '--color-usage-text-default'
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
                    ? '--color-usage-text-default'
                    : '--color-usage-text-inverse',
                    type === 'overlay' && hasImg && 'pb-8'
                )}
                
              >
                {body}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        {/* 버튼 섹션 */}

        <ModalButtons buttons={buttons} type={type} />
      </DialogContent>
    </Dialog>
  )
}

export { Modal }
