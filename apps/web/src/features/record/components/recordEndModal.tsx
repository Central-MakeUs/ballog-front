import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'

type MatchResult = 'win' | 'lose' | 'draw'

const RecordEndModal = () => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)

  const handleEndRecord = () => {
    setShowConfirmModal(false)
    setShowResultModal(true)
  }

  const handleSelectResult = (result: MatchResult) => {
    console.log(`경기 결과: ${result}`)
    setShowResultModal(false)
  }

  return (
    <>
      <p
        className="underline text-center cursor-pointer py-10"
        onClick={() => setShowConfirmModal(true)}
      >
        기록 종료하기
      </p>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <p>기록을 종료하시겠습니까?</p>
          <div>
            <button className="mr-5" onClick={() => setShowConfirmModal(false)}>
              취소
            </button>
            <button onClick={handleEndRecord}>종료하기</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent>
          <p>경기 결과를 선택해주세요</p>
          <div>
            <button className="mr-5" onClick={() => handleSelectResult('win')}>
              승리
            </button>
            <button className="mr-5" onClick={() => handleSelectResult('lose')}>
              패배
            </button>
            <button onClick={() => handleSelectResult('draw')}>무승부</button>
          </div>
          <button onClick={() => setShowResultModal(false)}>건너뛰기</button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RecordEndModal
