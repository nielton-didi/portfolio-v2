<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeSection: string | null = null; // Tracks the current active section
	const sections = ['about', 'experience', 'projects']; // List of section IDs
	const versions: string[] = ['Portfolio-v1', 'Portfolio-v2'];

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
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		});

		// Cleanup observer on unmount
		return () => observer.disconnect();
	});
</script>

<div
	class={`flex h-screen max-h-screen w-screen flex-col items-center justify-start overflow-hidden bg-light-neutral-10 font-sf-pro`}
>
	<div class={`absolute top-0 z-50 flex w-full flex-col items-center justify-center`}>
		<div
			class={`flex h-20 min-h-20 w-full flex-row items-center justify-center bg-light-neutral-10`}
		>
			<div class={`flex h-full w-full max-w-screen-lg flex-row items-center justify-between`}>
				<div class={`flex h-full flex-row items-center justify-start`}>
					<a href="/" class={`leading-tight tracking-wider`}>
						<span class={`text-xl font-medium`}>NIELTON</span><span
							class={`text-xl font-light text-light-neutral-70`}>DIDI</span
						>
					</a>
				</div>
				<div class={`flex h-full flex-row items-center justify-end`}>
					<ul class={`flex h-full flex-row items-center justify-end`}>
						{#each sections as id}<li class={`flex h-full flex-col items-center justify-center`}>
								<a
									href={`#${id}`}
									class={`flex h-full flex-col items-center justify-center px-4 ${activeSection == id ? `border-b border-light-neutral-100` : `py-[2px]`} transition-all delay-75 duration-300 ease-in`}
								>
									<span
										class={`text-md capitalize ${activeSection == id ? `font-medium text-light-neutral-100` : `font-normal text-light-neutral-70`}`}
										>{id}</span
									>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
	<main class={`block h-screen w-screen overflow-y-auto overflow-x-hidden scroll-smooth`}>
		<section
			id="about"
			class={`flex h-screen max-h-screen w-full flex-col items-center justify-center py-24`}
		>
			<div class={` flex h-full w-full max-w-screen-lg flex-col items-end justify-between`}>
				<!-- top -->
				<div
					class={`flex h-10 min-h-10 w-full max-w-full flex-row items-center justify-end overflow-hidden`}
				>
					<p class={` text-lg font-light leading-tight text-light-neutral-70`}>
						Personal Portfolio
					</p>
				</div>
				<!-- middle -->
				<div class={`flex w-full flex-col items-center justify-center`}>
					<div class={`flex w-full flex-col items-end justify-center`}>
						<p
							class={`w-full text-end align-middle text-[36px] font-semibold leading-tight tracking-normal text-light-neutral-100`}
						>
							Designer <span class={` text-[40px] font-thin text-light-neutral-70`}>|</span> Developer
						</p>
					</div>
					<div class={`mt-1 flex w-full flex-col items-end justify-center`}>
						<p
							class={`w-full text-end text-2xl font-medium leading-tight tracking-normal text-light-neutral-70`}
						>
							Nielton Didi
						</p>
					</div>
					<div class={`mt-0 flex w-full flex-col items-end justify-center`}>
						<p
							class={`w-full text-end text-lg font-light leading-tight tracking-normal text-light-neutral-70`}
						>
							Sarawak, Malaysia
						</p>
					</div>
				</div>

				<!-- bottom -->
				<div
					class={`flex h-10 min-h-10 w-full max-w-full flex-row items-center justify-end gap-6 overflow-hidden`}
				>
					<a
						href="/"
						class={`text-lg font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline`}
						>LinkedIn</a
					>
					<a
						href="/"
						class={`text-lg font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline`}
						>Github</a
					>
					<a
						href="/"
						class={`text-lg font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline`}
						>Email</a
					>
					<a
						href="/"
						class={`text-lg font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline`}
						>Resume</a
					>
				</div>
			</div>
		</section>
		<section id="experience" class={`flex w-full flex-col items-center justify-start gap-6`}>
			<!-- leading -->
			<div
				class={`sticky top-16 z-10 mt-24 flex w-full max-w-screen-lg flex-col items-center justify-start`}
			>
				<div class={`flex w-full flex-row items-center justify-start bg-light-neutral-10 py-4`}>
					<p class={`w-full text-start text-2xl font-medium leading-tight text-light-neutral-70`}>
						Experience.
					</p>
				</div>
			</div>
			<div
				class={`mb-24 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y`}
			>
				{#each data.experience as experience}
					<ExperienceCard {experience}></ExperienceCard>
				{/each}
			</div>
		</section>
		<section id="projects" class={`flex w-full flex-col items-center justify-start gap-6`}>
			<!-- leading -->
			<div
				class={`sticky top-16 z-10 mt-24 flex w-full max-w-screen-lg flex-col items-center justify-start`}
			>
				<div class={`flex w-full flex-row items-center justify-start bg-light-neutral-10 py-4`}>
					<p class={`w-full text-start text-2xl font-medium leading-tight text-light-neutral-70`}>
						Project.
					</p>
				</div>
			</div>
			<div
				class={`mb-24 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y divide-light-neutral-30`}
			>
				{#each data.projects as project}
					<ProjectCard {project}></ProjectCard>
				{/each}
			</div>
		</section>
		<footer class={`flex w-full flex-col items-center justify-start py-6`}>
			<div class={`flex w-full max-w-screen-lg flex-row items-start justify-between`}>
				<div class={`flex w-full flex-row items-start justify-start`}>
					<!-- nav links -->
					<div class={`flex w-full flex-col items-center justify-start`}>
						<div class={`flex w-full flex-row items-center justify-start`}>
							<p class={`w-full text-start text-md font-medium text-light-neutral-80`}>
								Navigation Links
							</p>
						</div>
						<ul class={`flex w-full flex-col items-start justify-start`}>
							{#each sections as id}
								<li class={`flex w-full flex-row items-center justify-start`}>
									<a
										href={`#${id}`}
										class={`w-full text-start text-md font-light capitalize text-light-neutral-70`}
										>{id}</a
									>
								</li>
							{/each}
						</ul>
					</div>
					<div class={`flex w-full flex-col items-center justify-start`}>
						<div class={`flex w-full flex-row items-center justify-start`}>
							<p class={`w-full text-start text-md font-medium text-light-neutral-80`}>
								Other Versions
							</p>
						</div>
						<ul class={`flex w-full flex-col items-start justify-start`}>
							<li class={`flex w-full flex-row items-center justify-start`}>
								<a
									href="https://v1.borneomonkey.com/"
									target="_blank"
									class={`w-full text-start text-md font-light capitalize text-light-neutral-70`}
									>Version 1</a
								>
							</li>
							<li class={`flex w-full flex-row items-center justify-start`}>
								<a
									href="https://v1.borneomonkey.com/"
									target="_blank"
									class={`w-full text-start text-md font-light capitalize text-light-neutral-70`}
									>Version 2</a
								>
							</li>
						</ul>
					</div>
				</div>
				<div class={`flex h-full w-full flex-col items-center justify-start`}>
					<div class={`flex w-full flex-col items-end justify-start`}>
						<p class={`w-full text-end text-base text-light-neutral-70`}>
							Designed and code by Nielton Didi.
						</p>
						<p class={`w-full text-end text-base text-light-neutral-70`}>© Nielton Didi 2024</p>
					</div>
				</div>
			</div>
		</footer>
	</main>
</div>
