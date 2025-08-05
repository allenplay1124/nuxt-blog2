<template>
    <div class="container mx-auto my-3 lg:p-10 p-1">
        <div class="flex flex-col md:flex-row">
            <div
                class="flex-1 p-4 shadow-lg rounded-3xl bg-white/80 dark:bg-slate-800/50 dark:shadow-cyan-500/50 border dark:border-cyan-100 my-6 backdrop-blur-md"
            >
                <div class="relative">
                    <div class="w-full md:w-auto">
                        <img
                            :src="cate.cover"
                            class="w-full object-cover rounded-3xl"
                        />
                    </div>

                    <div
                        class="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white bg-opacity-75 p-4"
                    >
                        <h1 class="text-2xl">{{ cate.title }}</h1>
                        <div>{{ cate.summary }}</div>
                    </div>
                </div>

                <!---文章列表--->
                <div class="container mx-auto py-4">
                    <div
                        v-for="(post, index) in posts"
                        :key="index"
                        class="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-6 shadow-lg rounded-3xl p-4 border"
                    >
                        <nuxt-link :to="post.path">
                            <img
                                :src="post.image"
                                class="w-full h-auto md:w-48 md:h-32 object-cover rounded-md shadow-lg transition duration-300 ease-in-out hover:scale-105"
                            />
                        </nuxt-link>
                        <div class="flex-1 ml-4 md:ml-0 dark:text-slate-300">
                            <h2
                                class="text-2xl hover:text-blue-500 dark:hover:text-cyan-500"
                            >
                                <nuxt-link :to="post.path">
                                    {{ post.title }}
                                </nuxt-link>
                            </h2>

                            <div class="flex lg:flex-row flex-col">
                                <div class="flex flex-row">
                                    <div class="mt-0.5 mr-2">
                                        <IconCalendar
                                            :width="24"
                                            :height="24"
                                        />
                                    </div>
                                    <div>
                                        {{ post.pubDate | dateFormat }}
                                    </div>
                                </div>

                                <div class="flex flex-row lg:mx-2">
                                    <div class="mt-0.5 mr-2">
                                        <IconFolder :width="24" :height="24" />
                                    </div>
                                    <div
                                        class="hover:text-blue-500 dark:hover:text-cyan-500"
                                    >
                                        <nuxt-link :to="post.categoryData.path">
                                            {{ post.categoryData.title }}
                                        </nuxt-link>
                                    </div>
                                </div>

                                <div class="flex flex-row lg:mx-2">
                                    <div class="mt-0.5 mr-2">
                                        <IconTags :width="24" :height="24" />
                                    </div>
                                    <div class="flex flex-row">
                                        <div
                                            v-for="(
                                                tag, tagIndex
                                            ) in post.tagData"
                                            :key="tagIndex"
                                            class="mr-2 hover:text-blue-500 dark:hover:text-cyan-500"
                                        >
                                            <nuxt-link :to="`/tags/${tag}`">
                                                {{ tag }}
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-base text-justify">
                                {{ post.summary }}
                            </div>

                            <div
                                class="text-right hover:text-blue-500 dark:hover:text-cyan-500"
                            >
                                <nuxt-link :to="post.path">
                                    [繼續閱讀]
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/4 p-4 md:h-full lg:sticky lg:top-20">
                <CategoriesBlock :categories="categories" />

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
export default {
    name: "CategorySlug",

    components: {
        IconCalendar,
        IconFolder,
        IconTags,
        CategoriesBlock,
        TagsBlock,
    },

    head() {
        return {
            title: `文章分類：${this.cate.title} | ${this.$nuxt.context.app.head.title}`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.cate.summary,
                },
                {
                    property: "og:title",
                    content: `文章分類：${this.cate.title} | ${this.$nuxt.context.app.head.title}`,
                },
                {
                    property: "og:image",
                    content: this.cate.cover,
                },
                {
                    property: "og:description",
                    content: this.cate.summary,
                },
            ],
        };
    },

    async asyncData({ $content, params }) {
        const categories = await $content("categories")
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

        const cate = await $content("categories", params.slug).limit(1).fetch();

        const posts = await $content("articles")
            .where({
                category: params.slug,
                status: true,
            })
            .sortBy("pubDate", "desc")
            .fetch();

        posts.map(function (post) {
            let category = categories.find(function (category) {
                return category.slug === post.category;
            });

            post.categoryData = category;

            post.tagData = post.tags;
        });

        return {
            categories,
            tags,
            cate,
            posts,
        };
    },
};
</script>
