<template>
  <a v-bind:href="item.uri" class="block no-underline text-black hover:opacity-90">
    <div
      v-for="category in item.category"
      :text="category.text"
      :key="category.id"
      :class="category | slugify"
    >
      <div class="text-xs main-category px-4 py-2">
        <!-- <div v-if="index === 0">{{ category | slugify }}</div> flex justify-between px-3 py-1 text-xs text-white-->
        <span class="text-sm main-category">{{ category }}</span>
      </div>
    </div>

    <div class="p-3">
      <div class="title bold text-lg text-grey-darkest">{{ item.title }}</div>
      <div v-if="item.description != null">
        <div
          class="description nested-links text-grey-darker text-sm no-underline leading-normal nested-copy-line-height"
        >{{ item.description }}</div>
      </div>
    </div>
  </a>
</template>

<script>
import "../filters/slugify.js";
export default {
  props: ["item"]
};
</script>


