import ChangwonNCPark from '@/assets/stadium/ChangwonNCPark.png'
import GocheokDome from '@/assets/stadium/GocheokDome.png'
import HanhwaBallPark from '@/assets/stadium/HanhwaBallPark.png'
import JamsilStadium from '@/assets/stadium/JamsilStadium.png'
import KiaChampionsField from '@/assets/stadium/KiaChampionsField.png'
import KTWizPark from '@/assets/stadium/KTWizPark.png'
import SSGLandersField from '@/assets/stadium/SSGLandersField.png'
import SajikStadium from '@/assets/stadium/SajikStadium.png'
import SamsungLionsPark from '@/assets/stadium/SamsungLionsPark.png'

export const STADIUM = {
  JAMSIL: '잠실경기장',
  SAJIK: '사직야구장',
  DAEGU: '대구삼성라이온즈파크',
  GOCHUK: '고척스카이돔',
  DAEJEON: '대전한화생명볼파크',
  GWANGJU: '광주기아챔피언스필드',
  SUWON: '수원KT위즈파크',
  CHANGWON: '창원NC파크',
  INCHEON: '인천SSG랜더스필드',
  NONE: '미지정 경기장',
}

export const stadium = Object.values(STADIUM)

export const STADIUM_IMAGES: Record<StadiumKey, string> = {
  JAMSIL: JamsilStadium,
  SAJIK: SajikStadium,
  DAEGU: SamsungLionsPark,
  GOCHUK: GocheokDome,
  DAEJEON: HanhwaBallPark,
  GWANGJU: KiaChampionsField,
  SUWON: KTWizPark,
  CHANGWON: ChangwonNCPark,
  INCHEON: SSGLandersField,
  NONE: KTWizPark,
}

export const getStadiumName = (key: StadiumKey): StadiumValue => STADIUM[key]

export const getStadiumInfo = (key: StadiumKey) => ({
  stadiumName: STADIUM[key],
  StadiumImage: STADIUM_IMAGES[key],
})

export type StadiumKey = keyof typeof STADIUM
export type StadiumValue = (typeof STADIUM)[StadiumKey]
