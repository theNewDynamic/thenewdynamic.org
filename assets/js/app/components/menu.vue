<template>
  <div v-for="facet in searchResult.data.aggregations" :key="facet.id">
    <facet :facet="facet" :filters="filters"></facet>
  </div>
</template>