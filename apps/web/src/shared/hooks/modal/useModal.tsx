import { useOverlay } from '@/hooks/useOverlay'
import { OverlayModal } from '@/shared/ui/common/OverlayModal'

type ButtonOption = {
  label: string
  onClick?: () => void
}

interface HorizontalModalOptions {
  heading?: string
  body?: string
  buttons: [ButtonOption, ButtonOption]
}

export const useHorizontalModal = () => {
  const overlay = useOverlay()

  const openHorizontalModal = ({ heading, body, buttons }: HorizontalModalOptions) => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Text
          heading={heading ?? 'Heading'}
          body={body ?? 'body text'}
        />
        <OverlayModal.Buttons
          layout="horizontal"
          buttons={[
            {
              label: buttons[0].label,
              onClick: () => {
                close()
                buttons[0].onClick?.()
              },
            },
            {
              label: buttons[1].label,
              onClick: () => {
                close()
                buttons[1].onClick?.()
              },
            },
          ]}
        />
      </OverlayModal.Root>
    ))
  }

  return {
    openHorizontalModal,
  }
}
