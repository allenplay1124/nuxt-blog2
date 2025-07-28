<template>
    <div class="container mx-auto">
        <Carousel :categories="categories" />

        <div>
            <HomePostLists :posts="posts" />
        </div>

        <div
            class="flex justify-center my-8 bg-white/50 dark:bg-slate-800/30 rounded-md py-2 shadow-xl dark:shadow-cyan-500/50 backdrop-blur-md"
        >
            
            <nuxt-link
                v-if="page != 1"
                :to="`/page/${page - 1}`"
                class="w-20 h-10 flex items-center justify-center text-slate-800 dark:text-cyan-50 hover:bg-slate-200/50 dark:hover:bg-slate-500/50 rounded-md"
            >
                ⬅️ 上一頁
            </nuxt-link>

            <div class="w-10 h-10 flex items-center justify-center rounded-full transition bg-slate-200/50 dark:bg-slate-700/50 text-slate-800 dark:text-white backdrop-blur-md mx-3">
                {{ page }}
            </div>
            
            <nuxt-link
                v-if="page < totalPages"
                :to="`/page/${page + 1}`"
                class="w-20 h-10 flex items-center justify-center text-slate-800 dark:text-cyan-50 hover:bg-slate-200/50 dark:hover:bg-slate-500/50 rounded-md"
            >
                下一頁 ➡️
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import Carousel from "~/components/Carousel";
import HomePostLists from "~/components/HomePostLists";
export default {
    name: "Page",

    components: {
        Carousel,
        HomePostLists,
    },

    async asyncData({ $content, params }) {
        let page = parseInt(params.slug) || 1;
        let page_limit = 8;

        let categories = await $content("categories")
            .sortBy("sort", "asc")
            .fetch();

        let allTags = await $content("articles").only("tags").fetch();

        let tags = [];

        allTags.forEach(function (item) {
            item.tags.forEach(function (tag) {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });

        let allposts = await $content("articles")
            .where({ status: true })
            .sortBy("pubDate", "desc")
            .fetch();

        let total = await allposts.length;

        let totalPages = Math.ceil(total / page_limit);

        let posts = await $content("articles")
            .where({ status: true })
            .sortBy("pubDate", "desc")
            .skip((page - 1) * page_limit)
            .limit(page_limit)
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
            posts,
            page,
            page_limit,
            total,
            totalPages,
        };
    },
};
</script>
