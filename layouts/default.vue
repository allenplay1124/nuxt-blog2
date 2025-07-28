<template>
    <div class="w-full h-full bg-cover bg-fixed m-0" :style="baclgroundImage">
        <header class="m-0 p-0">
            <NavMenu />
        </header>
        <main>
            <Nuxt />
        </main>
        <footer
            class="w-full bg-white/50 dark:bg-slate-800/30 backdrop-blur-md dark:text-slate-100 text-slate-800 h-20 p-5 text-center inset-shadow-3xl dark:shadow-cyan-100"
        >
            {{ $nuxt.context.app.head.title }} &copy; 2025
        </footer>
    </div>
</template>

<script>
import NavMenu from "~/components/NavMenu";
export default {
    components: {
        NavMenu,
    },

    data() {
        return {
            lightBg: [
                "/images/bg/light-bg-01.png",
                "/images/bg/light-bg-02.png",
                "/images/bg/light-bg-03.png",
                "/images/bg/light-bg-04.png",
                "/images/bg/light-bg-05.png",
            ],
            darkBg: [
                "/images/bg/dark-bg-01.png",
                "/images/bg/dark-bg-02.png",
                "/images/bg/dark-bg-03.png",
                "/images/bg/dark-bg-04.png",
                "/images/bg/dark-bg-05.png",
            ],
            currentBg: "",
        };
    },

    computed: {
        baclgroundImage() {
            if (!this.currentBg) return {};
            return { backgroundImage: `url('${this.currentBg}')` };
        },
    },

    watch: {
        "$colorMode.value": {
            immediate: true,
            handler(value) {
                this.changeBackground(value);
            },
        },
    },

    mounted() {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-F1RJPWRTPS");

        this.changeBackground(this.$colorMode.value);
    },

    methods: {
        changeBackground(value) {
            if (value === "light" || value === "system") {
                this.currentBg =
                    this.lightBg[
                        Math.floor(Math.random() * this.lightBg.length)
                    ];
            } else {
                this.currentBg =
                    this.darkBg[Math.floor(Math.random() * this.darkBg.length)];
            }
        },
    },
};
</script>
