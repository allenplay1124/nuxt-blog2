<template>
    <div class="container mx-auto">
        <Carousel :categories="categories" />

        <div>
            <HomePostLists :posts="posts" />
        </div>
    </div>
</template>

<script>
import Carousel from "~/components/Carousel";
import HomePostLists from "~/components/HomePostLists";
export default {
    name: "IndexPage",

    components: {
        Carousel,
        HomePostLists,
    },

    async asyncData({ $content }) {
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

        let posts = await $content("articles")
            .where({ status: true })
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
            posts,
        };
    },
};
</script>
