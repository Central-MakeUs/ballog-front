<script lang="ts">
	import type { PageProps } from './$types';
	import Modal from '../lib/components/Modal.svelte';
	import DeleteModal from '../lib/components/DeleteModal.svelte';
	import MatchItem from '../lib/components/MatchItem.svelte';
	import CreateModal from '../lib/components/CreateModal.svelte';
	import type { Match } from '../lib/interface/match';
	import EditModal from '../lib/components/EditModal.svelte';
	import type { TeamKey } from '../lib/enums/teams';
	import type { StadiumKey } from '../lib/enums/stadiums';
	import type { MatchStatus } from '../lib/interface/match';

	let { data }: PageProps = $props();

	// 응답 데이터에서 matches 정보 추출
	const matchesData = data.matches?.data || {};

	// 날짜별로 정렬된 배열 생성
	const sortedDates = Object.keys(matchesData);

	// 모달 상태
	let showEditModal = $state(false);
	let showDeleteModal = $state(false);
	let showCreateModal = $state(false);

	// 선택된 match 저장
	let selectedMatch = $state<Match>();

	// 파일 input 참조
	let fileInput: HTMLInputElement;

	const excelConfig = [
		'matchesDate',
		'matchesTime',
		'homeTeam',
		'awayTeam',
		'stadium',
		'status',
		'matchesResult'
	];

	const deleteMatch = async (match: Match) => {
		const response = await fetch('?/deleteMatch', {
			method: 'POST',
			body: JSON.stringify({
				matchId: match.matchesId
			})
		});

		const result = await response.json();

		if (result.type === 'success') {
			showDeleteModal = false;
			window.location.reload();
		} else {
			// 에러 처리 추가
			alert('삭제에 실패했습니다.');
		}
	};

	const updateMatch = async (updatedMatch: Match) => {
		const response = await fetch('?/patchMatch', {
			method: 'POST',
			body: JSON.stringify({
				updatedMatch
			})
		});

		const result = await response.json();

		if (result.type === 'success') {
			showEditModal = false;
			window.location.reload();
		}
	};

	const createMatch = async (newMatch: Omit<Match, 'matchesId'>) => {
		const response = await fetch('?/createMatch', {
			method: 'POST',
			body: JSON.stringify({
				match: newMatch
			})
		});
		const result = await response.json();
		if (result.type === 'success') {
			showCreateModal = false;
			window.location.reload();
		}
	};

	// 이벤트 핸들러들
	const handleEdit = (match: Match) => {
		selectedMatch = match;
		showEditModal = true;
	};

	const handleDelete = (match: Match) => {
		selectedMatch = match;
		showDeleteModal = true;
	};

	const handleCreate = () => {
		showCreateModal = true;
	};

	// CSV 파일 업로드 핸들러
	const handleFileUpload = () => {
		fileInput?.click();
	};

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = async (e) => {
				const csvContent = e.target?.result as string;
				const length = csvContent.split('\n').length;

				if (length > 1) {
					const matchData = csvContent
						.split('\n')
						.slice(1)
						.map((row) => row.split(','));
					const createMatchPromise = [
						...matchData.map((row) => {
							const match = {
								matchesDate: row[0],
								matchesTime: row[1],
								homeTeam: row[2] as TeamKey,
								awayTeam: row[3] as TeamKey,
								stadium: row[4] as StadiumKey,
								status: row[5] as MatchStatus,
								matchesResult: row[6] as string | null
							};
							return createMatch(match);
						})
					];
					await Promise.all(createMatchPromise);
				}
			};

			reader.onerror = () => {
				console.error('파일 읽기 실패');
			};

			reader.readAsText(file, 'UTF-8');
		}
	};
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold">경기 일정</h1>
		<div class="flex gap-3">
			<button
				onclick={handleFileUpload}
				class="rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
			>
				CSV 업로드
			</button>
			<input
				bind:this={fileInput}
				type="file"
				accept=".csv"
				onchange={handleFileChange}
				class="hidden"
			/>
			<button
				onclick={handleCreate}
				class="rounded bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
			>
				+ 경기 추가
			</button>
		</div>
	</div>

	{#if sortedDates.length === 0}
		<div class="text-center text-gray-500">등록된 경기가 없습니다.</div>
	{:else}
		<div class="space-y-8">
			{#each sortedDates as date}
				<div class="rounded-lg bg-white p-6 shadow-md">
					<h2 class="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">
						{new Date(date).toLocaleDateString('ko-KR', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							weekday: 'long'
						})}
					</h2>

					<div class="grid gap-4">
						{#each matchesData[date] as match}
							<MatchItem
								{match}
								onEdit={(match) => {
									const { matchesDate, ...rest } = match;
									return handleEdit({ ...rest, matchesDate: date });
								}}
								onDelete={(match) => {
									const { matchesDate, ...rest } = match;
									return handleDelete({ ...rest, matchesDate: date });
								}}
							/>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- 삭제 모달 -->
<Modal bind:showModal={showDeleteModal}>
	{#snippet header()}
		<h2>삭제</h2>
	{/snippet}

	{#if selectedMatch}
		<DeleteModal
			match={selectedMatch}
			onDelete={deleteMatch}
			onCancel={() => {
				showDeleteModal = false;
			}}
		/>
	{/if}
</Modal>

<!-- 수정 모달 -->
<Modal bind:showModal={showEditModal}>
	{#snippet header()}
		<h2>경기 수정</h2>
	{/snippet}

	{#if selectedMatch}
		<EditModal
			match={selectedMatch}
			onSave={updateMatch}
			onCancel={() => {
				showEditModal = false;
			}}
		/>
	{/if}
</Modal>

<!-- 추가 모달 -->
<Modal bind:showModal={showCreateModal}>
	{#snippet header()}
		<h2>경기 추가</h2>
	{/snippet}

	<CreateModal
		onSave={createMatch}
		onCancel={() => {
			showCreateModal = false;
		}}
	/>
</Modal>
