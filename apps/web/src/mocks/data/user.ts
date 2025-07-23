import type { UserType } from '@/entities/auth/model/auth.type'

export const user: { data: UserType; delay: number } = {
  data: {
    userId: 4,
    email: 'inha0319@naver.com',
    nickname: '구단주',
    baseballTeam: 'LG_TWINS',
    isNewUser: false,
    role: 'USER',
  },
  delay: 1000,
}
