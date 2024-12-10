<script lang="ts">
	import type { ExperienceDTO } from '$lib/dto/system.dto';
	import Pills from './Pills.svelte';

	export let experience: ExperienceDTO;
</script>

<div
	class={`project-card flex w-full scale-100 flex-col items-start justify-start gap-4 bg-light-neutral-10 md:py-6 py-4 transition-all duration-500 ease-in-out md:flex-row md:gap-10`}
>
	<!-- leading -->
	<div class={`flex md:w-1/4 w-full flex-col items-start justify-start`}>
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
	<div class={`flex md:w-3/4 w-full md:flex-row flex-col items-start justify-start md:gap-10 gap-6`}>
		<!-- trailing -->
		<div class={`flex md:w-2/3 w-full flex-col items-center justify-start gap-10`}>
			<p
				class={`text-pretty text-start md:text-md text-base font-light leading-normal tracking-normal text-light-neutral-70`}
			>
				{experience.jobDescription}
			</p>
		</div>

		<div class={`flex md:w-1/3 w-full flex-col md:items-end items-start justify-start`}>
			<div class={`flex w-full flex-row flex-wrap items-center md:justify-end justify-start gap-2`}>
				{#each experience.skills as skill, i}
					<div class={`flex flex-row items-center justify-start gap-2`}>
						<p class={`md:text-md text-base font-light leading-normal text-light-neutral-70`}>
							{skill}
						</p>
						{#if i != experience.skills.length - 1}
							<span class={`text-xl font-medium leading-tight text-light-neutral-50`}>•</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
