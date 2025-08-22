import { Button } from '@/shared/ui/common'
import { useEndRecordingFlow } from '@/features/record/hooks/useEndRecordingFlow'

export const EndRecordingButton = () => {
  const { confirmEndRecord } = useEndRecordingFlow()

  return (
    <div className="fixed bottom-10 w-full">
      <div className="px-4 max-w-screen-md mx-auto">
        <Button
          variant="secondary"
          state="pressed"
          size="lg"
          onClick={confirmEndRecord}
          className="w-full bg-brand-secondary-default"
        >
          기록 완료하기
        </Button>
      </div>
    </div>
  )
}
