import { cn } from '@/lib/utils'

// React 컴포넌트로 import. ?react 쿼리 붙여 SVG 파일을 리액트 컴포넌트로 변환시키기
import CloseButton from '@/assets/closeButton.svg?react'
// 이미지 뭐 임포트

interface ModalButton {
  label: string
  onClick: () => void
}

interface ModalProps {
  type: 'overlay' | 'bottomSheet'
  heading?: string
  buttons: {
    layout: 'horizontal' | 'vertical' | 'img'
    items: ModalButton[]
  }
  dismissible?: boolean
  body?: string // 바텀시트 텍스트
  hasSubText?: boolean
  hasImg?: boolean
  onClose?: () => void
}

export function Modal({
  type,
  heading,
  body,
  hasSubText,
  hasImg,
  dismissible,
  buttons,
  onClose,
}: ModalProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-black/50 flex',
        type === 'overlay' && 'items-center justify-center',
        type === 'bottomSheet' && 'items-end',
      )}
      onClick={dismissible ? onClose : undefined}
    >
      <div
        className={cn(
          'relative bg-white rounded-2xl p-4 w-11/12 max-w-md',
          type === 'bottomSheet' && 'rounded-t-2xl',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {dismissible && (
          <button
            className="absolute top-2 right-2 text-gray-400"
            onClick={onClose}
          >
            <CloseButton />
          </button>
        )}
        {hasImg && (
          <div className="w-24 h-24 mx-auto mb-2">
            <img
              //   src={}
              alt="모달 이미지"
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
        {heading && (
          <h2 className="text-lg font-bold text-center mb-1">{heading}</h2>
        )}
        {body && (
          <p className="text-sm text-center text-gray-600 mb-1">{body}</p>
        )}
        {hasSubText && (
          <p className="text-xs text-center text-gray-400 mb-2">
            탈퇴시 블로그 내 모든 정보가 <br />
            삭제되고, 복구할 수 없어요
          </p>
        )}
        <div
          className={cn(
            'flex gap-2',
            buttons.layout === 'vertical' && 'flex-col',
            buttons.layout === 'horizontal' && 'flex-row',
            buttons.layout === 'img' && 'justify-center',
          )}
        >
          {buttons.items.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className="flex-1 rounded bg-primary text-white py-2"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
