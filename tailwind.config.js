/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'SF Mono', 
          'Monaco', 
          'Cascadia Code', 
          'Roboto Mono', 
          'Consolas', 
          'Courier New', 
          'monospace'
        ],
        sans: [
          'JetBrains Mono',
          'SF Mono', 
          'Monaco', 
          'Cascadia Code', 
          'Roboto Mono', 
          'Consolas', 
          'Courier New', 
          'monospace'
        ]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addComponents }) {
      addComponents({
        // Retro card base styles
        '.card-retro': {
          '@apply bg-slate-800 border border-slate-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out': {},
          '&:hover': {
            '@apply border-slate-600 shadow-md -translate-y-0.5': {}
          }
        },
        // Retro link styles
        '.link-retro': {
          '@apply text-blue-400 hover:text-blue-300 no-underline hover:underline transition-colors': {},
          '&:focus': {
            '@apply outline-2 outline-amber-400 outline-offset-2 rounded': {}
          }
        },
        // Retro button styles
        '.btn-retro': {
          '@apply inline-flex items-center gap-2 font-mono font-medium no-underline px-6 py-3 border rounded-lg transition-all duration-200 ease-in-out': {},
          '@apply text-blue-400 hover:text-blue-300 border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700': {},
          '&:hover': {
            '@apply -translate-y-0.5 shadow-md': {}
          },
          '&:focus': {
            '@apply outline-2 outline-amber-400 outline-offset-2': {}
          }
        },
        // Meta text (dates, reading time, etc.)
        '.meta-retro': {
          '@apply flex items-center gap-3 text-sm text-slate-400 font-mono': {}
        }
      })
    }
  ],
}