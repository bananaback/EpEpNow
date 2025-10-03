/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './assets/js/**/*.js'],
    theme: {
        extend: {
            colors: {
                limeJuice: '#A3E635',
                orangeSplash: '#FB923C',
                pinkFizz: '#F472B6',
                sunnyGlow: '#FCD34D',
                cream: '#FFF7ED',
                beige: '#FEF3C7',
                slateDeep: '#374151',
            },
            boxShadow: {
                soft: '0 20px 45px rgba(244, 114, 182, 0.18)',
                float: '0 18px 35px rgba(251, 146, 60, 0.2)',
                overlay: '0 30px 120px rgba(55, 65, 81, 0.25)',
            },
            fontFamily: {
                heading: ['Poppins', 'Montserrat', 'sans-serif'],
                body: ['Lato', 'Open Sans', 'sans-serif'],
            },
            transitionTimingFunction: {
                springy: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
};
