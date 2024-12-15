import { writable } from 'svelte/store';

const initialTheme: any = localStorage.getItem('theme') || 'light';

export const theme = writable<'light' | 'dark'>(initialTheme);

theme.subscribe((value) => {
	localStorage.setItem('theme', value);
	document.documentElement.classList.toggle('dark', value === 'dark');
});
