import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/common'
import { useFlow } from '@/shared/lib/stackflow'
import { useModal } from '@/shared/hooks/modal/useModal'
import { recordingPatch } from '@/entities/record/api/recording-patch'
import CheckIcon from "@/assets/checkIcon.svg"

type MatchResult = 'WIN' | 'LOSS' | 'DRAW' | 'SKIP'

export const EndRecordingButton = ({
  matchRecordId,
}: {
  matchRecordId: number
}) => {
  const { replace } = useFlow()
  const { openHorizontalModal, openVerticalModal, openImageModal } = useModal()

  // 마지막 모달
  const leavePage = () => {
    setTimeout(() => {
      replace('Record', {})
    }, 1000)

    openImageModal({
      heading: '기록이 완료되었어요!',
      body: 'Body Text',
      imgSrc: CheckIcon,
    })
  }

  const { mutate } = useMutation({
    mutationFn: ({
      result,
      matchRecordId,
    }: {
      result: MatchResult
      matchRecordId: number
    }) => recordingPatch.patchRecording(result, matchRecordId),
    onSuccess: () => {
      leavePage()
    },
    onError: () => {
      toast("기록 저장에 실패했습니다")
    }
  })

  // 두번째 모달
  const selectMatchResult = () => {
    openVerticalModal({
      heading: '경기 결과를 선택해주세요.',
      body: 'Body text',
      buttons: [
        {
          label: '승리',
          onClick: () => mutate({ result: 'WIN', matchRecordId }),
        },
        {
          label: '패배',
          onClick: () => mutate({ result: 'LOSS', matchRecordId }),
        },
        {
          label: '무승부',
          onClick: () => mutate({ result: 'DRAW', matchRecordId }),
        },
        {
          label: '건너뛰기',
          onClick: () => mutate({ result: 'SKIP', matchRecordId }),
        },
      ],
    })
  }

  // 첫 번째 모달
  const confirmEndRecord = () => {
    openHorizontalModal({
      heading: '기록을 완료하시겠습니까?',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '종료하기',
          onClick: () => {
            close()
            selectMatchResult()
          },
        },
      ],
    })
  }

  return (
    <div className="fixed bottom-10 w-full">
      <div className="px-4 max-w-screen-md mx-auto">
        <Button
          variant="secondary"
          state="pressed"
          size="lg"
          onClick={confirmEndRecord}
          className="w-full"
        >
          기록 종료하기
        </Button>
      </div>
    </div>
  )
}
