<!-- apps/admin/src/lib/components/EditModal.svelte -->
<script lang="ts">
	import { TEAMS } from '../enums/teams';
	import { STADIUM } from '../enums/stadiums';
	import type { Match, MatchStatus } from '../interface/match';
	import type { TeamKey } from '../enums/teams';
	import type { StadiumKey } from '../enums/stadiums';

	let { match, onSave, onCancel } = $props<{
		match: Match;
		onSave: (updatedMatch: Match) => void;
		onCancel: () => void;
	}>();

	// 폼 데이터를 위한 반응형 상태
	let formData = $state({
		matchesDate: match.matchesDate,
		matchesTime: match.matchesTime,
		homeTeam: match.homeTeam,
		awayTeam: match.awayTeam,
		stadium: match.stadium,
		status: match.status,
		matchesResult: match.matchesResult || ''
	});

	// 상태 옵션들
	const statusOptions: { value: MatchStatus; label: string }[] = [
		{ value: 'SCHEDULED', label: '예정' },
		{ value: 'IN_PROGRESS', label: '진행중' },
		{ value: 'COMPLETED', label: '완료' },
		{ value: 'CANCELED', label: '취소' }
	];

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
		const updatedMatch: Match = {
			...match,
			...formData,
			matchesResult: formData.matchesResult || null
		};
		onSave(updatedMatch);
	};
</script>

<div class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<!-- 홈팀 선택 -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">홈팀</label>
			<select bind:value={formData.homeTeam} class="w-full rounded border border-gray-300 px-3 py-2">
				{#each teamOptions as team}
					<option value={team.value}>{team.label}</option>
				{/each}
			</select>
		</div>

		<!-- 어웨이팀 선택 -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">어웨이팀</label>
			<select bind:value={formData.awayTeam} class="w-full rounded border border-gray-300 px-3 py-2">
				{#each teamOptions as team}
					<option value={team.value}>{team.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<!-- 경기장 선택 -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">경기장</label>
			<select bind:value={formData.stadium} class="w-full rounded border border-gray-300 px-3 py-2">
				{#each stadiumOptions as stadium}
					<option value={stadium.value}>{stadium.label}</option>
				{/each}
			</select>
		</div>

		<!-- 경기 상태 -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">경기 상태</label>
			<select bind:value={formData.status} class="w-full rounded border border-gray-300 px-3 py-2">
				{#each statusOptions as status}
					<option value={status.value}>{status.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<!-- 경기 날짜 -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">경기 날짜</label>
			<input
				type="date"
				bind:value={formData.matchesDate}
				class="w-full rounded border border-gray-300 px-3 py-2"
			/>
		</div>

		<!-- 경기 시간 -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">경기 시간</label>
			<input
				type="time"
				bind:value={formData.matchesTime}
				class="w-full rounded border border-gray-300 px-3 py-2"
			/>
		</div>
	</div>

	<!-- 경기 결과 (선택사항) -->
	<div>
		<label class="block text-sm font-medium text-gray-700 mb-1">경기 결과</label>
		<input
			type="text"
			bind:value={formData.matchesResult}
			placeholder="예: 5-3"
			class="w-full rounded border border-gray-300 px-3 py-2"
		/>
	</div>

	<!-- 버튼 영역 -->
	<div class="flex justify-end gap-2 pt-4">
		<button
			onclick={onCancel}
			class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
		>
			취소
		</button>
		<button
			onclick={handleSave}
			class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
		>
			저장
		</button>
	</div>
</div>