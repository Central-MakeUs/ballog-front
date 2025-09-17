import React from 'react'

import { useOverlay } from '@/shared/hooks/useOverlay'
import { OverlayModal } from '@/shared/ui/common/OverlayModal'

interface ModalButton {
  label: string
  onClick: () => void
  dataTestId?: string
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
  imgSrc?: string
  renderContent?: () => React.ReactNode
}

interface TextModalProps {
  heading: string
  body?: string
}
/**
 * - openHorizontalModal
 * 좌우 2버튼 형태의 모달을 띄웁니다.
 *
 * @example
 * openHorizontalModal({
 *   heading: '정말 탈퇴하시겠어요?',
 *   body: '탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.',
 *   buttons: [
 *     { label: '취소', onClick: () => {} },
 *     { label: '탈퇴', onClick: handleWithdraw },
 *   ]
 * })
 *
 *
 * - openVerticalModal
 * 수직 버튼 목록 형태의 모달을 띄웁니다.
 *
 * @example
 * openVerticalModal({
 *   heading: '경기 결과를 선택해주세요.',
 *   buttons: [
 *     { label: '승리', onClick: handleWin },
 *     { label: '패배', onClick: handleLose },
 *     { label: '무승부', onClick: handleDraw },
 *     { label: '건너뛰기', onClick: handleSkip },
 *   ]
 * })
 *
 *
 * - openImageModal
 * 이미지를 보여주는 모달을 띄웁니다.
 *
 * @example
 * openImageModal({
 *   heading: '기록이 완료되었어요!',
 *   body: '수고하셨습니다.',
 *   imgSrc: '/img/end-record.png',
 * })
 */

export const useModal = () => {
  const overlay = useOverlay()

  const openHorizontalModal = ({
    heading,
    body,
    buttons,
  }: HorizontalModalProps) => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Text heading={heading} body={body ?? ''} />
        <OverlayModal.Buttons
          layout="horizontal"
          buttons={[
            {
              label: buttons[0].label,
              onClick: () => {
                close()
                buttons[0].onClick?.()
              },
              dataTestId: buttons[0].dataTestId,
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

  const openImageModal = ({
    heading,
    body,
    imgSrc,
    renderContent,
  }: ImageModalProps) => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        {renderContent ? (
          <OverlayModal.Image>{renderContent()}</OverlayModal.Image>
        ) : (
          <OverlayModal.Image imgSrc={imgSrc} />
        )}
        <OverlayModal.Text heading={heading} body={body} isImageModal />
      </OverlayModal.Root>
    ))
  }

  const openTextModal = ({ heading, body }: TextModalProps) => {
    return overlay.open(({ isOpen }) => (
      <OverlayModal.Root open={isOpen} className="w-72 pb-4 px-4">
        <OverlayModal.Text heading={heading} body={body} />
      </OverlayModal.Root>
    ))
  }

  return {
    openHorizontalModal,
    openVerticalModal,
    openImageModal,
    openTextModal,
  }
}
