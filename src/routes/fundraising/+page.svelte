<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let accountCopied = false;

	async function copyAccountNumber() {
		await navigator.clipboard.writeText('7647565536');
		accountCopied = true;
		setTimeout(() => (accountCopied = false), 2000);
	}
</script>

<svelte:head>
	<title>Help Me Recover From Job Loss and Debt Crisis — Nielton Didi</title>
	<meta
		name="description"
		content="I'm Nielton, a software engineer from Sarawak, Malaysia. I lost my job in April 2026 and am facing serious financial difficulties. Any support is deeply appreciated."
	/>
</svelte:head>

<!-- top nav bar -->
<header
	class={`fixed top-0 z-50 flex h-12 max-h-12 min-h-12 w-full flex-row items-center justify-center bg-light-neutral-10 dark:bg-dark-neutral-10`}
>
	<div
		class={`flex h-full w-full max-w-screen-lg flex-row items-center justify-between px-6 md:px-0`}
	>
		<div class={`flex h-full flex-row items-center justify-start`}>
			<a href="/" class={`flex flex-col items-center justify-center`}>
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
		<ThemeToggle />
	</div>
</header>

<main
	class={`min-h-screen w-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-light-neutral-10 font-sf-pro dark:bg-dark-neutral-10`}
>
	<div class={`mx-auto flex w-full max-w-screen-md flex-col items-start justify-start px-6 pt-24 pb-36 md:px-0`}>

		<!-- Hero image -->
		<div class={`w-full overflow-hidden rounded-xl`}>
			<img
				src="/images/fundraising/hero.png"
				alt="Person overwhelmed by financial documents including layoff notice and final notice bills"
				class={`w-full object-cover`}
			/>
		</div>

		<!-- Title -->
		<h1 class={`mt-8 text-2xl font-semibold leading-snug text-light-neutral-100 dark:text-dark-neutral-100 md:text-3xl`}>
			Help Me Recover From Job Loss and Debt Crisis
		</h1>

		<div class={`mt-2 flex flex-row items-center gap-4`}>
			<span class={`text-sm font-normal text-light-neutral-70 dark:text-dark-neutral-40`}>Crisis & Emergency</span>
			<span class={`text-light-neutral-30 dark:text-dark-neutral-30`}>·</span>
			<span class={`text-sm font-normal text-light-neutral-70 dark:text-dark-neutral-40`}>Sarawak, Malaysia</span>
		</div>

		<!-- Divider -->
		<div class={`mt-8 w-full border-t border-light-neutral-30 dark:border-dark-neutral-30`}></div>

		<!-- Story -->
		<article class={`mt-8 flex w-full flex-col gap-5 text-lg font-light leading-relaxed text-light-neutral-80 dark:text-dark-neutral-50`}>
			<p>Hello everyone,</p>
			<p>
				My name is Nielton, and I am reaching out during one of the most difficult periods of my
				life.
			</p>
			<p>
				At the end of April 2026, I unexpectedly lost my job as a software engineer. Since then, I
				have been actively searching for new opportunities, submitting applications, attending
				interviews, and doing everything I can to secure stable employment again. Unfortunately, the
				current job market has been extremely challenging, and despite my efforts, I have not yet
				been able to find a new role.
			</p>
			<p>
				Losing my income has placed me in a serious financial situation. I struggled to cover my
				expenses in May and was forced to take several short-term loans just to pay my rent and meet
				basic living costs.
			</p>
			<p>
				Recently, another financial challenge arose when I received a notice regarding outstanding
				income tax matters related to an issue from 2024. The additional financial burden has made
				an already difficult situation even harder to manage.
			</p>
			<p>
				Today, my total debt has grown to approximately <strong class={`font-semibold text-light-neutral-100 dark:text-dark-neutral-100`}>RM16,000</strong>, much of it from short-term
				loans carrying high interest rates. I am doing my best to manage these obligations, but the
				repayments are becoming overwhelming while I remain unemployed.
			</p>

			<p class={`font-normal text-light-neutral-90 dark:text-dark-neutral-60`}>The funds raised through this campaign will be used for:</p>
			<ul class={`flex flex-col gap-2 pl-2`}>
				<li class={`flex flex-row items-start gap-3`}>
					<span class={`mt-1 h-2 w-2 min-w-2 rounded-full bg-light-neutral-70 dark:bg-dark-neutral-40`}></span>
					Settling urgent high-interest debts
				</li>
				<li class={`flex flex-row items-start gap-3`}>
					<span class={`mt-1 h-2 w-2 min-w-2 rounded-full bg-light-neutral-70 dark:bg-dark-neutral-40`}></span>
					Paying rent and essential living expenses
				</li>
				<li class={`flex flex-row items-start gap-3`}>
					<span class={`mt-1 h-2 w-2 min-w-2 rounded-full bg-light-neutral-70 dark:bg-dark-neutral-40`}></span>
					Addressing outstanding tax obligations
				</li>
				<li class={`flex flex-row items-start gap-3`}>
					<span class={`mt-1 h-2 w-2 min-w-2 rounded-full bg-light-neutral-70 dark:bg-dark-neutral-40`}></span>
					Supporting basic necessities while I continue my job search
				</li>
			</ul>

			<p>
				I am not looking for a permanent solution or an easy way out. My goal is simply to survive
				this difficult period, regain financial stability, and continue pursuing employment
				opportunities until I can stand on my own again.
			</p>
			<p>
				If you are able to contribute, no matter the amount, your support would mean more than I can
				express. If you are unable to donate, sharing this fundraiser with others would also be a
				tremendous help.
			</p>
			<p>
				Thank you for taking the time to read my story and for any support, encouragement, or
				prayers you can offer during this challenging time.
			</p>
			<p>With gratitude,<br /><strong class={`font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>Nielton Didi</strong></p>
		</article>

		<!-- Divider -->
		<div class={`mt-12 w-full border-t border-light-neutral-30 dark:border-dark-neutral-30`}></div>

		<!-- Donation section -->
		<section id="donate" class={`mt-12 w-full`}>
			<h2 class={`text-xl font-semibold text-light-neutral-100 dark:text-dark-neutral-100`}>
				How to Support
			</h2>
			<p class={`mt-2 text-base font-light text-light-neutral-70 dark:text-dark-neutral-40`}>
				You can contribute via DuitNow QR or direct bank transfer. Every ringgit counts.
			</p>

			<div class={`mt-8 flex w-full flex-col gap-8 md:flex-row md:gap-10`}>

				<!-- DuitNow QR -->
				<div class={`flex flex-1 flex-col items-center gap-4 rounded-xl border border-light-neutral-30 p-6 dark:border-dark-neutral-30`}>
					<p class={`text-lg font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>DuitNow QR</p>
					<img
						src="/images/fundraising/cimb_qr.jpeg"
						alt="DuitNow QR code — CIMB"
						class={`w-56 rounded-lg`}
					/>
					<a
						href="/images/fundraising/cimb_qr.jpeg"
						download="nielton-didi-duitnow-qr.jpeg"
						class={`flex flex-row items-center gap-1.5 rounded-md bg-light-neutral-20 px-2.5 py-1 text-md font-normal text-light-neutral-70 transition-all duration-200 ease-in-out hover:bg-light-neutral-30 dark:bg-dark-neutral-20 dark:text-dark-neutral-40 dark:hover:bg-dark-neutral-30`}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						Save QR
					</a>
					<p class={`text-center text-md font-light text-light-neutral-60 dark:text-dark-neutral-40`}>
						Scan with any Malaysian banking app or e-wallet that supports DuitNow.
					</p>
				</div>

				<!-- Bank Transfer -->
				<div class={`flex flex-1 flex-col gap-5 rounded-xl border border-light-neutral-30 p-6 dark:border-dark-neutral-30`}>
					<p class={`text-lg font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>Bank Transfer</p>
					<div class={`flex flex-col gap-4`}>
						<div class={`flex flex-col gap-1`}>
							<p class={`text-md font-normal text-light-neutral-60 dark:text-dark-neutral-40`}>Account Name</p>
							<p class={`text-lg font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>Nielton Didi Anak James Mairodi</p>
						</div>
						<div class={`flex flex-col gap-1`}>
							<p class={`text-md font-normal text-light-neutral-60 dark:text-dark-neutral-40`}>Bank</p>
							<p class={`text-lg font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>CIMB Bank</p>
						</div>
						<div class={`flex flex-col gap-1`}>
							<p class={`text-md font-normal text-light-neutral-60 dark:text-dark-neutral-40`}>Account Number</p>
							<div class={`flex flex-row items-center gap-3`}>
								<p class={`text-lg font-medium text-light-neutral-100 dark:text-dark-neutral-100`}>7647565536</p>
								<button
									type="button"
									on:click={copyAccountNumber}
									class={`flex flex-row items-center gap-1.5 rounded-md px-2.5 py-1 text-md font-normal transition-all duration-200 ease-in-out ${accountCopied ? 'bg-light-neutral-30 text-light-neutral-80 dark:bg-dark-neutral-30 dark:text-dark-neutral-80' : 'bg-light-neutral-20 text-light-neutral-70 hover:bg-light-neutral-30 dark:bg-dark-neutral-20 dark:text-dark-neutral-40 dark:hover:bg-dark-neutral-30'}`}
								>
									{#if accountCopied}
										<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
										Copied
									{:else}
										<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
										Copy
									{/if}
								</button>
							</div>
						</div>
					</div>
					<p class={`text-md font-light text-light-neutral-60 dark:text-dark-neutral-40`}>
						After transferring, you may reach out via email so I can acknowledge your contribution personally.
					</p>
					<a
						href="mailto:nieltondidi@gmail.com"
						class={`text-md font-normal text-light-neutral-90 underline underline-offset-2 dark:text-dark-neutral-60`}
					>nieltondidi@gmail.com</a>
				</div>

			</div>
		</section>


	</div>
</main>

<!-- Fixed donate footer -->
<div class={`fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-center bg-light-neutral-10/80 backdrop-blur-md dark:bg-dark-neutral-10/80 border-t border-light-neutral-30 dark:border-dark-neutral-30 px-6 py-3`}>
	<div class={`flex w-full max-w-screen-md flex-row items-center justify-between gap-4`}>
		<p class={`text-sm font-light text-light-neutral-70 dark:text-dark-neutral-40`}>
			Every ringgit makes a difference.
		</p>
		<a
			href="#donate"
			class={`flex h-9 min-w-max flex-row items-center justify-center gap-2 rounded-lg bg-light-neutral-100 px-5 text-base font-medium text-light-neutral-10 transition-all duration-200 ease-in-out hover:bg-light-neutral-90 dark:bg-dark-neutral-100 dark:text-dark-neutral-10 dark:hover:bg-dark-neutral-90`}
		>
			Donate Now
		</a>
	</div>
</div>
