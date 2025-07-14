<template>
    <div class="flex flex-col items-center space-y-4">
        <div class="text-gray-600">
            文章總數：{{ totalCount }} / 總頁數：{{ totalPages }}
        </div>
        <div class="flex space-x-2">
            <nuxt-link
                v-for="n in totalPages"
                :key="n"
                :to="`?page=${n}`"
                :class="[
                    'px-3 py-2 rounded-md border',
                    n === page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-blue-500 border-gray-300 hover:bg-gray-100',
                ]"
            >
                {{ n }}
            </nuxt-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Pagenav",

        props: {
            page: {
                type: Number,
                default: 1,
            },
            totalPages: {
                type: Number,
                default: 1, // Total number of pages for pagination
            },
            totalCount: {
                type: Number,
                default: 0, // Total number of articles
            },
        },

    }
</script>
