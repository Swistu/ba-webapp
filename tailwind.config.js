/** @type {import('tailwindcss').Config} */
module.exports = {

    darkMode: 'class',
    content: [

        // "./node_modules/flowbite-react/**/*.js",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",],
    theme: {


        extend: {
            boxShadow: {
                panel: '0 4px 4px 0 rgba(50, 50, 50, 0.1), 0 6px 10px 0 rgba(190, 190, 190, 0.05)'
            },
            colors: {
                'primary': '#1A1A2E',
                'secondary': '#31384b',
                'tertiary': '#0F3460',
                'forth': '#2b3549',
                'gb-via': '#1A1A2E',
                'gb-to': '#213159',
                'gb-to-to': '#2874cc',
                'gb-to-tot': 'rgba(40,116,204,0.2)',
                'none': 'rgba(0, 0, 0, 0)',
            },
            minHeight: {
                panel: 'calc(100vh - 76px)',
            },
            width: {
                panel: 'calc(100% - 256px)'
            },
            fontFamily: {
                panel: 'Open Sans, sans-serif'
            },
            keyframes: {
                slide: {
                    '0%': {transform: 'translateY(400%)'},
                    '100%': {transform: 'translateY(0)'},
                }
            },
            animation: {
                'slide': 'slide 3s ease ',
            }
        },
    },
    plugins: [],
}
