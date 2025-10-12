<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const fetchMatches = async () => {
		try {
			const response = await fetch(`https://ballog.shop/api/v1/match/all`, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzYwNzc0MDA3fQ.WSClN0WcTo2fHyqJQ4cwzpaczJ4Z3_lCX9qK2ADanNk`
				}
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Fetch error:', error);
			throw error;
		}
	};

	$effect(() => {
		fetchMatches();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
