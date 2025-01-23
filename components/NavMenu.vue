<template>
    <div>
        <nav ref="navbar"
            class="container bg-white border dark:bg-gray-600 dark:text-gray-200 dark:shadow-cyan-500/50 shadow-lg p-4 relative transition-all duration-300 mx-auto my-8 rounded-full z-50">
            <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-xl font-bold flex flex-row">
                    <div class="mt-1 mx-2 text-gray-700 dark:text-cyan-100">
                        <a href="/">
                            {{ $nuxt.context.app.head.title }}
                        </a>
                    </div>
                    </a>
                </h1>
                <button type="button" id="menu-toggle" @click="toggleMenu()"
                    class="lg:hidden text-gray-700 focus:outline-none dark:text-cyan-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <ul class="hidden lg:flex space-x-4 items-center lg:static lg:space-x-8">
                    <li v-for="menu in navItems" :key="menu.title">
                        <nuxt-link :to="menu.link"
                            class="text-gray-700 focus:outline-none dark:text-cyan-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-4 py-2">
                            {{ menu.title }}
                        </nuxt-link>
                    </li>

                    <li>
                        <button
                            class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100"
                            @click="$colorMode.preference = 'system'">
                            <IconDesktop />
                        </button>
                    </li>

                    <li>
                        <button
                            class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100"
                            @click="$colorMode.preference = 'light'">
                            <IconWbSunny />
                        </button>
                    </li>

                    <li>
                        <button
                            class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100"
                            @click="$colorMode.preference = 'dark'">
                            <IconDarkMode />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

        <div
            v-show="isShow"
            class="container absolute mx-auto top-30 z-50 bg-white dark:bg-gray-600 rounded-lg shadow-lg">
            <div class="text-right m-2">
                <button @click="toggleMenu()" class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100">
                    <IconClose :width="32" :height="32"  />
                </button>
            </div>
            <ul class="flex flex-col items-center space-y-4 my-4">
                <li v-for="menu in navItems" :key="menu.title" @click="closeMenu()">
                    <nuxt-link :to="menu.link"
                        class="text-gray-700 focus:outline-none dark:text-cyan-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-4 py-2">
                        {{ menu.title }}
                    </nuxt-link>
                </li>
            </ul>

            <hr />

            <div class="flex justify-center items-center gap-4 my-4">
                <div>
                    <button
                        class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100"
                        @click="$colorMode.preference = 'system'">
                        <IconDesktop />
                    </button>
                </div>
                <div>
                    <button
                        class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100"
                        @click="$colorMode.preference = 'light'">
                        <IconWbSunny />
                    </button>
                </div>
                <div>
                    <button
                        class="rounded-full shadow-xl px-2 pt-1 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-cyan-100"
                        @click="$colorMode.preference = 'dark'">
                        <IconDarkMode />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import IconDesktop from '~/components/Icon/Desktop';
    import IconWbSunny from '~/components/Icon/Sun';
    import IconDarkMode from '~/components/Icon/DarkMoon';
    import IconClose from '~/components/Icon/Close';
    export default {
        name: 'NavMenu',

        components: {
            IconDesktop,
            IconWbSunny,
            IconDarkMode,
            IconClose,
        },

        data() {
            return {
                isShow: false,
                navItems: [
                    { title: "Home", link: "/", icon: "" },
                    { title: "關於我", link: "/docs/profile", icon: "" },
                    { title: "關於本站", link: "/docs/site", icon: "" },
                ]
            };
        },

        mounted() {
            this.title = this.$nuxt.context.app.head.title;
            window.addEventListener("scroll", this.handleScroll);
        },

        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll); // 清除事件監聽器，避免內存洩漏
        },

        methods: {
            setColorMode(mode) { },

            toggleMenu() {
                this.isShow = this.isShow ? false : true;
            },

            closeMenu() {
                this.isShow = false;
            },

            handleScroll() {
                const navbar = this.$refs.navbar;
                if (navbar) {
                    navbar.classList.remove("fixed", "top-0", "shadow-lg", "w-full");
                    navbar.classList.add(
                        "relative",
                        "container",
                        "mx-auto",
                        "my-8",
                        "rounded-full",
                        "shadow-gray-500/50"
                    );
                    //捲軸往下滾動時
                    if (window.scrollY > 0) {
                        navbar.classList.add("fixed", "top-0", "shadow-lg", "w-full");
                        navbar.classList.remove(
                            "relative",
                            "container",
                            "mx-auto",
                            "my-8",
                            "rounded-full"
                        );
                    }
                }
            },
        },
    }
</script>
