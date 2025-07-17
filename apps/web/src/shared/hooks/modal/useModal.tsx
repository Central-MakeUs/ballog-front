import { useOverlay } from '@/hooks/useOverlay'
import { OverlayModal } from '@/shared/ui/common/OverlayModal'

type ModalButton = {
  label: string
  onClick: () => void
}

interface HorizontalModalProps {
  heading: string
  body?: string
  buttons: [ModalButton, ModalButton]
}

interface VerticalModalProps {
  heading: string
  body?: string
  buttons: ModalButton[]
}

interface ImageModalProps {
  heading: string
  body?: string
  imgSrc: string
}

export const useModal = () => {
  const overlay = useOverlay()

  const openHorizontalModal = ({
    heading,
    body,
    buttons,
  }: HorizontalModalProps) => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Text heading={heading} body={body ?? 'body text'} />
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

  const openVerticalModal = ({
    heading,
    body,
    buttons,
  }: VerticalModalProps) => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Text heading={heading} body={body} />
        <OverlayModal.Buttons layout="vertical" buttons={buttons} />
      </OverlayModal.Root>
    ))
  }

  const openImageModal = ({ heading, body, imgSrc }: ImageModalProps) => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Image imgSrc={imgSrc} />
        <OverlayModal.Text heading={heading} body={body} isImageModal />
      </OverlayModal.Root>
    ))
  }

  return {
    openHorizontalModal,
    openVerticalModal,
    openImageModal,
  }
}
