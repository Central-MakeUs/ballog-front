import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

import { cn } from '@/shared/lib/classnames'
import { Button } from '@/shared/ui/common'
import { useModal } from '@/shared/hooks/modal/useModal'
import { useFlow } from '@/app/routes/stackflow'
import { useImageContext } from '@/features/record/hooks/useImageContext'
import { recordDelete } from '@/entities/record/api/record-delete'
import { queryKeys } from '@/entities/record/api/record.queries'

export const BottomButtonGroup = ({ recordId }: { recordId: number }) => {
  const { openHorizontalModal } = useModal()
  const { images } = useImageContext()
  const { push, pop } = useFlow()
  const queryClient = useQueryClient()
  const { mutate: deleteRecord } = useMutation({
    mutationFn: (recordId: number) => recordDelete.deleteRecord(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getRecord().queryKey,
      })
      toast('관람로그 삭제가 완료되었습니다!')
      pop()
    },
  })

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'w-full bg-[#2C2C2C] flex justify-around items-center',
        'rounded-t-xl border-[#3C3C3C]',
        'pt-2 pb-10 px-4',
      )}
    >
      <div className="flex gap-4 w-full">
        <Button
          variant="secondary"
          size="lg"
          state="subtle"
          className="aspect-square"
          data-testid="delete-button"
          onClick={() =>
            openHorizontalModal({
              heading: '이 관람로그를 정말\n삭제하시겠습니까?',
              body: '삭제된 기록은 복구할 수 없습니다.',
              buttons: [
                { label: '취소', onClick: () => {} },
                {
                  label: '확인',
                  onClick: () => {
                    deleteRecord(recordId)
                  },
                  dataTestId: 'delete-confirm-button',
                },
              ],
            })
          }
        >
          <Trash />
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="flex-3 w-full"
          data-testid="share-button"
          onClick={() => {
            if (!images[0]?.imageUrl) {
              toast.info('이미지가 없습니다.')
            } else {
              push('ShareBottomSheet', {
                imageUrl: images[0].imageUrl,
              })
            }
          }}
        >
          공유하기
        </Button>
      </div>
    </nav>
  )
}
