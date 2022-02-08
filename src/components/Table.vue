<template>
   <table>
        <thead>
          <th>Dia</th>
          <th>Título</th>
          <th>Onde</th>
          <th>Valor</th>
          <th>Método</th>
        </thead>
        <tbody>
          <table-item 
          v-for="expense in expenses" 
          :key="expense.id" 
          :expense="expense"  
          />
        </tbody>
        <button @click="$emit('setDisplayForm')">+</button>
      </table>
</template>

<script>
import TableItem from './TableItem.vue'

export default {
  components: { TableItem },
  name: 'Table',
  props: ['expenses']
}
</script>

<style>

</style>