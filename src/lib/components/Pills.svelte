<script lang="ts">
	export let title: string = '';
</script>

<div
	class={`flex h-7 flex-row items-center justify-center rounded-full bg-light-neutral-20 px-2 md:px-4`}
>
	<p class={`text-base font-normal text-light-neutral-70 leading-tight`}>
		{title}
	</p>
</div>
