import { Root } from './Root'
import { Icon } from './Icon'
import { Info } from './Info'
import { IconWrapper } from './IconWrapper'

/**
 * RecordingCard
 *
 *
 * 컴포넌트 구성:
 * - `RecordingCard.Root`: 전체 레이아웃 컨테이너
 * - `RecordingCard.Icon`: 직관 상태에 따른 아이콘 (활성/비활성)
 * - `RecordingCard.Info`: 경기 정보 표시 영역 (홈팀, 어웨이팀, 장소, 시간)
 *
 * @example 기본 사용법
 * ```tsx
 * <RecordingCard.Root>
 *   <RecordingCard.Icon state="active" />
 *   <RecordingCard.Info
 *     homeTeam="LG 트윈스"
 *     awayTeam="SSG 랜더스"
 *     stadium="잠실야구장"
 *     date="2025.07.09 (수) 오후 6:30"
 *   />
 * </RecordingCard.Root>
 * ```
 */
export const RecordingCard = {
  Root,
  Icon,
  Info,
  IconWrapper,
}
