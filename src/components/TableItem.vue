<template>
  <tr >
    <td>{{ formatDate(expense.date, 'DD') }}</td>
    <td>{{ expense.title }}</td>
    <td>{{ expense.where }}</td>
    <td>{{ formatToCurrency(expense.amount) }}</td>
    <td>{{ expense.payment }}</td>
  </tr>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'TableItem',
  props: ['expense'],
  methods: {
    formatToCurrency(amount) {
      return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(amount)
    }, 

    formatDate(date, string) {
      return dayjs(date).format(string)
    },
  }
}
</script>

<style>

</style>