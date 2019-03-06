<template>
  <div class="w-full px-2 lg:flex">
    <div
      class="mb-8 border border-grey-light lg:border-grey-light bg-white rounded p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-2">
        <div v-if="tool.category != null" class="bg-red">
          <span
            v-for="(category, index) in tool.category"
            :class="{ 'active': index === 0 }"
            :text="category.text"
          >
            <div v-if="index === 0">{{ category | slugify }}</div>

            <span class="text-black text-base inline-block mr-3 mb-2">{{ category }}</span>
          </span>
        </div>

        <div class="text-black font-bold text-xl mb-2">{{ tool.title }}</div>

        <div v-if="tool.description != null">
          <div class="text-black text-base mb-2">{{ tool.description }}</div>
        </div>
        <div v-if="tool.uri != null">
          <div class="text-black text-base mb-2">{{ tool.uri }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tool"]
};
</script>