import type { ComponentType, SVGProps } from 'react'

import ChangwonNCPark from '@/assets/stadium/ChangwonNCPark.svg?react'
import GocheokDome from '@/assets/stadium/GocheokDome.svg?react'
import HanhwaBallPark from '@/assets/stadium/HanhwaBallPark.svg?react'
import JamsilStadium from '@/assets/stadium/JamsilStadium.svg?react'
import KiaChampionsField from '@/assets/stadium/KIAChampionsField.svg?react'
import KTWizPark from '@/assets/stadium/KTWizPark.svg?react'
import SSGLandersField from '@/assets/stadium/SSGLandersField.svg?react'
import SajikStadium from '@/assets/stadium/SajikStadium.svg?react'
import SamsungLionsPark from '@/assets/stadium/SamsungLionsPark.svg?react'

export const STADIUM = {
  JAMSIL: '잠실경기장',
  SAJIK: '사직야구장',
  DAEGU: '대구삼성라이온즈파크',
  GOCHEOK: '고척스카이돔',
  DAEJEON: '대전한화생명볼파크',
  GWANGJU: '광주기아챔피언스필드',
  SUWON: '수원KT위즈파크',
  CHANGWON: '창원NC파크',
  INCHEON: '인천SSG랜더스필드',
  NONE: '미지정 경기장',
}

export const stadium = Object.values(STADIUM)

type StadiumIcon = ComponentType<SVGProps<SVGSVGElement>>

const EmptyIcon: StadiumIcon = () => null

export const STADIUM_IMAGES: Record<StadiumKey, StadiumIcon> = {
  JAMSIL: JamsilStadium,
  SAJIK: SajikStadium,
  DAEGU: SamsungLionsPark,
  GOCHEOK: GocheokDome,
  DAEJEON: HanhwaBallPark,
  GWANGJU: KiaChampionsField,
  SUWON: KTWizPark,
  CHANGWON: ChangwonNCPark,
  INCHEON: SSGLandersField,
  NONE: EmptyIcon,
}

export const getStadiumName = (key: StadiumKey): StadiumValue => STADIUM[key]

export const getStadiumInfo = (key: StadiumKey) => ({
  stadiumName: STADIUM[key],
  StadiumImage: STADIUM_IMAGES[key],
})

export type StadiumKey = keyof typeof STADIUM
export type StadiumValue = (typeof STADIUM)[StadiumKey]
