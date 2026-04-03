import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coffee-bg-primary': '#2D1810',
        'coffee-bg-secondary': '#3D2820',
        'coffee-border': '#5A4034',
        'coffee-text-primary': '#F5E6D3',
        'coffee-text-secondary': '#C9B8A0',
        'coffee-accent': '#4F9C8F',
        'coffee-gold': '#FFD700',
      },
      backgroundImage: {
        'coffee-gradient': 'linear-gradient(135deg, #2D1810 0%, #1A0F0A 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #4F9C8F, 0 0 20px #4F9C8F' },
          'to': { boxShadow: '0 0 20px #4F9C8F, 0 0 30px #4F9C8F' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
export default config
