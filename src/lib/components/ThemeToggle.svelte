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
	type="button"
	on:click={toggleTheme}
	aria-label="dark-mode"
	class={`flex flex-row items-center justify-start gap-1`}
>
	<!-- <div
		class={`flex w-8 min-w-8 flex-row items-center justify-start rounded-full bg-light-neutral-30 p-1 dark:justify-end dark:bg-dark-neutral-30`}
	>
		<div class={`aspect-square w-3 rounded-full bg-light-neutral-60 dark:bg-dark-neutral-60`}></div>
	</div> -->
	<div class="flex h-full flex-row items-center justify-center">
		<span
			class={`align-middle leading-none tracking-tight text-light-neutral-100 dark:text-dark-neutral-100`}
		>
			{#if currentTheme == 'light'}
				<svg viewBox="0 0 25 25" width="24" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							d="M19.6065 16.1775C18.9417 16.387 18.234 16.5 17.5 16.5C13.634 16.5 10.5 13.366 10.5 9.5C10.5 7.54163 11.3042 5.77109 12.6004 4.50062C12.567 4.50021 12.5335 4.5 12.5 4.5C8.08172 4.5 4.5 8.08172 4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C15.5924 20.5 18.275 18.7454 19.6065 16.1775Z"
							stroke="currentColor"
							stroke-width="1.2"
						></path>
					</g></svg
				>
			{:else}
				<svg viewBox="0 0 25 25" width="24" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							d="M19 12.5H22M3 12.5H6M12.5 6V3M12.5 22V19M17.3891 7.61091L19.5104 5.48959M5.48959 19.5104L7.61091 17.3891M7.61091 7.61091L5.48959 5.48959M19.5104 19.5104L17.3891 17.3891M16 12.5C16 14.433 14.433 16 12.5 16C10.567 16 9 14.433 9 12.5C9 10.567 10.567 9 12.5 9C14.433 9 16 10.567 16 12.5Z"
							stroke="currentColor"
							stroke-width="1.2"
						></path>
					</g></svg
				>
			{/if}
		</span>
	</div>
</button>
