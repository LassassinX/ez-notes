import type { Config } from 'tailwindcss'

const config: Config = {

	// daisy
	daisyui: {
		themes: [
			'light', // first one will be the default theme
			'dark',
			'night'
		],
	},

	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},

			minWidth: {
				'noteCardWidth': '140px',
			},

			maxWidth: { 
				'noteCardWidth': '180px',
			},

			height: {
				'noteCardHeight': '240px',
			},
		},
	},
	plugins: [
		require('daisyui')
	],
}
export default config
