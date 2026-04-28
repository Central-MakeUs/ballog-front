import type { TeamRank } from '@/entities/match/model/rank.type'

const UPDATED_AT = '2026.04.17 12:00'

// TODO: 백엔드 명세 나오면 수정
export const teamRanks: { data: TeamRank[]; delay: number } = {
  data: [
    { teamCode: 'SAMSUNG_LIONS', rank: 1, updatedAt: UPDATED_AT, emotion: 'POSITIVE', emotionPercent: 70 },
    { teamCode: 'LG_TWINS', rank: 2, updatedAt: UPDATED_AT, emotion: 'NEGATIVE', emotionPercent: 65 },
    { teamCode: 'KT_WIZ', rank: 3, updatedAt: UPDATED_AT, emotion: 'POSITIVE', emotionPercent: 55 },
    { teamCode: 'SSG_LANDERS', rank: 4, updatedAt: UPDATED_AT, emotion: 'NEGATIVE', emotionPercent: 70 },
    { teamCode: 'KIA_TIGERS', rank: 5, updatedAt: UPDATED_AT, emotion: 'NEUTRAL', emotionPercent: null },
    { teamCode: 'NC_DINOS', rank: 6, updatedAt: UPDATED_AT, emotion: 'POSITIVE', emotionPercent: 60 },
    { teamCode: 'HANWHA_EAGLES', rank: 7, updatedAt: UPDATED_AT, emotion: 'NEGATIVE', emotionPercent: 75 },
    { teamCode: 'LOTTE_GIANTS', rank: 8, updatedAt: UPDATED_AT, emotion: 'NEUTRAL', emotionPercent: null },
    { teamCode: 'DOOSAN_BEARS', rank: 9, updatedAt: UPDATED_AT, emotion: 'POSITIVE', emotionPercent: 50 },
    { teamCode: 'KIWOOM_HEROES', rank: 10, updatedAt: UPDATED_AT, emotion: 'NEGATIVE', emotionPercent: 80 },
  ],
  delay: 600,
}
