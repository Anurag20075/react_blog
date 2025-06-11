/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2D3748', // Deep charcoal - gray-700
        'secondary': '#4A5568', // Mid-tone gray - gray-600
        'accent': '#E53E3E', // Warm red - red-500
        'background': '#FAFAFA', // Warm off-white - gray-50
        'surface': '#FFFFFF', // Pure white - white
        'text-primary': '#1A202C', // Rich dark gray - gray-900
        'text-secondary': '#718096', // Balanced gray - gray-500
        'success': '#38A169', // Natural green - green-500
        'warning': '#D69E2E', // Amber - yellow-500
        'error': '#E53E3E', // Warm red - red-500
        'border': '#E2E8F0', // Light gray - gray-200
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Serif 4', 'serif'],
        'caption': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'content': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'elevated': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'card': '6px',
        'button': '4px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-right': 'slideRight 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      zIndex: {
        'navigation': '1000',
        'dropdown': '1050',
        'backdrop': '1099',
        'mobile-menu': '1100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}