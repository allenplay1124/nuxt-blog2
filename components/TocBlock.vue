<template>
    <div class="bg-white dark:text-slate-100 dark:bg-slate-700 dark:shadow-cyan-500/50 rounded-lg shadow-lg w-full">
        <div class="text-2xl mb-2 border-l-8 pl-2 py-2 border-collapse border-blue-500 dark:border-cyan-500">
            文章主題
        </div>

        <ul class="pl-5 pb-5 pt-2">
            <li v-for="(item, index) in toc" :key="index" class="py-2 hover:text-blue-500 dark:hover:text-cyan-500">

                <div v-if="item.depth == 2" class="flex flex-row pl-2 hover:text-blue-500 dark:hover:text-cyan-500">
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

                <div v-if="item.depth == 4" class="flex flex-row pl-16 hover:text-blue-500 dark:hover:text-cyan-500">
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
</template>
<script>
    import IconArrowRight from '~/components/Icon/ArrowRight'
    export default {
        name: "toc-block",

        props: ["toc"],

        components: {
            IconArrowRight
        },
    };
</script>
