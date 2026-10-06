/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '1.5rem' } },
    extend: {
      colors: {
        bg: '#DBDDDC',
        surface: '#F0F2F1',
        ink: '#232625',
        slate: '#2C3841',
        sky: '#A9CFDD',
        'muted-light': '#5B6462',
        'muted-dark': '#9AA6AB',
        ok: '#8FD3A8',
        put: '#E6C27A',
        del: '#E59A9A',
        paper: '#EEF1F0',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        num: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1200px' },
      borderColor: {
        'sky-line': 'rgba(169,207,221,0.30)',
        'ink-line': 'rgba(35,38,37,0.15)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        blink: { '50%': { opacity: '0' } },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scrollline: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        pulsedot: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(143,211,168,.6)' },
          '50%': { boxShadow: '0 0 0 6px rgba(143,211,168,0)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
        shimmer: 'shimmer 1.1s linear infinite',
        scrollline: 'scrollline 2s ease-in-out infinite',
        pulsedot: 'pulsedot 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
