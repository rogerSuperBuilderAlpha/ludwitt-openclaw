import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        basics: {
          // Backgrounds - reference CSS variables
          'bg-page': 'var(--b-bg-page)',
          'bg-card': 'var(--b-bg-card)',
          'bg-card-hover': 'var(--b-bg-card-hover)',
          'bg-elevated': 'var(--b-bg-elevated)',
          'bg-muted': 'var(--b-bg-muted)',
          
          // Background opacity variants
          'bg-elevated-10': 'var(--b-bg-elevated-10)',
          'bg-elevated-20': 'var(--b-bg-elevated-20)',
          'bg-elevated-30': 'var(--b-bg-elevated-30)',
          'bg-elevated-50': 'var(--b-bg-elevated-50)',
          'bg-elevated-70': 'var(--b-bg-elevated-70)',
          
          // Text - reference CSS variables
          'text-primary': 'var(--b-text-primary)',
          'text-secondary': 'var(--b-text-secondary)',
          'text-muted': 'var(--b-text-muted)',
          'text-disabled': 'var(--b-text-disabled)',
          'text-inverse': 'var(--b-text-inverse)',
          
          // Borders - reference CSS variables
          'border-default': 'var(--b-border-default)',
          'border-muted': 'var(--b-border-light)',
          'border-medium': 'var(--b-border-medium)',
          'border-light': 'var(--b-border-light)',
          
          // Math (Blue) - reference CSS variables
          'math-primary': 'var(--b-math)',
          'math-light': 'var(--b-math-light)',
          'math-light-50': 'var(--b-math-light-50)',
          'math-border': 'var(--b-math-border)',
          'math-border-50': 'var(--b-math-border-50)',
          'math-text': 'var(--b-math-text)',
          'math-dark': 'var(--b-math-dark)',
          
          // Reading (Green) - reference CSS variables
          'reading-primary': 'var(--b-reading)',
          'reading-light': 'var(--b-reading-light)',
          'reading-light-50': 'var(--b-reading-light-50)',
          'reading-border': 'var(--b-reading-border)',
          'reading-border-50': 'var(--b-reading-border-50)',
          'reading-text': 'var(--b-reading-text)',
          'reading-dark': 'var(--b-reading-dark)',
          
          // Logic (Purple) - reference CSS variables
          'logic-primary': 'var(--b-logic)',
          'logic-light': 'var(--b-logic-light)',
          'logic-light-50': 'var(--b-logic-light-50)',
          'logic-border': 'var(--b-logic-border)',
          'logic-border-50': 'var(--b-logic-border-50)',
          'logic-text': 'var(--b-logic-text)',
          'logic-dark': 'var(--b-logic-dark)',
          
          // Writing (Amber) - reference CSS variables
          'writing-primary': 'var(--b-writing)',
          'writing-primary-20': 'var(--b-writing-primary-20)',
          'writing-light': 'var(--b-writing-light)',
          'writing-light-50': 'var(--b-writing-light-50)',
          'writing-border': 'var(--b-writing-border)',
          'writing-border-50': 'var(--b-writing-border-50)',
          'writing-text': 'var(--b-writing-text)',
          'writing-dark': 'var(--b-writing-dark)',
          
          // Latin (Red) - reference CSS variables
          'latin-primary': 'var(--b-latin)',
          'latin-light': 'var(--b-latin-light)',
          'latin-border': 'var(--b-latin-border)',
          'latin-text': 'var(--b-latin-text)',
          'latin-dark': 'var(--b-latin-dark)',
          
          // Greek (Indigo) - reference CSS variables
          'greek-primary': 'var(--b-greek)',
          'greek-light': 'var(--b-greek-light)',
          'greek-light-30': 'var(--b-greek-light-30)',
          'greek-light-50': 'var(--b-greek-light-50)',
          'greek-border': 'var(--b-greek-border)',
          'greek-text': 'var(--b-greek-text)',
          'greek-dark': 'var(--b-greek-dark)',
          
          // Status - reference CSS variables
          'success': 'var(--b-success)',
          'success-light': 'var(--b-success-light)',
          'success-dark': 'var(--b-success-dark)',
          'success-border': 'var(--b-success-border)',
          
          'warning': 'var(--b-warning)',
          'warning-light': 'var(--b-warning-light)',
          'warning-dark': 'var(--b-warning-dark)',
          'warning-border': 'var(--b-warning-border)',
          
          'danger': 'var(--b-danger)',
          'danger-light': 'var(--b-danger-light)',
          'danger-dark': 'var(--b-danger-dark)',
          'danger-border': 'var(--b-danger-border)',
          
          'info': 'var(--b-info)',
          'info-light': 'var(--b-info-light)',
          'info-dark': 'var(--b-info-dark)',
          'info-border': 'var(--b-info-border)',
        },
      },
      boxShadow: {
        'basics-modal': 'var(--b-shadow-modal)',
        'basics-card': 'var(--b-shadow-md)',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleIn: 'scaleIn 0.4s ease-out',
        shake: 'shake 0.4s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
