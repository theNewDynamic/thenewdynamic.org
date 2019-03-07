<template>
  <div class="mb-8">
    <div v-if="facet.buckets.length != 0">
      <h5 class="text-lg font-bold block mb-3">{{ facet.title }}</h5>
    </div>
    <!-- this is a WIP solution to test different facet template (checkboxes vs select) 
    As of now, only checkboxes work-->
    <div v-if="template === 'checkboxes'">
      <div class="checkbox block mb-2" v-for="bucket in facet.buckets" :key="bucket.key">
        <label class="mb-1 inline-block text-grey-darker font-sans text-base">
        <input
          class="mr-1 leading-tight"
          type="checkbox"
          v-model="filters[facet.name]"
          :value="bucket.key"
        >
        
          <!-- Each checkbox is modeled after a facet -->
          {{ bucket.key }}
          <span class="text-xs">({{ bucket.doc_count }})</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["facet", "filters"],
  data() {
    // We populate the template firld for WIP solution mentioned above.
    return {
      template: "checkboxes"
    };
  }
};
</script>