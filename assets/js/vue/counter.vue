<template>
  <div class="example">
    Total Counter Test: {{ msg }}
    <button @click="increase">Increase</button>
  </div>
</template>

<script>
export default {
  name: 'counter',
  data () {
    return {
      msg: 1
    }
  },
  methods: {
      increase() {
          this.msg++
      }
  }
}
</script>

<style scoped>
.example {
  height: 30px;
  color: green;
  background-color: red;
}
button {
  color:white;
  background-color: red;
}
</style>