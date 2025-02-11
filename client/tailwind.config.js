/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				fadeInSlide: 'fadeInSlide 1s ease-out forwards',
			},
			keyframes: {
				fadeInSlide: {
					'0%': { opacity: 0, transform: 'translateY(-20px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
}
