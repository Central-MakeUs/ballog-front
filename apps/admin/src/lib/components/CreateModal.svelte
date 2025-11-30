<script lang="ts">
	import { TEAMS } from '../enums/teams';
	import { STADIUM } from '../enums/stadiums';
	import type { Match, MatchStatus } from '../interface/match';
	import type { TeamKey } from '../enums/teams';
	import type { StadiumKey } from '../enums/stadiums';

	let { onSave, onCancel } = $props<{
		onSave: (newMatch: Omit<Match, 'matchesId'>) => void;
		onCancel: () => void;
	}>();

	let formData = $state({
		matchesDate: '',
		matchesTime: '',
		homeTeam: 'SSG' as TeamKey,
		awayTeam: 'LG' as TeamKey,
		stadium: 'SSG_LANDERS_FIELD' as StadiumKey,
		status: 'SCHEDULED' as MatchStatus
	});

	// 팀 옵션들
	const teamOptions = Object.entries(TEAMS).map(([key, value]) => ({
		value: key as TeamKey,
		label: value
	}));

	// 경기장 옵션들
	const stadiumOptions = Object.entries(STADIUM).map(([key, value]) => ({
		value: key as StadiumKey,
		label: value
	}));

	const handleSave = () => {
		const newMatch: Omit<Match, 'matchesId' | 'matchesResult'> = {
			...formData
		};
		onSave(newMatch);
	};
</script>

<div class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<!-- 홈팀 선택 -->
		<div>
			<label class="mb-1 block text-sm font-medium text-gray-700">홈팀</label>
			<select
				bind:value={formData.homeTeam}
				class="w-full rounded border border-gray-300 px-3 py-2"
			>
				{#each teamOptions as team}
					<option value={team.value}>{team.label}</option>
				{/each}
			</select>
		</div>

		<!-- 어웨이팀 선택 -->
		<div>
			<label class="mb-1 block text-sm font-medium text-gray-700">어웨이팀</label>
			<select
				bind:value={formData.awayTeam}
				class="w-full rounded border border-gray-300 px-3 py-2"
			>
				{#each teamOptions as team}
					<option value={team.value}>{team.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<!-- 경기장 선택 -->
		<div>
			<label class="mb-1 block text-sm font-medium text-gray-700">경기장</label>
			<select bind:value={formData.stadium} class="w-full rounded border border-gray-300 px-3 py-2">
				{#each stadiumOptions as stadium}
					<option value={stadium.value}>{stadium.label}</option>
				{/each}
			</select>
		</div>

		<!-- 경기 날짜 -->
		<div>
			<label class="mb-1 block text-sm font-medium text-gray-700">경기 날짜</label>
			<input
				type="date"
				bind:value={formData.matchesDate}
				class="w-full rounded border border-gray-300 px-3 py-2"
			/>
		</div>
	</div>

	<!-- 경기 시간 -->
	<div>
		<label class="mb-1 block text-sm font-medium text-gray-700">경기 시간</label>
		<input
			type="time"
			bind:value={formData.matchesTime}
			class="w-full rounded border border-gray-300 px-3 py-2"
		/>
	</div>

	<!-- 버튼 영역 -->
	<div class="flex justify-end gap-2 pt-4">
		<button onclick={onCancel} class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
			취소
		</button>
		<button
			onclick={handleSave}
			class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
		>
			추가
		</button>
	</div>
</div>
