<script lang="ts">
	import '../app.css';
	let { children } = $props();

	const theme = localStorage.getItem('theme') || 'light';
	if (theme === 'dark') {
		document.documentElement.classList.add('dark');
	}
</script>

{@render children()}
