import type { TeamRank } from '@/entities/match/model/rank.type'

const UPDATED_AT = '2026.04.17 12:00'

export const teamRanks: { data: TeamRank[]; delay: number } = {
  data: [
    // 기뻐요 우세
    { teamCode: 'SAMSUNG_LIONS', rank: 1, updatedAt: UPDATED_AT, positiveRate: 70, negativeRate: 30 },
    // 화나요 우세
    { teamCode: 'LG_TWINS', rank: 2, updatedAt: UPDATED_AT, positiveRate: 35, negativeRate: 65 },
    // 기뻐요 근소 우세
    { teamCode: 'KT_WIZ', rank: 3, updatedAt: UPDATED_AT, positiveRate: 55, negativeRate: 45 },
    // 화나요 100% (극단)
    { teamCode: 'SSG_LANDERS', rank: 4, updatedAt: UPDATED_AT, positiveRate: 0, negativeRate: 100 },
    // 감정없음 (감정기록 없음)
    { teamCode: 'KIA_TIGERS', rank: 5, updatedAt: UPDATED_AT, positiveRate: 0, negativeRate: 0 },
    // 기뻐요 100% (극단)
    { teamCode: 'NC_DINOS', rank: 6, updatedAt: UPDATED_AT, positiveRate: 100, negativeRate: 0 },
    // 화나요 우세
    { teamCode: 'HANWHA_EAGLES', rank: 7, updatedAt: UPDATED_AT, positiveRate: 25, negativeRate: 75 },
    // 감정없음
    { teamCode: 'LOTTE_GIANTS', rank: 8, updatedAt: UPDATED_AT, positiveRate: 0, negativeRate: 0 },
    // 50:50 동점 → 화나요 우선
    { teamCode: 'DOOSAN_BEARS', rank: 9, updatedAt: UPDATED_AT, positiveRate: 50, negativeRate: 50 },
    // 화나요 우세
    { teamCode: 'KIWOOM_HEROES', rank: 10, updatedAt: UPDATED_AT, positiveRate: 20, negativeRate: 80 },
  ],
  delay: 600,
}
