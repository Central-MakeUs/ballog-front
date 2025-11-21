<script lang="ts">
	import { TEAMS } from '../enums/teams';
	import { STADIUM } from '../enums/stadiums';
	import type { Match } from '../interface/match';

	let { match, onEdit, onDelete } = $props<{
		match: Match;
		onEdit: (match: Match) => void;
		onDelete: (match: Match) => void;
	}>();

	// 상태별 색상 매핑
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'SCHEDULED':
				return 'text-blue-600';
			case 'IN_PROGRESS':
				return 'text-green-600';
			case 'COMPLETED':
				return 'text-gray-600';
			case 'CANCELED':
				return 'text-red-600';
			default:
				return 'text-gray-500';
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case 'SCHEDULED':
				return '예정';
			case 'IN_PROGRESS':
				return '진행중';
			case 'COMPLETED':
				return '완료';
			case 'CANCELED':
				return '취소';
			default:
				return status;
		}
	};
</script>

<div class="rounded-lg border p-4 transition-colors hover:bg-gray-50">
	<div class="flex items-center justify-between">
		<div class="flex-1">
			<div class="flex items-center gap-4">
				<div class="text-lg font-medium">
					{TEAMS[match.homeTeam] || match.homeTeam}
				</div>
				<div class="text-gray-400">vs</div>
				<div class="text-lg font-medium">
					{TEAMS[match.awayTeam] || match.awayTeam}
				</div>
			</div>

			<div class="mt-2 text-sm text-gray-600">
				<div>경기장: {STADIUM[match.stadium] || match.stadium}</div>
				<div>시간: {match.matchesTime}</div>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<div class="text-right">
				<div class="text-sm font-medium {getStatusColor(match.status)}">
					{getStatusText(match.status)}
				</div>
				{#if match.matchesResult}
					<div class="mt-1 text-sm text-gray-600">
						{match.matchesResult}
					</div>
				{/if}
			</div>

			<!-- 수정/삭제 버튼 -->
			<div class="flex gap-2">
				<button
					onclick={() => onEdit(match)}
					class="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
				>
					수정
				</button>
				<button
					onclick={() => onDelete(match)}
					class="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
				>
					삭제
				</button>
			</div>
		</div>
	</div>
</div>
