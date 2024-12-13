<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeSection: string | null = null; // Tracks the current active section
	const sections = ['home', 'about', 'experience', 'projects']; // List of section IDs

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

	let box: any;
	let yScroll = 0;

	let openDrawer: boolean = false;

	function parseScroll() {
		yScroll = box.scrollTop;
	}

	onMount(() => parseScroll());
</script>

<div
	class={`flex h-screen max-h-screen w-screen flex-col items-center justify-start overflow-hidden bg-light-neutral-10 font-sf-pro`}
>
	<!-- header -->
	<header
		class={`absolute top-0 z-40 flex w-full flex-col items-center justify-center transition-all duration-300 ease-in-out ${yScroll > 5 ? `translate-y-0` : `-translate-y-full`}`}
	>
		<div
			class={`flex h-14 min-h-14 w-full flex-row items-center justify-center bg-light-neutral-10 px-6 md:h-20 md:min-h-20 md:px-0`}
		>
			<div class={`flex h-full w-full max-w-screen-lg flex-row items-center justify-between`}>
				<div class={`flex h-full flex-row items-center justify-start`}>
					<a href="#home" class={`leading-tight tracking-wider`}>
						<span class={`text-md font-medium md:text-xl`}>NIELTON</span>
						<span class={`text-md font-light text-light-neutral-70 md:text-xl`}>DIDI</span>
					</a>
				</div>
				<div class={`flex h-full flex-row items-center justify-end`}>
					<button
						aria-label="menu"
						on:click={() => {
							openDrawer = true;
						}}
						class={`flex flex-col items-center justify-center md:hidden`}
					>
						<span class={`text-light-neutral-100`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</span>
					</button>
					<ul class={`hidden h-full flex-row items-center justify-end md:flex`}>
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
	</header>
	<!-- drawer -->
	<div
		class={`absolute z-50 h-screen max-h-screen overflow-hidden bg-light-neutral-10 bg-opacity-85 backdrop-blur-sm ${openDrawer ? `w-screen translate-x-0` : `w-0 translate-x-full opacity-30 brightness-75`} transition-all delay-100 duration-300 ease-in-out`}
	>
		<div class={`relative flex h-full w-full flex-col items-end justify-between px-6 py-24`}>
			<button
				aria-label="close"
				on:click={() => {
					openDrawer = false;
				}}
			>
				<span class={`text-md font-normal text-light-neutral-90`}> Close </span>
			</button>
			<ul class={` flex h-full flex-col items-end justify-center gap-2`}>
				{#each sections as id}<li class={`flex h-10 flex-col items-center justify-center`}>
						<a
							href={`#${id}`}
							on:click={() => {
								openDrawer = false;
							}}
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
			<div
				class={`flex min-h-max max-w-max flex-col items-end justify-end gap-4 overflow-hidden md:h-10 md:min-h-10 md:flex-row md:items-center md:justify-end md:gap-6`}
			>
				<a
					href="https://www.linkedin.com/in/nieltondidi/"
					target="_blank"
					class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
					>LinkedIn</a
				>
				<a
					href="https://github.com/nielton-didi"
					target="_blank"
					class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
					>Github</a
				>

				<a
					href="mailto:nieltondidi@gmail.com"
					target="_blank"
					class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
					>Email</a
				>
				<a
					href="/files/Nielton Didi Resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
					>Resume</a
				>
			</div>
		</div>
	</div>
	<!-- main -->
	<main
		bind:this={box}
		on:scroll={parseScroll}
		class={`block h-screen w-screen overflow-y-auto overflow-x-hidden scroll-smooth`}
	>
		<!-- home -->
		<section
    id="home"
    class={`flex h-screen max-h-screen w-full flex-col items-center justify-center px-6 py-12 md:px-0 md:py-24`}
>
    <div class={`flex h-full w-full max-w-screen-lg flex-col items-end justify-between`}>
        <!-- top -->
        <div
            class={`flex h-10 min-h-10 w-full max-w-full flex-row items-center justify-end overflow-hidden text-slide-up text-slide-up-1`}
        >
            <p class={`text-md font-light leading-tight text-light-neutral-70 md:text-lg`}>
                Personal Portfolio
            </p>
        </div>
        <!-- middle -->
        <div class={`flex w-full flex-col items-center justify-center`}>
            <div class={`flex w-full flex-col items-end justify-center text-slide-up text-slide-up-2`}>
                <p
                    class={`w-full text-end align-middle text-2xl font-semibold leading-tight tracking-normal text-light-neutral-100 md:text-[36px]`}
                >
                    Designer <span class={`font-thin text-light-neutral-70 md:text-[40px]`}>|</span> Developer
                </p>
            </div>
            <div class={`mt-1 flex w-full flex-col items-end justify-center text-slide-up text-slide-up-3`}>
                <p
                    class={`w-full text-end text-xl font-medium leading-tight tracking-normal text-light-neutral-70 md:text-2xl`}
                >
                    Nielton Didi
                </p>
            </div>
            <div class={`mt-0 flex w-full flex-col items-end justify-center text-slide-up text-slide-up-4`}>
                <p
                    class={`w-full text-end text-md font-light leading-tight tracking-normal text-light-neutral-70 md:text-lg`}
                >
                    Sarawak, Malaysia
                </p>
            </div>
        </div>

        <!-- bottom -->
        <div class={`flex w-full flex-row items-end justify-between md:items-center text-slide-up text-slide-up-5`}>
            <div>
                <div
                    class={`flex max-w-max flex-row items-center justify-start gap-1 ${yScroll > 50 ? `hidden` : ``} animate-bounce transition-all duration-500 ease-in-out`}
                >
                    <span class={`text-light-neutral-70`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.0"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                            />
                        </svg>
                    </span>
                    <p class={`text-base font-light text-light-neutral-70 md:text-md`}>Scroll down</p>
                </div>
            </div>
            <div
                class={`flex min-h-max max-w-max flex-col items-end justify-end gap-4 overflow-hidden md:h-10 md:min-h-10 md:flex-row md:items-center md:justify-end md:gap-6 text-slide-up text-slide-up-6`}
            >
                <a
                    href="https://www.linkedin.com/in/nieltondidi/"
                    target="_blank"
                    class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
                    >LinkedIn</a
                >
                <a
                    href="https://github.com/nielton-didi"
                    target="_blank"
                    class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
                    >Github</a
                >

                <a
                    href="mailto:nieltondidi@gmail.com"
                    target="_blank"
                    class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
                    >Email</a
                >
                <a
                    href="/files/Nielton Didi Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class={`text-md font-light text-light-neutral-70 underline-offset-2 transition-all duration-200 ease-in-out hover:font-normal hover:text-light-neutral-100 hover:underline md:text-lg`}
                    >Resume</a
                >
            </div>
        </div>
    </div>
</section>


		<!-- about -->
		<section id="about" class={`flex w-full flex-col items-center justify-start gap-6 md:h-screen`}>
			<!-- leading -->
			<div
				class={`sticky top-10 z-10 mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
			>
				<div
					class={`flex w-full flex-row items-center justify-start bg-light-neutral-10 px-6 py-4 md:px-0`}
				>
					<p
						class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-70 md:text-2xl`}
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
						<p class={`text-2xl font-medium`}>Nielton Didi.</p>
						<p
							class={`max-w-lg text-pretty text-lg font-light leading-loose tracking-normal text-light-neutral-70`}
						>
							Hi! I'm a
							<span class={`font-medium text-light-neutral-90`}>Software Developer</span>
							and <span class={`font-medium text-light-neutral-90`}>UI/UX Desginer</span> passionate
							about creating seamless, user-centered digital experiences. I specialize in
							<span class={`font-medium text-light-neutral-90`}>minimalist design</span>, crafting
							interfaces that are both visually striking and functional. <br /> <br /> Beyond
							design, I thrive on solving complex problems, optimizing
							<span class={`font-medium text-light-neutral-90`}>performance and accessibility</span
							>, and building
							<span class={`font-medium text-light-neutral-90`}>scalable, responsive solutions</span
							>. I’m driven by curiosity and love exploring emerging technologies to stay ahead in
							the ever-evolving tech landscape.
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
							class={`aspect-square w-full object-cover object-top transition-all duration-500 ease-in-out group-hover:scale-110`}
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- experience -->
		<section id="experience" class={`flex w-full flex-col items-center justify-start gap-6`}>
			<!-- leading -->
			<div
				class={`sticky top-10 z-10 mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
			>
				<div
					class={`flex w-full flex-row items-center justify-start bg-light-neutral-10 px-6 py-4 md:px-0`}
				>
					<p
						class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-70 md:text-2xl`}
					>
						Experience.
					</p>
				</div>
			</div>
			<div
				class={`mb-6 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y divide-light-neutral-30 px-6 md:px-0`}
			>
				{#each data.experience as experience}
					<ExperienceCard {experience}></ExperienceCard>
				{/each}
			</div>
			<div
				class={`mb-24 flex w-full max-w-screen-lg flex-row items-center justify-end gap-4 px-6 md:px-0`}
			>
				<a
					href="https://www.linkedin.com/in/nieltondidi/"
					target="_blank"
					class={`group flex h-8 min-h-8 flex-row items-center justify-center gap-2 rounded-md bg-light-neutral-100 px-3 text-base text-light-neutral-10 transition-all duration-300 ease-in-out hover:gap-3 hover:bg-light-neutral-90`}
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
		<!-- projects -->
		<section id="projects" class={`flex w-full flex-col items-center justify-start gap-6`}>
			<!-- leading -->
			<div
				class={`sticky top-10 z-10 mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
			>
				<div
					class={`flex w-full flex-row items-center justify-start bg-light-neutral-10 px-6 py-4 md:px-0`}
				>
					<p
						class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-70 md:text-2xl`}
					>
						Projects.
					</p>
				</div>
			</div>
			<div
				class={`mb-24 flex w-full max-w-screen-lg flex-col items-end justify-start gap-4 divide-y divide-light-neutral-30 px-6 md:px-0`}
			>
				{#each data.projects as project}
					<ProjectCard {project}></ProjectCard>
				{/each}
			</div>
		</section>
		<!-- Contact -->
		<section id="Contact" class={`flex w-full flex-col items-center justify-start gap-6`}>
			<!-- leading -->
			<div
				class={`sticky top-10 z-10 mt-20 flex w-full max-w-screen-lg flex-col items-center justify-start md:top-16 md:mt-24`}
			>
				<div
					class={`flex w-full flex-row items-center justify-start bg-light-neutral-10 px-6 py-4 md:px-0`}
				>
					<p
						class={`w-full text-start text-xl font-medium leading-tight text-light-neutral-100 md:text-2xl`}
					>
						Let's Get In Touch.
					</p>
				</div>
			</div>
			<div
				class={`mb-24 flex w-full max-w-screen-lg flex-col items-start justify-start gap-4 px-6 md:px-0`}
			>
				<div class={`flex w-full flex-col items-start justify-start`}>
					<p class={`max-w-lg text-lg font-normal text-light-neutral-70`}>
						Whether you’re looking to collaborate on an exciting project or interested in bringing
						me on board for your team, feel free to hit me up or drop me an email—I’d love to
						connect and explore how we can create something amazing together!
					</p>
				</div>
				<div class={`flex w-full flex-row items-start justify-start gap-2`}>
					<a
						href="https://www.linkedin.com/in/nieltondidi/"
						target="_blank"
						class={`group flex h-8 min-h-8 flex-row items-center justify-center gap-2 rounded-md bg-light-neutral-100 px-3 text-base text-light-neutral-10 transition-all duration-300 ease-in-out hover:gap-3 hover:bg-light-neutral-90`}
					>
						LinkedIn<span
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
					<a
						href="mailto:nieltondidi@gmail.com"
						target="_blank"
						class={`group flex h-8 min-h-8 flex-row items-center justify-center gap-2 rounded-md bg-light-neutral-100 px-3 text-base text-light-neutral-10 transition-all duration-300 ease-in-out hover:gap-3 hover:bg-light-neutral-90`}
						>Email<span
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
			</div>
		</section>

		<footer class={`flex w-full flex-col items-center justify-start py-6`}>
			<div
				class={`flex w-full max-w-screen-lg flex-col items-center justify-end gap-2 border-t p-6 md:flex-row md:items-start md:justify-between md:gap-0 md:px-0`}
			>
				<div class={`flex w-full flex-row items-start justify-start`}>
					<!-- nav links -->
					<div class={`flex w-full flex-col items-center justify-start`}>
						<div class={`flex w-full flex-row items-center justify-start`}>
							<p class={`w-full text-start text-base font-medium text-light-neutral-80 md:text-md`}>
								Navigation Links
							</p>
						</div>
						<ul class={`flex w-full flex-col items-start justify-start`}>
							{#each sections as id}
								<li class={`flex w-full flex-row items-center justify-start`}>
									<a
										href={`#${id}`}
										class={`w-full text-start text-base font-light capitalize text-light-neutral-70 md:text-md`}
										>{id}</a
									>
								</li>
							{/each}
						</ul>
					</div>
					<div class={`flex w-full flex-col items-center justify-start`}>
						<div class={`flex w-full flex-row items-center justify-start`}>
							<p class={`w-full text-start text-base font-medium text-light-neutral-80 md:text-md`}>
								Other Versions of my portfolio
							</p>
						</div>
						<ul class={`flex w-full flex-col items-start justify-start`}>
							<li class={`flex w-full flex-row items-center justify-start`}>
								<a
									href="https://v1.borneomonkey.com/"
									target="_blank"
									class={`w-full text-start text-base font-light capitalize text-light-neutral-70 md:text-md`}
									>Version 1</a
								>
							</li>
							<li class={`flex w-full flex-row items-center justify-start`}>
								<a
									href="https://borneomonkey.com/"
									target="_blank"
									class={`w-full text-start text-base font-light capitalize text-light-neutral-70 md:text-md`}
									>Version 2 (current)</a
								>
							</li>
						</ul>
					</div>
				</div>
				<div class={`flex h-full w-full flex-col items-center justify-start`}>
					<div class={`flex w-full flex-col items-end justify-start`}>
						<p class={`w-full text-center text-base text-light-neutral-70 md:text-end`}>
							Designed and coded by Nielton Didi.
						</p>
						<p class={`w-full text-center text-base text-light-neutral-70 md:text-end`}>
							© Nielton Didi 2024
						</p>
					</div>
				</div>
			</div>
		</footer>
	</main>
</div>
