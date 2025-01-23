import getRoutes from './utils/getRoutes'

export default {
    ssr: true,
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '艾玩不累格',
        htmlAttrs: {
            lang: 'zh-Hant-TW'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'google-adsense-account', content: 'ca-pub-7267777415172382' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            {
                async: true,
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7267777415172382',
                crossorigin: 'anonymous'
            },
            {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-F1RJPWRTPS'
            }
        ]
    },

    // color mode: https://go.nuxtjs.dev/config-color-mode
    darkMode: 'class',

    colorMode: {
        preference: 'system', // 默认值，使用系统的颜色模式
        fallback: 'light',    // 如果系统偏好不可用，默认使用浅色模式
        classSuffix: '', // 在 <html> 标签上添加的类名后缀
    },

    content: {
        liveEdit: false
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src:  '~/plugins/carousel.js', ssr: false },
        { src:  '~/plugins/disqus.js', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',

        '@nuxtjs/color-mode',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxt/content', '@nuxtjs/sitemap'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    sitemap: {
        hostname: 'https://allenplay.net',
        routes() {
            return getRoutes()
        },
    },
}
