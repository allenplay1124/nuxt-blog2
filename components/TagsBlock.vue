<template>
    <div class="bg-white/80 dark:text-slate-100 dark:bg-slate-800/50 dark:shadow-cyan-500/50 rounded-lg shadow-lg w-full backdrop-blur-md">
        <div class="text-2xl mb-2 border-l-8 pl-2 py-2 border-collapse border-blue-500 dark:border-cyan-500 flex justify-between items-center cursor-pointer select-none" @click="isOpen = !isOpen">
            <div>標籤</div>
            <div :class="{'rotate-90': isOpen}" class="transition-transform duration-200 mr-2">
                <IconArrowRight :width="24" :height="24" />
            </div>
        </div>

        <div class="pl-5 pb-5 pt-2 transition-all duration-300" v-show="isOpen">
            <span v-for="(tag, index) in tags"
                :key="index"
                class="text-gray-600 mr-2 my-2 px-2 py-1 rounded-md shadow-md float-left hover:text-blue-700 dark:text-cyan-100 dark:hover:text-cyan-300 dark:shadow-cyan-500/50 border dark:border-cyan-100">
                <nuxt-link :to="`/tags/${tag.name}`">
                    {{ tag.name }} ({{ tag.count }})
                </nuxt-link>
            </span>

            <div class="clear-both"></div>
        </div>
    </div>
</template>
<script>
import IconArrowRight from '~/components/Icon/ArrowRight'
export default {
    name: 'tags-block',

    props: ['tags'],

    components: {
        IconArrowRight
    },

    data() {
        return {
            isOpen: true
        }
    }
}
</script>
