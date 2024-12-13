<script lang="ts">
	import type { ProjectDTO } from '$lib/dto/system.dto';
	export let project: ProjectDTO;
</script>

<div
	class={`project-card flex w-full scale-100 flex-col items-start justify-start gap-4 bg-light-neutral-10 py-4 transition-all duration-500 ease-in-out md:flex-row md:gap-10 md:py-6 group`}
>
	<!-- title -->
	<div
		class={`flex w-full flex-row items-start justify-between gap-4 md:w-1/5 md:flex-col md:justify-start`}
	>
		<p class={`text-light-neutral-110 text-lg font-medium leading-tight tracking-wide`}>
			{project.title}
		</p>

		{#if project.redirectUrl != ''}
			<a
				href={project.redirectUrl}
				target="_blank"
				class={` text-nowrap text-base font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-md`}
				>{project.redirectPhrase}</a
			>
		{/if}
	</div>
	<!-- description -->
	<div class={`flex md:w-2/5 w-full flex-col md:items-center items-start justify-start gap-10`}>
		<p
			class={`text-pretty text-start md:text-md text-base font-light leading-normal tracking-normal text-light-neutral-70`}
		>
			{project.description}
		</p>
	</div>
	
	<div class={`flex md:w-1/5 w-full flex-col md:items-end items-start justify-start`}>
		<div class={`flex w-full flex-row flex-wrap items-center md:justify-end justify-start gap-2`}>
			{#each project.skills as skill, i}
				<div class={`flex flex-row items-center justify-start gap-2`}>
					<p class={`md:text-md text-base font-light leading-normal text-light-neutral-70`}>
						{skill}
					</p>
					{#if i != project.skills.length - 1}
						<span class={`text-xl font-medium leading-tight text-light-neutral-50`}>•</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- title -->
	<div class={`flex md:w-2/5 w-full flex-col items-start justify-start`}>
		<div
			class={`flex aspect-video w-full flex-col items-center justify-center overflow-hidden border border-light-neutral-20 bg-light-neutral-20`}
		>
			<img
				src={project.imageUrl}
				class={`md:opacity-30 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100`}
				alt="project"
				srcset=""
			/>
		</div>
	</div>
</div>
