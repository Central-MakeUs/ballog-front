export const getMatchResult = (homeScore: string, awayScore: string) => {
  const home = Number(homeScore)
  const away = Number(awayScore)

  if (isNaN(home) || isNaN(away)) return { home: '-', away: '-' }

  if (home > away) return { home: '승', away: '패' }
  if (home < away) return { home: '패', away: '승' }
  return { home: '무', away: '무' }
}
