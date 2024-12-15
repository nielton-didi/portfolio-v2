<script lang="ts">
	import type { ExperienceDTO } from '$lib/dto/system.dto';
	import Pills from './Pills.svelte';

	export let experience: ExperienceDTO;
</script>

<div
	class={`project-card flex w-full scale-100 flex-col items-start justify-start gap-4 bg-light-neutral-10 dark:bg-dark-neutral-10 py-4 transition-all duration-500 ease-in-out md:flex-row md:gap-10 md:py-6`}
>
	<!-- leading -->
	<div class={`flex w-full flex-col items-start justify-start md:w-1/4`}>
		<p class={`text-light-neutral-110 text-lg font-medium leading-tight tracking-wide text-light-neutral-100 dark:text-dark-neutral-90`}>
			{experience.position}
		</p>
		<p class={`mt-2 text-md font-light leading-tight text-light-neutral-70 dark:text-dark-neutral-40`}>
			{experience.companyName}
		</p>
		<p class={`mt-1 text-base font-light leading-tight text-light-neutral-60 dark:text-dark-neutral-40`}>
			{experience.startYear} to {experience.endYear}
		</p>
	</div>
	<div
		class={`flex w-full flex-col items-start justify-start gap-6 md:w-3/4 md:flex-row md:gap-10`}
	>
		<!-- trailing -->
		<div class={`flex w-full flex-col items-center justify-start gap-10 md:w-2/3`}>
			<p
				class={`text-pretty text-start text-md font-light leading-normal tracking-normal text-light-neutral-70 dark:text-dark-neutral-40 md:text-md`}
			>
				{experience.jobDescription}
			</p>
		</div>

		<div class={`flex w-full flex-col items-start justify-start md:w-1/3 md:items-end`}>
			<div class={`flex w-full flex-row flex-wrap items-center justify-start gap-2 md:justify-end`}>
				{#each experience.skills as skill, i}
					<div class={`flex flex-row items-center justify-start gap-2`}>
						<p class={`text-base font-light leading-normal text-light-neutral-70 dark:text-dark-neutral-40 md:text-md`}>
							{skill}
						</p>
						{#if i != experience.skills.length - 1}
							<span class={`text-xl font-medium leading-tight text-light-neutral-50 dark:text-dark-neutral-30`}>•</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
