import type { StadiumKey } from '@/lib/enums/stadiums';
import type { TeamKey } from '@/lib/enums/teams';

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

export interface Match {
	matchesId: number;
	matchesDate: string;
	matchesTime: string;
	homeTeam: TeamKey;
	awayTeam: TeamKey;
	stadium: StadiumKey;
	matchesResult: null;
	status: MatchStatus;
}
