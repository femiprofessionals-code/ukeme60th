/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "chocolate" keys retained as names so existing classes keep working,
        // but remapped to black-marble tones to match the invitation.
        chocolate: {
          DEFAULT: '#131316',
          deep: '#0E0E10',
          espresso: '#09090A',
          warm: '#1A1A1D',
          card: '#161618',
        },
        gold: {
          DEFAULT: '#BE9650',
          light: '#DEC894',
          pale: '#EFE3C3',
          deep: '#8E6A34',
        },
        ivory: '#F3EAD6',
        cream: '#E9DBBB',
        // "royal" retained as a name but remapped to warm gold so any
        // remaining usage reads as a soft gold glow, never blue.
        royal: {
          DEFAULT: '#5A4220',
          light: '#7A5A2C',
          glow: '#6B4E26',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(203,161,92,0.35), 0 18px 50px -20px rgba(0,0,0,0.85)',
        card: '0 24px 60px -28px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #EFE3C3 0%, #BE9650 45%, #8E6A34 100%)',
        'gold-soft': 'linear-gradient(135deg, rgba(233,210,160,0.16), rgba(154,110,55,0.05))',
        'choco-radial': 'radial-gradient(120% 85% at 50% 0%, #1A1A1D 0%, #131316 42%, #09090A 100%)',
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
        bob: {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 8s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        floatslow: 'floatslow 7s ease-in-out infinite',
        bob: 'bob 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
