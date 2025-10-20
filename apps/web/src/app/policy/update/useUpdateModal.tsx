import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useModal } from '@/shared/hooks/modal/useModal'
import { useBridge } from '@/shared/hooks/bridge/useBridge'

interface UpdateModalProps {
  type: 'optional' | 'force'
}

export const useUpdateModal = () => {
  const { bridge } = useBridge()
  const { openHorizontalModal, openVerticalModal } = useModal()

  const openUpdateModal = ({ type }: UpdateModalProps) => {
    if (type === 'optional') {
      return openHorizontalModal({
        heading: '새로운 버전이 업데이트 되었어요',
        body: `최신 버전으로 업데이트하고\n더 나은 서비스를 이용해보세요`,
        buttons: [
          { label: '나중에', onClick: () => {} },
          {
            label: '업데이트',
            onClick: () =>
              bridge.send(POST_MESSAGE_EVENT.STORE_DEEP_LINK, {
                payload: 'link to store',
              }),
          },
        ],
      })
    }

    if (type === 'force') {
      return openVerticalModal({
        heading: '새로운 버전이 업데이트 되었어요',
        body: `안전하고 원활한 서비스 이용을 위해\n최신 버전 업데이트가 필요해요`,

        buttons: [
          {
            label: '업데이트',
            onClick: () =>
              bridge.send(POST_MESSAGE_EVENT.STORE_DEEP_LINK, {
                payload: 'link to store',
              }),
          },
        ],
      })
    }
  }

  return { openUpdateModal }
}
