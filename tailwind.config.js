const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
                roboto: ["Roboto", ...defaultTheme.fontFamily.serif],
            },
            colors: {
                brand: {
                    100: "#CCF4FC",
                    200: "#9BE4FA",
                    300: "#67C9F1",
                    400: "#41ABE3",
                    500: "#0A81D1",
                    600: "#0764B3",
                    700: "#054A96",
                    800: "#033579",
                    900: "#012564",
                },
                secondary: {
                    100: "#FDDFD0",
                    200: "#FCB7A3",
                    300: "#F68674",
                    400: "#EC5850",
                    500: "#E11B22",
                    600: "#C11329",
                    700: "#A20D2D",
                    800: "#82082D",
                    900: "#6C052D",
                },
            },
        },
    },

    plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
