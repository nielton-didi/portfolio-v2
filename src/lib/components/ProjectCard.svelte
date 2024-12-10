<script lang="ts">
	import type { ProjectDTO } from '$lib/dto/system.dto';
	export let project: ProjectDTO;
</script>

<div
	class={`bg-light-neutral-10 project-card flex w-full scale-100 flex-row items-start justify-start gap-10 py-6 transition-all duration-500 ease-in-out group`}
>
	<!-- title -->
	<div class={`flex w-1/5 flex-col items-start justify-start`}>
		<p class={`text-light-neutral-110 text-lg font-medium leading-tight tracking-wide`}>
			{project.title}
		</p>

		{#if project.redirectUrl != ''}
			<a
				href={project.redirectUrl}
				target="_blank"
				class={`text-md font-light mt-4 text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline`}
				>{project.redirectPhrase}</a
			>
		{/if}
	</div>
	<!-- description -->
	<!-- trailing -->
	<div class={`flex w-2/5 flex-col items-center justify-start gap-10`}>
		<p
			class={`text-pretty text-start text-md font-light leading-normal tracking-normal text-light-neutral-70`}
		>
			{project.description}
		</p>
	</div>

	<div class={`flex w-1/5 flex-col items-end justify-start`}>
		<div class={`flex w-full flex-row flex-wrap items-start justify-end gap-2`}>
			{#each project.skills as skill, i}
				<div class={`flex flex-row items-center justify-start gap-2`}>
					<p class={`text-md font-light leading-normal text-light-neutral-70`}>
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
	<div class={`flex w-2/5 flex-col items-start justify-start`}>
		<div
			class={`flex aspect-video w-full flex-col items-center justify-center overflow-hidden border border-light-neutral-20 bg-light-neutral-20`}
		>
			<img
				src={project.imageUrl}
				class={`opacity-30 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100`}
				alt="project"
				srcset=""
			/>
		</div>
	</div>
</div>
