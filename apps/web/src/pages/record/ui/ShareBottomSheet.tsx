import { useEffect, useRef } from 'react'
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
import { TEAMS } from '@/shared/constants/teams'
import {
  ResultChip,
  ResultEmotion,
} from '@/pages/record/ui/BottomSheetElements'
import { useEmotionChart } from '@/shared/lib/calculateEmotionChart'

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

  const { chartData, recordData } = params

  const {
    centerEmotion,
    centerRate,
    progressColor,
    trackColor,
    startAngle,
    endAngle,
  } = useEmotionChart(chartData)

  const composeShareImage = async (): Promise<string> => {
    const node = composeRef.current
    if (!node) throw new Error('compose target not found')

    await (document.fonts?.ready ?? Promise.resolve())

    const dataUrl = await htmlToImage.toPng(node, {
      cacheBust: true,
      pixelRatio: 3,
    })
    return dataUrl
  }

  const handleImageDownload = (composedImage: string) => {
    if (bridge.isRNEnvironment()) {
      bridge.send(POST_MESSAGE_EVENT.DOWNLOAD_IMAGE, {
        imageUrl: composedImage,
      })
    }
  }

  const handleInstagramShare = (composedImage: string) => {
    if (bridge.isRNEnvironment()) {
      bridge.send(POST_MESSAGE_EVENT.SHARE_TO_INSTAGRAM_STORY, {
        imageUrl: composedImage,
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
          <div className="flex flex-col py-4 bg-usage-background-subtle body-md-bold  rounded-t-md items-center">
            <div className="body-lg-bold">
              {TEAMS[recordData.homeTeam]} vs {TEAMS[recordData.awayTeam]}
            </div>
            <div className="mt-1 text-usage-text-subtle body-sm-light">
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
            <ResultChip
              result={recordData.result}
              className="top-8 right-6 rotate-[18.51deg]"
            />

            {/* 감정 이모지 */}
            <ResultEmotion
              result={recordData.result}
              className="bottom-8 right-6"
            />
          </BottomSheetModal.Image>
        </div>
        <BottomSheetModal.Buttons
          buttons={[
            {
              label: '이미지 저장',
              onClick: async () => {
                try {
                  const composedImage = await composeShareImage()
                  handleImageDownload(composedImage)
                } catch {
                  toast.error('이미지 저장 실패')
                }
              },
            },
            {
              label: '공유하기',
              onClick: async () => {
                const composedImage = await composeShareImage()
                handleInstagramShare(composedImage)
              },
            },
          ]}
        />
      </BottomSheetModal.Root>
    </BottomSheet>
  )
}

export default ShareBottomSheet
