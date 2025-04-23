import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        bounceIn: 'bounceIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: "0", transform: 'scale(0.98)' },
          '100%': { opacity: "1", transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: "0" },
          '60%': { transform: 'scale(1.05)', opacity: "0" },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  
  plugins: [],
}

export default config
