import type { PageServerLoad } from './$types';
import { environment } from '../environments/environment.dev';
import type { ApiResponse } from '../lib/interface/apis';
import type { Match } from '../lib/interface/match';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(`${environment.apiUrl}/api/v1/match/all`, {
		headers: {
			Authorization: `${environment.token}`
		}
	});
	const matches: ApiResponse<Match[]> = await response.json();

	return { matches };
};

export const actions = {
	patchMatch: async ({ request }: { request: Request }) => {
		const { updatedMatch } = await request.json();

		const response = await fetch(`${environment.apiUrl}/api/v1/match/${updatedMatch.matchesId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${environment.token}`
			},
			body: JSON.stringify(updatedMatch)
		});

		if (!response.ok) {
			return fail(400, { message: 'Failed to update match' });
		}

		return { success: true };
	},
	deleteMatch: async ({ request }: { request: Request }) => {
		const { matchId } = await request.json();
		const response = await fetch(`${environment.apiUrl}/api/v1/match/${matchId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${environment.token}`
			}
		});

		if (!response.ok) {
			return fail(400, { message: 'Failed to update match' });
		}
		return { success: true };
	},
	createMatch: async ({ request }: { request: Request }) => {
		const { match } = await request.json();

		const response = await fetch(`${environment.apiUrl}/api/v1/match`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${environment.token}`
			},
			body: JSON.stringify(match)
		});
		if (!response.ok) {
			return fail(400, { message: 'Failed to update match' });
		}
		return { success: true };
	}
} satisfies Actions;
