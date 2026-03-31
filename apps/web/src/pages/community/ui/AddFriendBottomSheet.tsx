import { useEffect, useRef, useState } from 'react'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import { cn } from '@/shared/lib/classnames'

interface AddFriendBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PLACEHOLDER = '닉네임으로 친구 추가하기'

export const AddFriendBottomSheet = ({
  open,
  onOpenChange,
}: AddFriendBottomSheetProps) => {
  const { isRNEnvironment } = useBridge()
  const inputRef = useRef<HTMLInputElement>(null)
  const initialViewportHeightRef = useRef(0)
  const [nickname, setNickname] = useState('')
  const [keyboardInset, setKeyboardInset] = useState(0)
  const [shouldRenderContent, setShouldRenderContent] = useState(open)

  useEffect(() => {
    if (open) {
      setShouldRenderContent(true)
    }
  }, [open])

  useEffect(() => {
    if (!shouldRenderContent || typeof window === 'undefined') return

    const viewport = window.visualViewport
    initialViewportHeightRef.current = viewport?.height ?? window.innerHeight

    const updateKeyboardInset = () => {
      if (!viewport) {
        setKeyboardInset(0)
        return
      }

      const nextInset = Math.max(
        0,
        initialViewportHeightRef.current - viewport.height - viewport.offsetTop,
      )

      setKeyboardInset(nextInset)
    }

    updateKeyboardInset()
    viewport?.addEventListener('resize', updateKeyboardInset)
    viewport?.addEventListener('scroll', updateKeyboardInset)

    const frame = window.requestAnimationFrame(() => {
      if (!isRNEnvironment) {
        inputRef.current?.focus()
      }
    })

    return () => {
      window.cancelAnimationFrame(frame)
      viewport?.removeEventListener('resize', updateKeyboardInset)
      viewport?.removeEventListener('scroll', updateKeyboardInset)
    }
  }, [isRNEnvironment, shouldRenderContent])

  useEffect(() => {
    if (!open) {
      inputRef.current?.blur()
    }
  }, [open])

  if (!shouldRenderContent) return null

  return (
    <BottomSheetModal.PortalBottomSheet
      open={open}
      onOutsideClick={() => onOpenChange(false)}
      onEntered={() => {
        if (isRNEnvironment) {
          inputRef.current?.focus()
        }
      }}
      onExited={() => {
        setShouldRenderContent(false)
        setNickname('')
        setKeyboardInset(0)
      }}
      sheetWrapperClassName="transition-[bottom] duration-200 ease-out"
      sheetWrapperStyle={{ bottom: `${keyboardInset}px` }}
    >
      <BottomSheetModal.Root
        open={shouldRenderContent}
        onOpenChange={onOpenChange}
        contentClassName="gap-0 rounded-t-[15px] bg-brand-neutral-90 light:bg-brand-neutral-white px-4 pt-6 pb-4"
      >
        <div className="w-full">
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              enterKeyHint="done"
              autoFocus={!isRNEnvironment}
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder={PLACEHOLDER}
              className={cn(
                'w-full rounded-large bg-usage-background-strong px-4 py-4 text-center',
                'body-lg-bold text-usage-text-default placeholder:text-brand-neutral-40',
                'border-none outline-none focus:ring-0',
              )}
            />
          </form>
        </div>
      </BottomSheetModal.Root>
    </BottomSheetModal.PortalBottomSheet>
  )
}

export default AddFriendBottomSheet
