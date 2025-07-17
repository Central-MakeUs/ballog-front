import { Arrow } from './Arrow'
import { Root } from './Root'
import { SwitchItem } from './SwitchItem'
import { Text } from './Text'

/**
 * 
 * 구성: 좌측 텍스트, 우측 스위치
 * 
 * 일반적인 사용법
 * <List.Root>
 *   <List.Text>응원 팀 변경</List.Text>
 *   <List.Arrow onClick={handleClick} />
 * </List.Root>
 * 
 */
export const List = {
  Arrow,
  Root,
  SwitchItem,
  Text,
}
