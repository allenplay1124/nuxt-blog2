<template>
    <div class="container mx-auto my-3 lg:p-10 p-1">
        <div class="flex flex-col md:flex-row">
            <div
                class="flex-1 p-4 shadow-lg rounded-3xl bg-white/80 dark:bg-slate-800/50 dark:shadow-cyan-500/50 border dark:border-cyan-100 my-6 backdrop-blur-md"
            >
                <h1 class="text-3xl my-3 dark:text-cyan-100">
                    {{ post.title }}
                </h1>

                <div
                    class="w-full rounded-3xl dark:text-gray-100 my-5 bg-slate-200 dark:bg-slate-700 p-5 flex flex-col items-start"
                >
                    <div class="text-lg inline-flex items-center mx-2">
                        <div class="mr-2">
                            <IconCalendar :width="24" :height="24" />
                        </div>
                        <div>
                            {{ post.pubDate | dateTimeFormat }}
                        </div>
                    </div>

                    <div class="text-lg inline-flex items-center mx-2">
                        <div class="mr-2">
                            <IconFolder :width="24" :height="24" />
                        </div>
                        <div
                            class="p-1 shadow-sm hover:text-blue-500 dark:hover:text-cyan-500 border-b"
                        >
                            <nuxt-link :to="post.categoryData.path">
                                {{ post.categoryData.title }}
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="text-lg inline-flex items-center mx-2">
                        <div class="mr-2">
                            <IconTags :width="24" :height="24" />
                        </div>
                        <div>
                            <span
                                v-for="(tag, index) in post.tagsData"
                                :key="index"
                                class="mr-2 shadow-sm p-1 hover:text-blue-500 dark:hover:text-cyan-500 border-b"
                            >
                                <nuxt-link :to="`/tags/${tag}`">
                                    {{ tag }}
                                </nuxt-link>
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <img
                        :src="post.image"
                        :alt="post.title"
                        class="w-full object-cover rounded-3xl my-2"
                    />
                </div>

                <div
                    class="my-4 bg-slate-200 dark:bg-slate-700 dark:text-slate-200 p-4 rounded-3xl"
                >
                    <div
                        class="border-b border-slate-400 text-xl pb-2 font-blod"
                    >
                        文章摘要
                    </div>
                    <div class="py-2 text-base">
                        {{ post.summary }}
                    </div>
                </div>

                <div class="md:hidden block">
                    <tocBlock :toc="post.toc" />
                </div>

                <div
                    class="prose prose-gray prose-base w-full dark:prose-invert"
                >
                    <nuxt-content :document="post" />
                </div>

                <div
                    class="flex flex-col lg:w-auto lg:flex-row justify-between items-center my- dark:text-slate-100"
                >
                    <nuxt-link v-if="prev" :to="prev.path">
                        <div
                            class="border-l-8 border-blue-500 dark:border-cyan-500 bg-slate-200 dark:bg-slate-700 p-2 rounded-lg hover:text-blue-500 dark:hover:text-cyan-500"
                        >
                            <div>上一篇：</div>
                            <div>{{ prev.title }}</div>
                        </div>
                    </nuxt-link>

                    <nuxt-link v-if="next" :to="next.path">
                        <div>
                            <div
                                class="border-r-8 border-blue-500 dark:border-cyan-500 bg-slate-200 dark:bg-slate-700 p-2 rounded-lg hover:text-blue-500 dark:hover:text-cyan-500 mt-3 lg:mt-0"
                            >
                                <div>下一篇：</div>
                                <div>{{ next.title }}</div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>

                <div class="w-full my-4">
                    <Disqus />
                </div>
            </div>

            <div class="w-full md:w-1/4 p-4 md:h-full lg:sticky lg:top-20">
                <TocBlock :toc="post.toc" class="mb-4 hidden lg:block" />

                <CategoriesBlock :categories="categories" class="my-4" />

                <TagsBlock :tags="tags" class="my-4" />
            </div>
        </div>
    </div>
</template>

<script>
import IconCalendar from "~/components/Icon/Calendar";
import IconFolder from "~/components/Icon/Folder";
import IconTags from "~/components/Icon/Tags";
import CategoriesBlock from "~/components/CategoriesBlock";
import TagsBlock from "~/components/TagsBlock";
import TocBlock from "~/components/TocBlock";
import { Disqus } from "vue-disqus";

export default {
    name: "Article",

    layout: "default",

    components: {
        IconCalendar,
        IconFolder,
        IconTags,
        CategoriesBlock,
        TagsBlock,
        TocBlock,
        Disqus,
    },

    filters: {
        dateTimeFormat: function (date) {
            const dateObj = new Date(date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            const hh = String(dateObj.getHours()).padStart(2, "0");
            const mm = String(dateObj.getMinutes()).padStart(2, "0");
            const ss = String(dateObj.getSeconds()).padStart(2, "0");

            return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
        },
    },

    head() {
        return {
            title: `${this.post.title} | ${this.$nuxt.context.app.head.title}`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.post.summary,
                },
                {
                    property: "og:title",
                    content: `${this.post.title} | ${this.$nuxt.context.app.head.title}`,
                },
                {
                    property: "og:image",
                    content: this.post.image,
                },
                {
                    property: "og:description",
                    content: this.post.summary,
                },
            ],
        };
    },

    async asyncData({ $content, params }) {
        let categories = await $content("categories")
            .sortBy("sort", "asc")
            .fetch();

        let allTags = await $content("articles").only("tags").fetch();
        let tags = [];
        //取得所有文章的tags
        allTags.forEach(function (item) {
            item.tags.forEach(function (tag) {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });
        //計算每個tag的數量
        const tagCounts = {};
        allTags.forEach((item) => {
            item.tags.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        tags = tags.map((tag) => ({
            name: tag,
            count: tagCounts[tag] || 0,
        }));

        //排序tags
        tags.sort((a, b) => b.count - a.count);

        let post = await $content("articles", params.slug).limit(1).fetch();

        const categoryData = categories.find((c) => c.slug == post.category);

        post.categoryData = categoryData;
        post.tagsData = post.tags;

        const [prev, next] = await $content("articles")
            .only(["title", "path"])
            .where({ status: true })
            .sortBy("pubDate", "desc")
            .surround(params.slug)
            .fetch();

        return { post, categories, tags, prev, next };
    },
};
</script>
