<template>
  <div id="app">
    <h1>Monthly Budget</h1>
    <Expenses v-for="item in getReferences" :key="item.id" :reference="item"/>
  </div>
</template>

<script>
  import Expenses from './components/Expenses.vue'
  import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    Expenses
  },
  computed: {
    ...mapGetters(['getReferences']),
  },
  methods: {
    ...mapActions(['initReferences']),
  },
  mounted() {
    !this.getReferences.length && this.initReferences()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  color: #fff;
  background-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
}

h1 {
  margin: 12px 0;
}
</style>
