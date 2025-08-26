/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', 
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cer-gray': 'rgb(75, 75, 77)',
                'cer-blue':'rgb(24, 160, 150)',
                'c-b-op10': 'rgba(24, 160, 150, 0.1)',
                'cer-blue-pastel': '#DCEBEC',
                'c-b-op25': 'rgba(24, 160, 150, 0.25)',
                'c-b-op50': 'rgba(24, 160, 150, 0.5)',
                'c-b-op75': 'rgba(24, 160, 150, 0.75)',
                'cer-yellow':'rgb(248, 179, 50)',
                'c-y-op10': 'rgba(248, 179, 50, 0.1)',
                'c-y-op25': 'rgba(248, 179, 50, 0.25)',
                'c-y-op50': 'rgba(248, 179, 50, 0.5)',
                'c-y-op75': 'rgba(248, 179, 50, 0.75)',
                'cer-red': 'rgb(232, 80, 31)',
                'c-r-op10': 'rgba(232, 80, 31, 0.1)',
                'c-r-op25': 'rgba(232, 80, 31, 0.25)',
                'c-r-op50': 'rgba(232, 80, 31, 0.5)',
                'c-r-op75': 'rgba(232, 80, 31, 0.75)',
                lightBackground: '#f3f4f6',
                darkBackground: '#333946',
            },
            fontFamily: {
                sans: ['Nexa','Arial','sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}

