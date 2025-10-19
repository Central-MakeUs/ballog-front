import { useCallback } from 'react'

import { useModal } from '@/shared/hooks/modal/useModal'

interface UpdateModalProps {
  type: 'optional' | 'force'
}

export const useUpdateModal = () => {
  const { openHorizontalModal, openVerticalModal } = useModal()

  const openUpdateModal = useCallback(
    ({ type }: UpdateModalProps) => {
      if (type === 'optional') {
        return openHorizontalModal({
          heading: '새로운 버전이 업데이트 되었어요',
          body: `최신 버전으로 업데이트하고\n더 나은 서비스를 이용해보세요`,
          buttons: [
            { label: '나중에', onClick: () => {} },
            {
              label: '업데이트',
              onClick: () =>
                (window.location.href =
                  'https://apps.apple.com/kr/app/ballog-%EB%B3%BC%EB%A1%9C%EA%B7%B8/id6749778947'),
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
                (window.location.href =
                  'https://apps.apple.com/kr/app/ballog-%EB%B3%BC%EB%A1%9C%EA%B7%B8/id6749778947'),
            },
          ],
        })
      }
    },
    [openHorizontalModal, openVerticalModal],
  )

  return { openUpdateModal }
}
