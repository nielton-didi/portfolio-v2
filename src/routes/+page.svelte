<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	export let data: PageData;

	let activeSection: string | null = null; // Tracks the current active section
	const sections = [
		{
			key: 'home',
			value: '/'
		},
		{
			key: 'about',
			value: '#about'
		},
		{
			key: 'experience',
			value: '#experience'
		},
		{
			key: 'projects',
			value: '#projects'
		},
		{
			key: 'contact',
			value: '#contact'
		}
	];

	onMount(() => {
		const observerOptions = {
			root: null, // Use the viewport as the root
			threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 1% increments
		};

		// Create a shared observer
		const observer = new IntersectionObserver((entries) => {
			const viewportHeight = window.innerHeight; // Get viewport height

			entries.forEach((entry) => {
				const visibleHeight = entry.boundingClientRect.height * entry.intersectionRatio; // Calculate visible height
				const coveredPercent = visibleHeight / viewportHeight; // Calculate how much viewport is covered

				// Logic for project cards scaling and opacity
				if (entry.target.classList.contains('project-card')) {
					if (entry.isIntersecting) {
						entry.target.classList.replace('scale-90', 'scale-100');
						entry.target.classList.replace('opacity-20', 'opacity-100');
					} else {
						entry.target.classList.replace('scale-100', 'scale-90');
						entry.target.classList.replace('opacity-100', 'opacity-20');
					}
				}

				// Logic for determining active section
				if (entry.target.id && coveredPercent >= 0.45) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		// Observe project cards
		const projectCards = document.querySelectorAll('.project-card');
		projectCards.forEach((card) => observer.observe(card));

		// Observe sections
		sections.forEach((id) => {
			const section = document.getElementById(id.key);
			if (section) observer.observe(section);
		});

		// Cleanup observer on unmount
		return () => observer.disconnect();
	});

	let box: any;
	let yScroll = 0;

	let openDrawer: boolean = false;

	function parseScroll() {
		yScroll = box.scrollTop;
	}

	onMount(() => parseScroll());

	$: {
		if ($page.url.pathname === '/') {
			scrollToTop();
		}
	}

	// Function to scroll to top
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<!-- top nav bar -->
<header
	class={`fixed top-0 z-50 flex h-12 max-h-12 min-h-12 w-full flex-row items-center justify-center bg-light-neutral-10 dark:bg-dark-neutral-10`}
>
	<div
		class={`flex h-full w-full max-w-screen-lg flex-row items-center justify-between px-6 md:px-0`}
	>
		<!-- leading -->
		<div class={`flex h-full flex-row items-center justify-start gap-4`}>
			<div class={`flex h-full flex-row items-center justify-start`}>
				<a href="/" class={`flex flex-col items-center justify-center`}>
					<!-- <img src="/images/icon/logo.png" alt="" srcset="" class={`h-6 w-6 min-w-6`} /> -->
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							width="26"
							height="26"
							viewBox="0 0 175 175"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M30 0C13.4316 0 0 13.4316 0 30V145C0 161.568 13.4316 175 30 175H145C161.568 175 175 161.568 175 145V30C175 13.4316 161.568 0 145 0H30ZM80.5 134.091H80.3965V133.941L36.6367 70.6816H35.8633V134.091H19V41H34.0908L77.9092 104.454H78.7275V41H80.3965H95.5H112.578C121.82 41 129.76 42.8633 136.396 46.5908C143.062 50.2881 148.184 55.6064 151.76 62.5459C155.336 69.4844 157.123 77.7881 157.123 87.4541C157.123 97.1514 155.32 105.484 151.714 112.454C148.139 119.424 142.972 124.772 136.214 128.5C129.487 132.228 121.396 134.091 111.941 134.091H95.5H80.5ZM111.123 119.5H97.2598V55.5908H111.623C117.927 55.5908 123.199 56.7725 127.441 59.1367C131.714 61.4697 134.941 65 137.123 69.7275C139.306 74.4238 140.396 80.333 140.396 87.4541C140.396 94.5762 139.306 100.516 137.123 105.272C134.941 110 131.684 113.561 127.351 115.954C123.018 118.318 117.608 119.5 111.123 119.5Z"
								fill="currentColor"
							/>
						</svg>
					</span>
				</a>
			</div>
		</div>
		<!-- trailing -->
		<div class={`flex h-full w-full flex-row items-center justify-end gap-4`}>
			<ul class={`hidden h-full flex-row items-center justify-end gap-6 md:flex`}>
				{#each sections as section}
					<li class={`flex h-full flex-row items-center justify-center px-1`}>
						<a
							href={section.value}
							class={`text-md ${activeSection == section.key ? `font-medium text-light-neutral-100 dark:text-dark-neutral-100` : `font-normal text-light-neutral-70 dark:text-dark-neutral-40`} divide-purple-500 capitalize transition-all delay-200 ease-in-out`}
							>{section.key}</a
						>
					</li>
				{/each}
			</ul>
			<ThemeToggle></ThemeToggle>
			<button
				type="button"
				aria-label="menu"
				class={`flex flex-col items-center justify-center md:hidden`}
				on:click={() => {
					openDrawer = !openDrawer;
				}}
			>
				{#if openDrawer}
					<span
						class={`text-light-neutral-100 dark:text-dark-neutral-100 ${openDrawer ? `` : `hidden`} transition-all delay-100 duration-300 ease-in-out`}
					>
						<svg viewBox="0 0 25 25" fill="none" width="24" xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<path d="M18 7L7 18M7 7L18 18" stroke="currentColor" stroke-width="1.2"></path>
							</g></svg
						>
					</span>
				{:else}
					<span
						class={`text-light-neutral-100 dark:text-dark-neutral-100 ${openDrawer ? `hidden` : ``} transition-all delay-100 duration-300 ease-in-out`}
					>
						<svg viewBox="0 0 25 25" width="24" fill="none" xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<path
									d="M6 8.1H19V6.9H6V8.1ZM6 18.1H19V16.9H6V18.1ZM6 13.1H19V11.9H6V13.1Z"
									fill="currentColor"
								></path>
							</g></svg
						>
					</span>
				{/if}
			</button>
		</div>
	</div>
</header>

<!-- drawer -->
<div
	class={`fixed mt-12 ${openDrawer ? `-translate-y-0 opacity-100` : `-translate-y-full opacity-0`} top-0 z-10 flex h-screen max-h-screen min-h-screen w-full flex-col items-center justify-start bg-light-neutral-10 transition-all duration-500 ease-in-out dark:bg-dark-neutral-10`}
>
	<div class={`mt-4 flex h-full w-full flex-col items-center justify-between`}>
		<ul class={` flex w-full flex-col items-center justify-start gap-2`}>
			{#each sections as section}
				<li class={`flex h-full w-full flex-row items-start justify-center`}>
					<a
						href={section.value}
						on:click={() => {
							openDrawer = false;
						}}
						class={`w-full px-12 text-start text-2xl font-medium capitalize text-light-neutral-100 dark:text-dark-neutral-100`}
						>{section.key}</a
					>
				</li>
			{/each}
		</ul>
		<div class={`mb-40 flex h-20 w-full flex-row items-center justify-start gap-6 pl-12`}>
			<a href="https://www.linkedin.com/in/nieltondidi/" target="_blank">
				<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
					<svg
						fill="currentColor"
						viewBox="0 0 32 32"
						width="30"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<title>linkedin</title>
							<path
								d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"
							></path>
						</g></svg
					></span
				>
			</a>
			<a href="https://github.com/nielton-didi" target="_blank">
				<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
					<svg
						fill="currentColor"
						width="30"
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<title>github</title>
							<path
								d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"
							></path>
						</g></svg
					>
				</span>
			</a>
			<a href="https://dribbble.com/nieltondidi" target="_blank">
				<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
					<svg
						fill="currentColor"
						width="30"
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<title>dribble</title>
							<path
								d="M25.916 7.921c-1.881 2.234-4.289 3.965-7.035 5.009l-0.118 0.039c0.3 0.612 0.587 1.231 0.85 1.857 0.1 0.225 0.187 0.45 0.275 0.662 0.927-0.102 2.003-0.16 3.092-0.16 2.063 0 4.077 0.208 6.023 0.605l-0.193-0.033c-0.020-3.040-1.107-5.821-2.904-7.994l0.017 0.021zM13.001 3.569c1.595 2.15 3.176 4.6 4.598 7.151l0.178 0.347c2.712-0.908 4.989-2.511 6.694-4.6l0.021-0.026c-2.247-2.006-5.228-3.232-8.494-3.232-1.063 0-2.096 0.13-3.084 0.375l0.088-0.018zM3.46 13.395c4.219-0.022 8.295-0.59 12.176-1.636l-0.333 0.076c-1.652-2.899-3.222-5.318-4.912-7.644l0.163 0.236c-3.596 1.721-6.227 4.966-7.077 8.875l-0.015 0.085zM6.484 24.585c2.42-3.882 6.010-6.839 10.271-8.408l0.141-0.045c0.169-0.056 0.337-0.105 0.506-0.15-0.325-0.731-0.675-1.458-1.040-2.174-3.888 1.154-8.355 1.819-12.977 1.819-0.066 0-0.131-0-0.196-0l0.010 0-0.005 0.39c0 0.003 0 0.006 0 0.009 0 3.297 1.25 6.302 3.301 8.568l-0.010-0.011zM21.005 27.809c-0.682-3.699-1.63-6.957-2.863-10.070l0.126 0.361-0.082 0.025c-4.314 1.346-7.826 4.192-10.002 7.915l-0.045 0.083c2.145 1.688 4.885 2.707 7.863 2.707 1.805 0 3.522-0.374 5.078-1.049l-0.083 0.032zM28.646 18.052c-1.571-0.474-3.376-0.747-5.245-0.747-0.964 0-1.911 0.073-2.836 0.213l0.104-0.013c0.98 2.564 1.842 5.629 2.436 8.789l0.054 0.344c2.874-1.96 4.893-4.993 5.482-8.51l0.010-0.075zM16 30.996c0 0 0 0-0 0-8.282 0-14.996-6.714-14.996-14.996s6.714-14.996 14.996-14.996c8.282 0 14.996 6.714 14.996 14.996 0 0 0 0 0 0v0c-0.011 8.277-6.718 14.984-14.995 14.996h-0.001z"
							></path>
						</g></svg
					>
				</span>
			</a>
			<a href="mailto:nieltondidi@gmail.com">
				<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
					<svg
						fill="currentColor"
						width="30"
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<title>gmail</title>
							<path
								d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z"
							></path>
						</g></svg
					>
				</span>
			</a>
		</div>
	</div>
</div>
<main
	class={`min-h-screen w-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-light-neutral-10 font-sf-pro dark:bg-dark-neutral-10`}
>
	<!-- home section -->
	<section id="home" class={`flex min-h-screen w-full flex-col items-center justify-center`}>
		<div
			class={`flex h-screen w-full max-w-screen-lg flex-col items-center justify-center gap-40 px-6 md:px-0`}
		>
			<!-- top -->
			<div class={`flex h-20 w-full flex-row items-center justify-start gap-4`}>
				<p class={`text-md font-normal text-light-neutral-70 dark:text-dark-neutral-40`}>
					Personal Portfolio.
				</p>
			</div>
			<div class={`flex w-full flex-col items-start justify-center`}>
				<h1
					class={`text-2xl font-semibold leading-none text-light-neutral-100 dark:text-dark-neutral-100`}
				>
					Designer <span class="text-[36px] font-thin">|</span> Developer
				</h1>
				<p
					class={`mt-4 text-xl font-medium leading-none text-light-neutral-70 dark:text-dark-neutral-40`}
				>
					Nielton Didi
				</p>
				<p
					class={`mt-2 text-md font-light leading-none text-light-neutral-70 dark:text-dark-neutral-40`}
				>
					Sarawak Malaysia
				</p>
			</div>
			<div class={`flex h-20 w-full flex-row items-center justify-start gap-6`}>
				<a href="https://www.linkedin.com/in/nieltondidi/" target="_blank">
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							viewBox="0 0 32 32"
							width="30"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>linkedin</title>
								<path
									d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"
								></path>
							</g></svg
						></span
					>
				</a>
				<a href="https://github.com/nielton-didi" target="_blank">
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							width="30"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>github</title>
								<path
									d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"
								></path>
							</g></svg
						>
					</span>
				</a>
				<a href="https://dribbble.com/nieltondidi" target="_blank">
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							width="30"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>dribble</title>
								<path
									d="M25.916 7.921c-1.881 2.234-4.289 3.965-7.035 5.009l-0.118 0.039c0.3 0.612 0.587 1.231 0.85 1.857 0.1 0.225 0.187 0.45 0.275 0.662 0.927-0.102 2.003-0.16 3.092-0.16 2.063 0 4.077 0.208 6.023 0.605l-0.193-0.033c-0.020-3.040-1.107-5.821-2.904-7.994l0.017 0.021zM13.001 3.569c1.595 2.15 3.176 4.6 4.598 7.151l0.178 0.347c2.712-0.908 4.989-2.511 6.694-4.6l0.021-0.026c-2.247-2.006-5.228-3.232-8.494-3.232-1.063 0-2.096 0.13-3.084 0.375l0.088-0.018zM3.46 13.395c4.219-0.022 8.295-0.59 12.176-1.636l-0.333 0.076c-1.652-2.899-3.222-5.318-4.912-7.644l0.163 0.236c-3.596 1.721-6.227 4.966-7.077 8.875l-0.015 0.085zM6.484 24.585c2.42-3.882 6.010-6.839 10.271-8.408l0.141-0.045c0.169-0.056 0.337-0.105 0.506-0.15-0.325-0.731-0.675-1.458-1.040-2.174-3.888 1.154-8.355 1.819-12.977 1.819-0.066 0-0.131-0-0.196-0l0.010 0-0.005 0.39c0 0.003 0 0.006 0 0.009 0 3.297 1.25 6.302 3.301 8.568l-0.010-0.011zM21.005 27.809c-0.682-3.699-1.63-6.957-2.863-10.070l0.126 0.361-0.082 0.025c-4.314 1.346-7.826 4.192-10.002 7.915l-0.045 0.083c2.145 1.688 4.885 2.707 7.863 2.707 1.805 0 3.522-0.374 5.078-1.049l-0.083 0.032zM28.646 18.052c-1.571-0.474-3.376-0.747-5.245-0.747-0.964 0-1.911 0.073-2.836 0.213l0.104-0.013c0.98 2.564 1.842 5.629 2.436 8.789l0.054 0.344c2.874-1.96 4.893-4.993 5.482-8.51l0.010-0.075zM16 30.996c0 0 0 0-0 0-8.282 0-14.996-6.714-14.996-14.996s6.714-14.996 14.996-14.996c8.282 0 14.996 6.714 14.996 14.996 0 0 0 0 0 0v0c-0.011 8.277-6.718 14.984-14.995 14.996h-0.001z"
								></path>
							</g></svg
						>
					</span>
				</a>
				<a href="mailto:nieltondidi@gmail.com">
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							width="30"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>gmail</title>
								<path
									d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z"
								></path>
							</g></svg
						>
					</span>
				</a>
			</div>
		</div>
	</section>

	<!-- about section -->
	<section id="about" class={`flex min-h-screen w-full flex-col items-center justify-center`}>
		<!-- leading -->
		<div
			class={`mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
		>
			<div class={`flex w-full flex-row items-center justify-start px-6 py-4 md:px-0`}>
				<p
					class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-70 dark:text-dark-neutral-40 md:text-2xl`}
				>
					About.
				</p>
			</div>
		</div>
		<div
			class={`mb-24 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y divide-light-neutral-30 px-6 md:px-0`}
		>
			<div
				class={`flex min-h-max w-full flex-col-reverse items-end justify-start gap-6 md:flex-row md:justify-between`}
			>
				<!-- leading -->
				<div class={`flex flex-col items-start justify-start gap-4`}>
					<p class={`text-2xl font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>
						Nielton Didi.
					</p>
					<p
						class={`max-w-lg text-pretty text-lg font-light leading-loose tracking-normal text-light-neutral-70 dark:text-dark-neutral-40`}
					>
						Hi! I'm a
						<span class={`font-medium text-light-neutral-90 dark:text-dark-neutral-50`}
							>Software Developer</span
						>
						and
						<span class={`font-medium text-light-neutral-90 dark:text-dark-neutral-50`}
							>UI/UX Designer</span
						>
						passionate about creating seamless, user-centered digital experiences. I specialize in
						<span class={`font-medium text-light-neutral-90 dark:text-dark-neutral-50`}
							>minimalist design</span
						>, crafting interfaces that are both visually striking and functional. <br /> <br />
						Beyond design, I thrive on solving complex problems, optimizing
						<span class={`font-medium text-light-neutral-90 dark:text-dark-neutral-50`}
							>performance and accessibility</span
						>, and building
						<span class={`font-medium text-light-neutral-90 dark:text-dark-neutral-50`}
							>scalable, responsive solutions</span
						>. I’m driven by curiosity and love exploring emerging technologies to stay ahead in the
						ever-evolving tech landscape.
						<br />
						<br />
						Let’s connect and collaborate on creating something extraordinary!
					</p>
				</div>
				<div
					class={`group flex aspect-square w-full max-w-96 flex-col items-center justify-center overflow-clip rounded-md bg-slate-300 md:w-96`}
				>
					<img
						src="/images/about/profile-pic.jpeg"
						alt=""
						srcset=""
						class={`aspect-square w-full object-cover object-top transition-all duration-500 ease-in-out group-hover:scale-110 dark:brightness-90`}
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- experience section -->
	<section id="experience" class={`flex min-h-screen w-full flex-col items-center justify-center`}>
		<!-- leading -->
		<div
			class={`mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
		>
			<div class={`flex w-full flex-row items-center justify-start px-6 py-4 md:px-0`}>
				<p
					class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-70 dark:text-dark-neutral-40 md:text-2xl`}
				>
					Experience.
				</p>
			</div>
		</div>
		<div
			class={`mb-6 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y divide-light-neutral-30 px-6 dark:divide-light-neutral-90 md:px-0`}
		>
			{#each data.experience as experience}
				<ExperienceCard {experience}></ExperienceCard>
			{/each}
		</div>
		<div
			class={`mb-24 flex w-full max-w-screen-lg flex-row items-center justify-start gap-4 px-6 md:px-0`}
		>
			<a
				href="/files/Nielton Didi Resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class={`group flex h-8 min-h-8 flex-row items-center justify-center gap-2 rounded-md bg-light-neutral-100 px-3 text-base text-light-neutral-10 transition-all duration-300 ease-in-out hover:gap-3 hover:bg-light-neutral-90 dark:bg-dark-neutral-100 dark:text-dark-neutral-10 dark:hover:bg-dark-neutral-90`}
			>
				View Resume<span
					><svg
						fill="currentColor"
						viewBox="0 0 1920 1920"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path
								d="m1304.824 345.002-81.25 81.249 476.466 476.582H0v114.922h1700.04l-476.466 476.465 81.25 81.25L1920 960.293z"
								fill-rule="evenodd"
							></path>
						</g></svg
					></span
				></a
			>
		</div>
	</section>

	<!-- projects section -->
	<section id="projects" class={`flex min-h-screen w-full flex-col items-center justify-center`}>
		<!-- leading -->
		<div
			class={`mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
		>
			<div class={`flex w-full flex-row items-center justify-start px-6 py-4 md:px-0`}>
				<p
					class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-70 dark:text-dark-neutral-40 md:text-2xl`}
				>
					Projects.
				</p>
			</div>
		</div>
		<div
			class={`mb-24 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y divide-light-neutral-30 px-6 dark:divide-light-neutral-90 md:px-0`}
		>
			{#each data.projects as project}
				<ProjectCard {project}></ProjectCard>
			{/each}
		</div>
	</section>

	<!-- contact section -->
	<section id="contact" class={`flex w-full flex-col items-center justify-start`}>
		<!-- leading -->
		<div
			class={`mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
		>
			<div class={`flex w-full flex-row items-center justify-start px-6 py-4 md:px-0`}>
				<p
					class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-100 dark:text-dark-neutral-100 md:text-2xl`}
				>
					Let's Get In Touch.
				</p>
			</div>
		</div>
		<div
			class={`mb-24 flex w-full max-w-screen-lg flex-col items-start justify-start gap-6 px-6 md:px-0`}
		>
			<div class={`flex w-full flex-col items-start justify-start`}>
				<p class={`max-w-lg text-lg font-normal text-light-neutral-70`}>
					Whether you’re looking to collaborate on an exciting project or interested in bringing me
					on board for your team, feel free to hit me up or drop me an email—I’d love to connect and
					explore how we can create something amazing together!
				</p>
			</div>

			<div class={`mt-10 flex w-full flex-col items-start justify-start gap-6`}>
				<a
					href="https://www.linkedin.com/in/nieltondidi/"
					target="_blank"
					class={`flex flex-row items-center justify-start gap-2`}
				>
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							viewBox="0 0 32 32"
							width="30"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>linkedin</title>
								<path
									d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"
								></path>
							</g></svg
						></span
					>
					<span class={`text-md font-light text-light-neutral-100 dark:text-dark-neutral-100`}>www.linkedin.com/in/nieltondidi</span>
				</a>
				<a
					href="https://github.com/nielton-didi"
					target="_blank"
					class={`flex flex-row items-center justify-start gap-2`}
				>
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							width="30"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>github</title>
								<path
									d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"
								></path>
							</g></svg
						>
					</span>
					<span class={`text-md font-light text-light-neutral-100 dark:text-dark-neutral-100`}>github.com/nielton-didi</span>
				</a>
				<a
					href="https://dribbble.com/nieltondidi"
					target="_blank"
					class={`flex flex-row items-center justify-start gap-2`}
				>
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							width="30"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>dribble</title>
								<path
									d="M25.916 7.921c-1.881 2.234-4.289 3.965-7.035 5.009l-0.118 0.039c0.3 0.612 0.587 1.231 0.85 1.857 0.1 0.225 0.187 0.45 0.275 0.662 0.927-0.102 2.003-0.16 3.092-0.16 2.063 0 4.077 0.208 6.023 0.605l-0.193-0.033c-0.020-3.040-1.107-5.821-2.904-7.994l0.017 0.021zM13.001 3.569c1.595 2.15 3.176 4.6 4.598 7.151l0.178 0.347c2.712-0.908 4.989-2.511 6.694-4.6l0.021-0.026c-2.247-2.006-5.228-3.232-8.494-3.232-1.063 0-2.096 0.13-3.084 0.375l0.088-0.018zM3.46 13.395c4.219-0.022 8.295-0.59 12.176-1.636l-0.333 0.076c-1.652-2.899-3.222-5.318-4.912-7.644l0.163 0.236c-3.596 1.721-6.227 4.966-7.077 8.875l-0.015 0.085zM6.484 24.585c2.42-3.882 6.010-6.839 10.271-8.408l0.141-0.045c0.169-0.056 0.337-0.105 0.506-0.15-0.325-0.731-0.675-1.458-1.040-2.174-3.888 1.154-8.355 1.819-12.977 1.819-0.066 0-0.131-0-0.196-0l0.010 0-0.005 0.39c0 0.003 0 0.006 0 0.009 0 3.297 1.25 6.302 3.301 8.568l-0.010-0.011zM21.005 27.809c-0.682-3.699-1.63-6.957-2.863-10.070l0.126 0.361-0.082 0.025c-4.314 1.346-7.826 4.192-10.002 7.915l-0.045 0.083c2.145 1.688 4.885 2.707 7.863 2.707 1.805 0 3.522-0.374 5.078-1.049l-0.083 0.032zM28.646 18.052c-1.571-0.474-3.376-0.747-5.245-0.747-0.964 0-1.911 0.073-2.836 0.213l0.104-0.013c0.98 2.564 1.842 5.629 2.436 8.789l0.054 0.344c2.874-1.96 4.893-4.993 5.482-8.51l0.010-0.075zM16 30.996c0 0 0 0-0 0-8.282 0-14.996-6.714-14.996-14.996s6.714-14.996 14.996-14.996c8.282 0 14.996 6.714 14.996 14.996 0 0 0 0 0 0v0c-0.011 8.277-6.718 14.984-14.995 14.996h-0.001z"
								></path>
							</g></svg
						>
					</span>
					<span class={`text-md font-light text-light-neutral-100 dark:text-dark-neutral-100`}>dribbble.com/nieltondidi</span>
				</a>
				<a
					href="mailto:nieltondidi@gmail.com"
					class={`flex flex-row items-center justify-start gap-2`}
				>
					<span class={`text-light-neutral-100 dark:text-dark-neutral-100`}>
						<svg
							fill="currentColor"
							width="30"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>gmail</title>
								<path
									d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z"
								></path>
							</g></svg
						>
					</span>
					<span class={`text-md font-light text-light-neutral-100 dark:text-dark-neutral-100`}>nieltondidi@gmail.com</span>
				</a>
			</div>
		</div>
	</section>
	<footer class={`flex w-full flex-col items-center justify-start py-6`}>
		<div
			class={`flex w-full max-w-screen-lg flex-col items-center justify-end gap-2 border-t border-light-neutral-30 p-6 dark:border-dark-neutral-30 md:flex-row md:items-start md:justify-between md:gap-0 md:px-0`}
		>
			<div class={`flex w-full flex-row items-start justify-start`}>
				<!-- nav links -->
				<div class={`flex w-full flex-col items-center justify-start`}>
					<div class={`flex w-full flex-row items-center justify-start`}>
						<p
							class={`w-full text-start text-base font-medium text-light-neutral-80 dark:text-dark-neutral-80 md:text-md`}
						>
							Navigation Links
						</p>
					</div>
					<ul class={`flex w-full flex-col items-start justify-start`}>
						{#each sections as section}
							<li class={`flex w-full flex-row items-center justify-start`}>
								<a
									href={section.value}
									class={`w-full text-start text-base font-light capitalize text-light-neutral-70 dark:text-dark-neutral-40 md:text-md`}
									>{section.key}</a
								>
							</li>
						{/each}
					</ul>
				</div>

			</div>
			<div class={`mt-6 flex h-full w-full flex-col items-center justify-start md:mt-0`}>
				<div class={`flex w-full flex-col items-end justify-start`}>
					<p
						class={`w-full text-center text-base text-light-neutral-70 dark:text-dark-neutral-40 md:text-end`}
					>
						Designed and coded by Nielton Didi.
					</p>
					<p
						class={`w-full text-center text-base text-light-neutral-70 dark:text-dark-neutral-40 md:text-end`}
					>
						© Nielton Didi 2024
					</p>
				</div>
			</div>
		</div>
	</footer>
</main>
