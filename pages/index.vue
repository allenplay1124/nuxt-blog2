<template>
    <div class="container mx-auto">
        <Carousel :categories="categories" />

        <div>
            <HomePostLists :posts="posts" />
        </div>
    </div>
</template>

<script>
    import Carousel from '~/components/Carousel'
    import HomePostLists from '~/components/HomePostLists'
    export default {
        name: 'IndexPage',

        components: {
            Carousel,
            HomePostLists
        },

        async asyncData({ $content }) {
            let categories = await $content("categories").sortBy("sort", "asc").fetch();

            let tags = await $content('tags').fetch();

            let posts = await $content('articles')
                .where({ status: true })
                .sortBy('pubDate', 'desc')
                .fetch()

            posts.map(function (post) {
                let category = categories.find(function (category) {
                    return category.slug === post.category;
                });
                post.categoryData = category

                let tagList = [];
                post.tags.forEach(function (tag) {
                    let tagItem = tags.find(function (item) {
                        return item.slug === tag;
                    });
                    tagList.push(tagItem);
                });
                post.tagData = tagList;
            })
            return {
                categories,
                tags,
                posts,
            };
        },
    }
</script>
