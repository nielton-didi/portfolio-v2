<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let activeSection: string | null = null; // Tracks the current active section
	const sections = ['about', 'experience', 'project']; // List of section IDs

	export let data: PageData;

	onMount(() => {
		const observerOptions = {
			root: null, // Use the viewport as the root
			threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Break into 1% increments
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const viewportHeight = window.innerHeight; // Get the viewport height
				const visibleHeight = entry.boundingClientRect.height * entry.intersectionRatio; // Calculate visible part of the section
				const coveredPercent = visibleHeight / viewportHeight; // Calculate how much of the viewport is covered by the section

				// Check if the section covers at least 45% of the viewport
				if (coveredPercent >= 0.45) {
					activeSection = entry.target.id; // Mark this section as active
				}
			});
		}, observerOptions);

		sections.forEach((id) => {
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		});

		return () => {
			// Clean up observer
			observer.disconnect();
		};
	});
</script>

<header
	class={`fixed left-0 top-0 z-50 flex w-screen flex-row items-center justify-center font-sf-pro`}
>
	<!-- Navbar wrapper -->
	<div class={`flex h-20 min-h-20 w-full flex-row items-center justify-center bg-light-neutral-10`}>
		<!-- Navbar content wrapper -->
		<div
			class="{`flex h-full max-h-full w-full max-w-screen-lg flex-row items-center justify-between overflow-hidden`}}"
		>
			<!-- Leading -->
			<div class={`flex h-full flex-row items-center justify-start`}>
				<a
					href="/"
					class={`flex h-full flex-col items-center justify-center text-xl font-bold text-light-neutral-100`}
				>
					Nielton.
				</a>
			</div>
			<!-- Trailing -->
			<div class={`flex h-full flex-row items-center justify-end`}>
				<ul class={`flex h-full flex-row items-center justify-end`}>
					{#each sections as id}<li class={`flex h-full flex-col items-center justify-center`}>
							<a
								href={`#${id}`}
								class={`flex h-full flex-col items-center justify-center px-4 ${activeSection == id ? `border-b-2 border-light-neutral-100` : `py-[2px]`} transition-all delay-75 duration-300 ease-in`}
							>
								<span
									class={`text-lg capitalize ${activeSection == id ? `font-medium text-light-neutral-100` : `font-normal text-light-neutral-70`}`}
									>{id}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</header>

<main class={`block w-screen scroll-smooth font-sf-pro`}>
	<section
		id="about"
		class={`flex h-screen max-h-screen w-screen flex-col items-center justify-center bg-light-neutral-10`}
	>
		<div class={`flex h-full w-full max-w-screen-lg flex-row items-center justify-start`}>
			<div class={`flex w-full flex-col items-start justify-center gap-24`}>
				<!-- headline -->
				<div class={`flex w-full flex-col items-start justify-center`}>
					<h1
						class={`text-[52px] font-extrabold leading-tight tracking-wide text-light-neutral-50`}
					>
						Nielton Didi.
					</h1>
					<h1
						class={`text-[52px] font-extrabold leading-tight tracking-wide text-light-neutral-100`}
					>
						Designer / Developer.
					</h1>
					<p class={`mt-4 text-lg font-normal text-light-neutral-70`}>
						I create user-friendly design and build reliable applications.
					</p>
				</div>

				<!-- actions -->
				<div class={`flex w-full flex-row items-center justify-start gap-4`}>
					<a href="http://">
						<span class={`text-light-neutral-100`}>
							<svg
								viewBox="0 0 20 20"
								version="1.1"
								height="36px"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								fill="currentColor"
								><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g><g id="SVGRepo_iconCarrier">
									<title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs>
									<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<g
											id="Dribbble-Light-Preview"
											transform="translate(-140.000000, -7559.000000)"
											fill="#000000"
										>
											<g id="icons" transform="translate(56.000000, 160.000000)">
												<path
													d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
													id="github-[#142]"
												>
												</path>
											</g>
										</g>
									</g>
								</g></svg
							>
						</span>
					</a>
					<a href="http://">
						<span class={`text-light-neutral-100`}>
							<svg
								fill="currentColor"
								viewBox="0 0 32 32"
								version="1.1"
								height="36px"
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
							>
						</span>
					</a>
				</div>
			</div>
		</div>
	</section>
	<section
		id="experience"
		class={`flex h-screen max-h-screen w-screen flex-col items-center justify-start bg-slate-300`}
	>
		Experience Section
	</section>
	<section id="project" class={`flex min-h-max w-screen flex-col items-center justify-start`}>
		<div class={`my-24 flex w-full max-w-screen-lg flex-col items-center justify-start gap-10`}>
			<div class={`sticky flex w-full flex-col items-start justify-center gap-4`}>
				<p class={`text-[32px] font-bold leading-none tracking-wide text-light-neutral-70`}>
					Feature Projects.
				</p>
			</div>

			<div class={`flex w-full flex-col items-start justify-start gap-24`}>
				{#each data.projects as project, i}
					<ProjectCard {project} reversed={i % 2 != 0}></ProjectCard>
				{/each}
			</div>
			<div class={`mt-10 flex w-full flex-row items-center justify-center`}>
				<a href="/" class={`group flex flex-row items-center justify-center gap-2`}>
					<span
						class={`text-lg text-light-neutral-70 underline-offset-2 transition-all duration-300 ease-in-out group-hover:text-light-neutral-100 group-hover:underline `}
						>View Full Project Archive</span
					>
					<span
						class={`text-light-neutral-70 transition-all duration-300 ease-in-out group-hover:translate-x-3 group-hover:text-light-neutral-100`}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</span>
				</a>
			</div>
		</div>
	</section>
</main>
