<template>
    <div class="bg-white/80 dark:text-slate-100 dark:bg-slate-800/50 dark:shadow-cyan-500/50  rounded-lg shadow-lg w-full backdrop-blur-md">
        <div class="text-2xl mb-2 border-l-8 pl-2 py-2 border-collapse border-blue-500 dark:border-cyan-500">
            標籤
        </div>

        <div class="pl-5 pb-5 pt-2">
            <span v-for="(tag, index) in tags"
                :key="index"
                class="text-gray-600 mr-2 my-2 px-2 py-1 rounded-md shadow-md float-left hover:text-blue-700 dark:text-cyan-100 dark:hover:text-cyan-300 dark:shadow-cyan-500/50 border dark:border-cyan-100">
                <nuxt-link :to="`/tags/${tag}`">
                    {{ tag }}
                </nuxt-link>
            </span>

            <div class="clear-both"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tags-block',

    props: ['tags']
}
</script>
