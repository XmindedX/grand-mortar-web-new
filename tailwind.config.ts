import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

	container: {
		center: true,
		padding: '1rem',
	},

	fontFamily: {
		'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
	},

  	extend: {
  		colors: {
			gray: {
                DEFAULT: '#525866',
                100: '#FAFBFC',
                200: '#F9FAFB',
                300: '#E2E8F0',
                400: '#F5F7FA',
                500: '#B9BEC6',
                600: '#9CA3AF',
                700: '#6B7280',
            },
			danger: {
                DEFAULT: '#EF4444',
                light: '#FEE2E2',
            },
            success: {
                DEFAULT: '#22C55E',
                light: '#DCFCE7',
            },
            warning: '#EAB308',
            'light-theme': '#F4F7FF',
            'light-orange': '#FFEDD5',
            'light-blue': '#E0F2FE',
            'light-purple': '#F3E8FF',

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			primary: {
  				DEFAULT: '#2563eb',
  				admin: '#25388C'
  			},
  			green: {
  				'100': '#ECFDF3',
  				'400': '#4C7B62',
  				'500': '#2CC171',
  				'800': '#027A48',
  				DEFAULT: '#027A48'
  			},

  			blue: {
  				'100': '#0089F1'
  			},
  			light: {
  				'100': '#D6E0FF',
  				'200': '#EED1AC',
  				'300': '#F8F8FF',
  				'400': '#EDF1F1',
  				'500': '#8D8D8D',
  				'600': '#F9FAFB',
  				'700': '#E2E8F0',
  				'800': '#F8FAFC'
  			},
  			dark: {
  				'100': '#16191E',
  				'200': '#3A354E',
  				'300': '#232839',
  				'400': '#1E293B',
  				'500': '#0F172A',
  				'600': '#333C5C',
  				'700': '#464F6F',
  				'800': '#1E2230'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		screens: {
  			xs: '480px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;