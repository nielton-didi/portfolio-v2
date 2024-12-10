<script lang="ts">
	import type { ExperienceDTO } from '$lib/dto/system.dto';
	import Pills from './Pills.svelte';

	export let experience: ExperienceDTO;
</script>

<div
	class={`bg-light-neutral-10 project-card flex w-full scale-100 flex-row items-start justify-start gap-10 py-6 transition-all duration-500 ease-in-out`}
>
	<!-- leading -->
	<div class={`flex w-1/4 flex-col items-start justify-start`}>
		<p class={`text-light-neutral-110 text-lg font-medium leading-tight tracking-wide`}>
			{experience.position}
		</p>
		<p class={`mt-2 text-md font-light leading-tight text-light-neutral-70`}>
			{experience.companyName}
		</p>
		<p class={`mt-1 text-base font-light leading-tight text-light-neutral-60`}>
			{experience.startYear} to {experience.endYear}
		</p>
	</div>
	<!-- trailing -->
	<div class={`flex w-2/4 flex-col items-center justify-start gap-10`}>
		<p
			class={`text-pretty text-start text-md font-light leading-normal tracking-normal text-light-neutral-70`}
		>
			{experience.jobDescription}
		</p>
		<!-- <ul class={`flex w-full list-disc list-outside flex-col items-start justify-start`}>
			{#each experience.responsibility as item}
				<li class={`text-md font-light text-light-neutral-80`}>{item}</li>
			{/each}
		</ul> -->
	</div>

	<div class={`flex w-1/4 flex-col items-end justify-start`}>
		<div class={`flex w-full flex-row flex-wrap items-center justify-end gap-2`}>
			<!-- {#each experience.skills as skill, i}
				<p class={`text-md font-light text-light-neutral-70`}>
					{skill}
					{#if i != experience.skills.length - 1}
						<span>,</span>
					{/if}
				</p>
			{/each} -->

			{#each experience.skills as skill, i}
				<div class={`flex flex-row items-center justify-start gap-2`}>
					<p class={`text-md font-light leading-normal text-light-neutral-70`}>
						{skill}
					</p>
					{#if i != experience.skills.length - 1} <span class={`leading-tight text-xl font-medium text-light-neutral-50`}>•</span> {/if}
				</div>
			{/each}
		</div>
	</div>
</div>
