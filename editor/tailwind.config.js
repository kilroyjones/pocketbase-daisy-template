/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		'bg-base-100',
		'bg-primary',
		'bg-success',
		'bg-secondary',
		'bg-info',
		'bg-error',
		'bg-warning',
		'bg-primary-content',
		'border-base-100',
		'border-primary',
		'border-success',
		'border-secondary',
		'border-info',
		'border-error',
		'border-warning',
		'border-primary-content',
		'text-base-100',
		'text-primary',
		'text-success',
		'text-secondary',
		'text-info',
		'text-error',
		'text-warning',
		'text-primary-content'
	],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['cupcake']
	}
};
//
