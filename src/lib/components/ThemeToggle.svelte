<script lang="ts">
	import { theme } from '$lib/store/theme.store';
	import { get } from 'svelte/store';

	let currentTheme: 'light' | 'dark' = get(theme);

	const toggleTheme = () => {
		theme.set(currentTheme === 'light' ? 'dark' : 'light');
	};

	$: currentTheme = $theme; // Reactive subscription
</script>

<button
	on:click={toggleTheme}
	class="rounded bg-gray-200 p-2 text-black dark:bg-gray-800 dark:text-white"
>
	{currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
</button>
