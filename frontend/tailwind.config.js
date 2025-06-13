/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',  // blue-500
          dark: '#1e40af',   // blue-800
        },
        accent: {
          DEFAULT: '#10b981', // emerald-500
          light: '#34d399',  // emerald-400
          dark: '#047857',   // emerald-800
        },
        background: '#f9fafb', // gray-50
        surface: '#ffffff',
        muted: '#6b7280', // gray-500
        danger: '#ef4444', // red-500
        warning: '#f59e42', // orange-400
        success: '#22c55e', // green-500
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}

