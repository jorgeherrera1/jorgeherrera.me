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
  plugins: [require('@tailwindcss/typography')],
}