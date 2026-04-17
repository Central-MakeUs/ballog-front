import type { TeamRank } from '@/entities/match/model/rank.type'

const UPDATED_AT = '2026.04.17 12:00'

export const teamRanks: { data: TeamRank[]; delay: number } = {
  data: [
    { teamCode: 'SAMSUNG_LIONS', rank: 1, updatedAt: UPDATED_AT },
    { teamCode: 'LG_TWINS', rank: 2, updatedAt: UPDATED_AT },
    { teamCode: 'KT_WIZ', rank: 3, updatedAt: UPDATED_AT },
    { teamCode: 'SSG_LANDERS', rank: 4, updatedAt: UPDATED_AT },
    { teamCode: 'KIA_TIGERS', rank: 5, updatedAt: UPDATED_AT },
    { teamCode: 'NC_DINOS', rank: 6, updatedAt: UPDATED_AT },
    { teamCode: 'HANWHA_EAGLES', rank: 7, updatedAt: UPDATED_AT },
    { teamCode: 'LOTTE_GIANTS', rank: 8, updatedAt: UPDATED_AT },
    { teamCode: 'DOOSAN_BEARS', rank: 9, updatedAt: UPDATED_AT },
    { teamCode: 'KIWOOM_HEROES', rank: 10, updatedAt: UPDATED_AT },
  ],
  delay: 600,
}
