export const STADIUM = {
  JAMSIL: '잠실종합운동장',
  SAJIK: '사직야구장',
  DAEGU: '대구삼성라이온즈파크',
  GOCHEOK: '고척스카이돔',
  DAEJEON: '대전한화생명이글스파크',
  GWANGJU: '광주기아챔피언스필드',
  SUWON: '수원KT위즈파크',
  CHANGWON: '창원NC파크',
  INCHEON: '인천SSG랜더스필드',
  NONE: '미지정 경기장',
}

export const stadium = Object.values(STADIUM)

export type StadiumKey = keyof typeof STADIUM
export type StadiumValue = (typeof STADIUM)[StadiumKey]
