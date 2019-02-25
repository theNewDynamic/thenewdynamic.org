<template>
  <div>
     <h3><em>Vue Test</em></h3>
     <counter></counter>
  </div>
</template>

<script>
import counter from './counter.vue'

export default {
    components: {
        counter
    },
    name: 'app',
    created: function() {
        console.log('Vue running')
    }
}

</script>

<style lang="scss" scoped>
div {
    h3 {
        color: blue
    }
}
</style>