import { cn } from '@/shared/lib/utils'

interface ModalButton {
  label: string
  onClick: () => void
}

/**
 * BottomSheetModal 컴포넌트 props
 * 
 * @property heading 모달 제목 (필수)
 * @property body 모달 설명 (선택)
 * @property imgSrc 이미지 URL (필수)
 * @property dismissible 배경 클릭 / ESC 로 닫기 허용 여부 (기본값: true)
 * @property buttons 2개의 버튼 배열 (왼쪽, 오른쪽 순)
 * @property open 모달 열림 여부
 * @property onOpenChange 열림 상태 변경 콜백
 */
interface BottomSheetModalProps {
  heading: string
  body?: string
  imgSrc: string
  dismissible?: boolean
  buttons: [ModalButton, ModalButton]
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * BottomSheetModal: 화면 하단에서 슬라이드 업 되는 모달 컴포넌트
 * 
 * @example
 * <BottomSheetModal
 *   heading="제목"
 *   body="설명"
 *   imgSrc="/img/example.png"
 *   dismissible={true}
 *   buttons={[
 *     { label: '취소', onClick: () => {} },
 *     { label: '확인', onClick: () => {} }
 *   ]}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 */
const BottomSheetModal = (props: BottomSheetModalProps) => {
  const {
    heading,
    body,
    imgSrc,
    dismissible = true,
    buttons,
    open,
    onOpenChange,
  } = props

  if (!open) return null

  const handleBackdropClick = () => {
    if (dismissible) {
      onOpenChange(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* 검정 배경 처리 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleBackdropClick}
      />

      {/* 바텀시트 */}
      <div
        className={cn(
          'absolute bottom-0 w-full max-w-[466px] left-1/2 -translate-x-1/2 rounded-t-[16px] rounded-b-none p-8',
        )}
        style={{
          backgroundColor: 'var(--color-usage-background-strong)',
          border: 'none',
        }}
      >
        <div
          className="flex flex-col space-y-3 text-center items-center"
          style={{ color: 'var(--color-usage-text-default)' }}
        >
          <div className="body-lg-bold">{heading}</div>
          {body && (
            <div
              className="body-sm-medium pb-6"
              style={{ color: 'var(--color-usage-text-subtle)' }}
            >
              {body}
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-h-[536px] mb-6">
          <img
            src={imgSrc}
            alt="모달 이미지"
            className="w-full h-auto max-h-[536px]"
          />
        </div>
        {/* 버튼 */}
        {renderButtons(buttons)}
      </div>
    </div>
  )
}

/**
 * 버튼 배열을 렌더링하는 함수
 * 
 * @param buttons 2개의 버튼 배열
 * @returns JSX.Element | null
 */
const renderButtons = (buttons: [ModalButton, ModalButton]) => {
  return (
    <div className="flex gap-4 w-full">
      {buttons.map((btn, idx) => (
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

export { BottomSheetModal }
