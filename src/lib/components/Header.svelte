<script>
	import { page } from '$app/stores';
	import { asLink } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import IconMenu from '~icons/ph/list-bold';
	import IconClose from '~icons/ph/x-bold';
	import ButtonLink from './ButtonLink.svelte';
	import WordMark from './WordMark.svelte';
	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;

	let isOpen = false;

	const toggleOpen = () => (isOpen = !isOpen);
	const close = () => (isOpen = false);

	/**
	 *
	 * @param {import ('@prismicio/client').LinkField} link
	 */
	const isActive = (link) => {
		const path = asLink(link);
		return path && $page.url.pathname.includes(path);
	};
</script>

<header class="p4 md:p-6">
	<nav
		class="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center"
		aria-label="Main"
	>
		<div class="flex items-center justify-between">
			<a href="/" on:click={close} class="z-50">
				<WordMark />
				<span class="sr-only">{settings.data.site_title} home page</span>
			</a>

			<button
				aria-expanded={isOpen}
				type="button"
				class="block p-2 text-3xl text-white md:hidden"
				on:click={toggleOpen}
			>
				<IconMenu />
			</button>
		</div>

		<!-- Mobile Nav -->
		<div
			class="fixed inset-0 z-40 flex flex-col items-end bg-gray-950 pr-4 pt-6 transition-transform duration-300 ease-in-out md:hidden"
			class:translate-x-[100%]={!isOpen}
			class:translate-x-0={isOpen}
		>
			<button
				aria-expanded={isOpen}
				type="button"
				class="block p-2 text-3xl text-white md:hidden"
				on:click={toggleOpen}
			>
				<IconClose />
			</button>
			<ul class="grid justify-items-end gap-8">
				{#each settings.data.navigation as item (item.label)}
					<li>
						{#if item.cta_button}
							<ButtonLink
								aria-current={isActive(item.link) ? 'page' : undefined}
								on:click={close}
								field={item.link}
							>
								{item.label}
							</ButtonLink>
						{:else}
							<PrismicLink
								aria-current={isActive(item.link) ? 'page' : undefined}
								on:click={close}
								class="block min-h-11 px-3 text-3xl first:mt-8"
								field={item.link}
							>
								{item.label}
							</PrismicLink>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Desktop Nav -->
		<ul class="hidden gap-6 md:flex">
			{#each settings.data.navigation as item (item.label)}
				<li>
					{#if item.cta_button}
						<ButtonLink aria-current={isActive(item.link) ? 'page' : undefined} field={item.link}>
							{item.label}
						</ButtonLink>
					{:else}
						<PrismicLink
							aria-current={isActive(item.link) ? 'page' : undefined}
							class="inline-flex min-h-11 items-center"
							field={item.link}
						>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</header>
