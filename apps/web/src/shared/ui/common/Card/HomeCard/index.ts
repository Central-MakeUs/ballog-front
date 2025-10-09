import { HomeCardRoot } from './HomeCardRoot'
import { HomeCardStadiumInfo } from './HomeCardStadiumInfo'
import { HomeCardDetailInfo } from './HomeCardDetailInfo'
import { HomeCardResultInfo } from './HomeCardResultInfo'
import { Disabled } from './Disabled'

/**
 * HomeCard
 *
 *
 * 컴포넌트 구성:
 * - `HomeCard.Root`: 카드 전체 레이아웃 컨테이너
 * - `HomeCard.MatchInfo`: 홈/원정 팀 정보 표시 영역
 * - `HomeCard.DetailInfo`: 경기장 및 시간 표시 영역
 * - `HomeCard.Footer`: 버튼 등 추가 UI를 하단에 배치하는 영역
 * - `HomeCard.Disabled`: 경기 정보가 없을 경우 표시하는 비활성 상태 카드
 *
 * @example 기본 카드
 * ```tsx
 * <HomeCard.Root>
 *   <HomeCard.MatchInfo homeTeam="LG 트윈스" awayTeam="SSG 랜더스" />
 *   <HomeCard.DetailInfo stadium="잠실야구장" dateTime="2025.07.09 (수) 오후 6:30" />
 *   <HomeCard.Footer>
 *     <Button>기록 시작하기</Button>
 *   </HomeCard.Footer>
 * </HomeCard.Root>
 * ```
 */

export const HomeCard = {
  Root: HomeCardRoot,
  StadiumInfo: HomeCardStadiumInfo,
  DetailInfo: HomeCardDetailInfo,
  ResultInfo: HomeCardResultInfo,
  Disabled,
}
