import { useEffect, useRef, type ComponentType } from 'react'
import * as htmlToImage from 'html-to-image'
import { BottomSheet } from '@stackflow/plugin-basic-ui'
import {
  createWebBridge,
  POST_MESSAGE_EVENT,
  MESSAGE_STATUS,
} from '@ballog/bridge'
import { toast } from 'sonner'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import { useFlow } from '@/shared/lib/stackflow'
import { EmotionDonutChart } from '@/shared/ui/common/Card/EmotionDonutChart'
import type { RecordDetailResponse } from '@/entities/record/model/record.type'
import { Chip } from '@/shared/ui/common/Chip/Chip'
import AngryEmotion from '@/assets/angryEmotionNoShadow.svg?react'
import JoyEmotion from '@/assets/joyEmotionNoShadow.svg?react'

interface EmotionPieChartData {
  name: '화나요' | '기뻐요'
  value: number
}

export const ShareBottomSheet = ({
  params,
}: {
  params: {
    imageUrl: string
    chartData: EmotionPieChartData[]
    recordData: RecordDetailResponse
  }
}) => {
  const { pop } = useFlow()
  const bridge = createWebBridge()

  const composeRef = useRef<HTMLDivElement>(null)
  const hasExportedRef = useRef(false)

  const { chartData, recordData } = params

  const handleImageDownload = () => {
    if (bridge.isRNEnvironment()) {
      bridge.send(POST_MESSAGE_EVENT.DOWNLOAD_IMAGE, {
        imageUrl: params.imageUrl,
      })
    }
  }

  const handleInstagramShare = () => {
    if (bridge.isRNEnvironment()) {
      bridge.send(POST_MESSAGE_EVENT.SHARE_TO_INSTAGRAM_STORY, {
        imageUrl: params.imageUrl,
      })
    } else {
      toast('모바일 앱에서만 공유할 수 있습니다.')
    }
  }

  useEffect(() => {
    bridge.addEventListener(
      POST_MESSAGE_EVENT.IMAGE_DOWNLOAD_RESPONSE,
      (payload: { message: string }) => {
        if (payload.message === MESSAGE_STATUS.DOWNLOAD_COMPLETED) {
          toast('이미지가 저장되었습니다.')
        } else if (payload.message === MESSAGE_STATUS.DOWNLOAD_FAILED) {
          toast('이미지 저장에 실패했습니다.')
        }
      },
    )

    bridge.addEventListener(
      POST_MESSAGE_EVENT.INSTAGRAM_SHARE_RESPONSE,
      (payload: { message: string }) => {
        if (payload.message === MESSAGE_STATUS.SHARE_COMPLETED) {
          toast('인스타그램 스토리로 공유되었습니다.')
        } else if (payload.message === MESSAGE_STATUS.SHARE_FAILED) {
          toast('공유에 실패했습니다.')
        }
      },
    )
  }, [])

  const angryValue = chartData.find((d) => d.name === '화나요')!.value
  const joyValue = chartData.find((d) => d.name === '기뻐요')!.value

  const centerEmotion = angryValue >= joyValue ? '화나요' : '기뻐요'
  const centerRate = centerEmotion === '화나요' ? angryValue : joyValue

  const progressColor =
    centerEmotion === '화나요'
      ? 'var(--color-brand-red-hover)'
      : 'var(--color-brand-green-hover)'
  const trackColor = 'var(--color-usage-background-strong)'

  const startAngle = angryValue <= 50 ? 90 : 0
  const endAngle = angryValue <= 50 ? 450 : 360

  const exportComposedPng = async () => {
    if (!composeRef.current) return
    try {
      const dataUrl = await htmlToImage.toPng(composeRef.current, {
        cacheBust: true,
        pixelRatio: 3, // 선명도 (2~3 권장, 너무 크면 메모리 터짐)
        // backgroundColor: '#000',   // 필요 시 배경 강제
      })

      // 웹 브라우저 다운로드
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'ballog-share.png'
      a.click()
    } catch {
      toast.error('이미지 합성 실패')
    }
  }

  const resultChipMap: Record<
    NonNullable<RecordDetailResponse['result']>,
    { variant: 'red' | 'green' | 'secondary'; label: string }
  > = {
    LOSE: { variant: 'red', label: '패배' },
    WIN: { variant: 'green', label: '승리' },
    DRAW: { variant: 'secondary', label: '무승부' },
  }

  const renderResultChip = (result: RecordDetailResponse['result']) => {
    if (!result) return null

    const chip = resultChipMap[result]
    if (!chip) return null
    return (
      <div className="absolute top-8 right-6 rotate-[18.51deg]">
        <Chip variant={chip.variant} state="default">
          {chip.label}
        </Chip>
      </div>
    )
  }

  const resultEmotionMap: Record<'WIN' | 'LOSE', ComponentType> = {
    WIN: JoyEmotion,
    LOSE: AngryEmotion,
  }

  const renderResultEmotion = (result: RecordDetailResponse['result']) => {
    if (!result) return null

    const EmotionComp =
      resultEmotionMap[result as keyof typeof resultEmotionMap]
    if (!EmotionComp) return null
    return (
      <div className="absolute bottom-8 right-6">
        <EmotionComp />
      </div>
    )
  }

  return (
    <BottomSheet data-testid="share-bottom-sheet">
      <BottomSheetModal.Root
        className="flex"
        open={true}
        onOpenChange={() => {
          pop()
        }}
        dismissible={true}
      >
        <BottomSheetModal.Text heading="사진 공유하기" />
        <div ref={composeRef}>
          <div className="flex flex-col px-6 pt-5 pb-4 bg-brand-neutral-90 rounded-t-md items-center">
            <div className="body-lg-bold">
              {recordData.homeTeam} vs {recordData.awayTeam}
            </div>
            <div className="mt-1 caption-md text-brand-neutral-40">
              {recordData.stadium} | {recordData.matchDate}
            </div>
          </div>
          <BottomSheetModal.Image
            className="rounded-b-md"
            src={params.imageUrl}
            data-testid="share-image"
          >
            {/* 감정 도넛 */}
            <div className="absolute top-4 left-4">
              <EmotionDonutChart
                size={87}
                trackOuter={43}
                progressInner={28}
                progressOuter={43}
                startAngle={startAngle}
                endAngle={endAngle}
                centerRate={centerRate}
                progressColor={progressColor}
                trackColor={trackColor}
                centerTitle={centerEmotion}
              />
            </div>

            {/* 경기 결과 칩 */}
            {renderResultChip(recordData.result)}

            {/* 감정 이모지 */}
            {renderResultEmotion(recordData.result)}
          </BottomSheetModal.Image>
        </div>
        <BottomSheetModal.Buttons
          buttons={[
            { label: '이미지 저장', onClick: handleImageDownload },
            {
              label: '공유하기',
              onClick: handleInstagramShare,
            },
          ]}
        />
      </BottomSheetModal.Root>
    </BottomSheet>
  )
}

export default ShareBottomSheet
