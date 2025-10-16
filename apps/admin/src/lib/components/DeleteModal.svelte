<script lang="ts">
	import type { Match } from '../interface/match';

	let { onDelete, onCancel } = $props<{
		onDelete: (match: Match) => void;
		onCancel: () => void;
	}>();
</script>

<div>
	<p>정말 삭제하시겠어요?</p>
	<p>삭제된 데이터는 복구할 수 없습니다.</p>
	<div>
		<button onclick={onCancel}>취소</button>
		<button onclick={onDelete}>삭제</button>
	</div>
</div>
