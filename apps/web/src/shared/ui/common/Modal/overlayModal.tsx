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

// 오버레이 모달 공통 속성
interface OverlayModalWithButtonsBase {
  heading: string
  body?: string
  dismissible?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

// 가로 버튼 레이아웃 모달
interface OverlayModalHorizontal extends OverlayModalWithButtonsBase {
  layout: 'horizontal'
  buttons: ModalButton[]
}

// 세로 버튼 레이아웃 모달
interface OverlayModalVertical extends OverlayModalWithButtonsBase {
  layout: 'vertical'
  buttons: ModalButton[]
}

// 이미지 모달
interface OverlayModalNone extends OverlayModalWithButtonsBase {
  layout: 'image'
  imgSrc: string
  buttons?: never
}

type OverlayModalProps =
  | OverlayModalHorizontal
  | OverlayModalVertical
  | OverlayModalNone

/**
 * 공통 오버레이 모달 컴포넌트
 *
 * @param props 모달 props (layout: 'horizontal' | 'vertical' | 'image')
 * @example
 * <OverlayModal
 *   open={true}
 *   onOpenChange={setOpen}
 *   dismissible={true}
 *   heading="제목"
 *   body="설명"
 *   layout="horizontal"
 *   buttons={[
 *     { label: '취소', onClick: () => {} },
 *     { label: '확인', onClick: () => {} },
 *   ]}
 * />
 */

const OverlayModal = (props: OverlayModalProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        className={cn(
          'w-[270px] px-0 pb-0 pt-4 flex flex-col',
          !props.dismissible && '[&>button]:hidden',
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
        {/* 이미지 */}
        <ModalImage
          layout={props.layout}
          imgSrc={props.layout === 'image' ? props.imgSrc : undefined}
        />

        {/* 헤더, 바디 */}
        <ModalText
          heading={props.heading}
          body={props.body}
          layout={props.layout}
        />

        {/* 버튼 */}
        <ModalButtons
          layout={props.layout}
          buttons={props.layout !== 'image' ? props.buttons : undefined}
        />
      </DialogContent>
    </Dialog>
  )
}

/**
 * 이미지 모달 전용 렌더링 컴포넌트
 */
const ModalImage = ({
  layout,
  imgSrc,
}: {
  layout: string
  imgSrc?: string
}) => {
  if (layout !== 'image' || !imgSrc) return null
  return (
    <div className="mx-auto w-[123px] h-[123px]">
      <img src={imgSrc} alt="모달 이미지" className="w-full h-full" />
    </div>
  )
}

/**
 * 모달 제목 + 설명 렌더링 컴포넌트
 */
const ModalText = ({
  heading,
  body,
  layout,
}: {
  heading: string
  body?: string
  layout: string
}) => (
  <DialogHeader>
    <div
      className={cn(
        'flex flex-col space-y-2 text-center items-center',
        layout === 'image' && 'mb-4',
      )}
      style={{ color: 'var(--color-usage-text-inverse)' }}
    >
      <DialogTitle className="body-lg-bold">{heading}</DialogTitle>
      {body && (
        <DialogDescription className="body-sm-medium">{body}</DialogDescription>
      )}
    </div>
  </DialogHeader>
)

/**
 * 모달 버튼 렌더링 컴포넌트
 */
const ModalButtons = ({
  buttons,
  layout,
}: {
  buttons?: ModalButton[]
  layout: string
}) => {
  if (layout === 'image' || !buttons) return null
  return renderButtons(buttons, layout as 'horizontal' | 'vertical')
}

/**
 * 버튼 렌더링 함수
 *
 * @param buttons 버튼 목록
 * @param layout 버튼 배치 (horizontal | vertical)
 */
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
