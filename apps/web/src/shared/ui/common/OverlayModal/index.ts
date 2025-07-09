import { Root } from './Root'
import { Image } from './Image'
import { Text } from './Text'
import { Buttons } from './Buttons'

/**
 * OverlayModal - 오버레이 형태의 공통 모달 컴포넌트 세트
 *
 * Emotion UI 디자인 시스템 기반의 작은 오버레이 모달입니다.
 * 버튼 배치(layout)에 따라 다양한 형태로 구성할 수 있습니다.
 *
 * @usage
 * ```tsx
 * <OverlayModal.Root open={open} onOpenChange={setOpen}>
 *   <OverlayModal.Image imgSrc="/img/example.png" />
 *   <OverlayModal.Text heading="제목" body="설명" />
 *   <OverlayModal.Buttons
 *     layout="horizontal"
 *     buttons={[
 *       { label: '취소', onClick: () => {} },
 *       { label: '확인', onClick: () => {} },
 *     ]
 *   />
 * </OverlayModal.Root>
 * ```
 *
 * @components
 * - Root: 모달의 최상위 컴포넌트 (Dialog 컨트롤 포함)
 * - Image: 중앙 상단 이미지 영역 (옵션)
 * - Text: 제목과 설명 영역
 * - Buttons: 하단 버튼 영역 (가로/세로 배치 지원)
 *
 * @props
 * - Root
 *   - open: boolean — 모달 열림 여부
 *   - onOpenChange: (open: boolean) => void — 모달 열림 상태 변경 핸들러
 *   - dismissible?: boolean — 외부 클릭/ESC로 닫을 수 있는지 여부 (기본값: true)
 *
 * - Image
 *   - imgSrc: string — 이미지 URL
 *
 * - Text
 *   - heading: string — 제목 텍스트
 *   - body?: string — 설명 텍스트
 *   - isImageModal?: boolean - 이미지 모달 여부 (이미지 모달은 하단 spacing 이 달라서 해당 prop 으로 spacing 주입)
 *
 * - Buttons
 *   - layout: 'horizontal' | 'vertical' — 버튼 정렬 방향
 *   - buttons: { label: string; onClick: () => void }[] — 버튼 배열
 *
 */

export const OverlayModal = {
  Root,
  Image,
  Text,
  Buttons,
}
