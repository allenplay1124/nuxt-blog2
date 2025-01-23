<template>
    <div class="container mx-auto my-3 lg:p-10 p-1">
      <div class="flex flex-col md:flex-row">
        <div
          class="flex-1 p-4 shadow-lg rounded-xl dark:shadow-cyan-500/50 border dark:border-cyan-100 my-6"
        >
          <div class="relative">
            <h1 class="text-2xl dark:text-slate-200">標籤：#{{ tag.title }}</h1>
          </div>

          <!---文章列表--->
          <div class="container mx-auto py-4">
            <div
              v-for="(post, index) in posts"
              :key="index"
              class="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-6 shadow-lg rounded-lg p-4 border"
            >
              <nuxt-link :to="post.path">
                <img
                  :src="post.image"
                  class="w-full h-auto md:w-48 md:h-32 object-cover rounded-md shadow-lg transition duration-300 ease-in-out hover:scale-105"
                />
              </nuxt-link>
              <div class="flex-1 ml-4 md:ml-0 dark:text-slate-300">
                <h2 class="text-2xl hover:text-blue-500 dark:hover:text-cyan-500">
                  <nuxt-link :to="post.path">
                    {{ post.title }}
                  </nuxt-link>
                </h2>

                <div class="flex lg:flex-row flex-col">
                  <div class="flex flex-row">
                    <div class="mt-0.5 mr-2">
                        <IconCalendar :width="24" :height="24"  />
                    </div>
                    <div>
                      {{ post.pubDate | dateFormat }}
                    </div>
                  </div>

                  <div class="flex flex-row lg:mx-2">
                    <div class="mt-0.5 mr-2">
                        <IconFolder :width="24" :height="24" />
                    </div>
                    <div class="hover:text-blue-500 dark:hover:text-cyan-500">
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
                        v-for="(tag, tagIndex) in post.tagData"
                        :key="tagIndex"
                        class="mr-2 hover:text-blue-500 dark:hover:text-cyan-500"
                      >
                        <nuxt-link :to="tag.path">
                          {{ tag.title }}
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
                  <nuxt-link :to="post.path"> [繼續閱讀] </nuxt-link>
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
    import IconCalendar from '~/components/Icon/Calendar'
    import IconFolder from '~/components/Icon/Folder'
    import IconTags from '~/components/Icon/Tags'
    import CategoriesBlock from "~/components/CategoriesBlock";
    import TagsBlock from "~/components/TagsBlock";
    export default {
        name: "tag",

        layout: "default",

        components: {
            IconCalendar,
            IconFolder,
            IconTags,
            CategoriesBlock,
            TagsBlock,
        },

        head() {
            return {
                title: `標籤分類：${this.tag.title} | ${this.$nuxt.context.app.head.title}`,
                meta: [
                    {
                        property: 'og:title',
                        content: `標籤分類：${this.tag.title} | ${this.$nuxt.context.app.head.title}`
                    },
                ],
            }
        },

        async asyncData({ $content, params }) {
            const categories = await $content("categories")
                .sortBy("sort", "asc")
                .fetch();

            const tags = await $content("tags").fetch();

            const tag = await $content("tags", params.slug).limit(1).fetch();

            const posts = await $content("articles")
                .where({
                    tags: { $contains: params.slug },
                    status: true,
                })
                .sortBy("pubDate", "desc")
                .fetch();

            posts.map(function (post) {
                let category = categories.find(function (category) {
                    return category.slug === post.category;
                });

                post.categoryData = category;

                let tagsList = [];

                post.tags.forEach(function (tag) {
                    let tagItem = tags.find(function (item) {
                        return item.slug === tag;
                    });

                    tagsList.push(tagItem);
                });

                post.tagData = tagsList;
            });

            return {
                categories,
                tags,
                tag,
                posts,
            };
        },
        filters: {
            dateFormat: function (date) {
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
    };
</script>
