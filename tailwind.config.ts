import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E3A8A',
          600: '#1D4ED8',
          500: '#3B82F6',
          50: '#EFF6FF'
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          subtle: '#94A3B8'
        },
        line: '#E2E8F0',
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#F8FAFC',
          3: '#F1F5F9',
          dark: '#0F172A'
        },
        success: { DEFAULT: '#15803D', 50: '#F0FDF4' },
        warning: { DEFAULT: '#B45309', 50: '#FFFBEB' },
        danger: { DEFAULT: '#B91C1C', 50: '#FEF2F2' },
        zw: {
          yellow: '#FCD116',
          green: '#006400',
          red: '#CE1126'
        }
      },
      fontFamily: {
        sans: ['var(--font-ubuntu)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ubuntu-mono)', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'display-1': ['clamp(2.5rem, 6vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        eyebrow: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '500' }]
      },
      borderRadius: {
        DEFAULT: '10px',
        lg: '16px',
        xl: '24px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
        DEFAULT: '0 4px 12px rgba(15, 23, 42, 0.08)',
        lg: '0 12px 32px rgba(15, 23, 42, 0.12)'
      },
      maxWidth: { container: '1280px' },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        emphasis: 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
