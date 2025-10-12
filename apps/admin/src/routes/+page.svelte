<script lang="ts">
	import type { PageProps } from './$types';
	import Modal from '../lib/components/Modal.svelte';
	import DeleteModal from '../lib/components/DeleteModal.svelte';
	import MatchItem from '../lib/components/MatchItem.svelte';
	import CreateModal from '../lib/components/CreateModal.svelte';
	import { goto } from '$app/navigation';
	import type { Match } from '../lib/interface/match';
	import EditModal from '../lib/components/EditModal.svelte';

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
	let selectedMatch = $state<Match | null>(null);

	const deleteMatch = async (match: Match) => {
		const formData = new FormData();
		formData.append('matchId', match.matchesId.toString());

		// deleteMatch action 호출
		const response = await fetch('?/deleteMatch', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// 성공 시 모달 닫기 및 페이지 새로고침
			showDeleteModal = false;
			window.location.reload();
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

	const createMatch = async (newMatch: Omit<Match, 'matchesId' | 'matchesResult'>) => {
		console.log(newMatch);
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
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold">경기 일정</h1>
		<button
			onclick={handleCreate}
			class="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700 transition-colors"
		>
			+ 경기 추가
		</button>
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
							<MatchItem {match} 
								onEdit={(match) => {
									const { matchesDate, ...rest } = match;
									return handleEdit({...rest, matchesDate: date});
								}} 
								onDelete={(match) => {
									const { matchesDate, ...rest } = match;
									return handleDelete({...rest, matchesDate: date});
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

	<DeleteModal
		onDelete={(match) => {
			deleteMatch(match);
		}}
		onCancel={() => {
			showDeleteModal = false;
		}}
	/>
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