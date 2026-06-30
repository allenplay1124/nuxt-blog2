<template>
    <div class="fixed top-55 left-1 md:left-4 z-50">
        <button
            v-if="!isVisible"
            @click="isVisible = true"
            class="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/50 dark:text-slate-100 dark:shadow-cyan-500/50 rounded-lg shadow-lg backdrop-blur-md px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-blue-500 hover:text-white dark:hover:bg-cyan-500 transition-all duration-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
            </svg>
            <span class="font-bold">目錄</span>
        </button>

        <div
            v-else
            class="bg-white/80 dark:text-slate-100 dark:bg-slate-800/50 dark:shadow-cyan-500/50 rounded-lg shadow-lg backdrop-blur-md w-56 md:w-64 max-h-96 overflow-y-auto"
        >
            <div
                class="text-2xl border-l-8 pl-2 py-2 border-collapse border-blue-500 dark:border-cyan-500 flex justify-between items-center cursor-pointer select-none"
                @click="isOpen = !isOpen"
            >
                <div>文章主題</div>
                <div class="flex items-center">
                    <div
                        class="mr-2 p-1 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors duration-200"
                        @click.stop="isVisible = false"
                    >
                        <IconClose :width="20" :height="20" />
                    </div>
                    <div
                        :class="{ 'rotate-90': isOpen }"
                        class="transition-transform duration-200 mr-2"
                    >
                        <IconArrowRight :width="24" :height="24" />
                    </div>
                </div>
            </div>

            <ul class="pb-5 pt-2 overflow-hidden transition-all duration-300 text-sm" v-show="isOpen">
                <li v-for="(item, index) in toc" :key="index" class="py-2 hover:text-blue-500 dark:hover:text-cyan-500">

                    <div v-if="item.depth == 2" class="flex flex-row pl-4 hover:text-blue-500 dark:hover:text-cyan-500">
                        <div class="mt-1">
                            <IconArrowRight :width="22" :height="22" />
                        </div>
                        <div>
                            <a :href="`#${item.id}`">
                                {{ item.text }}
                            </a>
                        </div>

                    </div>

                    <div v-if="item.depth == 3" class="flex flex-row pl-8 hover:text-blue-500 dark:hover:text-cyan-500">
                        <div class="mt-1">
                            <IconArrowRight :width="16" :height="16" />
                        </div>
                        <div>
                            <a :href="`#${item.id}`">
                                {{ item.text }}
                            </a>
                        </div>

                    </div>

                    <div v-if="item.depth == 4" class="flex flex-row pl-8 hover:text-blue-500 dark:hover:text-cyan-500">
                        <div class="mt-1">
                            <IconArrowRight :width="12" :height="12" />
                        </div>
                        <div>
                            <a :href="`#${item.id}`">
                                {{ item.text }}
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import IconArrowRight from '~/components/Icon/ArrowRight'
    import IconClose from '~/components/Icon/Close'
        export default {
        name: "toc-block",

        props: ["toc"],

        components: {
            IconArrowRight,
            IconClose
        },

        data() {
            return {
                isOpen: true,
                isVisible: false
            }
        }
    };
</script>
