import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	mode: 'jit',
	theme: {
		extend: {
			fontFamily: {
				'sf-pro': ['SF Pro', 'sans-serif']
			},
			fontWeight: {
				thin: '100',
				extralight: '200',
				light: '300',
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
				extrabold: '800',
				black: '900'
			},
			fontSize: {
				xs: '10px',
				sm: '11px',
				base: '12px',
				md: '14px',
				lg: '16px',
				xl: '20px',
				'2xl': '28px',
				headline: '88px'
			},
			colors: {
				light: {
					neutral: {
						10: '#FFFFFF',
						20: '#F8F9FA',
						30: '#E9ECEF',
						40: '#DEE2E6',
						50: '#CED4DA',
						60: '#ADB5BD',
						70: '#6C757D',
						80: '#495057',
						90: '#343A40',
						100: '#212529'
					}
				},
				dark: {
					neutral: {
						10: '#212529',
						20: '#343A40',
						30: '#495057',
						40: '#6C757D',
						50: '#ADB5BD',
						60: '#CED4DA',
						70: '#DEE2E6',
						80: '#E9ECEF',
						90: '#F8F9FA',
						100: '#FFFFFF'
					}
				}
			}
		}
	},
	plugins: []
} satisfies Config;
