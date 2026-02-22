import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'hsl(var(--color-surface-default) / <alpha-value>)',
        'surface-muted': 'hsl(var(--color-surface-muted) / <alpha-value>)',
        'text-primary': 'hsl(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'hsl(var(--color-text-secondary) / <alpha-value>)',
        border: 'hsl(var(--color-border-default) / <alpha-value>)',
        link: 'hsl(var(--color-link-primary) / <alpha-value>)',
        error: 'hsl(var(--color-state-error) / <alpha-value>)',
        success: 'hsl(var(--color-state-success) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)'
      },
      spacing: {
        'space-0': 'var(--space-0)',
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      }
    }
  },
  plugins: []
})
