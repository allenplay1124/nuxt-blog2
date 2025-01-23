<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in categories" :key="index">
        <div class="relative">
          <nuxt-link :to="item.path">
            <img :src="item.cover" class="w-full h-auto object-cover rounded-lg shadow-lg" />
          </nuxt-link>
          <div class="absolute inset-x-0 bottom-1/4 text-center text-white bg-black bg-opacity-50 p-4">
            <h2 class="text-2xl text-white">
              <nuxt-link :to="item.path">
                {{ item.title }}
              </nuxt-link>
            </h2>
            <div class="text-gray-100">
              <nuxt-link :to="item.path">
                {{ item.summary }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "Carousel",
  props: ["categories"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
};
</script>
