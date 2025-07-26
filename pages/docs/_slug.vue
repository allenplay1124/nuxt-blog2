<template>
  <div class="container mx-auto my-3 lg:p-10 p-1">
    <div class="bg-white/80 dark:bg-slate-800/50 border shadow-lg rounded-3xl  dark:shadow-cyan-500/50 dark:border-cyan-100 p-4 backdrop-blur-md">
      <h1 class="text-2xl border-b pb-2 dark:text-slate-100">
        {{ doc.title }}
      </h1>

      <div class="prose prose-gray prose-base w-full dark:prose-invert">
        <nuxt-content :document="doc" />
      </div>

      <div class="dark:text-slate-100">
        <Disqus />
      </div>
    </div>
  </div>
</template>
<script>
import { Disqus } from 'vue-disqus'
export default {
  name: "docs",

  layout: "default",

  components: {
    Disqus
  },

  head() {
        return {
            title: `${this.doc.title} | ${this.$nuxt.context.app.head.title }`,
            meta: [
                {
                    property: 'og:title',
                    content: `${this.doc.title} | ${this.$nuxt.context.app.head.title }`
                },
            ],
        }
  },

  async asyncData({ $content, params }) {

    const doc = await $content("docs", params.slug).fetch();

    return { doc };
  },
};
</script>
