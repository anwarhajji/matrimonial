import type { Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

const { nextui } = require('@nextui-org/react')

const config = withUt({
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    light: {
      layout: {}, // light theme layout tokens
      colors: {} // light theme colors
    },
    dark: {
      layout: {}, // dark theme layout tokens
      colors: {} // dark theme colors
    },
    darkMode: 'class',
    'purple-dark': {
      extend: 'dark', // <- inherit default values from dark theme
      colors: {
        background: '#0D001A',
        foreground: '#ffffff',
        primary: {
          50: '#3B096C',
          100: '#520F83',
          200: '#7318A2',
          300: '#9823C2',
          400: '#c031e2',
          500: '#DD62ED',
          600: '#F182F6',
          700: '#FCADF9',
          800: '#FDD5F9',
          900: '#FEECFE',
          DEFAULT: '#DD62ED',
          foreground: '#ffffff'
        },
        focus: '#F182F6'
      },
      layout: {
        disabledOpacity: '0.3',
        radius: {
          small: '4px',
          medium: '6px',
          large: '8px'
        },
        borderWidth: {
          small: '1px',
          medium: '2px',
          large: '3px'
        }
      }
    },

    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {
        xxs: '360px',
        xs: '480px'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        shimmer: {
          from: {
            'background-position': '0 0'
          },
          to: {
            'background-position': '-200% 0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s infinite linear'
      }
    }
  },

  plugins: [
    require('tailwindcss-animate'),
    nextui(),
    require('tailwindcss-react-aria-components'),
    require('tailwindcss-animate')
  ]
}) satisfies Config

export default config
