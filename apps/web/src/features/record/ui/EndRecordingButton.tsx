import { Button } from '@/shared/ui/common'
import { useFlow } from '@/shared/lib/stackflow'
import { useModal } from '@/shared/hooks/modal/useModal'
import CheckIcon from '@/assets/checkIcon.svg'

export const EndRecordingButton = () => {
  const { replace } = useFlow()
  const { openHorizontalModal, openImageModal } = useModal()

  // 마지막 모달
  const leavePage = () => {
    setTimeout(() => {
      replace('Record', {})
    }, 1000)

    openImageModal({
      heading: '기록이 완료되었어요!',
      imgSrc: CheckIcon,
    })
  }

  // const { mutate } = useMutation({
  //   mutationFn: ({
  //     result,
  //     matchRecordId,
  //   }: {
  //     result: MatchResult
  //     matchRecordId: number
  //   }) => recordingPatch.patchRecording(result, matchRecordId),
  //   onSuccess: () => {
  //     leavePage()
  //   },
  //   onError: () => {
  //     close()
  //     toast("기록 저장에 실패했습니다")
  //   }
  // })

  // 두번째 모달
  // const selectMatchResult = () => {
  //   openVerticalModal({
  //     heading: '경기 결과를 선택해주세요.',
  //     buttons: [
  //       {
  //         label: '승리',
  //         onClick: () => mutate({ result: 'WIN', matchRecordId }),
  //       },
  //       {
  //         label: '패배',
  //         onClick: () => mutate({ result: 'LOSS', matchRecordId }),
  //       },
  //       {
  //         label: '무승부',
  //         onClick: () => mutate({ result: 'DRAW', matchRecordId }),
  //       },
  //       {
  //         label: '건너뛰기',
  //         onClick: () => mutate({ result: 'SKIP', matchRecordId }),
  //       },
  //     ],
  //   })
  // }

  // 첫 번째 모달
  const confirmEndRecord = () => {
    openHorizontalModal({
      heading: '기록을 완료하시겠습니까?',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '종료하기',
          onClick: () => {
            leavePage()
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
