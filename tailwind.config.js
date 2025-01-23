module.exports = {
    darkMode: 'class',
    tailwindcss: {
        config: {
            /* Extend the Tailwind config here */
            content: ['content/**/**.md'],
        },
    },
    content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `plugins/**/*.{js,ts}`,
        `nuxt.config.{js,ts}`,
    ],
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
