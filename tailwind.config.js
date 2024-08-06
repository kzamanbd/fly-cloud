import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';
const primary = colors.purple;

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx'
    ],

    theme: {
        extend: {
            colors: {
                dark: {
                    primary: '#1E293B',
                    secondary: '#151521'
                },
                white: {
                    DEFAULT: '#FFFFFF',
                    light: '#E0E6ED'
                },
                light: {
                    gray: '#F5F8FA'
                },
                primary: {
                    ...primary,
                    DEFAULT: primary[500]
                },
                info: {
                    light: colors.blue[50],
                    DEFAULT: colors.blue[500]
                },
                danger: {
                    light: colors.red[50],
                    DEFAULT: colors.red[500]
                },
                success: {
                    light: colors.green[50],
                    DEFAULT: colors.green[500]
                },
                warning: {
                    light: colors.yellow[50],
                    DEFAULT: colors.yellow[500]
                },
                secondary: {
                    light: colors.gray[50],
                    DEFAULT: colors.gray[400]
                }
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans]
            }
        }
    },

    plugins: [forms]
};

