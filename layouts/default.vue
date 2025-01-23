<template>
    <div>
        <header>
            <NavMenu />
        </header>
        <main>
            <Nuxt />
        </main>
        <footer class="w-full bg-slate-700 text-slate-100 h-20 p-5 text-center">
            {{ $nuxt.context.app.head.title }} &copy; 2025
        </footer>
    </div>
</template>

<script>
    import NavMenu from '~/components/NavMenu';
    export default {
        components: {
            NavMenu,
        },

        mounted() {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "G-F1RJPWRTPS");
        }
    }
</script>
