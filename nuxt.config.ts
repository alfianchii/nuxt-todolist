// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    typescript: {
        typeCheck: true,
        strict: true,
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
            extensions: ['.vue'],
        },
    ],
});
