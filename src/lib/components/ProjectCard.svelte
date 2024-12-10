<script lang="ts">
	import type { ProjectDTO } from '$lib/dto/system.dto';
	import Pills from './Pills.svelte';
	export let project: ProjectDTO;
	export let reversed: boolean = false;
</script>

<div
	class={`flex w-full ${reversed ? `flex-row-reverse` : `flex-row`} items-start justify-center gap-6`}
>
	<!-- photo -->
	<div
		class={`group flex aspect-video w-full max-w-full flex-col items-center justify-center overflow-clip rounded-xl bg-light-neutral-20 brightness-95 transition-all duration-300 ease-in-out hover:shadow-lg hover:brightness-100`}
	>
		<img
			src={project.imageUrl}
			class={`aspect-video h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105`}
			alt="ivs-mobile"
			srcset=""
		/>
	</div>
	<!-- details -->
	<div class={`flex w-full max-w-full flex-col ${reversed ? `items-end` : `items-start`} justify-start`}>
		<p class={`text-2xl font-semibold leading-tight text-light-neutral-100 mt-4`}>{project.title}</p>
		<p class={`mt-2 max-w-md text-lg font-light leading-normal text-light-neutral-80`}>
			{project.description}
		</p>
		<div class={`mt-10 flex w-full max-w-full flex-row flex-wrap ${reversed ? `justify-end` : `justify-start`} items-start gap-2`}>
			{#each project.skills as skill}
				<Pills title={skill}></Pills>
			{/each}
		</div>
	</div>
</div>
