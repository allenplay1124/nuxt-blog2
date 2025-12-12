module.exports = {
    darkMode: "class",
    tailwindcss: {
        config: {
            /* Extend the Tailwind config here */
            content: ["content/**/**.md"],
        },
    },
    content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `plugins/**/*.{js,ts}`,
        `nuxt.config.{js,ts}`,
    ],
    plugins: [require("@tailwindcss/typography")],
    typography: {
        DEFAULT: {
            css: {
                p: {
                    lineHeight: "1.9",
                    letterSpacing: "0.02em",
                },
                h1: {
                    letterSpacing: "-0.01em",
                },
                h2: {
                    letterSpacing: "-0.01em",
                },
            },
        },
    },
};
