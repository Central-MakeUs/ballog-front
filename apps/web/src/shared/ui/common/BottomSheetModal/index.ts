import { Root } from './Root'
import { Text } from './Text'
import { Image } from './Image'
import { Buttons } from './Buttons'
import { PortalBottomSheet } from './PortalBottomSheet'

/**
 * BottomSheetModal - 화면 하단에서 올라오는 바텀시트 모달 컴포넌트 세트
 *
 * Emotion UI 디자인 시스템 기반의 바텀시트 형태 모달입니다.
 * 이미지와 텍스트, 버튼 두 개로 구성된 구조이며, 버튼 클릭 혹은 배경 클릭으로 닫을 수 있습니다.
 *
 * @usage
 * ```tsx
 * <BottomSheetModal.Root open={open} onOpenChange={setOpen}>
 *   <BottomSheetModal.Text heading="제목" body="설명" />
 *   <BottomSheetModal.Image src="/img/example.png" />
 *   <BottomSheetModal.Buttons
 *     buttons={[
 *       { label: '취소', onClick: () => {} },
 *       { label: '확인', onClick: () => {} },
 *     ]}
 *   />
 * </BottomSheetModal.Root>
 * ```
 *
 * @components
 * - Root: 모달의 최상위 컴포넌트 (배경/위치 컨트롤 포함)
 * - Text: 제목과 설명 영역
 * - Image: 중앙 이미지 영역
 * - Buttons: 하단 버튼 영역 (2개 버튼 고정)
 *
 * @props
 * - Root
 *   - open: boolean — 모달 열림 여부
 *   - onOpenChange: (open: boolean) => void — 모달 열림 상태 변경 핸들러
 *   - dismissible?: boolean — 배경 클릭 시 닫기 허용 여부 (기본값: false)
 *
 * - Text
 *   - heading: string — 제목 텍스트
 *   - body?: string — 설명 텍스트 (선택)
 *
 * - Image
 *   - src: string — 이미지 URL
 *   - alt?: string — 이미지 대체 텍스트 (기본값: '모달 이미지')
 *
 * - Buttons
 *   - buttons: [ { label: string; onClick: () => void }, { label: string; onClick: () => void } ]
 *     — 두 개의 버튼 객체 배열 (왼쪽 버튼 / 오른쪽 버튼)
 */

export const BottomSheetModal = {
  PortalBottomSheet,
  Root,
  Text,
  Image,
  Buttons,
}
