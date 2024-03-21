// themeStore.ts
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const createThemeStore = () => {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		toggle: () => {
			update((currentTheme) => {
				const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
				localStorage.setItem('theme', newTheme);
				document.documentElement.setAttribute('data-theme', newTheme);
				return newTheme; // This will automatically set the new value
			});
		},
		initialize: () => {
			const storedTheme = (localStorage.getItem('theme') as Theme) || 'light';
			document.documentElement.setAttribute('data-theme', storedTheme);
			set(storedTheme);
		}
	};
};
export const ThemeStore = createThemeStore();
