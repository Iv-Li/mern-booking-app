/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        blue: {
          200: 'var(--bg-blocks)',
          300: 'var(--bg-tags)',
          500: 'var(--text-main)',
          600: 'var(--bg-component)',
          800: 'var(--bg-main)',
        },
        orange: {
          400: 'var(--bg-search)'
        }
      }
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "10rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-img': {
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
        '.neomorthin': {
          boxShadow: `-6px -6px 14px rgba(245, 247, 248, .07),
                      -6px -6px 10px rgba(245, 247, 248, .05),
                      6px 6px 8px rgba(245, 247, 248, .075),
                      6px 6px 10px rgba(0, 0, 0, .15)`,

          '&:hover': {
            boxShadow: `-2px -2px 6px rgba(255, 255, 255, .06),
                        -2px -2px 4px rgba(255, 255, 255, .04),
                        2px 2px 2px rgba(255, 255, 255, .05),
                        2px 2px 4px rgba(0, 0, 0, .1)`
          },
          '$:active': {
            boxShadow: `inset -2px -2px 6px rgba(255, 255, 255, .7),
                        inset -2px -2px 4px rgba(255, 255, 255, .5),
                        inset 2px 2px 2px rgba(255, 255, 255, .075),
                        inset 2px 2px 4px rgba(0, 0, 0, .15)`
          }
        }
      })
    })
  ],
}

