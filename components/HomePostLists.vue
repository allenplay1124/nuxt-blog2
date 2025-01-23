<template>
    <div class="container mx-auto my-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(post, index) in posts" :key="index"
                class="shadow-md rounded-lg dark:bg-slate-700 dark:shadow-cyan-500/50 p-4 hover:shadow-2xl">
                <div class="w-full">
                    <nuxt-link :to="post.path">
                        <img :src="post.image"
                            class="rounded-lg hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out"
                            :alt="post.title" />
                    </nuxt-link>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white border-b py-2 hover:text-blue-500">
                        <nuxt-link :to="post.path">
                            {{ post.title }}
                        </nuxt-link>
                    </h3>

                    <div class="py-2 flex flex-row">
                        <div class="text-gray-600 dark:text-white text-lg flex flex-row mr-2">
                            <div class="mr-2">
                                <IconCalendar :width="24" :height="24" />
                            </div>
                            <div>
                                {{ post.pubDate | dateFormat }}
                            </div>
                        </div>

                        <div class="text-gray-600 dark:text-white text-lg flex flex-row">
                            <div class="mr-2">
                                <IconFolder :width="24" :height="24" />
                            </div>
                            <div class="hover:text-blue-500">
                                <nuxt-link :to="post.categoryData.path">
                                    {{ post.categoryData.title }}
                                </nuxt-link>
                            </div>
                        </div>
                    </div>

                    <div class="text-gray-600 dark:text-white pt-2 text-justify text-base">
                        {{ post.summary }}
                    </div>

                    <div class="flex flex-row py-4 dark:text-white">
                        <div class="mr-2 mt-2">
                            <IconTags :width="24" :height="24" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <div v-for="(tag, tagIndex) in post.tagData" :key="tagIndex"
                                class="text-base bg-gray-100 dark:bg-slate-600 rounded-full mr-2 p-2 shadow-md hover:text-blue-500 dark:hover:text-cyan-300">
                                <nuxt-link :to="tag.path">
                                    {{ tag.title }}
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IconCalendar from '~/components/Icon/Calendar'
    import IconFolder from '~/components/Icon/Folder'
    import IconTags from '~/components/Icon/Tags'
    export default {
        name: 'HomePostLists',

        components: {
            IconCalendar,
            IconFolder,
            IconTags,
        },

        props: {
            posts: {
                type: Array,
                required: true,
            },
        },

        filters: {
            dateFormat: function (date) {
                const dateObj = new Date(date);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                const day = String(dateObj.getDate()).padStart(2, "0");

                return `${year}-${month}-${day}`;
            },
        },
    }
</script>
