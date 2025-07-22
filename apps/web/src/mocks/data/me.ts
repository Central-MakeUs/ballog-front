import type { MeType } from '@/entities/auth/model/auth.type'

export const me = {
  data: {
    userId: 4,
    email: 'inha0319@naver.com',
    nickname: '구단주',
    baseballTeam: 'LG_TWINS',
    isNewUser: false,
    role: 'USER',
  } as MeType,
  delay: 1000,
}
