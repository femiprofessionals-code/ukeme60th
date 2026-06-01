/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: {
          DEFAULT: '#2A1A12',
          deep: '#1E120C',
          espresso: '#150C07',
          warm: '#3B2618',
          card: '#241710',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E8CD8C',
          pale: '#F2E2BA',
          deep: '#A87E2E',
        },
        ivory: '#F7F1E3',
        cream: '#EFE6D2',
        royal: {
          DEFAULT: '#1E3A8A',
          light: '#3B5BBF',
          glow: '#2747A8',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,75,0.35), 0 18px 50px -20px rgba(0,0,0,0.7)',
        card: '0 24px 60px -28px rgba(0,0,0,0.75)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8CD8C 0%, #C9A24B 45%, #A87E2E 100%)',
        'gold-soft': 'linear-gradient(135deg, rgba(232,205,140,0.18), rgba(168,126,46,0.06))',
        'choco-radial': 'radial-gradient(120% 80% at 50% 0%, #3B2618 0%, #2A1A12 45%, #150C07 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        floatslow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        floatslow: 'floatslow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
