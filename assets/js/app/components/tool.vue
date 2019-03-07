<template>
  <div>
    <a v-bind:href="tool.uri" class="block no-underline text-black hover:opacity-90">
      <div
        v-for="(category, index) in tool.category"
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
        <div class="title bold text-lg text-grey-darkest">{{ tool.title }}</div>
        <div v-if="tool.description != null">
          <div
            class="description nested-links text-grey-darker text-sm no-underline leading-normal nested-copy-line-height"
          >{{ tool.description }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Slugify from "../filters/slugify.js";
export default {
  props: ["tool"]
};
</script>


