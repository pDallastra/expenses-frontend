<template>
  <div id="app">
    <h1>Monthly Budget</h1>
    <Expenses v-for="item in references.references" :key="item.id" :reference="item"/>
  </div>
</template>

<script>
  import Expenses from './components/Expenses.vue'
  import ReferenceService from "@/service/ReferenceService";

export default {
  name: 'App',
  components: {
    Expenses
  },
  data: () => ({
    references: []
  }),
  methods: {
    async getReferences() {
      this.references = await ReferenceService.getReferencesById()
    }
  },
  mounted() {
    this.getReferences()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 24px;
}

h1 {
  margin: 0;
}
</style>
