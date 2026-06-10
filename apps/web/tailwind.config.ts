import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      cocoa: { DEFAULT: '#4A352B', dark: '#3A2820' },
      cream: { DEFAULT: '#F2EDE4', dark: '#EAE2D6' },
      sage:  { DEFAULT: '#6B7A5C', light: '#8A9A7B' },
      terracotta: '#B08968', ink: '#5A4A3F',
    },
    fontFamily: {
      display: ['var(--font-playfair)', 'serif'],
      body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
    },
    letterSpacing: { eyebrow: '0.35em' },
  }},
  plugins: [],
} satisfies Config;
