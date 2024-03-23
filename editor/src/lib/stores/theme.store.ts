// themeStore.ts
import { writable } from 'svelte/store';

type Theme = 'cupcake';

const createThemeStore = () => {
	const { subscribe, set, update } = writable<Theme>('cupcake');

	return {
		subscribe,
		toggle: () => {
			update((currentTheme) => {
				const newTheme: Theme = currentTheme === 'cupcake' ? 'cupcake' : 'cupcake';
				localStorage.setItem('theme', newTheme);
				document.documentElement.setAttribute('data-theme', newTheme);
				return newTheme; // This will automatically set the new value
			});
		},
		initialize: () => {
			const storedTheme = (localStorage.getItem('theme') as Theme) || 'cupcake';
			document.documentElement.setAttribute('data-theme', storedTheme);
			set(storedTheme);
		}
	};
};
export const ThemeStore = createThemeStore();
