<script lang="ts">
	export let title: string = '';
</script>

<div
	class={`flex h-8 flex-row items-center justify-center rounded-full bg-light-neutral-30 px-2 md:px-4`}
>
	<p class={`text-md font-normal text-light-neutral-80 leading-tight`}>
		{title}
	</p>
</div>
