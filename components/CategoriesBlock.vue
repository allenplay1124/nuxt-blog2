<template>
    <div class="bg-white/80 dark:text-slate-100 dark:bg-slate-800/50 dark:shadow-cyan-500/50  rounded-lg shadow-lg w-full backdrop-blur-md">
        <div class="text-2xl mb-2 border-l-8 pl-2 py-2 border-collapse border-blue-500 dark:border-cyan-500">
            分類
        </div>

        <ul class="pl-5 pb-5 pt-2">
            <li v-for="(cate, index) in categories" :key="index" class="hover:text-blue-500 dark:hover:text-cyan-500 py-1">
                <nuxt-link :to="cate.path">
                    {{ cate.title }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'categories-block',

    props: ['categories']
}
</script>
