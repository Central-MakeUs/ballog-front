import React from 'react'
import {
  DoosanIcon,
  HanwhaIcon,
  KiaIcon,
  KiwoomIcon,
  KtIcon,
  LgIcon,
  LotteIcon,
  NcIcon,
  SamsungIcon,
  SsgIcon,
} from '@ballog/asset/icons'

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

export const TEAMS = {
  DOOSAN_BEARS: '두산 베어스',
  LOTTE_GIANTS: '롯데 자이언츠',
  SAMSUNG_LIONS: '삼성 라이온즈',
  KIWOOM_HEROES: '키움 히어로즈',
  HANWHA_EAGLES: '한화 이글스',
  KIA_TIGERS: 'KIA 타이거즈',
  KT_WIZ: 'KT 위즈',
  LG_TWINS: 'LG 트윈스',
  NC_DINOS: 'NC 다이노스',
  SSG_LANDERS: 'SSG 랜더스',
  NONE: '응원팀 없음',
} as const

export const teams = Object.values(TEAMS)

export type Team = (typeof teams)[number]
export type TeamKey = keyof typeof TEAMS

export const TEAM_ICONS: Record<TeamKey, SvgComponent | null> = {
  DOOSAN_BEARS: DoosanIcon,
  LOTTE_GIANTS: LotteIcon,
  SAMSUNG_LIONS: SamsungIcon,
  KIWOOM_HEROES: KiwoomIcon,
  HANWHA_EAGLES: HanwhaIcon,
  KIA_TIGERS: KiaIcon,
  KT_WIZ: KtIcon,
  LG_TWINS: LgIcon,
  NC_DINOS: NcIcon,
  SSG_LANDERS: SsgIcon,
  NONE: null,
} as const
