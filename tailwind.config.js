/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite', // Custom animation for moving text
        opacityIn: 'opacityIn 3s ease-out', // Opacity animation for fade-in effect
        bounce: 'bounce 1.5s infinite', // Bouncing animation for icons/text
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        opacityIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        'blue-600': '#3182ce', // Adjust color if needed for your design
        'custom-blue': '#1a2d42', // Custom dark blue color for primary accents
      },
      spacing: {
        '128': '32rem', // For large spacing if needed
        'super-wide': '40rem', // Extra wide spacing for specific use cases
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Set a default sans-serif font family
        display: ['Oswald', 'sans-serif'], 
        riss: ['Pacifico', 'serif'],
      },
      boxShadow: {
        'xl': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow style for cards or buttons
        'custom': '0 10px 15px rgba(0, 0, 0, 0.1)', // A more intense shadow
      },
    },
  },
  plugins: [],
};
